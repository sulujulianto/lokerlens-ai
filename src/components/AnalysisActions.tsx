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
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
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
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-3 text-sm font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-white"
      >
        <Sparkles size={16} aria-hidden="true" />
        {isLoading ? "Analisis sedang diproses" : "Analisis kesiapan kerja"}
      </button>
      {!analysisAvailable && healthChecked && (
        <p
          id="analysis-unavailable-description"
          className="mt-2 text-xs leading-relaxed text-slate-600"
        >
          Analisis langsung belum dikonfigurasi. Anda tetap dapat mempelajari
          alur dan hasil melalui empat demo offline.
        </p>
      )}
      <div className="my-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        Demo offline
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <button
        type="button"
        data-testid="demo-analysis-button"
        onClick={onDemo}
        disabled={isLoading || !demoAvailable}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        <Layers size={16} aria-hidden="true" />
        {demoAvailable
          ? "Tampilkan hasil demo terpilih"
          : "Pilih skenario demo dahulu"}
      </button>
    </section>
  );
}
