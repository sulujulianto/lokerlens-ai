import type { Ref } from "react";
import type {
  JobReadinessAnalysis,
  OutputLanguage,
} from "../../shared/analysisSchemas";
import {
  InterviewPreparationSection,
  RequirementMatchesSection,
  ScoreBreakdownSection,
} from "./AnalysisDetails";
import { CopyableItem, EvidenceSections, ListCard } from "./EvidenceSections";
import { Roadmap } from "./Roadmap";
import { ScoreVerdict } from "./ScoreVerdict";

export function AnalysisResults({
  analysis,
  language,
  isDemo,
  headingRef,
}: {
  analysis: JobReadinessAnalysis;
  language: OutputLanguage;
  isDemo: boolean;
  headingRef?: Ref<HTMLHeadingElement>;
}) {
  return (
    <section
      aria-labelledby="analysis-results-title"
      className="min-w-0 space-y-5"
      data-testid="analysis-results"
    >
      <h2
        id="analysis-results-title"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-extrabold tracking-[-0.025em] text-slate-950 outline-none focus-visible:rounded focus-visible:ring-4 focus-visible:ring-indigo-100"
      >
        Hasil analisis kesiapan kerja
      </h2>
      {isDemo && (
        <div
          role="status"
          className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-950"
        >
          <strong>Mode demo:</strong> hasil ini menggunakan data simulasi dan
          tidak memanggil layanan AI langsung.
        </div>
      )}

      <ScoreVerdict
        score={analysis.matchScore}
        verdict={analysis.verdict}
        language={language}
        summary={analysis.readinessSummary}
      />

      <ScoreBreakdownSection breakdown={analysis.scoreBreakdown} />

      <ListCard
        title="Fokus Utama Anda"
        items={analysis.topPriorities}
        emptyMessage="Belum ada prioritas tambahan."
        emphasized
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <ListCard
          title="Modal yang Sudah Anda Punya"
          items={analysis.candidateStrengths}
          emptyMessage="Belum ada kekuatan yang dapat dipastikan."
        />
        <ListCard
          title="Yang Masih Perlu Diperkuat"
          items={analysis.mainGaps}
          emptyMessage="Tidak ada kesenjangan utama yang teridentifikasi."
        />
      </div>

      <RequirementMatchesSection matches={analysis.requirementMatches} />

      <ListCard
        title="Hal yang Perlu Dipastikan"
        items={analysis.riskFactors}
        emptyMessage="Tidak ada risiko material yang teridentifikasi."
      />

      <Roadmap roadmap={analysis.roadmap30Days} language={language} />

      <EvidenceSections
        evidence={analysis.evidenceOfCompetenceSuggestions}
        cvPrompt={analysis.cvImprovementPrompt}
      />

      <section
        aria-labelledby="application-message-title"
        className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
      >
        <h3
          id="application-message-title"
          className="text-xs font-extrabold uppercase tracking-[0.12em] text-indigo-700"
        >
          Contoh Pesan Lamaran
        </h3>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
          Ganti bagian dalam tanda kurung siku, lalu sesuaikan salam penutup
          dengan kanal yang Anda gunakan.
        </p>
        <div className="mt-3">
          <CopyableItem
            text={analysis.applicationMessage}
            label="pesan lamaran"
          />
        </div>
      </section>

      <InterviewPreparationSection items={analysis.interviewPreparation} />

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
        <strong className="mb-1 block uppercase tracking-wider">
          Catatan Penting
        </strong>
        {analysis.disclaimer}
      </aside>
    </section>
  );
}
