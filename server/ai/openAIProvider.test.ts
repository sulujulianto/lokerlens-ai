import { describe, expect, it, vi } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import { crossFieldScenarios } from "../../shared/crossFieldScenarios";
import { AppError } from "../errors";
import { OpenAIProvider } from "./openAIProvider";

const validAnalysis = createJobReadinessAnalysisFixture({ matchScore: 78 });

function responseWithOutput(output: unknown, status = 200): Response {
  return new Response(JSON.stringify(output), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("OpenAIProvider", () => {
  it("sends a private structured-output request and parses the response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      responseWithOutput({
        status: "completed",
        output: [
          {
            type: "message",
            content: [
              { type: "output_text", text: JSON.stringify(validAnalysis) },
            ],
          },
        ],
      }),
    );
    const provider = new OpenAIProvider(
      "openai-secret",
      45_000,
      "configured-model",
      fetchMock,
    );

    await expect(
      provider.analyzeJobReadiness(crossFieldScenarios[0]),
    ).resolves.toMatchObject({ matchScore: 78, verdict: "APPLY_NOW" });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(url).toBe("https://api.openai.com/v1/responses");
    expect(init.headers).toMatchObject({
      Authorization: "Bearer openai-secret",
    });
    expect(body).toMatchObject({
      model: "configured-model",
      store: false,
      text: {
        format: {
          type: "json_schema",
          name: "job_readiness_analysis",
          strict: true,
        },
      },
    });
    expect(body.text.format.schema.additionalProperties).toBe(false);
    expect(body.text.format.schema.required).toEqual(
      expect.arrayContaining([
        "scoreBreakdown",
        "requirementMatches",
        "topPriorities",
        "cvImprovementPrompt",
        "interviewPreparation",
      ]),
    );
    expect(
      body.text.format.schema.properties.scoreBreakdown.required,
    ).toEqual(
      expect.arrayContaining([
        "mustHaveAlignment",
        "skillsAlignment",
        "experienceEvidence",
        "educationTraining",
        "practicalReadiness",
      ]),
    );
  });

  it("rejects use without an API key", async () => {
    const provider = new OpenAIProvider();

    await expect(
      provider.analyzeJobReadiness(crossFieldScenarios[0]),
    ).rejects.toMatchObject({ code: "PROVIDER_NOT_CONFIGURED" });
  });

  it("normalizes non-success HTTP responses without exposing the body", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      responseWithOutput({ error: { message: "sensitive upstream detail" } }, 401),
    );
    const provider = new OpenAIProvider(
      "openai-secret",
      45_000,
      "configured-model",
      fetchMock,
    );

    const promise = provider.analyzeJobReadiness(crossFieldScenarios[0]);
    await expect(promise).rejects.toBeInstanceOf(AppError);
    await expect(promise).rejects.toMatchObject({
      code: "PROVIDER_REQUEST_FAILED",
      publicMessage: "The analysis provider could not complete the request.",
    });
  });

  it("rejects incomplete or missing structured output", async () => {
    const incompleteFetch = vi.fn().mockResolvedValue(
      responseWithOutput({
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
      }),
    );
    const provider = new OpenAIProvider(
      "openai-secret",
      45_000,
      "configured-model",
      incompleteFetch,
    );

    await expect(
      provider.analyzeJobReadiness(crossFieldScenarios[0]),
    ).rejects.toMatchObject({ code: "PROVIDER_RESPONSE_INVALID" });
  });
});
