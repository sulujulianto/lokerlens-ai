import {
  JobReadinessAnalysisSchema,
  type AnalyzeJobReadinessRequest,
  type JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import type { AIProvider } from "../ai/provider";

export class JobReadinessService {
  constructor(private readonly provider: AIProvider) {}

  async analyze(
    request: AnalyzeJobReadinessRequest,
  ): Promise<JobReadinessAnalysis> {
    const analysis = await this.provider.analyzeJobReadiness(request);
    const result = JobReadinessAnalysisSchema.safeParse(analysis);

    if (!result.success) {
      throw new AppError(
        "PROVIDER_RESPONSE_INVALID",
        502,
        "The analysis provider returned an invalid response.",
        { logMessage: "Provider returned an invalid service result." },
      );
    }

    return result.data;
  }
}
