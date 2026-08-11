import {
  JobReadinessAnalysisSchema,
  type AnalyzeJobReadinessRequest,
  type JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import { findAnalysisQualityIssues } from "../ai/analysisQuality";
import type { AIProvider } from "../ai/provider";

export class JobReadinessService {
  constructor(private readonly provider: AIProvider) {}

  async analyze(
    request: AnalyzeJobReadinessRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<JobReadinessAnalysis> {
    const analysis = await this.provider.analyzeJobReadiness(request, options);
    const result = JobReadinessAnalysisSchema.safeParse(analysis);

    if (!result.success) {
      throw new AppError(
        "PROVIDER_RESPONSE_INVALID",
        502,
        "The analysis provider returned an invalid response.",
        { logMessage: "Provider returned an invalid service result." },
      );
    }

    const qualityIssues = findAnalysisQualityIssues(request, result.data);
    if (qualityIssues.length > 0) {
      throw new AppError(
        "PROVIDER_RESPONSE_INVALID",
        502,
        "The analysis provider returned an invalid response.",
        {
          logMessage: `Provider response failed quality validation: ${qualityIssues.join(" ")}`,
        },
      );
    }

    return result.data;
  }
}
