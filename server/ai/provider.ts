import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";

export interface AIProvider {
  analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
  ): Promise<JobReadinessAnalysis>;

  isConfigured(): boolean;
}
