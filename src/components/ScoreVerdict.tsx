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
    NOT_READY_YET: "Belum Siap - Perkuat Fondasi Dahulu",
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
    <section className="grid gap-3 sm:grid-cols-[180px_1fr]">
      <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Skor keselarasan
        </span>
        <span className="mt-2 text-4xl font-black text-slate-900">
          {score}
          <span className="text-base text-slate-400">/100</span>
        </span>
        <span className="mt-1 text-center text-[10px] text-slate-500">
          Estimasi panduan, bukan peluang diterima
        </span>
      </div>
      <div className={`rounded-lg border p-5 shadow-sm ${tone}`}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">
          Kesimpulan kesiapan
        </span>
        <h2 className="mt-1 text-lg font-black">
          {getVerdictLabel(verdict, language)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed">{summary}</p>
      </div>
    </section>
  );
}
