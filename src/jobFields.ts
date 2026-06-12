import {
  JobFieldSchema,
  type JobField,
} from "../shared/analysisSchemas";

export const jobFieldLabels: Record<JobField, string> = {
  it_digital: "IT & Digital",
  administration: "Administrasi",
  customer_service: "Customer Service",
  sales_marketing: "Sales & Marketing",
  operations_logistics: "Operasional, Gudang & Logistik",
  hospitality: "Hospitality",
  technical_vocational: "Teknis & Vokasional",
  education_training: "Pendidikan & Pelatihan",
  finance_accounting: "Keuangan & Akuntansi",
  other: "Bidang Lainnya",
};

export const jobFieldOptions = JobFieldSchema.options.map((value) => ({
  value,
  label: jobFieldLabels[value],
}));
