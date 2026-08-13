import { useId } from "react";
import type {
  InterviewPreparation,
  RequirementMatch,
  RequirementStatus,
  ScoreBreakdown,
} from "../../shared/analysisSchemas";

const scoreDimensions: Array<{
  key: keyof ScoreBreakdown;
  label: string;
}> = [
  { key: "mustHaveAlignment", label: "Persyaratan wajib" },
  { key: "skillsAlignment", label: "Keahlian & alat" },
  { key: "experienceEvidence", label: "Pengalaman & bukti" },
  { key: "educationTraining", label: "Pendidikan & pelatihan" },
  { key: "practicalReadiness", label: "Kesiapan praktis" },
];

const statusPresentation: Record<
  RequirementStatus,
  { label: string; className: string }
> = {
  MATCHED: {
    label: "Terpenuhi",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  PARTIAL: {
    label: "Sebagian",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  NOT_EVIDENCED: {
    label: "Belum terbukti",
    className: "border-rose-200 bg-rose-50 text-rose-800",
  },
};

export function ScoreBreakdownSection({
  breakdown,
}: {
  breakdown: ScoreBreakdown;
}) {
  return (
    <section
      aria-labelledby="score-breakdown-title"
      className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] sm:p-6"
    >
      <div className="max-w-3xl">
        <h3
          id="score-breakdown-title"
          className="text-sm font-extrabold uppercase tracking-[0.12em] text-indigo-700"
        >
          Dasar Perhitungan Skor
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Lima komponen berikut membentuk skor akhir. Nilainya menunjukkan
          keselarasan data yang diberikan, bukan peluang diterima kerja.
        </p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {scoreDimensions.map(({ key, label }) => {
          const dimension = breakdown[key];
          return (
            <article
              key={key}
              className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-xs font-bold text-slate-600">{label}</p>
              <p className="mt-1 text-2xl font-extrabold tracking-[-0.03em] text-slate-950">
                {dimension.score}
                <span className="text-sm text-slate-600">
                  /{dimension.maxScore}
                </span>
              </p>
              <p className="mt-2 break-words text-xs leading-5 text-slate-600 [overflow-wrap:anywhere]">
                {dimension.rationale}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function RequirementMatchesSection({
  matches,
}: {
  matches: RequirementMatch[];
}) {
  return (
    <section
      aria-labelledby="requirement-matches-title"
      className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] sm:p-6"
    >
      <h3
        id="requirement-matches-title"
        className="text-sm font-extrabold uppercase tracking-[0.12em] text-indigo-700"
      >
        Kecocokan dengan Persyaratan Lowongan
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Status “Belum terbukti” berarti informasinya belum terlihat di
        formulir, bukan berarti Anda tidak memiliki kemampuan tersebut.
      </p>
      {matches.length > 0 ? (
        <div className="mt-4 space-y-3">
          {matches.map((match, index) => {
            const presentation = statusPresentation[match.status];
            return (
              <article
                key={`${match.requirement}-${index}`}
                className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-indigo-600">
                      {match.priority === "MUST_HAVE"
                        ? "Persyaratan wajib"
                        : "Nilai tambah"}
                    </span>
                    <h4 className="mt-1 break-words text-sm font-extrabold text-slate-900 [overflow-wrap:anywhere]">
                      {match.requirement}
                    </h4>
                  </div>
                  <span
                    className={`w-fit shrink-0 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${presentation.className}`}
                  >
                    {presentation.label}
                  </span>
                </div>
                <dl className="mt-3 grid gap-3 text-xs leading-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-extrabold text-slate-700">
                      Bukti dari profil
                    </dt>
                    <dd className="mt-0.5 break-words text-slate-600 [overflow-wrap:anywhere]">
                      {match.evidence}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-extrabold text-slate-700">
                      Langkah berikutnya
                    </dt>
                    <dd className="mt-0.5 break-words text-slate-600 [overflow-wrap:anywhere]">
                      {match.recommendation}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 text-xs text-slate-400">
          Teks lowongan tidak menyatakan persyaratan yang cukup jelas untuk
          dicocokkan.
        </p>
      )}
    </section>
  );
}

export function InterviewPreparationSection({
  items,
}: {
  items: InterviewPreparation[];
}) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] sm:p-6"
    >
      <h3
        id={titleId}
        className="text-sm font-extrabold uppercase tracking-[0.12em] text-indigo-700"
      >
        Empat Pertanyaan untuk Latihan Wawancara
      </h3>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.question}-${index}`}
            className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-indigo-600">
              Pertanyaan {index + 1}
            </p>
            <h4 className="mt-1 break-words text-sm font-extrabold leading-6 text-slate-900 [overflow-wrap:anywhere]">
              {item.question}
            </h4>
            <dl className="mt-3 space-y-3 text-xs leading-5">
              <div>
                <dt className="font-extrabold text-slate-700">
                  Yang ingin dinilai
                </dt>
                <dd className="mt-0.5 break-words text-slate-600 [overflow-wrap:anywhere]">
                  {item.whyItIsAsked}
                </dd>
              </div>
              <div>
                <dt className="font-extrabold text-slate-700">
                  Kerangka jawaban
                </dt>
                <dd className="mt-0.5 break-words text-slate-600 [overflow-wrap:anywhere]">
                  {item.answerOutline}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
