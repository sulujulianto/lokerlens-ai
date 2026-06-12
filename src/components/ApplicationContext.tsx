import type {
  ProfileFormErrors,
  ProfileFormValues,
} from "../form/profileForm";

interface ApplicationContextProps {
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

export function ApplicationContext({
  values,
  disabled,
  errors = {},
  onChange,
}: ApplicationContextProps) {
  return (
    <section
      aria-labelledby="application-context-title"
      className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h3
        id="application-context-title"
        className="text-sm font-extrabold text-slate-900"
      >
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
            <span className="font-normal text-slate-500">(Opsional)</span>
          </label>
          <textarea
            id="applicationChallenge"
            aria-invalid={Boolean(errors.applicationChallenge)}
            aria-describedby={
              errors.applicationChallenge
                ? "applicationChallenge-error"
                : undefined
            }
            rows={2}
            className={inputClass}
            value={values.applicationChallenge}
            disabled={disabled}
            placeholder="Contoh: belum punya pengalaman formal atau kurang percaya diri saat wawancara."
            onChange={(event) =>
              onChange("applicationChallenge", event.target.value)
            }
          />
          {errors.applicationChallenge && (
            <p
              id="applicationChallenge-error"
              role="alert"
              className="mt-1 text-xs font-semibold text-rose-700"
            >
              {errors.applicationChallenge}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="jobPosting"
            className="mb-1 block text-xs font-bold text-slate-700"
          >
            Teks lowongan{" "}
            <span className="font-normal text-slate-500">(Wajib)</span>
          </label>
          <textarea
            id="jobPosting"
            aria-required="true"
            aria-invalid={Boolean(errors.jobPosting)}
            aria-describedby={`jobPosting-counter${
              errors.jobPosting ? " jobPosting-error" : ""
            }`}
            rows={12}
            className={`${inputClass} font-mono text-xs leading-relaxed`}
            value={values.jobPosting}
            disabled={disabled}
            placeholder="Salin dan tempel tanggung jawab serta persyaratan lowongan di sini."
            onChange={(event) => onChange("jobPosting", event.target.value)}
          />
          <p
            id="jobPosting-counter"
            className="mt-1 text-right text-xs text-slate-500"
          >
            {values.jobPosting.length.toLocaleString("id-ID")} / 12.000
            karakter
          </p>
          {errors.jobPosting && (
            <p
              id="jobPosting-error"
              role="alert"
              className="mt-1 text-xs font-semibold text-rose-700"
            >
              {errors.jobPosting}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
