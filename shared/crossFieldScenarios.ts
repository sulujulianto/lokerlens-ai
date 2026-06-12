import type { AnalyzeJobReadinessRequest } from "./analysisSchemas";

export const crossFieldScenarios = [
  {
    profile: {
      targetJobField: "it_digital",
      targetRole: "Junior Frontend Developer",
      educationBackground:
        "Lulusan SMK Rekayasa Perangkat Lunak yang belajar pengembangan web melalui tugas sekolah dan latihan mandiri.",
      mainSkills: [
        "HTML",
        "CSS",
        "JavaScript dasar",
        "React dasar",
        "Git dasar",
      ],
      toolsOrEquipment: ["Visual Studio Code", "GitHub"],
      responsibilities:
        "Mengerjakan antarmuka dan memperbaiki masalah tampilan pada proyek kelompok sekolah.",
      evidenceOrProjects:
        "Membuat aplikasi katalog sederhana dengan React, dokumentasi README, dan tangkapan layar. Belum memiliki pengujian otomatis.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Junior Frontend Developer
Tanggung jawab:
- Membuat antarmuka responsif menggunakan React.
- Mengintegrasikan data dari REST API dan memperbaiki bug tampilan.
- Berkolaborasi menggunakan Git.

Persyaratan:
- Wajib memahami HTML, CSS, JavaScript, dan dasar React.
- Harus dapat menunjukkan proyek frontend.
- Pengalaman testing menjadi nilai tambah.`,
  },
  {
    profile: {
      targetJobField: "administration",
      targetRole: "Junior Administrative Staff",
      educationBackground:
        "Lulusan SMK Manajemen Perkantoran dengan pengalaman tugas praktik administrasi di sekolah.",
      internshipOrOrganizationalExperience:
        "Membantu sekretariat kegiatan sekolah mencatat peserta, menyusun jadwal, dan mengarsipkan surat.",
      mainSkills: [
        "Data entry",
        "Pengarsipan dokumen",
        "Microsoft Excel dasar",
        "Komunikasi tertulis",
      ],
      toolsOrEquipment: ["Microsoft Excel", "Microsoft Word"],
      responsibilities:
        "Memeriksa kelengkapan data peserta dan memperbarui daftar kehadiran.",
      evidenceOrProjects:
        "Memiliki contoh lembar jadwal, format surat, dan spreadsheet rekap menggunakan data fiktif.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Junior Administrative Staff
Tugas:
- Melakukan input data dan pengarsipan dokumen.
- Membantu penyusunan jadwal serta laporan administrasi sederhana.

Kualifikasi:
- Minimal lulusan SMK atau sederajat.
- Wajib teliti dan mampu menggunakan Microsoft Excel serta Word.
- Pengalaman menangani dokumen menjadi nilai tambah.`,
  },
  {
    profile: {
      targetJobField: "customer_service",
      targetRole: "Entry-Level Customer Service",
      educationBackground:
        "Fresh graduate SMA yang aktif dalam organisasi sekolah dan kegiatan pelayanan acara.",
      internshipOrOrganizationalExperience:
        "Menjadi meja informasi pada acara sekolah, menjawab pertanyaan peserta, dan meneruskan masalah kepada panitia terkait.",
      mainSkills: [
        "Komunikasi lisan",
        "Mendengarkan aktif",
        "Pencatatan pertanyaan",
        "Kerja tim",
      ],
      responsibilities:
        "Mencatat pertanyaan berulang dan membantu membuat jawaban singkat untuk peserta.",
      personalStrengths: ["Sabar", "Mampu tetap tenang saat ramai"],
      applicationChallenge:
        "Belum pernah menggunakan CRM dan belum memiliki pengalaman kerja formal.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Entry-Level Customer Service
Tanggung jawab:
- Menjawab pertanyaan pelanggan melalui chat dan telepon.
- Menangani keluhan dasar dan melakukan eskalasi sesuai prosedur.
- Mencatat interaksi pelanggan secara akurat.

Persyaratan:
- Wajib memiliki komunikasi yang jelas dan sikap empatik.
- Bersedia bekerja dalam jadwal shift.
- Pengalaman menggunakan CRM diutamakan.`,
  },
  {
    profile: {
      targetJobField: "operations_logistics",
      targetRole: "Warehouse Staff",
      educationBackground:
        "Lulusan SMK dengan pengalaman membantu usaha toko keluarga setelah sekolah.",
      workExperience:
        "Membantu menerima barang, menghitung stok, menyusun produk, dan menyiapkan pesanan secara informal.",
      mainSkills: [
        "Pencatatan stok manual",
        "Penerimaan barang",
        "Picking dan packing dasar",
        "Ketelitian",
      ],
      toolsOrEquipment: ["Spreadsheet dasar", "Timbangan barang"],
      responsibilities:
        "Membandingkan jumlah barang datang dengan catatan pesanan dan melaporkan selisih kepada pemilik toko.",
      achievements:
        "Membantu merapikan pencatatan stok mingguan, tetapi belum pernah menggunakan warehouse management system.",
      evidenceOrProjects:
        "Membuat contoh kartu stok dan checklist penerimaan barang menggunakan data fiktif.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Warehouse Staff
Tugas:
- Menerima, memeriksa, menyimpan, serta menyiapkan barang untuk pengiriman.
- Melakukan stock opname dan melaporkan selisih stok.
- Menjaga area kerja sesuai prosedur keselamatan.

Kualifikasi:
- Minimal lulusan SMA atau SMK.
- Harus teliti dan bersedia bekerja shift.
- Pengalaman menggunakan sistem inventaris menjadi nilai tambah.
- Sertifikat operator forklift tidak diwajibkan.`,
  },
] as const satisfies readonly AnalyzeJobReadinessRequest[];
