import type {
  OutputLanguage,
  Verdict,
} from "../../shared/analysisSchemas";

const verdictLabels: Record<
  OutputLanguage,
  Record<Verdict, string>
> = {
  id: {
    APPLY_NOW: "Layak Melamar Sekarang",
    APPLY_WITH_IMPROVEMENTS: "Melamar Sambil Melakukan Perbaikan",
    NOT_READY_YET: "Belum Siap — Perkuat Fondasi Dahulu",
  },
  en: {
    APPLY_NOW: "Ready to Apply Now",
    APPLY_WITH_IMPROVEMENTS: "Apply While Making Improvements",
    NOT_READY_YET: "Not Ready Yet - Strengthen the Foundation",
  },
};

export function getVerdictLabel(
  verdict: Verdict,
  language: OutputLanguage,
): string {
  return verdictLabels[language][verdict];
}

export function ScoreVerdict({
  score,
  verdict,
  language,
  summary,
}: {
  score: number;
  verdict: Verdict;
  language: OutputLanguage;
  summary: string;
}) {
  const tone =
    verdict === "APPLY_NOW"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : verdict === "APPLY_WITH_IMPROVEMENTS"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : "border-rose-200 bg-rose-50 text-rose-950";

  return (
    <section
      aria-label="Skor dan kesimpulan kesiapan"
      className="grid min-w-0 gap-4 sm:grid-cols-[190px_minmax(0,1fr)]"
    >
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Skor keselarasan
        </span>
        <span className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-slate-950">
          {score}
          <span className="text-base text-slate-400">/100</span>
        </span>
        <span className="mt-1 text-center text-[10px] text-slate-500">
          Estimasi panduan, bukan peluang diterima
        </span>
      </div>
      <div
        className={`min-w-0 rounded-2xl border p-5 shadow-[0_12px_32px_rgba(37,58,51,0.06)] ${tone}`}
      >
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">
          Kesimpulan kesiapan
        </span>
        <h2 className="mt-1 text-xl font-extrabold tracking-[-0.02em]">
          {getVerdictLabel(verdict, language)}
        </h2>
        <p className="mt-2 break-words text-sm leading-relaxed [overflow-wrap:anywhere]">
          {summary}
        </p>
      </div>
    </section>
  );
}
