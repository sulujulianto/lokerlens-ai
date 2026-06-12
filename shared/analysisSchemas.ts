import { z } from "zod";

const MAX_LIST_ITEMS = 30;
const MAX_PROFILE_LIST_ITEM_LENGTH = 120;
const MAX_ANALYSIS_LIST_ITEM_LENGTH = 1_000;
const MAX_ANALYSIS_LIST_ITEMS = 30;
const MAX_ROADMAP_ITEMS_PER_WEEK = 20;

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
  "administration",
  "customer_service",
  "sales_marketing",
  "operations_logistics",
  "hospitality",
  "technical_vocational",
  "education_training",
  "finance_accounting",
  "other",
]);

export const OutputLanguageSchema = z.enum(["id", "en"]);

export const VerdictSchema = z.enum([
  "APPLY_NOW",
  "APPLY_WITH_IMPROVEMENTS",
  "NOT_READY_YET",
]);

export const CareerProfileV2Schema = z
  .object({
    targetJobField: JobFieldSchema,
    targetRole: requiredText("Target role", 120),
    educationBackground: requiredText("Education background", 2_000),
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
);

export const Roadmap30DaysSchema = z
  .object({
    week1: RoadmapWeekSchema,
    week2: RoadmapWeekSchema,
    week3: RoadmapWeekSchema,
    week4: RoadmapWeekSchema,
  })
  .strict();

export const JobReadinessAnalysisSchema = z
  .object({
    matchScore: z.number().int().min(0).max(100),
    verdict: VerdictSchema,
    readinessSummary: requiredText("Readiness summary", 4_000),
    candidateStrengths: analysisList("Candidate strengths"),
    mainGaps: analysisList("Main gaps"),
    mustHaveRequirements: analysisList("Must-have requirements"),
    niceToHaveRequirements: analysisList("Nice-to-have requirements"),
    riskFactors: analysisList("Risk factors"),
    roadmap30Days: Roadmap30DaysSchema,
    evidenceOfCompetenceSuggestions: analysisList(
      "Evidence of competence suggestions",
    ),
    cvMaterialSuggestions: analysisList("CV material suggestions"),
    applicationMessage: requiredText("Application message", 4_000),
    possibleInterviewQuestions: analysisList("Possible interview questions"),
    disclaimer: requiredText("Disclaimer", 2_000),
  })
  .strict();

export type JobField = z.infer<typeof JobFieldSchema>;
export type OutputLanguage = z.infer<typeof OutputLanguageSchema>;
export type Verdict = z.infer<typeof VerdictSchema>;
export type CareerProfileV2 = z.infer<typeof CareerProfileV2Schema>;
export type AnalyzeJobReadinessRequest = z.infer<
  typeof AnalyzeJobReadinessRequestSchema
>;
export type Roadmap30Days = z.infer<typeof Roadmap30DaysSchema>;
export type JobReadinessAnalysis = z.infer<
  typeof JobReadinessAnalysisSchema
>;
