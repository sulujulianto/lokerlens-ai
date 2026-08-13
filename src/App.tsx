import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Compass,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import type { JobReadinessAnalysis } from "../shared/analysisSchemas";
import {
  AnalysisClientError,
  analyzeJobReadiness,
  getAnalysisHealth,
} from "./api/analysisClient";
import {
  resetFrontendContent,
  selectDemoContent,
} from "./appWorkflow";
import { AnalysisResults } from "./components/AnalysisResults";
import { AnalysisActions } from "./components/AnalysisActions";
import { ApplicationContext } from "./components/ApplicationContext";
import { ProfileForm } from "./components/ProfileForm";
import { demoScenarios } from "./demoScenarios";
import {
  createAnalyzeRequest,
  formValuesFromRequest,
  getFormValidationFeedback,
  type ProfileFormErrors,
  type ProfileFormValues,
} from "./form/profileForm";

type ViewState = "edit" | "loading" | "result";
type LoadingMode = "live" | "demo";

const liveLoadingMessages = [
  "Memeriksa profil dan bukti pengalaman...",
  "Membandingkan persyaratan wajib dan nilai tambah...",
  "Menilai kekuatan, kesenjangan, dan risiko praktis...",
  "Menyusun rencana aksi serta bahan lamaran...",
] as const;

export default function App() {
  const [formValues, setFormValues] = useState<ProfileFormValues>(() =>
    formValuesFromRequest(demoScenarios[0].request),
  );
  const [viewState, setViewState] = useState<ViewState>("edit");
  const [analysis, setAnalysis] = useState<JobReadinessAnalysis | null>(null);
  const [analysisAvailable, setAnalysisAvailable] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ProfileFormErrors>({});
  const [activeDemo, setActiveDemo] = useState<number | null>(0);
  const [isDemoResult, setIsDemoResult] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    liveLoadingMessages[0],
  );
  const [loadingMode, setLoadingMode] = useState<LoadingMode>("live");
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const demoTimerRef = useRef<number | null>(null);
  const analysisControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    getAnalysisHealth()
      .then((health) => setAnalysisAvailable(health.analysisAvailable))
      .catch(() => setAnalysisAvailable(false))
      .finally(() => setHealthChecked(true));
  }, []);

  useEffect(() => {
    if (viewState !== "loading" || loadingMode !== "live") return;
    let index = 0;
    const interval = window.setInterval(() => {
      index = Math.min(index + 1, liveLoadingMessages.length - 1);
      setLoadingMessage(liveLoadingMessages[index]);
    }, 800);
    return () => window.clearInterval(interval);
  }, [loadingMode, viewState]);

  useEffect(
    () => () => {
      if (demoTimerRef.current !== null) {
        window.clearTimeout(demoTimerRef.current);
      }
      analysisControllerRef.current?.abort();
    },
    [],
  );

  useEffect(() => {
    if (viewState === "result") {
      resultHeadingRef.current?.focus();
    }
  }, [viewState]);

  function focusControl(id: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus();
    });
  }

  function updateField<K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setActiveDemo(null);
    setError(null);
    setFieldErrors({});
  }

  function loadDemo(index: number, showResult = false) {
    if (demoTimerRef.current !== null) {
      window.clearTimeout(demoTimerRef.current);
      demoTimerRef.current = null;
    }
    const content = selectDemoContent(demoScenarios, index, false);
    setFormValues(content.formValues);
    setActiveDemo(content.activeDemo);
    setError(null);
    setFieldErrors({});
    setAnalysis(null);
    setIsDemoResult(false);
    if (showResult) {
      setLoadingMode("demo");
      setLoadingMessage("Menyiapkan hasil demo offline...");
      setViewState("loading");
      demoTimerRef.current = window.setTimeout(() => {
        const resultContent = selectDemoContent(demoScenarios, index, true);
        setAnalysis(resultContent.analysis);
        setIsDemoResult(resultContent.isDemoResult);
        setViewState("result");
        demoTimerRef.current = null;
      }, 700);
    } else {
      setViewState("edit");
    }
  }

  function resetForm() {
    if (demoTimerRef.current !== null) {
      window.clearTimeout(demoTimerRef.current);
      demoTimerRef.current = null;
    }
    const reset = resetFrontendContent();
    setFormValues(reset.formValues);
    setAnalysis(reset.analysis);
    setActiveDemo(reset.activeDemo);
    setIsDemoResult(reset.isDemoResult);
    setError(null);
    setFieldErrors({});
    setViewState("edit");
    focusControl("targetJobField");
  }

  async function submitLiveAnalysis(event?: FormEvent) {
    event?.preventDefault();
    const requestResult = createAnalyzeRequest(formValues);
    if (!requestResult.success) {
      const feedback = getFormValidationFeedback(requestResult.error.issues);
      setError(feedback.summary);
      setFieldErrors(feedback.fieldErrors);
      focusControl(feedback.firstInvalidField ?? "form-error-summary");
      return;
    }

    setError(null);
    setFieldErrors({});
    setIsDemoResult(false);
    setLoadingMode("live");
    setLoadingMessage(liveLoadingMessages[0]);
    setViewState("loading");
    const controller = new AbortController();
    analysisControllerRef.current?.abort();
    analysisControllerRef.current = controller;
    try {
      setAnalysis(
        await analyzeJobReadiness(requestResult.data, {
          signal: controller.signal,
        }),
      );
      setViewState("result");
    } catch (caught) {
      setError(
        caught instanceof AnalysisClientError
          ? caught.message
          : "Analisis belum dapat diproses. Silakan coba lagi.",
      );
      setViewState("edit");
      focusControl("form-error-summary");
    } finally {
      if (analysisControllerRef.current === controller) {
        analysisControllerRef.current = null;
      }
    }
  }

  function cancelLiveAnalysis() {
    analysisControllerRef.current?.abort();
  }

  const isLoading = viewState === "loading";

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white text-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-[0_10px_25px_rgba(79,70,229,0.22)]"
            >
              <Compass size={22} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-[-0.02em]">
                  LokerLens AI
                </h1>
                <span className="max-w-full break-words rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                  v2.0.0-dev
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                Pendamping kesiapan kerja untuk talenta vokasi
              </p>
            </div>
          </div>
          <div
            role="status"
            className="flex min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                analysisAvailable ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            <span className="min-w-0 break-words text-xs font-semibold text-slate-700">
              {!healthChecked
                ? "Memeriksa layanan analisis..."
                : analysisAvailable
                  ? "Analisis langsung tersedia"
                  : "Analisis langsung belum dikonfigurasi"}
            </span>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0,_#f8fafc_38%,_#ffffff_76%)]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-700 shadow-sm">
              <GraduationCap size={15} aria-hidden="true" />
              Dari pelatihan menuju pekerjaan
            </p>
            <h2 className="mt-5 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Baca lowongan dengan jernih. Kenali modal yang sudah Anda punya.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Ceritakan pelatihan, pengalaman formal maupun informal, tugas
              nyata, dan bukti kerja Anda. LokerLens membantu memisahkan
              kekuatan, kesenjangan penting, serta langkah yang realistis
              sebelum melamar.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, "Jujur pada bukti", "Tidak mengarang pengalaman"],
                [Waypoints, "29 rumpun karier", "Dari digital hingga vokasional"],
                [GraduationCap, "Ramah pengalaman informal", "Pelatihan dan praktik tetap bernilai"],
              ].map(([Icon, title, description]) => {
                const BenefitIcon = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <BenefitIcon className="mt-0.5 shrink-0 text-indigo-600" size={18} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">{String(title)}</p>
                      <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{String(description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,0.07)] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-600">Coba tanpa API key</p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900">Pilih contoh profil</h3>
              </div>
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Form baru
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Skenario demo">
              {demoScenarios.map((scenario, index) => (
                <button
                  type="button"
                  key={scenario.name}
                  onClick={() => loadDemo(index)}
                  disabled={isLoading}
                  aria-pressed={activeDemo === index}
                  title={scenario.description}
                  className={`group flex min-h-16 max-w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 ${
                    activeDemo === index
                      ? "border-indigo-400 bg-indigo-50 text-slate-950"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/60"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold ${activeDemo === index ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-extrabold">{scenario.name}</span>
                    <span className="mt-0.5 block truncate text-[11px] font-normal text-slate-600">{scenario.description}</span>
                  </span>
                  {activeDemo === index && <span className="sr-only">(Dipilih)</span>}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              Demo memakai data simulasi dan tidak mengirim data ke layanan AI.
            </p>
          </aside>
        </div>
      </section>

      <main className="mx-auto min-w-0 max-w-5xl px-4 py-7 sm:px-6 sm:py-10">
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            id="form-error-summary"
            tabIndex={-1}
            className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950 shadow-sm"
          >
            <AlertCircle
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-rose-600"
            />
            <div>
              <strong>Periksa kembali data Anda</strong>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {viewState === "edit" && (
          <form
            noValidate
            onSubmit={submitLiveAnalysis}
            className="min-w-0 space-y-5"
          >
            <ProfileForm
              values={formValues}
              disabled={isLoading}
              errors={fieldErrors}
              onChange={updateField}
            />
            <div className="min-w-0 space-y-5">
              <ApplicationContext
                values={formValues}
                disabled={isLoading}
                errors={fieldErrors}
                onChange={updateField}
              />
              <AnalysisActions
                analysisAvailable={analysisAvailable}
                healthChecked={healthChecked}
                isLoading={isLoading}
                demoAvailable={activeDemo !== null}
                onDemo={() => {
                  if (activeDemo !== null) loadDemo(activeDemo, true);
                }}
              />
            </div>
          </form>
        )}

        {viewState === "loading" && (
          <section
            role="status"
            aria-live="polite"
            className="flex min-h-[320px] flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:min-h-[420px] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 motion-reduce:animate-none"
            />
            <h2 className="mt-5 font-extrabold text-slate-900">
              Menyusun analisis kesiapan
            </h2>
            <p className="mt-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-800">
              {loadingMessage}
            </p>
            {loadingMode === "live" && (
              <button
                type="button"
                onClick={cancelLiveAnalysis}
                className="mt-5 min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                Batalkan analisis
              </button>
            )}
          </section>
        )}

        {viewState === "result" && analysis && (
          <div>
            <button
              type="button"
              onClick={() => setViewState("edit")}
              className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Kembali ke formulir
            </button>
            <AnalysisResults
              analysis={analysis}
              language={formValues.preferredOutputLanguage}
              isDemo={isDemoResult}
              headingRef={resultHeadingRef}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-7 text-center text-xs leading-5 text-slate-500">
        <strong className="text-slate-800">LokerLens AI</strong> memberi
        panduan berdasarkan informasi yang Anda berikan. Hasil bukan jaminan
        diterima kerja dan tidak menggantikan keputusan rekruter.
      </footer>
    </div>
  );
}
