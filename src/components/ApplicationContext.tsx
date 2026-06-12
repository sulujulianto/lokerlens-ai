import type { ProfileFormValues } from "../form/profileForm";

interface ApplicationContextProps {
  values: ProfileFormValues;
  disabled: boolean;
  onChange: <K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100";

export function ApplicationContext({
  values,
  disabled,
  onChange,
}: ApplicationContextProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-extrabold text-slate-900">
        D. Konteks lamaran
      </h3>
      <p className="mb-3 mt-1 text-xs text-slate-500">
        Jelaskan hambatan utama lalu tempel teks lowongan yang ingin
        dibandingkan.
      </p>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="applicationChallenge"
            className="mb-1 block text-xs font-bold text-slate-700"
          >
            Tantangan utama saat melamar{" "}
            <span className="font-normal text-slate-400">(Opsional)</span>
          </label>
          <textarea
            id="applicationChallenge"
            rows={2}
            className={inputClass}
            value={values.applicationChallenge}
            disabled={disabled}
            placeholder="Contoh: belum punya pengalaman formal atau kurang percaya diri saat wawancara."
            onChange={(event) =>
              onChange("applicationChallenge", event.target.value)
            }
          />
        </div>
        <div>
          <label
            htmlFor="jobPosting"
            className="mb-1 block text-xs font-bold text-slate-700"
          >
            Teks lowongan <span className="text-indigo-600">*</span>
          </label>
          <textarea
            id="jobPosting"
            rows={12}
            className={`${inputClass} font-mono text-xs leading-relaxed`}
            value={values.jobPosting}
            disabled={disabled}
            placeholder="Salin dan tempel tanggung jawab serta persyaratan lowongan di sini."
            onChange={(event) => onChange("jobPosting", event.target.value)}
          />
          <p className="mt-1 text-right text-[10px] text-slate-400">
            {values.jobPosting.length.toLocaleString("id-ID")} / 12.000
            karakter
          </p>
        </div>
      </div>
    </section>
  );
}
