import type { AnalyzeJobReadinessRequest } from "./analysisSchemas";

export const additionalLiveEvaluationScenarios = [
  {
    profile: {
      targetJobField: "culinary",
      targetRole: "Cook Helper",
      educationBackground:
        "Lulusan SMA yang belajar persiapan makanan melalui praktik rumah dan membantu usaha katering lingkungan.",
      trainingSourceType: "company",
      trainingProvider: "Katering rumahan setempat",
      trainingProgram: "Pengarahan persiapan bahan dan kebersihan dapur",
      workExperience:
        "Membantu katering rumahan secara informal saat pesanan ramai dengan mencuci peralatan, menimbang bahan, memotong sayuran, dan menata kotak makan di bawah arahan juru masak.",
      internshipOrOrganizationalExperience:
        "Menjadi anggota konsumsi kegiatan warga dan membantu menyiapkan serta membagikan makanan sesuai jumlah peserta.",
      mainSkills: [
        "Mise en place dasar",
        "Kebersihan area dan peralatan dapur",
        "Penimbangan dan pembagian porsi",
        "Kerja tim saat pesanan ramai",
      ],
      toolsOrEquipment: [
        "Pisau dapur",
        "Talenan terpisah",
        "Timbangan bahan",
        "Termometer makanan dasar",
      ],
      responsibilities:
        "Menyiapkan bahan sesuai daftar, menjaga pemisahan bahan mentah dan matang, membersihkan area kerja, serta melaporkan bahan yang hampir habis.",
      achievements:
        "Membantu tim menyiapkan 60 kotak makan tepat waktu dengan checklist jumlah porsi dan kebersihan area kerja.",
      certificationsOrTraining:
        "Menerima pengarahan internal tentang cuci tangan, kontaminasi silang, penyimpanan bahan, dan penggunaan alat dasar; belum memiliki sertifikat food safety formal.",
      personalStrengths: [
        "Menjaga kebersihan",
        "Mau mengikuti instruksi",
        "Tetap rapi saat bekerja cepat",
      ],
      applicationChallenge:
        "Belum memiliki pengalaman restoran formal, belum menguasai teknik memasak utama, dan perlu memastikan kesiapan bekerja shift serta berdiri lama.",
      evidenceOrProjects:
        "Memiliki contoh checklist persiapan 60 porsi, daftar kebutuhan bahan, dan catatan pembagian tugas menggunakan data simulasi.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Cook Helper
Tanggung jawab:
- Menyiapkan dan menimbang bahan sesuai arahan cook.
- Menjaga kebersihan alat, meja kerja, serta area penyimpanan.
- Membantu portioning dan plating saat operasional ramai.
- Mengikuti prosedur pencegahan kontaminasi silang.

Kualifikasi:
- Minimal lulusan SMA atau sederajat.
- Wajib memahami kebersihan dapur dasar dan mampu mengikuti resep atau instruksi kerja.
- Bersedia bekerja shift, berdiri lama, dan bekerja dalam tim.
- Pengalaman dapur komersial dan sertifikat food safety menjadi nilai tambah.`,
  },
  {
    profile: {
      targetJobField: "electrical_refrigeration",
      targetRole: "Junior AC Maintenance Helper",
      educationBackground:
        "Lulusan SMK Teknik Instalasi Tenaga Listrik dengan praktik dasar pengukuran listrik, rangkaian, dan keselamatan kerja.",
      trainingSourceType: "school_university",
      trainingProvider: "Laboratorium praktik SMK",
      trainingProgram: "Dasar kelistrikan dan perawatan AC split",
      workExperience:
        "Beberapa kali membantu teknisi lingkungan membersihkan filter dan unit AC split, menyiapkan alat, serta mencatat kondisi awal dan akhir di bawah pengawasan.",
      internshipOrOrganizationalExperience:
        "Mengikuti praktik sekolah membuat rangkaian kontrol sederhana dan melakukan pemeriksaan tegangan dengan prosedur keselamatan.",
      mainSkills: [
        "Keselamatan kelistrikan dasar",
        "Penggunaan multimeter dasar",
        "Pembersihan filter dan unit AC split",
        "Pencatatan hasil pemeriksaan",
      ],
      toolsOrEquipment: [
        "Multimeter",
        "Obeng berisolasi",
        "Tang kombinasi",
        "Alat cuci AC dasar",
      ],
      responsibilities:
        "Memastikan sumber listrik diputus sesuai arahan, menyiapkan area kerja, membantu preventive maintenance, dan mengisi checklist servis.",
      achievements:
        "Mendampingi perawatan delapan unit AC split dan merapikan catatan kondisi filter, drainase, serta hasil pengujian setelah pembersihan.",
      certificationsOrTraining:
        "Praktik sekolah mengenai K3 listrik, penggunaan alat ukur, dan pengenalan komponen AC; belum memiliki sertifikat teknisi atau K3 formal.",
      personalStrengths: [
        "Berhati-hati terhadap risiko listrik",
        "Mau bekerja di bawah supervisi",
        "Teliti mencatat hasil pemeriksaan",
      ],
      applicationChallenge:
        "Belum dapat menangani refrigeran, brazing, diagnosis kompresor, atau pekerjaan di ketinggian secara mandiri.",
      evidenceOrProjects:
        "Memiliki checklist perawatan AC simulasi, foto papan praktik rangkaian sekolah, dan catatan pengukuran tanpa data pelanggan.",
      preferredOutputLanguage: "id",
    },
    jobPosting: `Junior AC Maintenance Helper / Teknisi HVAC Pemula
Responsibilities:
- Mendampingi preventive maintenance AC split dan mencatat service report.
- Membersihkan filter, evaporator, kondensor, serta memeriksa drainase.
- Membantu basic troubleshooting kelistrikan di bawah supervisi teknisi senior.
- Menjaga alat dan menerapkan prosedur keselamatan di lokasi pelanggan.

Requirements:
- Wajib lulusan SMK jurusan listrik, elektronika, refrigerasi, atau bidang terkait.
- Memahami keselamatan listrik dan penggunaan multimeter dasar.
- Bersedia bekerja lapangan dan mengikuti jadwal kunjungan teknisi.
- Pengalaman menangani refrigeran, sertifikat K3, dan kemampuan brazing menjadi nilai tambah, bukan syarat wajib.`,
  },
] as const satisfies readonly AnalyzeJobReadinessRequest[];
