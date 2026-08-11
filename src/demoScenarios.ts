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
    scoreBreakdown: {
      mustHaveAlignment: {
        score: 30,
        maxScore: 40,
        rationale:
          "HTML, CSS, JavaScript, React, proyek frontend, dan Git memiliki bukti; integrasi REST API yang menjadi tugas utama belum dibuktikan.",
      },
      skillsAlignment: {
        score: 18,
        maxScore: 25,
        rationale:
          "Fondasi frontend dan debugging tampilan relevan, tetapi kemampuan konsumsi API serta pengujian belum terlihat.",
      },
      experienceEvidence: {
        score: 13,
        maxScore: 20,
        rationale:
          "Proyek katalog dan kontribusi pada kegiatan sekolah memberi bukti praktik, meski dokumentasi teknisnya masih terbatas.",
      },
      educationTraining: {
        score: 7,
        maxScore: 10,
        rationale:
          "Latar SMK RPL dan pelatihan web mendukung fondasi peran tanpa dianggap otomatis membuktikan seluruh kompetensi.",
      },
      practicalReadiness: {
        score: 4,
        maxScore: 5,
        rationale:
          "Kandidat sudah mempunyai proyek yang dapat dibahas dan hanya perlu memperkuat dua bukti teknis utama sebelum proses seleksi.",
      },
    },
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Anda sudah punya bekal yang cukup untuk mulai melamar posisi Junior Frontend Developer sambil memperkuat portofolio. Proyek katalog React responsif, pengalaman memperbaiki tampilan, dan penggunaan Git dasar menjadi bukti paling relevan. Hal yang paling perlu ditambahkan adalah integrasi REST API karena tugas itu disebut langsung dalam lowongan. Pengujian frontend dapat menyusul sebagai nilai tambah dan tidak perlu menjadi alasan untuk menunda lamaran.",
    candidateStrengths: [
      "Proyek katalog React membuktikan praktik antarmuka, bukan hanya pengetahuan teori.",
      "Pengalaman memperbaiki tampilan mendukung kebutuhan debugging dasar.",
      "Git dasar sesuai dengan kebutuhan kolaborasi yang disebutkan lowongan.",
    ],
    mainGaps: [
      "Belum ada bukti integrasi REST API pada proyek yang dijelaskan.",
      "Pengujian otomatis hanya nilai tambah, tetapi belum ditunjukkan.",
    ],
    requirementMatches: [
      {
        requirement: "Memahami HTML, CSS, JavaScript, dan dasar React",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Profil menyebut keempat teknologi dan proyek katalog responsif berbasis React.",
        recommendation:
          "Siapkan tautan repository dan jelaskan satu keputusan responsif serta satu bug yang pernah diperbaiki.",
      },
      {
        requirement: "Dapat menunjukkan proyek frontend",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Aplikasi katalog, README, dan tangkapan layar disebut sebagai bukti proyek.",
        recommendation:
          "Pastikan demo dapat dibuka dan README menjelaskan tujuan, peran pribadi, cara menjalankan, dan keterbatasan proyek.",
      },
      {
        requirement: "Mengintegrasikan data dari REST API",
        priority: "MUST_HAVE",
        status: "NOT_EVIDENCED",
        evidence:
          "Profil secara eksplisit belum menunjukkan integrasi REST API.",
        recommendation:
          "Tambahkan satu API publik dengan state loading, error, kosong, dan pembatalan request pada proyek yang ada.",
      },
      {
        requirement: "Pengalaman testing frontend",
        priority: "NICE_TO_HAVE",
        status: "NOT_EVIDENCED",
        evidence: "Profil menyatakan belum memiliki pengujian otomatis.",
        recommendation:
          "Tambahkan beberapa tes perilaku penting setelah integrasi API selesai; jangan menunda lamaran hanya demi nilai tambah ini.",
      },
    ],
    riskFactors: ["Kemampuan integrasi API belum terbukti dalam profil."],
    topPriorities: [
      "Buktikan integrasi REST API pada proyek React yang sudah ada.",
      "Rapikan README dan demo agar kontribusi pribadi dapat diverifikasi.",
      "Latih penjelasan debugging, keputusan responsif, dan alur Git dengan contoh konkret.",
    ],
    roadmap30Days: {
      week1: [
        "Pelajari ulang fetch, loading, error, empty state, dan pembatalan request; hasilkan catatan pola komponen satu halaman.",
        "Pilih API publik tanpa data sensitif; hasilkan daftar endpoint, field, dan skenario gagal yang akan ditangani.",
      ],
      week2: [
        "Tambahkan integrasi REST API pada proyek katalog; hasilkan fitur yang dapat didemokan dari awal sampai kondisi error.",
        "Uji tampilan ponsel dan desktop; hasilkan checklist masalah beserta perbaikannya.",
      ],
      week3: [
        "Tulis README berisi masalah, peran pribadi, keputusan teknis, cara menjalankan, dan batas proyek.",
        "Tambahkan tes untuk alur utama; hasilkan bukti tes lulus dan satu penjelasan kasus yang dilindungi.",
      ],
      week4: [
        "Latih empat jawaban tentang proyek, debugging, integrasi API, dan alur Git; hasilkan jawaban berdurasi 60-90 detik untuk setiap pertanyaan.",
        "Sesuaikan CV dan pesan lamaran dengan lowongan; hasilkan satu paket lamaran final yang seluruh klaimnya dapat dibuktikan.",
      ],
    },
    evidenceOfCompetenceSuggestions: [
      "Repository proyek dengan README yang menjelaskan masalah, kontribusi pribadi, keputusan teknis, cara menjalankan, dan batas proyek.",
      "Demo integrasi API publik dengan data aman, state loading, error, kosong, dan tampilan responsif yang seluruhnya dapat dicoba.",
      "Beberapa tes alur utama beserta keluaran tes lulus dan penjelasan singkat tentang regresi yang dicegah.",
    ],
    cvImprovementPrompt:
      "Saya akan mengunggah CV saya untuk melamar posisi Junior Frontend Developer. Tolong tinjau dan perbaiki CV tersebut dengan menonjolkan pengalaman yang benar-benar relevan: proyek katalog responsif menggunakan React, perbaikan masalah tampilan pada proyek kelompok sekolah, penggunaan Git dasar, dan dokumentasi README. Sesuaikan ringkasan profil, urutan keterampilan, serta bullet pengalaman dengan lowongan yang saya sertakan. Pertahankan semua fakta dari CV dan konteks ini. Jangan menambahkan pengalaman kerja, teknologi, sertifikat, angka, atau dampak yang belum terbukti. Jika detail penting belum tersedia, tandai dengan [perlu dilengkapi] dan ajukan pertanyaan singkat kepada saya. Jangan menulis integrasi REST API sebagai pencapaian sebelum saya mengonfirmasi fiturnya sudah selesai. Hasilkan CV berbahasa Indonesia yang ringkas, natural, mudah dibaca perekrut, dan ramah ATS tanpa menumpuk kata kunci.",
    applicationMessage:
      "Yth. Tim Rekrutmen [Nama Perusahaan],\n\nPerkenalkan, saya [Nama Kandidat]. Saya ingin mengajukan lamaran untuk posisi Junior Frontend Developer. Saya memiliki pengalaman mengembangkan katalog responsif menggunakan React, memperbaiki masalah tampilan pada proyek kelompok sekolah, serta mengelola perubahan dasar dengan Git. Proyek tersebut juga saya lengkapi dengan README agar proses dan kontribusi saya lebih mudah dipahami.\n\nSaya tertarik untuk terus mengembangkan kemampuan frontend melalui pekerjaan nyata dan kolaborasi bersama tim Anda. CV serta tautan portofolio telah saya lampirkan sebagai bahan pertimbangan. Saya dengan senang hati siap menjelaskan proyek tersebut lebih lanjut dalam sesi wawancara.\n\nTerima kasih atas waktu dan perhatiannya.\n\nHormat saya,\n[Nama Kandidat]",
    interviewPreparation: [
      {
        question: "Bagaimana Anda mencari penyebab bug tampilan?",
        whyItIsAsked:
          "Pewawancara ingin melihat proses diagnosis, bukan hanya hasil akhir.",
        answerOutline:
          "Gunakan contoh proyek kelompok: jelaskan gejala, cara mempersempit penyebab dengan DevTools, perubahan yang dicoba, pemeriksaan responsif, dan hasil akhirnya tanpa mengarang metrik.",
      },
      {
        question: "Bagaimana Anda mengintegrasikan REST API di React?",
        whyItIsAsked:
          "Integrasi API tercantum sebagai tanggung jawab tetapi belum terbukti pada profil.",
        answerOutline:
          "Setelah proyek diperbarui, jelaskan endpoint, state loading/error/kosong, validasi data, serta keputusan pengalaman pengguna; bila belum selesai, nyatakan progres secara jujur.",
      },
      {
        question: "Bagaimana alur Git yang Anda gunakan dalam proyek kelompok?",
        whyItIsAsked:
          "Lowongan meminta kolaborasi menggunakan Git dan profil baru menyebut fondasi dasar.",
        answerOutline:
          "Jelaskan pembagian tugas, branch atau commit yang Anda gunakan, cara meninjau perubahan, menangani konflik bila pernah terjadi, dan pelajaran untuk kolaborasi berikutnya.",
      },
      {
        question: "Proyek frontend mana yang paling menggambarkan kemampuan Anda?",
        whyItIsAsked:
          "Pewawancara ingin memastikan Anda memahami proyek sendiri dan dapat menjelaskan kontribusi pribadi dengan runtut.",
        answerOutline:
          "Gunakan proyek katalog React: jelaskan masalah yang ingin diselesaikan, bagian yang Anda kerjakan, satu keputusan teknis, satu kendala yang dihadapi, hasil yang dapat dilihat, dan hal yang ingin Anda tingkatkan berikutnya.",
      },
    ],
    disclaimer:
      "Skor ini adalah perkiraan keselarasan berdasarkan data yang diberikan, bukan peluang pasti diterima kerja.",
  },
  {
    matchScore: 78,
    scoreBreakdown: {
      mustHaveAlignment: {
        score: 34,
        maxScore: 40,
        rationale:
          "Pendidikan SMK, ketelitian, serta Excel dan Word didukung profil; kedalaman laporan administrasi masih perlu diperjelas.",
      },
      skillsAlignment: {
        score: 19,
        maxScore: 25,
        rationale:
          "Data entry, pengarsipan, spreadsheet, dan komunikasi tertulis selaras dengan tugas utama.",
      },
      experienceEvidence: {
        score: 14,
        maxScore: 20,
        rationale:
          "Sekretariat sekolah dan usaha keluarga memberi bukti informal yang relevan, termasuk contoh dokumen dengan data fiktif.",
      },
      educationTraining: {
        score: 8,
        maxScore: 10,
        rationale:
          "SMK Manajemen Perkantoran dan pelatihan Data Management Staff mendukung konteks pembelajaran peran.",
      },
      practicalReadiness: {
        score: 3,
        maxScore: 5,
        rationale:
          "Kandidat siap melamar, tetapi perlu menyiapkan contoh laporan ringkas dan penjelasan kontrol kualitas data.",
      },
    },
    verdict: "APPLY_NOW",
    readinessSummary:
      "Anda sudah cukup siap untuk melamar posisi administrasi pemula ini. Pengalaman di sekretariat sekolah, pengarsipan, rekap spreadsheet, dan pemeriksaan kelengkapan data mendukung kebutuhan utama lowongan. Kemampuan Excel dan Word juga sudah memiliki contoh penggunaan, bukan sekadar tercantum sebagai daftar keahlian. Supaya lebih meyakinkan, siapkan satu contoh laporan administrasi ringkas yang dapat ditunjukkan tanpa membuka data pribadi.",
    candidateStrengths: [
      "Pernah memeriksa kelengkapan data dan memperbarui daftar kehadiran.",
      "Memiliki pengalaman organisasi yang relevan dengan pengarsipan dan penjadwalan.",
      "Sudah menyiapkan contoh spreadsheet dan format surat dengan data fiktif.",
    ],
    mainGaps: ["Belum menunjukkan contoh laporan administrasi ringkas."],
    requirementMatches: [
      {
        requirement: "Minimal lulusan SMK atau sederajat",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence: "Profil menyatakan lulusan SMK Manajemen Perkantoran.",
        recommendation:
          "Cantumkan jurusan dan tahun kelulusan secara jelas pada CV.",
      },
      {
        requirement: "Teliti",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Profil menyebut pemeriksaan kelengkapan, pemeriksaan ulang, dan penyatuan data peserta ke format konsisten.",
        recommendation:
          "Siapkan satu cerita singkat tentang cara menemukan atau mencegah kesalahan data.",
      },
      {
        requirement: "Mampu menggunakan Microsoft Excel dan Word",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Excel dan Word tercantum sebagai alat, didukung contoh spreadsheet rekap dan format surat.",
        recommendation:
          "Bawa contoh anonim atau fiktif dan jelaskan fungsi yang benar-benar pernah digunakan.",
      },
      {
        requirement: "Pengalaman menangani dokumen",
        priority: "NICE_TO_HAVE",
        status: "MATCHED",
        evidence:
          "Kegiatan sekretariat melibatkan pengarsipan surat dan pemeriksaan data peserta.",
        recommendation:
          "Jelaskan jenis dokumen, alur penyimpanan, dan cara menjaga kerahasiaan tanpa membuka data pribadi.",
      },
    ],
    riskFactors: [],
    topPriorities: [
      "Siapkan contoh laporan administrasi satu halaman dengan data fiktif.",
      "Susun dua cerita bukti ketelitian dan penentuan prioritas tugas.",
      "Rapikan contoh spreadsheet, surat, dan struktur arsip menjadi satu paket bukti.",
    ],
    roadmap30Days: {
      week1: [
        "Petakan seluruh persyaratan lowongan; hasilkan checklist terpenuhi, belum terbukti, dan bukti pendukung.",
        "Rapikan spreadsheet serta struktur folder dokumen; hasilkan paket contoh tanpa data pribadi.",
      ],
      week2: [
        "Latihan input data dengan pemeriksaan duplikasi, format, dan nilai kosong; hasilkan lembar sebelum-sesudah.",
        "Buat prosedur singkat penamaan serta penyimpanan dokumen; hasilkan checklist satu halaman.",
      ],
      week3: [
        "Buat laporan administrasi satu halaman dari data fiktif; hasilkan ringkasan, tabel, dan catatan tindak lanjut.",
        "Tulis tiga bullet CV yang dapat diverifikasi dari pengalaman sekolah dan usaha keluarga.",
      ],
      week4: [
        "Latih empat jawaban tentang ketelitian, prioritas, pengarsipan, dan kerahasiaan data; gunakan contoh nyata dengan pola situasi-tindakan-hasil.",
        "Kirim satu lamaran yang disesuaikan; hasilkan CV, pesan singkat, dan daftar dokumen final.",
      ],
    },
    evidenceOfCompetenceSuggestions: [
      "Spreadsheet rekap memakai data fiktif dengan format konsisten, pemeriksaan duplikasi, dan catatan validasi.",
      "Contoh struktur pengarsipan dan aturan penamaan dokumen tanpa memakai surat atau identitas pribadi asli.",
      "Laporan administrasi satu halaman yang merangkum data fiktif, temuan, dan tindak lanjut.",
    ],
    cvImprovementPrompt:
      "Saya akan mengunggah CV saya untuk melamar posisi Junior Administrative Staff. Tolong tinjau dan perbaiki CV tersebut dengan memprioritaskan pengalaman yang relevan: mencatat peserta, menyusun jadwal, mengarsipkan surat, memeriksa kelengkapan data, memperbarui daftar kehadiran, serta membuat rekap pemasukan harian saat membantu usaha keluarga. Perjelas ringkasan profil, keterampilan Excel dan Word yang benar-benar pernah digunakan, serta bullet pengalaman agar singkat dan mudah dipahami. Pertahankan semua fakta. Jangan mengarang nama perusahaan, masa kerja, rumus Excel, jumlah dokumen, persentase peningkatan, atau pencapaian lain. Jika detail penting belum ada, beri tanda [perlu dilengkapi] dan tanyakan kepada saya. Hasilkan CV berbahasa Indonesia yang profesional, natural, rapi, dan ramah ATS tanpa bahasa berlebihan atau pengulangan kata kunci.",
    applicationMessage:
      "Yth. Tim Rekrutmen [Nama Perusahaan],\n\nPerkenalkan, saya [Nama Kandidat]. Saya bermaksud melamar posisi Junior Administrative Staff. Selama membantu sekretariat kegiatan sekolah, saya terbiasa mencatat peserta, menyusun jadwal, mengarsipkan surat, dan memeriksa kelengkapan data. Saya juga pernah membuat rekap pemasukan harian saat membantu administrasi usaha keluarga. Pengalaman tersebut membentuk kebiasaan bekerja rapi, teliti, dan konsisten memeriksa kembali hasil pekerjaan.\n\nCV saya telah dilampirkan sebagai bahan pertimbangan. Saya siap mempelajari prosedur administrasi yang digunakan perusahaan dan dengan senang hati menjelaskan pengalaman saya lebih lanjut dalam wawancara.\n\nTerima kasih atas waktu dan perhatiannya.\n\nHormat saya,\n[Nama Kandidat]",
    interviewPreparation: [
      {
        question: "Bagaimana Anda memastikan data yang dimasukkan akurat?",
        whyItIsAsked:
          "Ketelitian merupakan persyaratan wajib dan berpengaruh langsung pada kualitas administrasi.",
        answerOutline:
          "Gunakan contoh daftar peserta: jelaskan standar format, pemeriksaan kelengkapan, pencarian duplikasi, pemeriksaan ulang, dan cara melaporkan data yang meragukan.",
      },
      {
        question: "Apa yang Anda lakukan ketika dua tugas administrasi sama-sama mendesak?",
        whyItIsAsked:
          "Pewawancara ingin menilai prioritas, komunikasi, dan tanggung jawab.",
        answerOutline:
          "Jelaskan cara membandingkan tenggat dan dampak, mengonfirmasi prioritas kepada penanggung jawab, membagi pekerjaan, dan memperbarui progres.",
      },
      {
        question: "Ceritakan pengalaman menangani dokumen atau arsip.",
        whyItIsAsked:
          "Pengalaman dokumen menjadi nilai tambah dan perlu dibuktikan melampaui daftar keterampilan.",
        answerOutline:
          "Pakai kegiatan sekretariat: jelaskan jenis dokumen, cara penamaan dan penyimpanan, pemeriksaan akses, serta hasil berupa arsip yang lebih mudah ditemukan.",
      },
      {
        question: "Bagaimana Anda menjaga kerahasiaan dokumen dan data?",
        whyItIsAsked:
          "Pekerjaan administrasi sering bersentuhan dengan informasi yang tidak boleh dibagikan sembarangan.",
        answerOutline:
          "Jelaskan kebiasaan membatasi akses, tidak membagikan dokumen tanpa izin, mengunci atau menyimpan berkas sesuai aturan, memakai data fiktif untuk portofolio, dan bertanya kepada penanggung jawab saat ragu.",
      },
    ],
    disclaimer:
      "Analisis ini merupakan panduan kesiapan dan bukan jaminan keputusan rekrutmen.",
  },
  {
    matchScore: 64,
    scoreBreakdown: {
      mustHaveAlignment: {
        score: 27,
        maxScore: 40,
        rationale:
          "Komunikasi dan empati mempunyai bukti awal, tetapi penanganan keluhan serta kesiapan shift belum cukup terverifikasi.",
      },
      skillsAlignment: {
        score: 17,
        maxScore: 25,
        rationale:
          "Mendengarkan, pencatatan, kerja tim, dan eskalasi relevan; penggunaan CRM belum ada.",
      },
      experienceEvidence: {
        score: 11,
        maxScore: 20,
        rationale:
          "Meja informasi dan bazar memberi pengalaman layanan nyata, tetapi belum mencakup pelanggan marah atau kanal telepon.",
      },
      educationTraining: {
        score: 6,
        maxScore: 10,
        rationale:
          "Pelatihan internal organisasi relevan sebagai konteks belajar, tanpa dianggap sebagai sertifikasi formal.",
      },
      practicalReadiness: {
        score: 3,
        maxScore: 5,
        rationale:
          "Kandidat dapat mulai menyiapkan lamaran setelah memastikan jadwal shift dan berlatih skenario keluhan.",
      },
    },
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Anda memiliki dasar layanan pelanggan yang cukup relevan, terutama dari pengalaman di meja informasi dan bazar lingkungan. Dari sana terlihat kemampuan berkomunikasi langsung, mencatat pertanyaan, bekerja sama, dan meneruskan masalah kepada orang yang tepat. Sebelum melamar, pastikan dulu kesiapan bekerja shift dan latih cara menghadapi keluhan karena dua hal itu belum tergambar jelas. Pengalaman CRM hanya nilai tambah, jadi Anda tidak perlu menunggu menguasainya untuk mulai mencoba.",
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
    requirementMatches: [
      {
        requirement: "Komunikasi yang jelas dan sikap empatik",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Profil memuat pengalaman menjawab pertanyaan, mendengarkan, mencatat isu, dan mengarahkan peserta.",
        recommendation:
          "Siapkan satu cerita layanan yang menunjukkan klarifikasi kebutuhan dan komunikasi yang tenang.",
      },
      {
        requirement: "Menangani keluhan dasar dan melakukan eskalasi",
        priority: "MUST_HAVE",
        status: "PARTIAL",
        evidence:
          "Eskalasi kepada panitia pernah dilakukan, tetapi profil belum memberi contoh pelanggan kecewa atau keluhan yang diselesaikan.",
        recommendation:
          "Latih tiga skenario keluhan dan jelaskan batas kapan masalah harus diteruskan.",
      },
      {
        requirement: "Bersedia bekerja dalam jadwal shift",
        priority: "MUST_HAVE",
        status: "NOT_EVIDENCED",
        evidence: "Kesiapan jadwal shift tidak dijelaskan dalam profil.",
        recommendation:
          "Periksa jadwal, transportasi, dan batas kondisi pribadi sebelum menyatakan kesiapan secara jujur.",
      },
      {
        requirement: "Pengalaman menggunakan CRM",
        priority: "NICE_TO_HAVE",
        status: "NOT_EVIDENCED",
        evidence: "Profil secara eksplisit menyatakan belum pernah memakai CRM.",
        recommendation:
          "Pelajari konsep tiket, status, catatan interaksi, dan eskalasi melalui simulasi gratis; nilai tambah ini tidak perlu menunda lamaran.",
      },
    ],
    riskFactors: ["Kesiapan jadwal shift perlu dipastikan sebelum melamar."],
    topPriorities: [
      "Pastikan kesiapan shift, transportasi, dan batas jadwal sebelum melamar.",
      "Latih penanganan keluhan dasar serta keputusan eskalasi.",
      "Buat simulasi pencatatan layanan yang menyerupai alur tiket CRM.",
    ],
    roadmap30Days: {
      week1: [
        "Pelajari alur mendengar, mengklarifikasi, merangkum, dan mengonfirmasi solusi; hasilkan checklist percakapan satu halaman.",
        "Tinjau tuntutan shift dan transportasi; hasilkan batas jadwal yang dapat disampaikan secara jujur.",
      ],
      week2: [
        "Latih tiga skenario keluhan melalui chat dan telepon; hasilkan rekaman atau transkrip evaluasi mandiri.",
        "Tentukan kapan melakukan eskalasi; hasilkan diagram alur sederhana dengan tiga tingkat urgensi.",
      ],
      week3: [
        "Buat FAQ, skrip respons, dan checklist kualitas; hasilkan paket bukti memakai data fiktif.",
        "Simulasikan pencatatan tiket di spreadsheet; hasilkan kolom status, waktu, ringkasan, dan tindak lanjut.",
      ],
      week4: [
        "Latih empat pertanyaan wawancara layanan; hasilkan jawaban yang tetap jujur dan bertumpu pada pengalaman meja informasi.",
        "Sesuaikan CV dan pesan lamaran; hasilkan paket lamaran yang menonjolkan komunikasi tanpa mengklaim pengalaman CRM.",
      ],
    },
    evidenceOfCompetenceSuggestions: [
      "Tiga skrip respons pelanggan dan simulasi penyelesaian keluhan fiktif melalui chat serta telepon.",
      "Alur eskalasi yang membedakan masalah rutin, mendesak, dan di luar kewenangan.",
      "Spreadsheet tiket simulasi berisi waktu, kanal, ringkasan, status, tindak lanjut, dan data pelanggan fiktif.",
    ],
    cvImprovementPrompt:
      "Saya akan mengunggah CV saya untuk melamar posisi Entry-Level Customer Service. Tolong tinjau dan perbaiki CV tersebut dengan menonjolkan pengalaman layanan yang benar-benar saya miliki: menjawab pertanyaan peserta di meja informasi, mencatat pertanyaan berulang, meneruskan masalah kepada panitia terkait, menyusun FAQ, dan menyambut pengunjung di bazar lingkungan. Ubah pengalaman organisasi tersebut menjadi bullet yang profesional tanpa menyebutnya sebagai pekerjaan formal. Selaraskan ringkasan profil dan keterampilan dengan komunikasi, empati, pencatatan, kerja tim, dan eskalasi. Jangan mengarang pengalaman menangani pelanggan marah, bekerja shift, menggunakan CRM, angka layanan, atau pencapaian lain. Tandai informasi yang masih dibutuhkan dengan [perlu dilengkapi] dan ajukan pertanyaan kepada saya. Hasilkan CV berbahasa Indonesia yang natural, jujur, ringkas, dan ramah ATS.",
    applicationMessage:
      "Yth. Tim Rekrutmen [Nama Perusahaan],\n\nPerkenalkan, saya [Nama Kandidat]. Saya tertarik melamar posisi Entry-Level Customer Service. Pengalaman membantu meja informasi pada acara sekolah dan bazar lingkungan melatih saya untuk mendengarkan pertanyaan, memberikan penjelasan dengan tenang, mencatat kebutuhan pengunjung, serta meneruskan masalah kepada penanggung jawab yang tepat. Saya juga pernah menyusun daftar pertanyaan umum agar panitia dapat memberikan informasi secara lebih konsisten.\n\nSaya ingin mengembangkan pengalaman tersebut dalam lingkungan layanan pelanggan yang lebih profesional. CV telah saya lampirkan sebagai bahan pertimbangan, dan saya siap mengikuti proses seleksi serta mempelajari prosedur layanan yang berlaku.\n\nTerima kasih atas waktu dan perhatiannya.\n\nHormat saya,\n[Nama Kandidat]",
    interviewPreparation: [
      {
        question: "Bagaimana Anda menghadapi pelanggan yang marah?",
        whyItIsAsked:
          "Peran memerlukan pengendalian emosi, empati, klarifikasi, dan kepatuhan pada batas kewenangan.",
        answerOutline:
          "Karena profil belum memiliki kejadian nyata, nyatakan itu lalu jelaskan pendekatan: tetap tenang, dengarkan tanpa memotong, rangkum masalah, tawarkan langkah yang berwenang, dan eskalasi bila perlu.",
      },
      {
        question: "Kapan sebuah keluhan perlu dieskalasikan?",
        whyItIsAsked:
          "Pewawancara menilai kemampuan membedakan masalah rutin dari risiko atau keputusan di luar kewenangan.",
        answerOutline:
          "Gunakan pengalaman meneruskan masalah ke panitia: jelaskan batas informasi yang dimiliki, tingkat urgensi, data yang dicatat, pihak tujuan, dan tindak lanjut kepada pengguna.",
      },
      {
        question: "Bagaimana Anda mencatat interaksi pelanggan agar akurat?",
        whyItIsAsked:
          "Lowongan meminta pencatatan akurat dan penggunaan CRM merupakan nilai tambah.",
        answerOutline:
          "Hubungkan dengan pencatatan pertanyaan acara: sebut waktu, kanal, inti masalah, langkah yang sudah dilakukan, status, dan pihak eskalasi; hindari memasukkan data yang tidak perlu.",
      },
      {
        question: "Mengapa Anda tertarik bekerja di bidang customer service?",
        whyItIsAsked:
          "Pewawancara ingin memahami motivasi Anda dan memastikan pilihan peran ini bukan sekadar lamaran acak.",
        answerOutline:
          "Hubungkan ketertarikan dengan pengalaman membantu orang menemukan informasi, kemampuan tetap tenang saat ramai, dan keinginan belajar menangani layanan melalui prosedur yang lebih terstruktur.",
      },
    ],
    disclaimer:
      "Analisis ini adalah panduan berbasis informasi yang diberikan, bukan jaminan diterima kerja.",
  },
  {
    matchScore: 69,
    scoreBreakdown: {
      mustHaveAlignment: {
        score: 29,
        maxScore: 40,
        rationale:
          "Pendidikan, ketelitian, penerimaan barang, dan stok memiliki bukti; kesiapan shift serta prosedur keselamatan masih perlu dipastikan.",
      },
      skillsAlignment: {
        score: 18,
        maxScore: 25,
        rationale:
          "Receiving, picking, packing, dan pencatatan stok manual relevan, sedangkan sistem inventaris digital belum digunakan.",
      },
      experienceEvidence: {
        score: 13,
        maxScore: 20,
        rationale:
          "Usaha keluarga dan seksi perlengkapan memberi bukti kerja informal yang langsung berkaitan dengan alur barang.",
      },
      educationTraining: {
        score: 6,
        maxScore: 10,
        rationale:
          "Latar SMK dan pengarahan internal memberi fondasi, tetapi tidak membuktikan pelatihan keselamatan yang terstandar.",
      },
      practicalReadiness: {
        score: 3,
        maxScore: 5,
        rationale:
          "Kartu stok sudah tersedia; kesiapan shift, keselamatan, dan adaptasi sistem perlu diperjelas sebelum seleksi.",
      },
    },
    verdict: "APPLY_WITH_IMPROVEMENTS",
    readinessSummary:
      "Pengalaman membantu toko keluarga sudah memberi Anda dasar yang relevan untuk posisi Warehouse Staff. Anda pernah menerima dan menghitung barang, mencocokkannya dengan pesanan, menyiapkan paket, mencatat stok, serta melaporkan selisih. Sebelum melamar, pastikan kesiapan untuk bekerja shift dan pahami tuntutan fisik serta prosedur keselamatan dasarnya. Pengalaman dengan sistem inventaris digital dapat dilatih lewat simulasi dan tidak perlu menutupi nilai pengalaman manual yang sudah Anda punya.",
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
    requirementMatches: [
      {
        requirement: "Minimal lulusan SMA atau SMK",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence: "Profil menyatakan kandidat merupakan lulusan SMK.",
        recommendation:
          "Cantumkan pendidikan dengan jelas dan siapkan salinan dokumen hanya bila diminta melalui proses resmi.",
      },
      {
        requirement: "Teliti dalam menerima, mencatat, dan menyiapkan barang",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence:
          "Kandidat pernah membandingkan barang datang dengan pesanan, mencatat stok, dan melaporkan selisih.",
        recommendation:
          "Siapkan contoh konkret tentang selisih barang dan langkah pemeriksaannya dari awal sampai pelaporan.",
      },
      {
        requirement: "Bersedia bekerja shift",
        priority: "MUST_HAVE",
        status: "NOT_EVIDENCED",
        evidence: "Profil belum menyatakan kesiapan bekerja shift.",
        recommendation:
          "Pastikan jadwal, transportasi, kondisi fisik, dan waktu istirahat sesuai sebelum memberi komitmen.",
      },
      {
        requirement: "Menjaga area kerja sesuai prosedur keselamatan",
        priority: "MUST_HAVE",
        status: "PARTIAL",
        evidence:
          "Profil menyebut pengarahan keselamatan dasar, tetapi prosedur spesifik yang dipahami belum dijelaskan.",
        recommendation:
          "Pelajari housekeeping, APD, pengangkatan aman, jalur material, dan pelaporan bahaya sesuai prosedur tempat kerja.",
      },
      {
        requirement: "Pengalaman menggunakan sistem inventaris",
        priority: "NICE_TO_HAVE",
        status: "NOT_EVIDENCED",
        evidence:
          "Kandidat baru menggunakan kartu stok dan spreadsheet dasar.",
        recommendation:
          "Latih konsep lokasi, SKU, penerimaan, pengeluaran, stock opname, dan selisih pada simulasi spreadsheet.",
      },
    ],
    riskFactors: ["Pastikan tuntutan shift sesuai kondisi kandidat."],
    topPriorities: [
      "Pastikan kesiapan shift dan tuntutan fisik sebelum memberi komitmen.",
      "Pelajari serta dapat menjelaskan prosedur keselamatan gudang dasar.",
      "Ubah kartu stok menjadi simulasi inventaris digital yang dapat diperiksa.",
    ],
    roadmap30Days: {
      week1: [
        "Pelajari receiving, penyimpanan, picking, packing, dan pengiriman; hasilkan diagram alur satu halaman.",
        "Pelajari keselamatan gudang dasar tanpa menjalankan alat yang tidak berwenang; hasilkan checklist bahaya, APD, dan pelaporan.",
      ],
      week2: [
        "Latihan stock opname dan pencatatan selisih memakai data fiktif; hasilkan rekap stok awal, aktual, selisih, dan catatan.",
        "Simulasikan penempatan barang berdasarkan kode lokasi; hasilkan daftar lokasi dan aturan label sederhana.",
      ],
      week3: [
        "Rapikan kartu stok, checklist receiving, picking, dan packing; hasilkan paket bukti tanpa data usaha asli.",
        "Buat laporan selisih satu halaman; hasilkan kronologi, pemeriksaan, dan tindak lanjut yang tidak menyalahkan pihak tanpa bukti.",
      ],
      week4: [
        "Latih empat jawaban tentang selisih stok, ketelitian, keselamatan, dan kesiapan shift berdasarkan pengalaman yang benar-benar Anda miliki.",
        "Sesuaikan CV dan pesan lamaran; hasilkan paket final yang membedakan pengalaman manual dari sistem inventaris digital.",
      ],
    },
    evidenceOfCompetenceSuggestions: [
      "Kartu stok dan inventory tracker memakai SKU, lokasi, transaksi, serta data barang fiktif.",
      "Checklist receiving, picking, dan packing dengan titik pemeriksaan jumlah, kondisi, label, serta status.",
      "Laporan selisih stok satu halaman yang memuat kronologi, pemeriksaan, dan tindak lanjut tanpa data usaha asli.",
    ],
    cvImprovementPrompt:
      "Saya akan mengunggah CV saya untuk melamar posisi Warehouse Staff. Tolong tinjau dan perbaiki CV tersebut dengan menonjolkan pengalaman informal yang relevan: menerima dan menghitung barang, menyusun produk, menyiapkan pesanan, mencatat stok manual, membandingkan barang datang dengan catatan pesanan, melaporkan selisih, serta mencatat peminjaman perlengkapan sekolah. Nyatakan pengalaman di toko keluarga secara jujur sebagai pengalaman informal, bukan pekerjaan formal jika memang tidak ada hubungan kerja resmi. Rapikan ringkasan profil, keterampilan, dan bullet pengalaman agar selaras dengan tugas gudang. Jangan mengarang pengalaman memakai WMS, sertifikat forklift, kesiapan shift, jumlah barang, lama kerja, atau angka produktivitas. Tandai detail yang belum tersedia dengan [perlu dilengkapi] dan tanyakan kepada saya. Hasilkan CV berbahasa Indonesia yang ringkas, profesional, mudah dipindai, dan ramah ATS.",
    applicationMessage:
      "Yth. Tim Rekrutmen [Nama Perusahaan],\n\nPerkenalkan, saya [Nama Kandidat]. Saya ingin mengajukan lamaran untuk posisi Warehouse Staff. Saat membantu toko keluarga, saya terbiasa menerima dan menghitung barang, mencocokkan barang datang dengan catatan pesanan, mencatat stok, menyusun produk, serta menyiapkan pesanan. Saya juga pernah mencatat peminjaman dan pengembalian perlengkapan dalam kegiatan sekolah. Pengalaman tersebut membentuk kebiasaan bekerja teliti, rapi, dan bertanggung jawab terhadap barang yang ditangani.\n\nCV saya telah dilampirkan sebagai bahan pertimbangan. Saya siap mempelajari sistem inventaris dan prosedur keselamatan yang digunakan perusahaan serta mengikuti proses seleksi lebih lanjut.\n\nTerima kasih atas waktu dan perhatiannya.\n\nHormat saya,\n[Nama Kandidat]",
    interviewPreparation: [
      {
        question: "Apa yang Anda lakukan jika jumlah barang tidak sesuai catatan?",
        whyItIsAsked:
          "Pewawancara menilai ketelitian, urutan pemeriksaan, dokumentasi, dan batas kewenangan.",
        answerOutline:
          "Gunakan pengalaman toko keluarga: hitung ulang, cocokkan dokumen dan kondisi kemasan, pisahkan barang bermasalah, catat selisih, lalu laporkan kepada penanggung jawab.",
      },
      {
        question: "Bagaimana Anda menjaga ketelitian saat pekerjaan sedang ramai?",
        whyItIsAsked:
          "Gudang membutuhkan kecepatan yang tetap terkendali dan tidak mengorbankan akurasi atau keselamatan.",
        answerOutline:
          "Jelaskan penggunaan urutan kerja, label, checklist, pemisahan area, hitung ulang pada titik kritis, dan komunikasi ketika beban melebihi kapasitas aman.",
      },
      {
        question: "Apa yang Anda lakukan jika melihat kondisi kerja yang tidak aman?",
        whyItIsAsked:
          "Lowongan menyebut prosedur keselamatan dan profil belum memberi bukti mendalam tentang penerapannya.",
        answerOutline:
          "Jelaskan bahwa Anda tidak memaksakan pekerjaan, mengamankan jarak bila memungkinkan, memberi tahu rekan, melapor sesuai prosedur, dan hanya bertindak dalam pelatihan serta kewenangan yang dimiliki.",
      },
      {
        question: "Apakah Anda siap bekerja shift dan melakukan pekerjaan fisik?",
        whyItIsAsked:
          "Kesiapan shift merupakan persyaratan wajib, sedangkan pekerjaan gudang menuntut komitmen yang realistis terhadap jadwal dan kondisi kerja.",
        answerOutline:
          "Jawab sesuai kondisi sebenarnya setelah memeriksa jadwal, transportasi, kesehatan, dan kebutuhan istirahat. Jika ada batasan, sampaikan dengan jelas tanpa menjanjikan kesiapan yang belum pasti.",
      },
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
