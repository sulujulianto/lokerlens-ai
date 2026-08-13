import type {
  OutputLanguage,
  Verdict,
} from "../shared/analysisSchemas";

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
