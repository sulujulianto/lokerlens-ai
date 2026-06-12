import {
  AnalyzeJobReadinessRequestSchema,
  type AnalyzeJobReadinessRequest,
  type JobField,
  type OutputLanguage,
} from "../../shared/analysisSchemas";

export interface ProfileFormValues {
  targetJobField: JobField;
  targetRole: string;
  educationBackground: string;
  workExperience: string;
  internshipOrOrganizationalExperience: string;
  mainSkills: string;
  toolsOrEquipment: string;
  responsibilities: string;
  achievements: string;
  certificationsOrTraining: string;
  personalStrengths: string;
  applicationChallenge: string;
  evidenceOrProjects: string;
  preferredOutputLanguage: OutputLanguage;
  jobPosting: string;
}

export const emptyProfileForm: ProfileFormValues = {
  targetJobField: "it_digital",
  targetRole: "",
  educationBackground: "",
  workExperience: "",
  internshipOrOrganizationalExperience: "",
  mainSkills: "",
  toolsOrEquipment: "",
  responsibilities: "",
  achievements: "",
  certificationsOrTraining: "",
  personalStrengths: "",
  applicationChallenge: "",
  evidenceOrProjects: "",
  preferredOutputLanguage: "id",
  jobPosting: "",
};

export function normalizeListInput(value: string): string[] {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionalText(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function createAnalyzeRequest(values: ProfileFormValues) {
  return AnalyzeJobReadinessRequestSchema.safeParse({
    profile: {
      targetJobField: values.targetJobField,
      targetRole: values.targetRole,
      educationBackground: values.educationBackground,
      workExperience: optionalText(values.workExperience),
      internshipOrOrganizationalExperience: optionalText(
        values.internshipOrOrganizationalExperience,
      ),
      mainSkills: normalizeListInput(values.mainSkills),
      toolsOrEquipment:
        normalizeListInput(values.toolsOrEquipment).length > 0
          ? normalizeListInput(values.toolsOrEquipment)
          : undefined,
      responsibilities: optionalText(values.responsibilities),
      achievements: optionalText(values.achievements),
      certificationsOrTraining: optionalText(
        values.certificationsOrTraining,
      ),
      personalStrengths:
        normalizeListInput(values.personalStrengths).length > 0
          ? normalizeListInput(values.personalStrengths)
          : undefined,
      applicationChallenge: optionalText(values.applicationChallenge),
      evidenceOrProjects: optionalText(values.evidenceOrProjects),
      preferredOutputLanguage: values.preferredOutputLanguage,
    },
    jobPosting: values.jobPosting,
  });
}

export function formValuesFromRequest(
  request: AnalyzeJobReadinessRequest,
): ProfileFormValues {
  const profile = request.profile;
  return {
    targetJobField: profile.targetJobField,
    targetRole: profile.targetRole,
    educationBackground: profile.educationBackground,
    workExperience: profile.workExperience ?? "",
    internshipOrOrganizationalExperience:
      profile.internshipOrOrganizationalExperience ?? "",
    mainSkills: profile.mainSkills.join(", "),
    toolsOrEquipment: profile.toolsOrEquipment?.join(", ") ?? "",
    responsibilities: profile.responsibilities ?? "",
    achievements: profile.achievements ?? "",
    certificationsOrTraining: profile.certificationsOrTraining ?? "",
    personalStrengths: profile.personalStrengths?.join(", ") ?? "",
    applicationChallenge: profile.applicationChallenge ?? "",
    evidenceOrProjects: profile.evidenceOrProjects ?? "",
    preferredOutputLanguage: profile.preferredOutputLanguage,
    jobPosting: request.jobPosting,
  };
}

const fieldLabels: Record<string, string> = {
  targetJobField: "bidang pekerjaan",
  targetRole: "peran yang ditargetkan",
  educationBackground: "pendidikan atau latar belakang",
  mainSkills: "keahlian utama",
  jobPosting: "teks lowongan",
  workExperience: "pengalaman atau bukti praktis",
};

export function getFormErrorMessage(
  issues: { path: PropertyKey[]; message: string }[],
): string {
  const issue = issues[0];
  const field = String(issue?.path.at(-1) ?? "");

  if (
    issue?.message.includes("meaningful source of experience")
  ) {
    return "Isi minimal satu sumber pengalaman atau bukti: pengalaman kerja, magang/organisasi, tanggung jawab, atau bukti/proyek.";
  }

  return `Periksa ${fieldLabels[field] ?? "isian formulir"}: data wajib belum lengkap atau melebihi batas.`;
}
