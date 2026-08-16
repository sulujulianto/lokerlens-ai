import type { Express } from "express";
import type { Server } from "node:http";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createJobReadinessAnalysisFixture } from "../shared/analysisTestFixtures";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../shared/analysisSchemas";
import { longBilingualInformalScenario } from "../shared/robustnessScenarios";
import type { AIProvider } from "./ai/provider";
import { createApp } from "./app";
import { loadServerConfig } from "./config";
import { AppError } from "./errors";
import { JobReadinessService } from "./services/jobReadinessService";

const request: AnalyzeJobReadinessRequest = {
  profile: {
    targetJobField: "administration",
    targetRole: "Junior Administrative Staff",
    educationBackground: "SMK office administration",
    internshipOrOrganizationalExperience:
      "Managed participant records for a school event.",
    mainSkills: ["Data entry", "Document filing"],
    preferredOutputLanguage: "id",
  },
  jobPosting: "Wajib teliti dan mampu melakukan input data.",
};

const analysis = createJobReadinessAnalysisFixture({ matchScore: 68 });

class StubProvider implements AIProvider {
  requests: AnalyzeJobReadinessRequest[] = [];

  constructor(
    private readonly result: JobReadinessAnalysis = analysis,
    private readonly error?: unknown,
  ) {}

  isConfigured(): boolean {
    return true;
  }

  async analyzeJobReadiness(
    submittedRequest: AnalyzeJobReadinessRequest,
  ): Promise<JobReadinessAnalysis> {
    this.requests.push(submittedRequest);
    if (this.error) throw this.error;
    return this.result;
  }
}

interface RunningApp {
  baseUrl: string;
  server: Server;
}

const runningServers: Server[] = [];

async function listen(app: Express): Promise<RunningApp> {
  const server = await new Promise<Server>((resolve, reject) => {
    const listeningServer = app.listen(0, "127.0.0.1", () => {
      resolve(listeningServer);
    });
    listeningServer.once("error", reject);
  });
  runningServers.push(server);

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Test server did not bind to a TCP port.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    server,
  };
}

async function createRunningApp(
  environment: NodeJS.ProcessEnv = {},
  provider: AIProvider = new StubProvider(),
  options: { isProduction?: boolean } = {},
): Promise<RunningApp> {
  const config = loadServerConfig({
    ANALYSIS_RATE_LIMIT_MAX: "10",
    ANALYSIS_RATE_LIMIT_WINDOW_MS: "60000",
    ...environment,
  });
  const app = await createApp(
    config,
    new JobReadinessService(provider),
    options,
  );
  return listen(app);
}

afterEach(async () => {
  await Promise.all(
    runningServers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
  vi.restoreAllMocks();
});

describe("createApp HTTP integration", () => {
  it("reports provider availability and applies public security headers", async () => {
    const { baseUrl } = await createRunningApp();

    const response = await fetch(`${baseUrl}/api/health`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      analysisAvailable: false,
    });
    expect(response.headers.get("x-powered-by")).toBeNull();
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("permissions-policy")).toBe(
      "camera=(), geolocation=(), microphone=()",
    );
    expect(response.headers.get("x-request-id")).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it("keeps unknown API routes behind the JSON API boundary", async () => {
    const { baseUrl } = await createRunningApp();

    const response = await fetch(`${baseUrl}/api/unknown`);

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({
      error: "API endpoint not found.",
      code: "NOT_FOUND",
    });
  });

  it("processes a valid V2 analysis request through the HTTP route", async () => {
    const provider = new StubProvider();
    const { baseUrl } = await createRunningApp({}, provider);

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(analysis);
    expect(provider.requests).toEqual([request]);
  });

  it("preserves a long bilingual posting and informal evidence through HTTP", async () => {
    const provider = new StubProvider();
    const { baseUrl } = await createRunningApp({}, provider);

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(longBilingualInformalScenario),
    });

    expect(response.status).toBe(200);
    expect(provider.requests).toEqual([longBilingualInformalScenario]);
    expect(provider.requests[0]?.jobPosting).toContain(
      "END-OF-LONG-BILINGUAL-POSTING",
    );
  });

  it("normalizes invalid request payloads without exposing internals", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { baseUrl } = await createRunningApp();

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ profile: { targetRole: "" } }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "The submitted analysis request is invalid.",
      code: "VALIDATION_ERROR",
    });
  });

  it.each([
    {
      code: "PROVIDER_REQUEST_FAILED" as const,
      status: 502,
      message: "The analysis provider could not complete the request.",
    },
    {
      code: "PROVIDER_RESPONSE_INVALID" as const,
      status: 502,
      message: "The analysis provider returned an invalid response.",
    },
    {
      code: "PROVIDER_TIMEOUT" as const,
      status: 504,
      message: "The analysis provider took too long to respond. Please try again.",
    },
  ])(
    "preserves normalized $code failures at the HTTP boundary",
    async ({ code, status, message }) => {
      vi.spyOn(console, "error").mockImplementation(() => undefined);
      const providerError = new AppError(code, status, message);
      const { baseUrl } = await createRunningApp(
        {},
        new StubProvider(analysis, providerError),
      );

      const response = await fetch(`${baseUrl}/api/analyze`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });

      expect(response.status).toBe(status);
      await expect(response.json()).resolves.toEqual({ error: message, code });
    },
  );

  it("hides unexpected provider details behind a generic 500 response", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { baseUrl } = await createRunningApp(
      {},
      new StubProvider(
        analysis,
        new Error("private provider response details"),
      ),
    );

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
    const body = await response.text();

    expect(response.status).toBe(500);
    expect(JSON.parse(body)).toEqual({
      error: "An unexpected server error occurred.",
      code: "INTERNAL_ERROR",
    });
    expect(body).not.toContain("private provider response details");
  });

  it("returns a normalized 413 response for oversized JSON bodies", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { baseUrl } = await createRunningApp();

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ payload: "x".repeat(1_100_000) }),
    });

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Request body is too large.",
      code: "VALIDATION_ERROR",
    });
  });

  it("enforces the configured analysis rate limit", async () => {
    const { baseUrl } = await createRunningApp({
      ANALYSIS_RATE_LIMIT_MAX: "1",
    });
    const submit = () =>
      fetch(`${baseUrl}/api/analyze`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });

    expect((await submit()).status).toBe(200);
    const limitedResponse = await submit();

    expect(limitedResponse.status).toBe(429);
    await expect(limitedResponse.json()).resolves.toEqual({
      error: "Too many analysis requests. Please wait and try again.",
      code: "RATE_LIMITED",
    });
  });

  it("enables the strict CSP when configured for production", async () => {
    const { baseUrl } = await createRunningApp(
      {},
      new StubProvider(),
      { isProduction: true },
    );

    const response = await fetch(`${baseUrl}/api/health`);
    const csp = response.headers.get("content-security-policy");

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("connect-src 'self'");
  });
});
