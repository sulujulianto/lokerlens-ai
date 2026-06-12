import { Layers, Sparkles } from "lucide-react";

export function AnalysisActions({
  analysisAvailable,
  healthChecked,
  isLoading,
  onLiveAnalysis,
  onDemo,
}: {
  analysisAvailable: boolean;
  healthChecked: boolean;
  isLoading: boolean;
  onLiveAnalysis: () => void;
  onDemo: () => void;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <button
        type="button"
        data-testid="live-analysis-button"
        onClick={onLiveAnalysis}
        disabled={isLoading || !analysisAvailable}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-3 text-sm font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        <Sparkles size={16} />
        Analisis kesiapan kerja
      </button>
      {!analysisAvailable && healthChecked && (
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
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
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
      >
        <Layers size={16} />
        Tampilkan hasil demo terpilih
      </button>
    </section>
  );
}
