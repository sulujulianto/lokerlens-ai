import { Layers, Sparkles } from "lucide-react";

export function AnalysisActions({
  analysisAvailable,
  healthChecked,
  isLoading,
  demoAvailable = true,
  onDemo,
}: {
  analysisAvailable: boolean;
  healthChecked: boolean;
  isLoading: boolean;
  demoAvailable?: boolean;
  onDemo: () => void;
}) {
  return (
    <section
      aria-labelledby="analysis-actions-title"
      className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <h3 id="analysis-actions-title" className="sr-only">
        Pilihan analisis
      </h3>
      <button
        type="submit"
        data-testid="live-analysis-button"
        disabled={isLoading || !analysisAvailable}
        aria-describedby={
          !analysisAvailable && healthChecked
            ? "analysis-unavailable-description"
            : undefined
        }
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(79,70,229,0.22)] hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-600"
      >
        <Sparkles size={16} aria-hidden="true" />
        {isLoading ? "Analisis sedang diproses" : "Analisis kesiapan kerja"}
      </button>
      {!analysisAvailable && healthChecked && (
        <p
          id="analysis-unavailable-description"
          className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"
        >
          Analisis langsung belum dikonfigurasi. Anda tetap dapat mempelajari
          alur dan hasil melalui empat demo offline.
        </p>
      )}
      <div className="my-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
        <span className="h-px flex-1 bg-slate-200" />
        Demo offline
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <button
        type="button"
        data-testid="demo-analysis-button"
        onClick={onDemo}
        disabled={isLoading || !demoAvailable}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-extrabold text-indigo-800 hover:border-indigo-400 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
      >
        <Layers size={16} aria-hidden="true" />
        {demoAvailable
          ? "Tampilkan hasil demo terpilih"
          : "Pilih skenario demo dahulu"}
      </button>
    </section>
  );
}
