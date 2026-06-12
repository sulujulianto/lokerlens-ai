import { z } from "zod";
import {
  AnalyzeJobReadinessRequestSchema,
  type AnalyzeJobReadinessRequest,
} from "../../shared/analysisSchemas";
import { createValidationError } from "../errors";

const boundedLegacyText = (maxLength: number) =>
  z.string().trim().max(maxLength);

const LegacyAnalyzeRequestSchema = z
  .object({
    profile: z
      .object({
        education: boundedLegacyText(2_000),
        skills: boundedLegacyText(4_000),
        projects: boundedLegacyText(4_000),
        experience: boundedLegacyText(4_000),
        targetRole: boundedLegacyText(120),
        language: z.enum(["Indonesian", "English"]),
      })
      .strict(),
    jobPosting: boundedLegacyText(12_000),
  })
  .strict();

// Temporary migration adapter. Remove after the frontend submits V2 contracts.
export function adaptLegacyAnalyzeRequest(
  input: unknown,
): AnalyzeJobReadinessRequest {
  const legacyResult = LegacyAnalyzeRequestSchema.safeParse(input);
  if (!legacyResult.success) {
    throw createValidationError("The submitted candidate profile is invalid.");
  }

  const { profile, jobPosting } = legacyResult.data;
  const mainSkills = profile.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const normalizedResult = AnalyzeJobReadinessRequestSchema.safeParse({
    profile: {
      targetJobField: "it_digital",
      targetRole: profile.targetRole,
      educationBackground: profile.education,
      workExperience: profile.experience || undefined,
      mainSkills,
      evidenceOrProjects: profile.projects || undefined,
      preferredOutputLanguage:
        profile.language === "Indonesian" ? "id" : "en",
    },
    jobPosting,
  });

  if (!normalizedResult.success) {
    throw createValidationError(
      "The submitted profile needs a target role, education, skills, job posting, and at least one source of experience or evidence.",
    );
  }

  return normalizedResult.data;
}
