import {
  JobReadinessAnalysisSchema,
  type AnalyzeJobReadinessRequest,
  type JobReadinessAnalysis,
} from "../shared/analysisSchemas";
import { crossFieldScenarios } from "../shared/crossFieldScenarios";

export interface DemoScenario {
  name: string;
  description: string;
  request: AnalyzeJobReadinessRequest;
  analysis: JobReadinessAnalysis;
}

const analyses = [
  {
    matchScore: 72,
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Dasar React, HTML, CSS, dan Git sudah relevan. Kandidat dapat mulai melamar sambil memperkuat bukti integrasi API dan pengujian frontend.",
    candidateStrengths: [
      "Proyek katalog React membuktikan praktik antarmuka, bukan hanya pengetahuan teori.",
      "Pengalaman memperbaiki tampilan mendukung kebutuhan debugging dasar.",
      "Git dasar sesuai dengan kebutuhan kolaborasi yang disebutkan lowongan.",
    ],
    mainGaps: [
      "Belum ada bukti integrasi REST API pada proyek yang dijelaskan.",
      "Pengujian otomatis hanya nilai tambah, tetapi belum ditunjukkan.",
    ],
    mustHaveRequirements: ["HTML, CSS, JavaScript, dan React dasar", "Proyek frontend"],
    niceToHaveRequirements: ["Pengalaman testing frontend"],
    riskFactors: ["Kemampuan integrasi API belum terbukti dalam profil."],
    roadmap30Days: {
      week1: ["Ulangi pola fetch, loading, error, dan empty state di React."],
      week2: ["Tambahkan integrasi REST API publik pada proyek katalog."],
      week3: ["Tulis README yang menjelaskan masalah, keputusan, dan hasil proyek."],
      week4: ["Latihan menjelaskan debugging dan alur Git dalam wawancara."],
    },
    evidenceOfCompetenceSuggestions: [
      "Repository proyek dengan README dan tangkapan layar.",
      "Demo integrasi API beserta penanganan loading dan error.",
    ],
    cvMaterialSuggestions: [
      "Mengembangkan katalog responsif menggunakan React serta memperbaiki masalah tampilan dalam proyek kelompok sekolah.",
    ],
    applicationMessage:
      "Saya bermaksud melamar posisi Junior Frontend Developer. Proyek React dan pengalaman memperbaiki antarmuka memberi saya dasar yang relevan, dan saya sedang memperkuat integrasi API serta pengujian frontend.",
    possibleInterviewQuestions: [
      "Bagaimana Anda mencari penyebab bug tampilan?",
      "Bagaimana alur Git yang Anda gunakan dalam proyek kelompok?",
    ],
    disclaimer:
      "Skor ini adalah perkiraan keselarasan berdasarkan data yang diberikan, bukan peluang pasti diterima kerja.",
  },
  {
    matchScore: 78,
    verdict: "APPLY_NOW",
    readinessSummary:
      "Tugas sekretariat sekolah, pengarsipan, dan spreadsheet memberi bukti yang cukup kuat untuk lowongan administrasi pemula ini.",
    candidateStrengths: [
      "Pernah memeriksa kelengkapan data dan memperbarui daftar kehadiran.",
      "Memiliki pengalaman organisasi yang relevan dengan pengarsipan dan penjadwalan.",
      "Sudah menyiapkan contoh spreadsheet dan format surat dengan data fiktif.",
    ],
    mainGaps: ["Belum menunjukkan contoh laporan administrasi ringkas."],
    mustHaveRequirements: ["Minimal lulusan SMK", "Teliti", "Microsoft Excel dan Word"],
    niceToHaveRequirements: ["Pengalaman menangani dokumen"],
    riskFactors: [],
    roadmap30Days: {
      week1: ["Rapikan contoh spreadsheet dan struktur folder dokumen."],
      week2: ["Latihan input data dengan pemeriksaan duplikasi dan format."],
      week3: ["Buat satu contoh laporan administrasi satu halaman."],
      week4: ["Latihan menjelaskan prioritas tugas dan cara menjaga akurasi."],
    },
    evidenceOfCompetenceSuggestions: [
      "Spreadsheet rekap dengan data fiktif.",
      "Contoh struktur pengarsipan, jadwal, dan laporan sederhana.",
    ],
    cvMaterialSuggestions: [
      "Mencatat peserta, menyusun jadwal, dan mengarsipkan surat untuk mendukung kegiatan sekolah.",
    ],
    applicationMessage:
      "Saya melamar posisi Junior Administrative Staff. Pengalaman membantu sekretariat sekolah melatih saya melakukan input data, pengarsipan, penjadwalan, dan pemeriksaan kelengkapan dokumen secara teliti.",
    possibleInterviewQuestions: [
      "Bagaimana Anda memastikan data yang dimasukkan akurat?",
      "Apa yang Anda lakukan ketika dua tugas administrasi sama-sama mendesak?",
    ],
    disclaimer:
      "Analisis ini merupakan panduan kesiapan dan bukan jaminan keputusan rekrutmen.",
  },
  {
    matchScore: 64,
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Pengalaman meja informasi menunjukkan komunikasi dan eskalasi dasar. Kandidat masih perlu menyiapkan bukti penanganan keluhan serta memahami pencatatan layanan dan kesiapan shift.",
    candidateStrengths: [
      "Pernah menjawab pertanyaan peserta secara langsung.",
      "Terbiasa meneruskan masalah kepada panitia yang tepat.",
      "Pencatatan pertanyaan berulang mendukung konsistensi jawaban.",
    ],
    mainGaps: [
      "Belum ada contoh menghadapi pelanggan yang kecewa.",
      "Belum pernah menggunakan CRM, yang disebut sebagai kualifikasi diutamakan.",
      "Kesiapan bekerja shift belum dijelaskan.",
    ],
    mustHaveRequirements: ["Komunikasi jelas", "Empati", "Kesediaan bekerja shift"],
    niceToHaveRequirements: ["Pengalaman menggunakan CRM"],
    riskFactors: ["Kesiapan jadwal shift perlu dipastikan sebelum melamar."],
    roadmap30Days: {
      week1: ["Pelajari alur mendengar, mengklarifikasi, dan merangkum masalah."],
      week2: ["Latihan tiga skenario keluhan dan kapan melakukan eskalasi."],
      week3: ["Buat contoh FAQ, skrip respons, dan checklist kualitas jawaban."],
      week4: ["Simulasikan wawancara dan pastikan kesiapan jadwal kerja."],
    },
    evidenceOfCompetenceSuggestions: [
      "Skrip respons pelanggan dan contoh penyelesaian keluhan fiktif.",
      "Alur eskalasi dan checklist kualitas respons.",
    ],
    cvMaterialSuggestions: [
      "Menjawab pertanyaan peserta, mencatat isu berulang, dan mengeskalasi masalah kepada panitia terkait.",
    ],
    applicationMessage:
      "Saya tertarik melamar posisi Entry-Level Customer Service. Pengalaman di meja informasi melatih komunikasi, pencatatan pertanyaan, dan eskalasi masalah secara terarah.",
    possibleInterviewQuestions: [
      "Bagaimana Anda menghadapi pelanggan yang marah?",
      "Kapan sebuah keluhan perlu dieskalasikan?",
    ],
    disclaimer:
      "Analisis ini adalah panduan berbasis informasi yang diberikan, bukan jaminan diterima kerja.",
  },
  {
    matchScore: 69,
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Pengalaman informal menerima barang dan mencatat stok relevan dengan tugas gudang. Kandidat perlu memperjelas kesiapan shift, keselamatan kerja, dan adaptasi ke sistem inventaris.",
    candidateStrengths: [
      "Pernah memeriksa jumlah barang datang terhadap catatan pesanan.",
      "Memiliki pengalaman picking, packing, dan pencatatan stok manual.",
      "Contoh kartu stok menunjukkan inisiatif membuat bukti kerja praktis.",
    ],
    mainGaps: [
      "Belum menggunakan sistem inventaris digital.",
      "Kesiapan shift belum dinyatakan.",
      "Pemahaman prosedur keselamatan gudang belum dijelaskan.",
    ],
    mustHaveRequirements: ["Minimal SMA atau SMK", "Teliti", "Bersedia bekerja shift"],
    niceToHaveRequirements: ["Pengalaman menggunakan sistem inventaris"],
    riskFactors: ["Pastikan tuntutan shift sesuai kondisi kandidat."],
    roadmap30Days: {
      week1: ["Pelajari alur receiving, penyimpanan, picking, dan packing."],
      week2: ["Latihan stock opname serta pencatatan selisih barang."],
      week3: ["Rapikan kartu stok, checklist receiving, dan laporan selisih."],
      week4: ["Latihan pertanyaan keselamatan, shift, dan akurasi proses."],
    },
    evidenceOfCompetenceSuggestions: [
      "Kartu stok dan inventory tracker dengan data fiktif.",
      "Checklist receiving, picking, packing, dan laporan selisih.",
    ],
    cvMaterialSuggestions: [
      "Membantu penerimaan barang, pencatatan stok, dan penyiapan pesanan pada usaha toko keluarga.",
    ],
    applicationMessage:
      "Saya melamar posisi Warehouse Staff. Pengalaman membantu toko keluarga memberi saya praktik menerima barang, mencatat stok, menyiapkan pesanan, dan melaporkan selisih secara teliti.",
    possibleInterviewQuestions: [
      "Apa yang Anda lakukan jika jumlah barang tidak sesuai catatan?",
      "Bagaimana Anda menjaga ketelitian saat pekerjaan sedang ramai?",
    ],
    disclaimer:
      "Hasil ini adalah panduan kesiapan berdasarkan profil dan lowongan, bukan jaminan hasil rekrutmen.",
  },
] as const satisfies readonly JobReadinessAnalysis[];

export const demoScenarios: DemoScenario[] = crossFieldScenarios.map(
  (request, index) => {
    const names = [
      "Junior Frontend Developer",
      "Junior Administrative Staff",
      "Entry-Level Customer Service",
      "Warehouse Staff",
    ];
    const descriptions = [
      "Proyek teknis dan fondasi frontend",
      "Tugas administrasi sekolah",
      "Pengalaman organisasi dan layanan",
      "Pengalaman operasional informal",
    ];

    return {
      name: names[index],
      description: descriptions[index],
      request,
      analysis: JobReadinessAnalysisSchema.parse(analyses[index]),
    };
  },
);
