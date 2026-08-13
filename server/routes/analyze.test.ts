import { describe, expect, it } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import type { AIProvider } from "../ai/provider";
import { JobReadinessService } from "../services/jobReadinessService";
import { processAnalyzePayload } from "./analyze";

const analysis: JobReadinessAnalysis = createJobReadinessAnalysisFixture({
  matchScore: 68,
});

class RecordingProvider implements AIProvider {
  requests: AnalyzeJobReadinessRequest[] = [];
  receivedSignal?: AbortSignal;

  isConfigured(): boolean {
    return true;
  }

  async analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
    options?: { signal?: AbortSignal },
  ): Promise<JobReadinessAnalysis> {
    this.requests.push(request);
    this.receivedSignal = options?.signal;
    return analysis;
  }
}

const v2Request: AnalyzeJobReadinessRequest = {
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

const legacyRequest = {
  profile: {
    education: "SMK RPL",
    skills: "JavaScript, React",
    projects: "Built a small web application.",
    experience: "",
    targetRole: "Junior Web Developer",
    language: "Indonesian",
  },
  jobPosting: "Requires JavaScript and React.",
};

describe("processAnalyzePayload", () => {
  it("returns a normalized response for a normalized V2 request", async () => {
    const provider = new RecordingProvider();
    const result = await processAnalyzePayload(
      v2Request,
      new JobReadinessService(provider),
    );

    expect(result).toEqual(analysis);
    expect(provider.requests[0]).toEqual(v2Request);
  });

  it("passes request cancellation to the provider", async () => {
    const provider = new RecordingProvider();
    const controller = new AbortController();

    await processAnalyzePayload(
      v2Request,
      new JobReadinessService(provider),
      { signal: controller.signal },
    );

    expect(provider.receivedSignal).toBe(controller.signal);
  });

  it("keeps the temporary legacy request and response path", async () => {
    const provider = new RecordingProvider();
    const result = await processAnalyzePayload(
      legacyRequest,
      new JobReadinessService(provider),
    );

    expect(provider.requests[0]?.profile.targetJobField).toBe("it_digital");
    expect(result).toMatchObject({
      summary: analysis.readinessSummary,
      strengths: analysis.candidateStrengths,
      verdict: "Apply with improvements",
    });
    expect(result).not.toHaveProperty("readinessSummary");
  });

  it("rejects payloads matching neither contract", async () => {
    const provider = new RecordingProvider();

    await expect(
      processAnalyzePayload(
        { profile: { targetRole: "" } },
        new JobReadinessService(provider),
      ),
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      httpStatus: 400,
      publicMessage: "The submitted analysis request is invalid.",
    });
    expect(provider.requests).toHaveLength(0);
  });
});
