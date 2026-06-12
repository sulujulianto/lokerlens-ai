import type { ReactNode } from "react";
import type { JobField, OutputLanguage } from "../../shared/analysisSchemas";
import type { ProfileFormValues } from "../form/profileForm";
import { jobFieldOptions } from "../jobFields";

interface ProfileFormProps {
  values: ProfileFormValues;
  disabled: boolean;
  onChange: <K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100";
const labelClass = "mb-1 block text-xs font-bold text-slate-700";

export function ProfileForm({
  values,
  disabled,
  onChange,
}: ProfileFormProps) {
  return (
    <div className="space-y-4">
      <FormSection
        title="A. Target pekerjaan"
        description="Tentukan bidang dan peran yang ingin dibandingkan dengan lowongan."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Bidang pekerjaan" required>
            <select
              id="targetJobField"
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
          <Field label="Peran yang ditargetkan" required>
            <input
              id="targetRole"
              className={inputClass}
              value={values.targetRole}
              disabled={disabled}
              placeholder="Contoh: Staf Administrasi Junior"
              onChange={(event) => onChange("targetRole", event.target.value)}
            />
          </Field>
        </div>
        <Field label="Bahasa hasil" required>
          <select
            id="preferredOutputLanguage"
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
        title="B. Latar belakang"
        description="Pengalaman formal tidak wajib. Pengalaman organisasi dan informal tetap bernilai."
      >
        <Field label="Pendidikan atau latar belakang" required>
          <textarea
            id="educationBackground"
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
          <Field label="Pengalaman kerja" optional>
            <textarea
              id="workExperience"
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
          <Field label="Magang atau pengalaman organisasi" optional>
            <textarea
              id="internshipOrOrganizationalExperience"
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
        title="C. Keahlian dan bukti praktis"
        description="Tuliskan apa yang benar-benar pernah Anda gunakan atau kerjakan."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Keahlian utama"
            hint="Pisahkan dengan koma atau baris baru"
            required
          >
            <textarea
              id="mainSkills"
              rows={3}
              className={inputClass}
              value={values.mainSkills}
              disabled={disabled}
              placeholder="Contoh: Data entry, komunikasi pelanggan, React"
              onChange={(event) => onChange("mainSkills", event.target.value)}
            />
          </Field>
          <Field
            label="Alat atau perlengkapan"
            hint="Pisahkan dengan koma atau baris baru"
            optional
          >
            <textarea
              id="toolsOrEquipment"
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
        <Field label="Tanggung jawab atau tugas yang pernah dilakukan" optional>
          <textarea
            id="responsibilities"
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
          <Field label="Pencapaian" optional>
            <textarea
              id="achievements"
              rows={2}
              className={inputClass}
              value={values.achievements}
              disabled={disabled}
              onChange={(event) =>
                onChange("achievements", event.target.value)
              }
            />
          </Field>
          <Field label="Pelatihan atau sertifikasi" optional>
            <textarea
              id="certificationsOrTraining"
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
            label="Kekuatan pribadi"
            hint="Pisahkan dengan koma atau baris baru"
            optional
          >
            <textarea
              id="personalStrengths"
              rows={2}
              className={inputClass}
              value={values.personalStrengths}
              disabled={disabled}
              onChange={(event) =>
                onChange("personalStrengths", event.target.value)
              }
            />
          </Field>
          <Field label="Bukti kompetensi atau proyek" optional>
            <textarea
              id="evidenceOrProjects"
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
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      <p className="mb-3 mt-1 text-xs text-slate-500">{description}</p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-2">
        <span className={labelClass}>
          {label} {required && <span className="text-indigo-600">*</span>}
        </span>
        <span className="text-[10px] text-slate-400">
          {hint ?? (optional ? "Opsional" : "")}
        </span>
      </div>
      {children}
    </label>
  );
}
