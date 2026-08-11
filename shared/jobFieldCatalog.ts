import type { JobField } from "./analysisSchemas";

export type JobFieldGroup =
  | "technology_data"
  | "business_professional"
  | "service_operations"
  | "industry_trades"
  | "creative_communication"
  | "people_public"
  | "environment_other";

export interface JobFieldMeta {
  value: JobField;
  label: string;
  shortLabel: string;
  group: JobFieldGroup;
  description: string;
  exampleRoles: string[];
}

export const jobFieldGroupLabels: Record<JobFieldGroup, string> = {
  technology_data: "Teknologi, Data & Produk Digital",
  business_professional: "Bisnis & Fungsi Profesional",
  service_operations: "Layanan, Perdagangan & Operasional",
  industry_trades: "Industri, Teknik & Keterampilan Kerja",
  creative_communication: "Kreatif, Media & Komunikasi",
  people_public: "Pendidikan, Sosial & Pelayanan Publik",
  environment_other: "Lingkungan & Bidang Lainnya",
};

export const jobFieldCatalog: readonly JobFieldMeta[] = [
  {
    value: "it_digital",
    label: "Teknologi Informasi & Digital",
    shortLabel: "IT & Digital",
    group: "technology_data",
    description: "Pengembangan software, dukungan TIK, jaringan, data, dan keamanan digital.",
    exampleRoles: ["Junior Web Developer", "Teknisi Komputer", "Helpdesk IT"],
  },
  {
    value: "data_ai",
    label: "Data, Analitik & Kecerdasan Buatan",
    shortLabel: "Data & AI",
    group: "technology_data",
    description: "Analisis data, business intelligence, data science, machine learning, dan otomasi berbasis AI.",
    exampleRoles: ["Data Analyst Junior", "BI Analyst", "AI/ML Associate"],
  },
  {
    value: "cyber_network",
    label: "Jaringan, Cloud & Keamanan Siber",
    shortLabel: "Jaringan & Siber",
    group: "technology_data",
    description: "Dukungan jaringan, administrasi sistem, cloud, keamanan informasi, dan operasi infrastruktur.",
    exampleRoles: ["Network Support", "SOC Analyst Junior", "Cloud Support"],
  },
  {
    value: "product_design",
    label: "Produk Digital, UI/UX & Manajemen Produk",
    shortLabel: "Produk & UI/UX",
    group: "technology_data",
    description: "Riset pengguna, desain antarmuka, pengujian kegunaan, dokumentasi produk, dan koordinasi pengembangan.",
    exampleRoles: ["UI/UX Designer Junior", "Product Operations", "Product Associate"],
  },
  {
    value: "administration",
    label: "Administrasi & Perkantoran",
    shortLabel: "Administrasi",
    group: "business_professional",
    description: "Pengelolaan dokumen, data, jadwal, arsip, dan pekerjaan kantor.",
    exampleRoles: ["Staf Administrasi", "Data Entry", "Resepsionis"],
  },
  {
    value: "human_resources",
    label: "Sumber Daya Manusia & Rekrutmen",
    shortLabel: "HR & Rekrutmen",
    group: "business_professional",
    description: "Administrasi karyawan, rekrutmen, onboarding, data SDM, dan dukungan kegiatan people operations.",
    exampleRoles: ["HR Admin", "Recruitment Staff Junior", "People Operations Assistant"],
  },
  {
    value: "project_quality",
    label: "Manajemen Proyek, Mutu & Kepatuhan",
    shortLabel: "Proyek & Mutu",
    group: "business_professional",
    description: "Koordinasi tugas, dokumentasi proyek, kontrol mutu, SOP, audit dasar, dan perbaikan proses.",
    exampleRoles: ["Project Admin", "Quality Control Junior", "Document Controller"],
  },
  {
    value: "customer_service",
    label: "Layanan Pelanggan & Frontliner",
    shortLabel: "Layanan Pelanggan",
    group: "service_operations",
    description: "Komunikasi pelanggan, penanganan pertanyaan, keluhan, dan eskalasi.",
    exampleRoles: ["Customer Service", "Contact Center", "Frontliner"],
  },
  {
    value: "sales_marketing",
    label: "Penjualan & Pemasaran",
    shortLabel: "Sales & Marketing",
    group: "business_professional",
    description: "Penjualan, promosi, pemasaran digital, dan pengelolaan kanal sosial.",
    exampleRoles: ["Sales Promotion", "Digital Marketer", "Admin Media Sosial"],
  },
  {
    value: "retail_commerce",
    label: "Ritel, E-commerce & Merchandising",
    shortLabel: "Ritel & E-commerce",
    group: "service_operations",
    description: "Operasional toko dan marketplace, kasir, katalog produk, pesanan, display, serta layanan pembeli.",
    exampleRoles: ["Store Crew", "Admin Marketplace", "Merchandiser Junior"],
  },
  {
    value: "operations_logistics",
    label: "Logistik, Gudang & Operasional",
    shortLabel: "Logistik & Gudang",
    group: "service_operations",
    description: "Penerimaan barang, stok, picking, packing, distribusi, dan keselamatan kerja.",
    exampleRoles: ["Warehouse Staff", "Picker/Packer", "Admin Inventory"],
  },
  {
    value: "transportation",
    label: "Transportasi, Pengiriman & Mobilitas",
    shortLabel: "Transportasi",
    group: "service_operations",
    description: "Pengiriman, pengaturan rute, administrasi armada, operasional transportasi, dan keselamatan perjalanan.",
    exampleRoles: ["Kurir", "Dispatcher Junior", "Admin Transportasi"],
  },
  {
    value: "security_cleaning",
    label: "Keamanan, Kebersihan & Facility Services",
    shortLabel: "Facility Services",
    group: "service_operations",
    description: "Keamanan dasar, kebersihan, perawatan fasilitas, inspeksi area, dan pelaporan kondisi operasional.",
    exampleRoles: ["Petugas Kebersihan", "Security Junior", "Facility Assistant"],
  },
  {
    value: "hospitality",
    label: "Pariwisata & Perhotelan",
    shortLabel: "Hospitality",
    group: "service_operations",
    description: "Pelayanan tamu, tata graha, front office, dan operasional pariwisata.",
    exampleRoles: ["Housekeeping", "Front Office", "Tour Guide"],
  },
  {
    value: "culinary",
    label: "Kuliner, Tata Boga & Barista",
    shortLabel: "Kuliner",
    group: "service_operations",
    description: "Persiapan makanan, bakery, pastry, minuman, kebersihan, dan layanan dapur.",
    exampleRoles: ["Cook Helper", "Baker", "Barista"],
  },
  {
    value: "health_care",
    label: "Kesehatan, Caregiver & Layanan Perawatan",
    shortLabel: "Kesehatan & Perawatan",
    group: "people_public",
    description: "Pendampingan perawatan, administrasi layanan kesehatan, sanitasi, keselamatan, dan dukungan non-klinis.",
    exampleRoles: ["Caregiver Pemula", "Admin Klinik", "Asisten Layanan Kesehatan"],
  },
  {
    value: "social_community",
    label: "Layanan Sosial, Komunitas & Pendampingan",
    shortLabel: "Sosial & Komunitas",
    group: "people_public",
    description: "Pendampingan peserta, kegiatan komunitas, layanan program sosial, pencatatan kasus, dan koordinasi lapangan.",
    exampleRoles: ["Community Officer Junior", "Program Assistant", "Pendamping Lapangan"],
  },
  {
    value: "automotive",
    label: "Otomotif",
    shortLabel: "Otomotif",
    group: "industry_trades",
    description: "Perawatan dan perbaikan sepeda motor, kendaraan ringan, serta kelistrikan otomotif.",
    exampleRoles: ["Teknisi Sepeda Motor", "Mekanik Junior", "Teknisi Kendaraan Ringan"],
  },
  {
    value: "manufacturing",
    label: "Manufaktur, Mesin & Pengelasan",
    shortLabel: "Manufaktur",
    group: "industry_trades",
    description: "Operasi mesin, CNC, pengelasan, produksi, pengukuran, dan kontrol kualitas.",
    exampleRoles: ["Operator Produksi", "Operator CNC", "Welder Junior"],
  },
  {
    value: "construction",
    label: "Konstruksi, Bangunan & CAD",
    shortLabel: "Konstruksi",
    group: "industry_trades",
    description: "Pekerjaan bangunan, gambar teknik, furnitur, survei, dan keselamatan konstruksi.",
    exampleRoles: ["Drafter CAD", "Pekerja Bangunan", "Cabinet Maker"],
  },
  {
    value: "electrical_refrigeration",
    label: "Listrik, Elektronika & Refrigerasi",
    shortLabel: "Listrik & Refrigerasi",
    group: "industry_trades",
    description: "Instalasi listrik, elektronika, teknik pendingin, dan perawatan AC.",
    exampleRoles: ["Teknisi AC", "Teknisi Listrik", "Teknisi Elektronika"],
  },
  {
    value: "agriculture_environment",
    label: "Pertanian, Perikanan & Lingkungan",
    shortLabel: "Agro & Lingkungan",
    group: "environment_other",
    description: "Budidaya, pascapanen, perikanan, pengelolaan lingkungan, pemilahan limbah, dan pekerjaan lapangan terkait.",
    exampleRoles: ["Operator Budidaya", "Asisten Lapangan", "Petugas Pengelolaan Limbah"],
  },
  {
    value: "creative_services",
    label: "Desain, Multimedia, Fashion & Kecantikan",
    shortLabel: "Industri Kreatif",
    group: "creative_communication",
    description: "Desain visual, konten, multimedia, tata busana, dan layanan kecantikan.",
    exampleRoles: ["Desainer Grafis", "Content Creator", "Penjahit", "Make Up Artist"],
  },
  {
    value: "media_events",
    label: "Media, Bahasa, Komunikasi & Event",
    shortLabel: "Media & Event",
    group: "creative_communication",
    description: "Penulisan, penerjemahan, produksi media, public relations, penyiaran, dokumentasi, dan operasional acara.",
    exampleRoles: ["Content Writer Junior", "Event Crew", "Production Assistant"],
  },
  {
    value: "technical_vocational",
    label: "Teknik & Vokasional Lainnya",
    shortLabel: "Teknik Lainnya",
    group: "industry_trades",
    description: "Kejuruan teknis yang belum terwakili oleh rumpun industri di atas.",
    exampleRoles: ["Operator Teknis", "Teknisi Junior", "Asisten Lapangan"],
  },
  {
    value: "education_training",
    label: "Pendidikan & Pelatihan",
    shortLabel: "Pendidikan",
    group: "people_public",
    description: "Pendampingan belajar, fasilitasi kelas, administrasi pelatihan, dan instruksi dasar.",
    exampleRoles: ["Asisten Instruktur", "Tutor Pemula", "Admin Pelatihan"],
  },
  {
    value: "finance_accounting",
    label: "Keuangan & Akuntansi",
    shortLabel: "Keuangan",
    group: "business_professional",
    description: "Pencatatan transaksi, kas, pembukuan, dan administrasi keuangan dasar.",
    exampleRoles: ["Akuntansi Junior", "Kasir", "Staf Pembukuan"],
  },
  {
    value: "legal_public_service",
    label: "Hukum, Pemerintahan & Pelayanan Publik",
    shortLabel: "Hukum & Publik",
    group: "people_public",
    description: "Administrasi hukum, dokumentasi regulasi, layanan warga, pengelolaan berkas, dan dukungan program publik.",
    exampleRoles: ["Legal Admin Junior", "Petugas Layanan", "Program Administration Assistant"],
  },
  {
    value: "other",
    label: "Bidang Lainnya",
    shortLabel: "Lainnya",
    group: "environment_other",
    description: "Gunakan bila peran tujuan belum cocok dengan rumpun yang tersedia.",
    exampleRoles: ["Peran entry-level lainnya"],
  },
];

export const jobFieldCatalogByValue = Object.fromEntries(
  jobFieldCatalog.map((item) => [item.value, item]),
) as Record<JobField, JobFieldMeta>;

export const jobFieldGroups = Object.entries(jobFieldGroupLabels).map(
  ([value, label]) => ({
    value: value as JobFieldGroup,
    label,
    options: jobFieldCatalog.filter((item) => item.group === value),
  }),
);
