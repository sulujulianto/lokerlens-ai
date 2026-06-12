import type { Ref } from "react";
import type {
  JobReadinessAnalysis,
  OutputLanguage,
} from "../../shared/analysisSchemas";
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
      className="min-w-0 space-y-4"
      data-testid="analysis-results"
    >
      <h2
        id="analysis-results-title"
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-black text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        Hasil analisis kesiapan kerja
      </h2>
      {isDemo && (
        <div
          role="status"
          className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900"
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

      <div className="grid gap-3 lg:grid-cols-2">
        <ListCard
          title="Kekuatan Kandidat"
          items={analysis.candidateStrengths}
          emptyMessage="Belum ada kekuatan yang dapat dipastikan."
        />
        <ListCard
          title="Kesenjangan Utama"
          items={analysis.mainGaps}
          emptyMessage="Tidak ada kesenjangan utama yang teridentifikasi."
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ListCard
          title="Persyaratan Wajib"
          items={analysis.mustHaveRequirements}
          emptyMessage="Lowongan tidak menyatakan persyaratan wajib secara jelas."
        />
        <ListCard
          title="Nilai Tambah"
          items={analysis.niceToHaveRequirements}
          emptyMessage="Tidak ada nilai tambah yang dinyatakan secara jelas."
        />
      </div>

      <ListCard
        title="Risiko dan Hal yang Perlu Dipastikan"
        items={analysis.riskFactors}
        emptyMessage="Tidak ada risiko material yang teridentifikasi."
      />

      <Roadmap roadmap={analysis.roadmap30Days} language={language} />

      <EvidenceSections
        evidence={analysis.evidenceOfCompetenceSuggestions}
        cvMaterial={analysis.cvMaterialSuggestions}
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <section
          aria-labelledby="application-message-title"
          className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h3
            id="application-message-title"
            className="text-xs font-black uppercase tracking-wider text-slate-700"
          >
            Pesan Lamaran
          </h3>
          <div className="mt-3">
            <CopyableItem
              text={analysis.applicationMessage}
              label="pesan lamaran"
            />
          </div>
        </section>
        <ListCard
          title="Kemungkinan Pertanyaan Wawancara"
          items={analysis.possibleInterviewQuestions}
          emptyMessage="Belum ada pertanyaan wawancara tambahan."
        />
      </div>

      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
        <strong className="mb-1 block uppercase tracking-wider">
          Catatan Penting
        </strong>
        {analysis.disclaimer}
      </aside>
    </section>
  );
}
