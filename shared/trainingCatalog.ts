import type { TrainingSourceType } from "./analysisSchemas";

export const trainingSourceTypeLabels: Record<TrainingSourceType, string> = {
  government: "Pemerintah / UPT pelatihan",
  private_bootcamp: "Lembaga swasta / bootcamp",
  school_university: "Sekolah / kampus",
  company: "Pelatihan perusahaan",
  community_nonprofit: "Komunitas / organisasi sosial",
  independent: "Belajar mandiri / kursus daring",
  other: "Sumber pelatihan lainnya",
};
