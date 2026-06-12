import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import type { JobReadinessAnalysis } from "../shared/analysisSchemas";
import {
  AnalysisClientError,
  analyzeJobReadiness,
  getAnalysisHealth,
} from "./api/analysisClient";
import { AnalysisResults } from "./components/AnalysisResults";
import { AnalysisActions } from "./components/AnalysisActions";
import { ApplicationContext } from "./components/ApplicationContext";
import { ProfileForm } from "./components/ProfileForm";
import { demoScenarios } from "./demoScenarios";
import {
  createAnalyzeRequest,
  emptyProfileForm,
  formValuesFromRequest,
  getFormErrorMessage,
  type ProfileFormValues,
} from "./form/profileForm";

type ViewState = "edit" | "loading" | "result";

export default function App() {
  const [formValues, setFormValues] = useState<ProfileFormValues>(() =>
    formValuesFromRequest(demoScenarios[0].request),
  );
  const [viewState, setViewState] = useState<ViewState>("edit");
  const [analysis, setAnalysis] = useState<JobReadinessAnalysis | null>(null);
  const [analysisAvailable, setAnalysisAvailable] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<number | null>(0);
  const [isDemoResult, setIsDemoResult] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Menyiapkan analisis kesiapan kerja...",
  );

  useEffect(() => {
    getAnalysisHealth()
      .then((health) => setAnalysisAvailable(health.analysisAvailable))
      .catch(() => setAnalysisAvailable(false))
      .finally(() => setHealthChecked(true));
  }, []);

  useEffect(() => {
    if (viewState !== "loading") return;
    const messages = [
      "Memeriksa profil dan bukti pengalaman...",
      "Membandingkan persyaratan wajib dan nilai tambah...",
      "Menilai kekuatan, kesenjangan, dan risiko praktis...",
      "Menyusun rencana aksi serta bahan lamaran...",
    ];
    let index = 0;
    setLoadingMessage(messages[0]);
    const interval = window.setInterval(() => {
      index = Math.min(index + 1, messages.length - 1);
      setLoadingMessage(messages[index]);
    }, 800);
    return () => window.clearInterval(interval);
  }, [viewState]);

  function updateField<K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setActiveDemo(null);
    setError(null);
  }

  function loadDemo(index: number, showResult = false) {
    const scenario = demoScenarios[index];
    setFormValues(formValuesFromRequest(scenario.request));
    setActiveDemo(index);
    setError(null);
    if (showResult) {
      setViewState("loading");
      window.setTimeout(() => {
        setAnalysis(scenario.analysis);
        setIsDemoResult(true);
        setViewState("result");
      }, 700);
    } else {
      setViewState("edit");
    }
  }

  function resetForm() {
    setFormValues(emptyProfileForm);
    setAnalysis(null);
    setActiveDemo(null);
    setIsDemoResult(false);
    setError(null);
    setViewState("edit");
  }

  async function submitLiveAnalysis() {
    const requestResult = createAnalyzeRequest(formValues);
    if (!requestResult.success) {
      setError(getFormErrorMessage(requestResult.error.issues));
      return;
    }

    setError(null);
    setIsDemoResult(false);
    setViewState("loading");
    try {
      setAnalysis(await analyzeJobReadiness(requestResult.data));
      setViewState("result");
    } catch (caught) {
      setError(
        caught instanceof AnalysisClientError
          ? caught.message
          : "Analisis belum dapat diproses. Silakan coba lagi.",
      );
      setViewState("edit");
    }
  }

  const isLoading = viewState === "loading";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-800 bg-slate-900 text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-600 font-black">
              LL
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-black tracking-tight">LokerLens AI</h1>
                <span className="rounded border border-indigo-700 bg-indigo-950 px-2 py-0.5 text-[10px] font-bold text-indigo-200">
                  v2.0.0-dev · Multi-Field Job Readiness
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                Asisten manual-first untuk kesiapan melamar kerja entry-level
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                analysisAvailable ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span className="text-xs font-semibold text-slate-300">
              {!healthChecked
                ? "Memeriksa layanan analisis..."
                : analysisAvailable
                  ? "Analisis langsung tersedia"
                  : "Analisis langsung belum dikonfigurasi"}
            </span>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Susun profil, bandingkan lowongan, siapkan langkah berikutnya
              </h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-500">
                Tuliskan pendidikan, pengalaman, tugas, keterampilan, dan bukti
                praktis secara manual. LokerLens membantu menemukan kekuatan,
                kesenjangan material, serta bahan untuk CV dan lamaran.
              </p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            >
              <RotateCcw size={14} />
              Form baru
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Skenario demo">
            {demoScenarios.map((scenario, index) => (
              <button
                type="button"
                key={scenario.name}
                onClick={() => loadDemo(index)}
                disabled={isLoading}
                title={scenario.description}
                className={`rounded-md border px-3 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50 ${
                  activeDemo === index
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-600" />
            <div>
              <strong>Periksa kembali data Anda</strong>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {viewState === "edit" && (
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
            <ProfileForm
              values={formValues}
              disabled={isLoading}
              onChange={updateField}
            />
            <div className="space-y-4">
              <ApplicationContext
                values={formValues}
                disabled={isLoading}
                onChange={updateField}
              />
              <AnalysisActions
                analysisAvailable={analysisAvailable}
                healthChecked={healthChecked}
                isLoading={isLoading}
                onLiveAnalysis={submitLiveAnalysis}
                onDemo={() => loadDemo(activeDemo ?? 0, true)}
              />
            </div>
          </div>
        )}

        {viewState === "loading" && (
          <section
            aria-live="polite"
            className="flex min-h-[420px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center"
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            <h2 className="mt-5 font-black text-slate-900">
              Menyusun analisis kesiapan
            </h2>
            <p className="mt-2 rounded bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">
              {loadingMessage}
            </p>
          </section>
        )}

        {viewState === "result" && analysis && (
          <div>
            <button
              type="button"
              onClick={() => setViewState("edit")}
              className="mb-4 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <ArrowLeft size={14} />
              Kembali ke formulir
            </button>
            <AnalysisResults
              analysis={analysis}
              language={formValues.preferredOutputLanguage}
              isDemo={isDemoResult}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-slate-100 px-4 py-4 text-center text-xs text-slate-500">
        LokerLens AI memberi panduan kesiapan berdasarkan informasi yang Anda
        berikan. Hasil bukan jaminan diterima kerja dan tidak menggantikan
        keputusan rekruter.
      </footer>
    </div>
  );
}
