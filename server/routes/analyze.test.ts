import { describe, expect, it } from "vitest";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import type { AIProvider } from "../ai/provider";
import { AppError } from "../errors";
import { JobReadinessService } from "../services/jobReadinessService";
import { processAnalyzePayload } from "./analyze";

const analysis: JobReadinessAnalysis = {
  matchScore: 68,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "The candidate has relevant foundations.",
  candidateStrengths: ["Relevant practical experience"],
  mainGaps: ["Limited evidence for one required tool"],
  mustHaveRequirements: ["Accurate task execution"],
  niceToHaveRequirements: ["Tool familiarity"],
  riskFactors: [],
  roadmap30Days: {
    week1: ["Review the main gap"],
    week2: ["Practice a role-specific task"],
    week3: ["Create evidence"],
    week4: ["Prepare the application"],
  },
  evidenceOfCompetenceSuggestions: ["Create a sanitized work sample"],
  cvMaterialSuggestions: ["Describe relevant responsibilities"],
  applicationMessage: "I am applying for this role.",
  possibleInterviewQuestions: ["How do you maintain accuracy?"],
  disclaimer: "Guidance only.",
};

class RecordingProvider implements AIProvider {
  requests: AnalyzeJobReadinessRequest[] = [];

  isConfigured(): boolean {
    return true;
  }

  async analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
  ): Promise<JobReadinessAnalysis> {
    this.requests.push(request);
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
