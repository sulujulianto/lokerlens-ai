import { describe, expect, it } from "vitest";
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

const analysis: JobReadinessAnalysis = {
  matchScore: 70,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "The candidate has a useful foundation.",
  candidateStrengths: ["Customer-facing experience"],
  mainGaps: ["No complaint-handling example"],
  mustHaveRequirements: ["Clear communication"],
  niceToHaveRequirements: ["CRM familiarity"],
  riskFactors: [],
  roadmap30Days: {
    week1: ["Write response scripts"],
    week2: ["Practice complaint handling"],
    week3: ["Prepare examples"],
    week4: ["Apply"],
  },
  evidenceOfCompetenceSuggestions: ["Create response-script samples"],
  cvMaterialSuggestions: ["Describe customer questions handled"],
  applicationMessage: "I am applying for the customer service role.",
  possibleInterviewQuestions: ["How would you handle an upset customer?"],
  disclaimer: "Guidance only.",
};

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
});
