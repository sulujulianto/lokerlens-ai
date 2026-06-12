import { GoogleGenAI, Type } from "@google/genai";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import { buildAnalysisPrompt } from "./promptBuilder";
import type { AIProvider } from "./provider";
import { parseJobReadinessResponse } from "./responseParser";

const MODEL_NAME = "gemini-3.5-flash";

const stringArraySchema = {
  type: Type.ARRAY,
  items: { type: Type.STRING },
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.INTEGER },
    verdict: {
      type: Type.STRING,
      enum: ["APPLY_NOW", "APPLY_WITH_IMPROVEMENTS", "NOT_READY_YET"],
    },
    readinessSummary: { type: Type.STRING },
    candidateStrengths: stringArraySchema,
    mainGaps: stringArraySchema,
    mustHaveRequirements: stringArraySchema,
    niceToHaveRequirements: stringArraySchema,
    riskFactors: stringArraySchema,
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
    cvMaterialSuggestions: stringArraySchema,
    applicationMessage: { type: Type.STRING },
    possibleInterviewQuestions: stringArraySchema,
    disclaimer: { type: Type.STRING },
  },
  required: [
    "matchScore",
    "verdict",
    "readinessSummary",
    "candidateStrengths",
    "mainGaps",
    "mustHaveRequirements",
    "niceToHaveRequirements",
    "riskFactors",
    "roadmap30Days",
    "evidenceOfCompetenceSuggestions",
    "cvMaterialSuggestions",
    "applicationMessage",
    "possibleInterviewQuestions",
    "disclaimer",
  ],
};

export class GeminiProvider implements AIProvider {
  #client: GoogleGenAI | null = null;
  readonly #apiKey?: string;

  constructor(apiKey?: string) {
    this.#apiKey = apiKey;
  }

  isConfigured(): boolean {
    return Boolean(this.#apiKey);
  }

  async analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
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
        model: MODEL_NAME,
        contents: prompt.userPrompt,
        config: {
          systemInstruction: prompt.systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.2,
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
