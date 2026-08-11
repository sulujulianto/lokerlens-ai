import type {
  JobReadinessAnalysis,
  ScoreBreakdown,
  Verdict,
} from "./analysisSchemas";

function createScoreBreakdown(matchScore: number): ScoreBreakdown {
  let remaining = matchScore;
  const take = (maximum: number) => {
    const score = Math.min(remaining, maximum);
    remaining -= score;
    return score;
  };

  return {
    mustHaveAlignment: {
      score: take(40),
      maxScore: 40,
      rationale: "The stated must-have requirements are compared with supplied evidence.",
    },
    skillsAlignment: {
      score: take(25),
      maxScore: 25,
      rationale: "Relevant skills and tools are compared with the target role.",
    },
    experienceEvidence: {
      score: take(20),
      maxScore: 20,
      rationale: "Practical experience and evidence are assessed conservatively.",
    },
    educationTraining: {
      score: take(10),
      maxScore: 10,
      rationale: "Education and training are treated as learning context.",
    },
    practicalReadiness: {
      score: take(5),
      maxScore: 5,
      rationale: "Application readiness and material uncertainties are considered.",
    },
  };
}

function verdictForScore(matchScore: number): Verdict {
  return matchScore >= 75
    ? "APPLY_NOW"
    : matchScore >= 50
      ? "APPLY_WITH_IMPROVEMENTS"
      : "NOT_READY_YET";
}

export function createJobReadinessAnalysisFixture(
  overrides: Partial<JobReadinessAnalysis> = {},
): JobReadinessAnalysis {
  const matchScore = overrides.matchScore ?? 74;

  return {
    matchScore,
    scoreBreakdown:
      overrides.scoreBreakdown ?? createScoreBreakdown(matchScore),
    verdict: overrides.verdict ?? verdictForScore(matchScore),
    readinessSummary:
      overrides.readinessSummary ??
      "The candidate meets most entry-level requirements.",
    candidateStrengths: overrides.candidateStrengths ?? [
      "Relevant experience is supported by a concrete profile example.",
    ],
    mainGaps: overrides.mainGaps ?? [
      "One role-specific capability is not yet evidenced in the profile.",
    ],
    requirementMatches: overrides.requirementMatches ?? [
      {
        requirement: "Accurate data entry",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence: "The profile describes record maintenance and data checks.",
        recommendation: "Prepare one sanitized work sample for verification.",
      },
    ],
    riskFactors: overrides.riskFactors ?? [
      "One application detail should be confirmed before applying.",
    ],
    topPriorities: overrides.topPriorities ?? [
      "Prepare a verifiable work sample.",
      "Practice explaining the strongest evidence in an interview.",
    ],
    roadmap30Days: overrides.roadmap30Days ?? {
      week1: ["Review the role requirements.", "Document current evidence."],
      week2: ["Practice a relevant task.", "Check the output for errors."],
      week3: ["Create a work sample.", "Prepare a fact-grounded CV review prompt."],
      week4: ["Practice interview answers.", "Finalize an application package."],
    },
    evidenceOfCompetenceSuggestions:
      overrides.evidenceOfCompetenceSuggestions ?? [
        "Create a sanitized work sample with a short explanation.",
      ],
    cvImprovementPrompt:
      overrides.cvImprovementPrompt ??
      "Review the CV I attach for this role. Preserve every fact, mark missing details clearly, and never invent experience or metrics.",
    applicationMessage:
      overrides.applicationMessage ??
      "I am applying for this entry-level position.",
    interviewPreparation: overrides.interviewPreparation ?? [
      {
        question: "How do you prevent errors?",
        whyItIsAsked: "The role requires consistent attention to detail.",
        answerOutline: "Explain a real checking process from the supplied profile.",
      },
      {
        question: "How do you prioritize tasks?",
        whyItIsAsked: "The role may involve competing deadlines.",
        answerOutline: "Describe how urgency, impact, and communication guide priority.",
      },
      {
        question: "What evidence can you show for this role?",
        whyItIsAsked: "The interviewer needs to verify practical readiness.",
        answerOutline: "Reference only the supplied work sample or experience.",
      },
      {
        question: "Why are you interested in this role?",
        whyItIsAsked: "The interviewer wants to understand role motivation and fit.",
        answerOutline: "Connect the role to supplied experience and a realistic next step.",
      },
    ],
    disclaimer:
      overrides.disclaimer ??
      "This analysis is guidance and not a hiring guarantee.",
  };
}
