import type {
  JobReadinessAnalysis,
  Verdict,
} from "../../shared/analysisSchemas";

export interface LegacyAnalysisResponse {
  matchScore: number;
  verdict: string;
  summary: string;
  strengths: string[];
  missingSkills: string[];
  mustHaveRequirements: string[];
  niceToHaveRequirements: string[];
  risks: string[];
  roadmap30Days: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
  };
  portfolioSuggestions: string[];
  cvBulletSuggestions: string[];
  applicationMessage: string;
  disclaimer: string;
}

const LEGACY_VERDICTS: Record<Verdict, string> = {
  APPLY_NOW: "Apply now",
  APPLY_WITH_IMPROVEMENTS: "Apply with improvements",
  NOT_READY_YET: "Not ready yet",
};

// Temporary migration adapter. Remove after the result dashboard uses V2 fields.
export function adaptToLegacyAnalysisResponse(
  analysis: JobReadinessAnalysis,
): LegacyAnalysisResponse {
  return {
    matchScore: analysis.matchScore,
    verdict: LEGACY_VERDICTS[analysis.verdict],
    summary: analysis.readinessSummary,
    strengths: analysis.candidateStrengths,
    missingSkills: analysis.mainGaps,
    mustHaveRequirements: analysis.mustHaveRequirements,
    niceToHaveRequirements: analysis.niceToHaveRequirements,
    risks: analysis.riskFactors,
    roadmap30Days: analysis.roadmap30Days,
    portfolioSuggestions: analysis.evidenceOfCompetenceSuggestions,
    cvBulletSuggestions: analysis.cvMaterialSuggestions,
    applicationMessage: analysis.applicationMessage,
    disclaimer: analysis.disclaimer,
  };
}
