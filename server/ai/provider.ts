import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";

export interface AIProvider {
  analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
    options?: { signal?: AbortSignal },
  ): Promise<JobReadinessAnalysis>;

  isConfigured(): boolean;
}
