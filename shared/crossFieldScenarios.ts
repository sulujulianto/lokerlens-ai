import type { AnalyzeJobReadinessRequest } from "./analysisSchemas";

export const crossFieldScenarios = [
  {
    profile: {
      targetJobField: "it_digital",
      targetRole: "Junior Frontend Developer",
      educationBackground:
        "Lulusan SMK Rekayasa Perangkat Lunak yang belajar pengembangan web melalui tugas sekolah dan latihan mandiri.",
      trainingSourceType: "government",
      trainingProvider: "PPKD Jakarta Pusat",
      trainingProgram: "Web Programming",
      workExperience:
        "Membantu membuat dan memperbarui halaman promosi sederhana untuk usaha keluarga secara informal.",
      internshipOrOrganizationalExperience:
        "Menjadi anggota tim teknologi pada kegiatan sekolah dan bertanggung jawab memperbarui halaman informasi acara.",
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
      achievements:
        "Menyelesaikan katalog responsif berisi 15 produk simulasi dan memastikan tampil baik pada ponsel serta desktop.",
      certificationsOrTraining:
        "Pelatihan Web Programming dasar dengan materi HTML, CSS, JavaScript, React, dan Git.",
      personalStrengths: [
        "Tekun saat mencari penyebab bug",
        "Terbuka menerima umpan balik",
        "Mau belajar mandiri",
      ],
      applicationChallenge:
        "Belum memiliki pengalaman kerja formal sebagai frontend developer dan belum percaya diri menjelaskan integrasi API.",
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
      trainingSourceType: "government",
      trainingProvider: "PPKD Jakarta Pusat",
      trainingProgram: "Data Management Staff",
      workExperience:
        "Membantu usaha keluarga mencatat pesanan, merapikan nota, dan membuat rekap pemasukan harian secara informal.",
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
      achievements:
        "Merapikan daftar peserta yang sebelumnya terpisah menjadi satu spreadsheet dengan format data yang konsisten.",
      certificationsOrTraining:
        "Pelatihan Data Management Staff meliputi pengolah kata, spreadsheet, pengarsipan, dan komunikasi perkantoran.",
      personalStrengths: [
        "Teliti",
        "Teratur",
        "Konsisten memeriksa ulang pekerjaan",
      ],
      applicationChallenge:
        "Belum pernah bekerja di kantor secara formal dan masih perlu berlatih membuat laporan administrasi ringkas.",
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
      trainingSourceType: "community_nonprofit",
      trainingProvider: "Karang Taruna setempat",
      trainingProgram: "Pelayanan acara dan komunikasi dasar",
      workExperience:
        "Membantu stan informasi pada bazar lingkungan, menyambut pengunjung, dan mengarahkan pertanyaan kepada penanggung jawab.",
      internshipOrOrganizationalExperience:
        "Menjadi meja informasi pada acara sekolah, menjawab pertanyaan peserta, dan meneruskan masalah kepada panitia terkait.",
      mainSkills: [
        "Komunikasi lisan",
        "Mendengarkan aktif",
        "Pencatatan pertanyaan",
        "Kerja tim",
      ],
      toolsOrEquipment: [
        "WhatsApp",
        "Google Sheets",
        "Formulir pencatatan layanan",
      ],
      responsibilities:
        "Mencatat pertanyaan berulang dan membantu membuat jawaban singkat untuk peserta.",
      achievements:
        "Menyusun daftar pertanyaan umum yang membantu panitia memberi jawaban lebih konsisten selama acara.",
      certificationsOrTraining:
        "Pelatihan internal organisasi tentang komunikasi layanan, pembagian tugas, dan eskalasi masalah.",
      personalStrengths: [
        "Sabar",
        "Empatik",
        "Mampu tetap tenang saat ramai",
      ],
      applicationChallenge:
        "Belum pernah menggunakan CRM dan belum memiliki pengalaman kerja formal.",
      evidenceOrProjects:
        "Membuat contoh FAQ acara, skrip sambutan, formulir pencatatan pertanyaan, dan alur eskalasi sederhana.",
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
      trainingSourceType: "company",
      trainingProvider: "Pelatihan internal usaha keluarga",
      trainingProgram: "Penerimaan barang dan pencatatan stok dasar",
      workExperience:
        "Membantu menerima barang, menghitung stok, menyusun produk, dan menyiapkan pesanan secara informal.",
      internshipOrOrganizationalExperience:
        "Menjadi anggota seksi perlengkapan kegiatan sekolah dan mencatat barang yang dipinjam serta dikembalikan.",
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
      certificationsOrTraining:
        "Pengarahan internal tentang pemeriksaan barang datang, penataan area simpan, dan keselamatan kerja dasar.",
      personalStrengths: [
        "Teliti menghitung barang",
        "Disiplin menjaga kerapian",
        "Terbiasa bekerja aktif",
      ],
      applicationChallenge:
        "Belum menggunakan sistem inventaris digital dan perlu memastikan kesiapan bekerja dalam jadwal shift.",
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
