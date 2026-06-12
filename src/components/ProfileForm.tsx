import type { ReactNode } from "react";
import type { JobField, OutputLanguage } from "../../shared/analysisSchemas";
import type {
  ProfileFormErrors,
  ProfileFormValues,
} from "../form/profileForm";
import { jobFieldOptions } from "../jobFields";

interface ProfileFormProps {
  values: ProfileFormValues;
  disabled: boolean;
  errors?: ProfileFormErrors;
  onChange: <K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) => void;
}

const inputClass =
  "min-h-11 w-full max-w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-600";
const labelClass = "mb-1 block text-xs font-bold text-slate-700";

export function ProfileForm({
  values,
  disabled,
  errors = {},
  onChange,
}: ProfileFormProps) {
  const accessibility = (id: keyof ProfileFormValues, hasHint = false) => ({
    "aria-invalid": Boolean(errors[id]),
    "aria-describedby":
      [hasHint ? `${id}-hint` : "", errors[id] ? `${id}-error` : ""]
        .filter(Boolean)
        .join(" ") || undefined,
  });

  return (
    <div className="space-y-4">
      <FormSection
        id="target-job-section"
        title="A. Target pekerjaan"
        description="Tentukan bidang dan peran yang ingin dibandingkan dengan lowongan."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="targetJobField" label="Bidang pekerjaan" required error={errors.targetJobField}>
            <select
              id="targetJobField"
              aria-required="true"
              {...accessibility("targetJobField")}
              className={inputClass}
              value={values.targetJobField}
              disabled={disabled}
              onChange={(event) =>
                onChange("targetJobField", event.target.value as JobField)
              }
            >
              {jobFieldOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="targetRole" label="Peran yang ditargetkan" required error={errors.targetRole}>
            <input
              id="targetRole"
              aria-required="true"
              {...accessibility("targetRole")}
              className={inputClass}
              value={values.targetRole}
              disabled={disabled}
              placeholder="Contoh: Staf Administrasi Junior"
              onChange={(event) => onChange("targetRole", event.target.value)}
            />
          </Field>
        </div>
        <Field id="preferredOutputLanguage" label="Bahasa hasil" required error={errors.preferredOutputLanguage}>
          <select
            id="preferredOutputLanguage"
            aria-required="true"
            {...accessibility("preferredOutputLanguage")}
            className={inputClass}
            value={values.preferredOutputLanguage}
            disabled={disabled}
            onChange={(event) =>
              onChange(
                "preferredOutputLanguage",
                event.target.value as OutputLanguage,
              )
            }
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </Field>
        <p className="text-xs text-slate-500">
          Panduan paling mendalam saat ini tersedia untuk IT & Digital,
          Administrasi, Customer Service, serta Operasional/Gudang/Logistik.
        </p>
      </FormSection>

      <FormSection
        id="background-section"
        title="B. Latar belakang"
        description="Pengalaman formal tidak wajib. Pengalaman organisasi dan informal tetap bernilai."
      >
        <Field id="educationBackground" label="Pendidikan atau latar belakang" required error={errors.educationBackground}>
          <textarea
            id="educationBackground"
            aria-required="true"
            {...accessibility("educationBackground")}
            rows={2}
            className={inputClass}
            value={values.educationBackground}
            disabled={disabled}
            placeholder="Jurusan, pelatihan, atau cara Anda mempelajari bidang ini."
            onChange={(event) =>
              onChange("educationBackground", event.target.value)
            }
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="workExperience" label="Pengalaman kerja" optional error={errors.workExperience}>
            <textarea
              id="workExperience"
              {...accessibility("workExperience")}
              rows={3}
              className={inputClass}
              value={values.workExperience}
              disabled={disabled}
              placeholder="Termasuk kerja informal atau membantu usaha keluarga."
              onChange={(event) =>
                onChange("workExperience", event.target.value)
              }
            />
          </Field>
          <Field id="internshipOrOrganizationalExperience" label="Magang atau pengalaman organisasi" optional error={errors.internshipOrOrganizationalExperience}>
            <textarea
              id="internshipOrOrganizationalExperience"
              {...accessibility("internshipOrOrganizationalExperience")}
              rows={3}
              className={inputClass}
              value={values.internshipOrOrganizationalExperience}
              disabled={disabled}
              placeholder="Panitia, organisasi sekolah, relawan, atau magang."
              onChange={(event) =>
                onChange(
                  "internshipOrOrganizationalExperience",
                  event.target.value,
                )
              }
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        id="skills-evidence-section"
        title="C. Keahlian dan bukti praktis"
        description="Tuliskan apa yang benar-benar pernah Anda gunakan atau kerjakan."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            id="mainSkills"
            label="Keahlian utama"
            hint="Pisahkan dengan koma atau baris baru"
            required
            error={errors.mainSkills}
          >
            <textarea
              id="mainSkills"
              aria-required="true"
              {...accessibility("mainSkills", true)}
              rows={3}
              className={inputClass}
              value={values.mainSkills}
              disabled={disabled}
              placeholder="Contoh: Data entry, komunikasi pelanggan, React"
              onChange={(event) => onChange("mainSkills", event.target.value)}
            />
          </Field>
          <Field
            id="toolsOrEquipment"
            label="Alat atau perlengkapan"
            hint="Pisahkan dengan koma atau baris baru"
            optional
            error={errors.toolsOrEquipment}
          >
            <textarea
              id="toolsOrEquipment"
              {...accessibility("toolsOrEquipment", true)}
              rows={3}
              className={inputClass}
              value={values.toolsOrEquipment}
              disabled={disabled}
              placeholder="Excel, mesin kasir, alat ukur, Git"
              onChange={(event) =>
                onChange("toolsOrEquipment", event.target.value)
              }
            />
          </Field>
        </div>
        <Field id="responsibilities" label="Tanggung jawab atau tugas yang pernah dilakukan" optional error={errors.responsibilities}>
          <textarea
            id="responsibilities"
            {...accessibility("responsibilities")}
            rows={3}
            className={inputClass}
            value={values.responsibilities}
            disabled={disabled}
            placeholder="Ceritakan tugas nyata, meskipun bukan pekerjaan formal."
            onChange={(event) =>
              onChange("responsibilities", event.target.value)
            }
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="achievements" label="Pencapaian" optional error={errors.achievements}>
            <textarea
              id="achievements"
              {...accessibility("achievements")}
              rows={2}
              className={inputClass}
              value={values.achievements}
              disabled={disabled}
              onChange={(event) =>
                onChange("achievements", event.target.value)
              }
            />
          </Field>
          <Field id="certificationsOrTraining" label="Pelatihan atau sertifikasi" optional error={errors.certificationsOrTraining}>
            <textarea
              id="certificationsOrTraining"
              {...accessibility("certificationsOrTraining")}
              rows={2}
              className={inputClass}
              value={values.certificationsOrTraining}
              disabled={disabled}
              onChange={(event) =>
                onChange("certificationsOrTraining", event.target.value)
              }
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            id="personalStrengths"
            label="Kekuatan pribadi"
            hint="Pisahkan dengan koma atau baris baru"
            optional
            error={errors.personalStrengths}
          >
            <textarea
              id="personalStrengths"
              {...accessibility("personalStrengths", true)}
              rows={2}
              className={inputClass}
              value={values.personalStrengths}
              disabled={disabled}
              onChange={(event) =>
                onChange("personalStrengths", event.target.value)
              }
            />
          </Field>
          <Field id="evidenceOrProjects" label="Bukti kompetensi atau proyek" optional error={errors.evidenceOrProjects}>
            <textarea
              id="evidenceOrProjects"
              {...accessibility("evidenceOrProjects")}
              rows={2}
              className={inputClass}
              value={values.evidenceOrProjects}
              disabled={disabled}
              placeholder="Contoh kerja, checklist, laporan, skrip layanan, atau proyek."
              onChange={(event) =>
                onChange("evidenceOrProjects", event.target.value)
              }
            />
          </Field>
        </div>
        <p className="rounded-md bg-indigo-50 p-2 text-xs text-indigo-900">
          Wajib isi minimal satu: pengalaman kerja, magang/organisasi,
          tanggung jawab, atau bukti/proyek.
        </p>
      </FormSection>
    </div>
  );
}

function FormSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h3 id={`${id}-title`} className="text-sm font-extrabold text-slate-900">
        {title}
      </h3>
      <p className="mb-3 mt-1 text-xs text-slate-500">{description}</p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  optional,
  error,
  children,
}: {
  id: keyof ProfileFormValues;
  label: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className={labelClass}>
          {label}{" "}
          <span className="font-normal text-slate-500">
            {required ? "(Wajib)" : optional ? "(Opsional)" : ""}
          </span>
        </label>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mb-1 text-xs text-slate-600">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs font-semibold text-rose-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
