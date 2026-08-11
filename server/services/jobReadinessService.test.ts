import { describe, expect, it } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import type { AIProvider } from "../ai/provider";
import { AppError } from "../errors";
import { JobReadinessService } from "./jobReadinessService";

const request: AnalyzeJobReadinessRequest = {
  profile: {
    targetJobField: "customer_service",
    targetRole: "Customer Service Representative",
    educationBackground: "SMK graduate",
    workExperience: "Handled customer questions in a retail shop.",
    mainSkills: ["Communication"],
    preferredOutputLanguage: "id",
  },
  jobPosting: "Seeking an entry-level customer service representative.",
};

const analysis: JobReadinessAnalysis = createJobReadinessAnalysisFixture({
  matchScore: 70,
});

class FakeProvider implements AIProvider {
  constructor(
    private readonly result?: JobReadinessAnalysis,
    private readonly error?: AppError,
  ) {}

  isConfigured(): boolean {
    return true;
  }

  async analyzeJobReadiness(): Promise<JobReadinessAnalysis> {
    if (this.error) {
      throw this.error;
    }

    return this.result!;
  }
}

describe("JobReadinessService", () => {
  it("returns validated provider output", async () => {
    const service = new JobReadinessService(new FakeProvider(analysis));

    await expect(service.analyze(request)).resolves.toEqual(analysis);
  });

  it("propagates normalized provider errors", async () => {
    const providerError = new AppError(
      "PROVIDER_REQUEST_FAILED",
      502,
      "The analysis provider could not complete the request.",
    );
    const service = new JobReadinessService(
      new FakeProvider(undefined, providerError),
    );

    await expect(service.analyze(request)).rejects.toBe(providerError);
  });

  it("rejects invalid provider output", async () => {
    const service = new JobReadinessService(
      new FakeProvider({
        ...analysis,
        matchScore: 101,
      } as JobReadinessAnalysis),
    );

    await expect(service.analyze(request)).rejects.toMatchObject({
      code: "PROVIDER_RESPONSE_INVALID",
    });
  });

  it("rejects provider output that fails the Indonesian quality gate", async () => {
    const service = new JobReadinessService(
      new FakeProvider({
        ...analysis,
        readinessSummary: "Kamu sudah cukup siap untuk melamar.",
      }),
    );

    await expect(service.analyze(request)).rejects.toMatchObject({
      code: "PROVIDER_RESPONSE_INVALID",
    });
  });
});
