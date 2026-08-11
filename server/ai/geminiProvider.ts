import { GoogleGenAI, Type } from "@google/genai";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import { buildAnalysisPrompt } from "./promptBuilder";
import type { AIProvider } from "./provider";
import { parseJobReadinessResponse } from "./responseParser";

const stringArraySchema = {
  type: Type.ARRAY,
  items: { type: Type.STRING },
};

const scoreDimensionSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER },
    maxScore: { type: Type.INTEGER },
    rationale: { type: Type.STRING },
  },
  required: ["score", "maxScore", "rationale"],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.INTEGER },
    scoreBreakdown: {
      type: Type.OBJECT,
      properties: {
        mustHaveAlignment: scoreDimensionSchema,
        skillsAlignment: scoreDimensionSchema,
        experienceEvidence: scoreDimensionSchema,
        educationTraining: scoreDimensionSchema,
        practicalReadiness: scoreDimensionSchema,
      },
      required: [
        "mustHaveAlignment",
        "skillsAlignment",
        "experienceEvidence",
        "educationTraining",
        "practicalReadiness",
      ],
    },
    verdict: {
      type: Type.STRING,
      enum: ["APPLY_NOW", "APPLY_WITH_IMPROVEMENTS", "NOT_READY_YET"],
    },
    readinessSummary: { type: Type.STRING },
    candidateStrengths: stringArraySchema,
    mainGaps: stringArraySchema,
    requirementMatches: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          requirement: { type: Type.STRING },
          priority: {
            type: Type.STRING,
            enum: ["MUST_HAVE", "NICE_TO_HAVE"],
          },
          status: {
            type: Type.STRING,
            enum: ["MATCHED", "PARTIAL", "NOT_EVIDENCED"],
          },
          evidence: { type: Type.STRING },
          recommendation: { type: Type.STRING },
        },
        required: [
          "requirement",
          "priority",
          "status",
          "evidence",
          "recommendation",
        ],
      },
    },
    riskFactors: stringArraySchema,
    topPriorities: stringArraySchema,
    roadmap30Days: {
      type: Type.OBJECT,
      properties: {
        week1: stringArraySchema,
        week2: stringArraySchema,
        week3: stringArraySchema,
        week4: stringArraySchema,
      },
      required: ["week1", "week2", "week3", "week4"],
    },
    evidenceOfCompetenceSuggestions: stringArraySchema,
    cvImprovementPrompt: { type: Type.STRING },
    applicationMessage: { type: Type.STRING },
    interviewPreparation: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          whyItIsAsked: { type: Type.STRING },
          answerOutline: { type: Type.STRING },
        },
        required: ["question", "whyItIsAsked", "answerOutline"],
      },
    },
    disclaimer: { type: Type.STRING },
  },
  required: [
    "matchScore",
    "scoreBreakdown",
    "verdict",
    "readinessSummary",
    "candidateStrengths",
    "mainGaps",
    "requirementMatches",
    "riskFactors",
    "topPriorities",
    "roadmap30Days",
    "evidenceOfCompetenceSuggestions",
    "cvImprovementPrompt",
    "applicationMessage",
    "interviewPreparation",
    "disclaimer",
  ],
};

export class GeminiProvider implements AIProvider {
  #client: GoogleGenAI | null = null;
  readonly #apiKey?: string;

  constructor(
    apiKey?: string,
    private readonly requestTimeoutMs = 45_000,
    private readonly modelName = "gemini-3.5-flash",
  ) {
    this.#apiKey = apiKey;
  }

  isConfigured(): boolean {
    return Boolean(this.#apiKey);
  }

  async analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<JobReadinessAnalysis> {
    if (!this.#apiKey) {
      throw new AppError(
        "PROVIDER_NOT_CONFIGURED",
        503,
        "Live analysis is unavailable because the AI provider is not configured.",
      );
    }

    try {
      const prompt = buildAnalysisPrompt(request);
      const response = await this.getClient().models.generateContent({
        model: this.modelName,
        contents: prompt.userPrompt,
        config: {
          systemInstruction: prompt.systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          // Low variation is intentional: repeated evaluations of the same
          // evidence should produce a stable advisory result. Gemini treats a
          // fixed seed as best effort rather than an absolute guarantee.
          temperature: 0,
          seed: 20_260_811,
          abortSignal: options.signal,
          httpOptions: {
            timeout: this.requestTimeoutMs,
          },
        },
      });

      if (!response.text) {
        throw new AppError(
          "PROVIDER_RESPONSE_INVALID",
          502,
          "The analysis provider returned an invalid response.",
          { logMessage: "Gemini returned an empty response." },
        );
      }

      return parseJobReadinessResponse(response.text);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      }

      if (
        error instanceof Error &&
        /timed?\s*out|timeout/i.test(`${error.name} ${error.message}`)
      ) {
        throw new AppError(
          "PROVIDER_TIMEOUT",
          504,
          "The analysis provider took too long to respond. Please try again.",
          {
            cause: error,
            logMessage: "Gemini request timed out.",
          },
        );
      }

      throw new AppError(
        "PROVIDER_REQUEST_FAILED",
        502,
        "The analysis provider could not complete the request.",
        {
          cause: error,
          logMessage: "Gemini request failed.",
        },
      );
    }
  }

  private getClient(): GoogleGenAI {
    if (!this.#client) {
      this.#client = new GoogleGenAI({
        apiKey: this.#apiKey!,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }

    return this.#client;
  }
}
