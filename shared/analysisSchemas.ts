import { z } from "zod";

const MAX_LIST_ITEMS = 30;
const MAX_PROFILE_LIST_ITEM_LENGTH = 120;
const MAX_ANALYSIS_LIST_ITEM_LENGTH = 1_000;
const MAX_ANALYSIS_LIST_ITEMS = 30;
const MAX_ROADMAP_ITEMS_PER_WEEK = 20;
const MAX_REQUIREMENT_MATCHES = 20;
const INTERVIEW_PREPARATION_ITEM_COUNT = 4;

const requiredText = (fieldName: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required`)
    .max(maxLength, `${fieldName} must be ${maxLength} characters or fewer`);

const optionalText = (fieldName: string, maxLength: number) =>
  requiredText(fieldName, maxLength).optional();

const profileList = (fieldName: string) =>
  z
    .array(requiredText(`${fieldName} item`, MAX_PROFILE_LIST_ITEM_LENGTH))
    .max(MAX_LIST_ITEMS, `${fieldName} must contain at most ${MAX_LIST_ITEMS} items`);

const analysisList = (fieldName: string, maxItems = MAX_ANALYSIS_LIST_ITEMS) =>
  z
    .array(requiredText(`${fieldName} item`, MAX_ANALYSIS_LIST_ITEM_LENGTH))
    .max(maxItems, `${fieldName} must contain at most ${maxItems} items`);

export const JobFieldSchema = z.enum([
  "it_digital",
  "data_ai",
  "cyber_network",
  "product_design",
  "administration",
  "human_resources",
  "project_quality",
  "customer_service",
  "sales_marketing",
  "retail_commerce",
  "operations_logistics",
  "transportation",
  "security_cleaning",
  "hospitality",
  "culinary",
  "health_care",
  "social_community",
  "automotive",
  "manufacturing",
  "construction",
  "electrical_refrigeration",
  "agriculture_environment",
  "creative_services",
  "media_events",
  "technical_vocational",
  "education_training",
  "finance_accounting",
  "legal_public_service",
  "other",
]);

export const TrainingSourceTypeSchema = z.enum([
  "government",
  "private_bootcamp",
  "school_university",
  "company",
  "community_nonprofit",
  "independent",
  "other",
]);

export const OutputLanguageSchema = z.enum(["id", "en"]);

export const VerdictSchema = z.enum([
  "APPLY_NOW",
  "APPLY_WITH_IMPROVEMENTS",
  "NOT_READY_YET",
]);

export const RequirementPrioritySchema = z.enum([
  "MUST_HAVE",
  "NICE_TO_HAVE",
]);

export const RequirementStatusSchema = z.enum([
  "MATCHED",
  "PARTIAL",
  "NOT_EVIDENCED",
]);

export const CareerProfileV2Schema = z
  .object({
    targetJobField: JobFieldSchema,
    targetRole: requiredText("Target role", 120),
    educationBackground: requiredText("Education background", 2_000),
    trainingSourceType: TrainingSourceTypeSchema.optional(),
    trainingProvider: optionalText("Training provider", 160),
    trainingProgram: optionalText("Training program", 200),
    workExperience: optionalText("Work experience", 4_000),
    internshipOrOrganizationalExperience: optionalText(
      "Internship or organizational experience",
      4_000,
    ),
    mainSkills: profileList("Main skills").min(
      1,
      "Main skills must contain at least one item",
    ),
    toolsOrEquipment: profileList("Tools or equipment").optional(),
    responsibilities: optionalText("Responsibilities", 4_000),
    achievements: optionalText("Achievements", 3_000),
    certificationsOrTraining: optionalText("Certifications or training", 3_000),
    personalStrengths: profileList("Personal strengths").optional(),
    applicationChallenge: optionalText("Application challenge", 2_000),
    evidenceOrProjects: optionalText("Evidence or projects", 4_000),
    preferredOutputLanguage: OutputLanguageSchema,
  })
  .strict()
  .refine(
    (profile) =>
      Boolean(
        profile.workExperience ||
          profile.internshipOrOrganizationalExperience ||
          profile.responsibilities ||
          profile.evidenceOrProjects,
      ),
    {
      message:
        "Provide at least one meaningful source of experience or evidence: work experience, internship or organizational experience, responsibilities, or evidence or projects",
      path: ["workExperience"],
    },
  );

export const AnalyzeJobReadinessRequestSchema = z
  .object({
    profile: CareerProfileV2Schema,
    jobPosting: requiredText("Job posting", 12_000),
  })
  .strict();

const RoadmapWeekSchema = analysisList(
  "Roadmap week",
  MAX_ROADMAP_ITEMS_PER_WEEK,
).min(2, "Each roadmap week must contain at least two actions");

export const Roadmap30DaysSchema = z
  .object({
    week1: RoadmapWeekSchema,
    week2: RoadmapWeekSchema,
    week3: RoadmapWeekSchema,
    week4: RoadmapWeekSchema,
  })
  .strict();

const ScoreDimensionSchema = (label: string, maximum: number) =>
  z
    .object({
      score: z.number().int().min(0).max(maximum),
      maxScore: z.literal(maximum),
      rationale: requiredText(`${label} rationale`, 2_000),
    })
    .strict();

export const ScoreBreakdownSchema = z
  .object({
    mustHaveAlignment: ScoreDimensionSchema("Must-have alignment", 40),
    skillsAlignment: ScoreDimensionSchema("Skills alignment", 25),
    experienceEvidence: ScoreDimensionSchema("Experience evidence", 20),
    educationTraining: ScoreDimensionSchema("Education and training", 10),
    practicalReadiness: ScoreDimensionSchema("Practical readiness", 5),
  })
  .strict();

export const RequirementMatchSchema = z
  .object({
    requirement: requiredText("Requirement", 1_000),
    priority: RequirementPrioritySchema,
    status: RequirementStatusSchema,
    evidence: requiredText("Requirement evidence", 2_000),
    recommendation: requiredText("Requirement recommendation", 2_000),
  })
  .strict();

export const InterviewPreparationSchema = z
  .object({
    question: requiredText("Interview question", 1_000),
    whyItIsAsked: requiredText("Interview question purpose", 2_000),
    answerOutline: requiredText("Interview answer outline", 3_000),
  })
  .strict();

export const JobReadinessAnalysisSchema = z
  .object({
    matchScore: z.number().int().min(0).max(100),
    scoreBreakdown: ScoreBreakdownSchema,
    verdict: VerdictSchema,
    readinessSummary: requiredText("Readiness summary", 4_000),
    candidateStrengths: analysisList("Candidate strengths").min(
      1,
      "Candidate strengths must contain at least one evidence-grounded item",
    ),
    mainGaps: analysisList("Main gaps"),
    requirementMatches: z
      .array(RequirementMatchSchema)
      .max(
        MAX_REQUIREMENT_MATCHES,
        `Requirement matches must contain at most ${MAX_REQUIREMENT_MATCHES} items`,
      ),
    riskFactors: analysisList("Risk factors"),
    topPriorities: analysisList("Top priorities", 5).min(
      2,
      "Top priorities must contain at least two items",
    ),
    roadmap30Days: Roadmap30DaysSchema,
    evidenceOfCompetenceSuggestions: analysisList(
      "Evidence of competence suggestions",
    ),
    cvImprovementPrompt: requiredText("CV improvement prompt", 8_000),
    applicationMessage: requiredText("Application message", 4_000),
    interviewPreparation: z
      .array(InterviewPreparationSchema)
      .length(
        INTERVIEW_PREPARATION_ITEM_COUNT,
        `Interview preparation must contain exactly ${INTERVIEW_PREPARATION_ITEM_COUNT} items`,
      ),
    disclaimer: requiredText("Disclaimer", 2_000),
  })
  .strict()
  .superRefine((analysis, context) => {
    const expectedVerdict =
      analysis.matchScore >= 75
        ? "APPLY_NOW"
        : analysis.matchScore >= 50
          ? "APPLY_WITH_IMPROVEMENTS"
          : "NOT_READY_YET";

    if (analysis.verdict !== expectedVerdict) {
      context.addIssue({
        code: "custom",
        path: ["verdict"],
        message: "Verdict must match the match score range",
      });
    }

    const componentTotal = Object.values(analysis.scoreBreakdown).reduce(
      (total, component) => total + component.score,
      0,
    );

    if (componentTotal !== analysis.matchScore) {
      context.addIssue({
        code: "custom",
        path: ["scoreBreakdown"],
        message: "Score breakdown total must equal the match score",
      });
    }
  });

export type JobField = z.infer<typeof JobFieldSchema>;
export type TrainingSourceType = z.infer<typeof TrainingSourceTypeSchema>;
export type OutputLanguage = z.infer<typeof OutputLanguageSchema>;
export type Verdict = z.infer<typeof VerdictSchema>;
export type RequirementPriority = z.infer<typeof RequirementPrioritySchema>;
export type RequirementStatus = z.infer<typeof RequirementStatusSchema>;
export type CareerProfileV2 = z.infer<typeof CareerProfileV2Schema>;
export type AnalyzeJobReadinessRequest = z.infer<
  typeof AnalyzeJobReadinessRequestSchema
>;
export type Roadmap30Days = z.infer<typeof Roadmap30DaysSchema>;
export type ScoreBreakdown = z.infer<typeof ScoreBreakdownSchema>;
export type RequirementMatch = z.infer<typeof RequirementMatchSchema>;
export type InterviewPreparation = z.infer<
  typeof InterviewPreparationSchema
>;
export type JobReadinessAnalysis = z.infer<
  typeof JobReadinessAnalysisSchema
>;
