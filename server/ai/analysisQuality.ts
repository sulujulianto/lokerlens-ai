import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";

const INFORMAL_READER_PRONOUN = /\b(?:kamu|kalian)\b/i;
const ASSISTANT_PLURAL_PRONOUN = /\bkami\b/i;
const COMPLETION_EVIDENCE =
  /(?:lulus|alumni|menyelesaikan|selesai|bersertifikat|sertifikat|graduat|complet|certif).{0,60}(?:pelatihan|training|bootcamp|ppkd|bbpvp|blk|program)|(?:pelatihan|training|bootcamp|ppkd|bbpvp|blk|program).{0,60}(?:lulus|alumni|menyelesaikan|selesai|bersertifikat|sertifikat|graduat|complet|certif)/i;
const COMPLETION_CLAIMS = [
  /\b(?:sebagai|merupakan)\s+(?:seorang\s+)?alumni\b/gi,
  /\balumni\s+(?:pelatihan|program|bootcamp|ppkd|bbpvp|blk)\b/gi,
  /\blulusan\s+(?:pelatihan|program|bootcamp|ppkd|bbpvp|blk)\b/gi,
  /\b(?:telah|sudah)\s+(?:lulus|menyelesaikan)\s+(?:dari\s+)?(?:pelatihan|program|bootcamp)\b/gi,
  /\b(?:telah|sudah)\s+bersertifikat\b/gi,
  /\b(?:memiliki|memegang)\s+sertifikat\b/gi,
];
const NEGATION_NEAR_CLAIM = /\b(?:belum|tidak|bukan|tanpa|jangan|hindari)\b/i;

function advisoryText(analysis: JobReadinessAnalysis): string {
  return [
    analysis.readinessSummary,
    ...analysis.candidateStrengths,
    ...analysis.mainGaps,
    ...Object.values(analysis.scoreBreakdown).map((item) => item.rationale),
    ...analysis.requirementMatches.flatMap((item) => [
      item.evidence,
      item.recommendation,
    ]),
    ...analysis.riskFactors,
    ...analysis.topPriorities,
    ...Object.values(analysis.roadmap30Days).flat(),
    ...analysis.evidenceOfCompetenceSuggestions,
    analysis.cvImprovementPrompt,
    analysis.applicationMessage,
    ...analysis.interviewPreparation.flatMap((item) => [
      item.question,
      item.whyItIsAsked,
      item.answerOutline,
    ]),
    analysis.disclaimer,
  ].join("\n");
}

function claimBearingText(analysis: JobReadinessAnalysis): string {
  return [
    analysis.readinessSummary,
    ...analysis.candidateStrengths,
    ...Object.values(analysis.scoreBreakdown).map((item) => item.rationale),
    ...analysis.requirementMatches.map((item) => item.evidence),
    analysis.applicationMessage,
  ].join("\n");
}

export function profileSupportsTrainingCompletion(
  request: AnalyzeJobReadinessRequest,
): boolean {
  const profileEvidence = [
    request.profile.workExperience,
    request.profile.internshipOrOrganizationalExperience,
    request.profile.achievements,
    request.profile.certificationsOrTraining,
    request.profile.evidenceOrProjects,
  ]
    .filter(Boolean)
    .join("\n");

  return COMPLETION_EVIDENCE.test(profileEvidence);
}

function containsUnsupportedCompletionClaim(text: string): boolean {
  return COMPLETION_CLAIMS.some((pattern) => {
    pattern.lastIndex = 0;
    let match = pattern.exec(text);

    while (match) {
      const prefix = text.slice(Math.max(0, match.index - 32), match.index);
      if (!NEGATION_NEAR_CLAIM.test(prefix)) return true;
      match = pattern.exec(text);
    }

    return false;
  });
}

export function findAnalysisQualityIssues(
  request: AnalyzeJobReadinessRequest,
  analysis: JobReadinessAnalysis,
): string[] {
  const issues: string[] = [];

  if (request.profile.preferredOutputLanguage === "id") {
    const generatedText = advisoryText(analysis);

    if (INFORMAL_READER_PRONOUN.test(generatedText)) {
      issues.push("Indonesian output must address the reader as Anda.");
    }

    if (ASSISTANT_PLURAL_PRONOUN.test(generatedText)) {
      issues.push("Indonesian output must not speak on behalf of the assistant as kami.");
    }

    if (
      !profileSupportsTrainingCompletion(request) &&
      containsUnsupportedCompletionClaim(claimBearingText(analysis))
    ) {
      issues.push(
        "Training completion or certification claims require explicit profile evidence.",
      );
    }
  }

  return issues;
}
