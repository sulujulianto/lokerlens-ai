import { AnalysisResponse } from "./types";

export const mockAnalyses: Record<number, AnalysisResponse> = {
  0: {
    matchScore: 78,
    verdict: "Apply with improvements",
    summary: "Kamu memiliki dasar-dasar pengembangan aplikasi web berbasis React yang mumpuni dengan proyek nyata. Namun, lowongan ini secara eksplisit meminta pemahaman TypeScript dan state management yang matang (Redux/React Query). Dengan bimbingan rute belajar 30 hari, kamu sangat layak bersaing.",
    strengths: [
      "Pemahaman React.js fungsional modern yang baik (hooks, context, lifecycle)",
      "Kemampuan menulis styling responsif modern menggunakan utility framework Tailwind CSS",
      "Proyek portfolio (ChatApp, StoreFront) yang relevan dan menggunakan studi kasus industri nyata"
    ],
    missingSkills: [
      "Kurangnya pengalaman atau bukti kemampuan formal menulis kode TypeScript lambat-laun di repository kamu",
      "Belum terbiasa dengan tools state-management yang diminta (Redux atau React Query)",
      "Tidak disebutkan kebiasaan dalam melakukan unit testing atau uji komponen"
    ],
    mustHaveRequirements: [
      "React.js & JavaScript (ES6+)",
      "Kemampuan integrasi API & manajemen state",
      "Version control via Git"
    ],
    niceToHaveRequirements: [
      "Familiarity dengan TypeScript",
      "Redux atau React Query",
      "Kebiasaan pengujian kode / Testing"
    ],
    risks: [
      "Perusahaan mengharuskan WFO (Work From Office) di Jakarta Timur/Selatan secara penuh, pastikan mobilitas fisik aman",
      "Loker tidak mencantumkan range kompensasi dasar yang jelas"
    ],
    roadmap30Days: {
      week1: [
        "Pelajari tipe data primitif, interface, type aliases, dan generic dasar di playground TypeScript.",
        "Migrasikan proyek personal kamu (StoreFront) dari .jsx ke .tsx sepenuhnya."
      ],
      week2: [
        "Definisikan interface untuk payload API data produk dan user state.",
        "Tonton tutorial dasar TanStack Query (React Query) selama 2 jam."
      ],
      week3: [
        "Ganti implementasi fetch manual di StoreFront menggunakan useQuery untuk mengelola data yang tersimpan di cache.",
        "Terapkan invalidasi cache saat aksi checkout berhasil dilakukan."
      ],
      week4: [
        "Instal Vitest dan React Testing Library pada proyek utama.",
        "Tulis minimal 3 uji unit pengetesan komponen tombol beli dan validasi keranjang.",
        "Perbarui berkas README.md kamu dengan menyematkan GIF rekaman layar dan diagram alur state aplikasi."
      ]
    },
    portfolioSuggestions: [
      "Konversi proyek StoreFront ke TypeScript (.tsx) dan tunjukkan di halaman depan GitHub kamu.",
      "Integrasikan React Query di StoreFront untuk membuktikan keahlian caching/manajemen sinkronisasi server.",
      "Buat dokumentasi README.md yang terstruktur menggunakan format STAR (Situation, Task, Action, Result) untuk proyek ChatApp."
    ],
    cvBulletSuggestions: [
      "Mengembangkan aplikasi e-commerce responsif menggunakan React.js dan Tailwind CSS yang mendukung visualisasi grid produk real-time bagi pengguna umum.",
      "Mengimplementasikan sinkronisasi state dan optimasi pemanggilan API via React Context, meminimalisir re-render tak perlu sebesar 15%."
    ],
    applicationMessage: "Halo tim HRD recruitment, perkenalkan saya alumni bootcamp Full-stack Web Development yang sangat antusias dengan peluang Junior Frontend Developer yang sedang dibuka. Berdasarkan portfolio saya yang berfokus pada pengembangan komponen React modern dan responsive clean UI, serta kesiapan saya untuk cepat mengadopsi TypeScript, saya yakin dapat memberi kontribusi positif dalam merancang visual web yang berdaya tahan tinggi. Terlampir berkas lamaran dan tautan GitHub interaktif saya untuk pertimbangan lebih lanjut. Terima kasih!",
    disclaimer: "Ulasan evaluasi ini merupakan analisis prediktif berbasis kecerdasan buatan dari LokerLens AI dan bukan jaminan penerimaan kerja. Wajib divalidasi mandiri sesuai perkembangan bursa karier."
  },
  1: {
    matchScore: 82,
    verdict: "Apply now",
    summary: "Asisten penilai menilai bahwa sebagai lulusan SMK RPL yang sudah berpengalaman magang dan memiliki portofolio API nyata berbasis PostgreSQL, kualifikasi kamu sangat sesuai dengan tuntutan lowongan ini. Kamu bisa langsung mengirim lamaran sambil sedikit memperkuat pemahaman JWT & Docker.",
    strengths: [
      "Memiliki latar belakang pendidikan formal kejuruan rekayasa perangkat lunak (RPL)",
      "Mempunyai portofolio backend konkret berbasis Node.js/Express dan relational database",
      "Pernah magang nyata di software house, mengindikasikan telah terbiasa bekerja secara tim dan ritme industri"
    ],
    missingSkills: [
      "Belum menunjukkan pemahaman orisinal tentang deployment, kontainerisasi (Docker), atau teknologi caching (Redis)",
      "Tidak disebutkan keahlian dokumentasi API yang rapi seperti Swagger"
    ],
    mustHaveRequirements: [
      "Keterampilan JavaScript Node.js & Express.js",
      "Kemampuan query relational database (MySQL/PostgreSQL)",
      "Version control via Git"
    ],
    niceToHaveRequirements: [
      "Pemahaman deployment dasar",
      "JWT Authentication",
      "Penggunaan Docker"
    ],
    risks: [
      "Lowongan menerapkan hybrid working, butuh koordinasi disiplin mandiri yang kuat",
      "Tanggung jawab menulis kode yang terdokumentasi dengan baik membutuhkan portofolio backend dengan spec API terbuka"
    ],
    roadmap30Days: {
      week1: [
        "Implementasikan middleware JWT Auth yang kokoh pada proyek E-Library REST API kamu.",
        "Tulis spesifikasi Swagger menggunakan swagger-jsdoc untuk memudahkan pengembang frontend."
      ],
      week2: [
        "Sematkan pengujian login dengan postman run-collection.",
        "Tulis berkas Dockerfile sederhana untuk membungkus proyek Express API kamu."
      ],
      week3: [
        "Gunakan docker-compose untuk menjalankan web backend dan database PostgreSQL secara simultan dalam kontainer lokal.",
        "Pastikan variabel lingkungan terkonfigurasi dengan aman (.env) di luar container."
      ],
      week4: [
        "Lakukan indexing pada kolom-kolom query pencarian terpopuler (misal judul buku atau user ID).",
        "Tambahkan Redis dasar untuk menyimpan cache dari rute data statis perpustakaan.",
        "Rilis API kamu ke server gratis seperti Render / Fly.io dan lampirkan link live server di GitHub."
      ]
    },
    portfolioSuggestions: [
      "Sematkan skema database relasional (ERD) yang terperinci di dalam README.md proyek backend kamu.",
      "Sediakan link dokumentasi Postman Public Workspace agar rekruter bisa langsung mencoba API kamu secara daring.",
      "Gunakan Docker Compose di repositori GitHub sebagai bukti paham workflow orkestrasi kontainer dasar."
    ],
    cvBulletSuggestions: [
      "Merancang dan membangun RESTful API perpustakaan online menggunakan Express.js serta PostgreSQL, dilengkapi autentikasi JWT untuk keamanan akses data end-user.",
      "Mengoptimalkan performa response-time API CRUD admin panel hingga 20% lewat penerapan index tabel terarah selama masa magang industri."
    ],
    applicationMessage: "Selamat pagi/siang tim rekrutmen perusahaan. Saya adalah lulusan SMK jurusan Rekayasa Perangkat Lunak dengan pengalaman magang aktif membangun sistem manajemen database internal. Melalui kompetensi backend Node.js, Express, dan PostgreSQL yang saya tunjukkan lewat portofolio API teruji saya di repositori GitHub, saya sangat optimis dapat mendukung tim pengembang dalam menciptakan alur integrasi server yang tangguh. Saya melampirkan portofolio teknis dan CV mutakhir saya untuk ditinjau. Terima kasih banyak atas waktu dan perhatiannya!",
    disclaimer: "Ulasan evaluasi ini merupakan analisis prediktif berbasis kecerdasan buatan dari LokerLens AI dan bukan jaminan penerimaan kerja. Wajib divalidasi mandiri sesuai perkembangan bursa karier."
  },
  2: {
    matchScore: 61,
    verdict: "Not ready yet",
    summary: "Kamu memiliki fondasi yang baik di bidang python script dasar dan analisis data komparatif. Namun, lowongan ini menargetkan junior backend developer yang mahir menggunakan FastAPI, ORM spesifik (SQLAlchemy), dan Docker tingkat intermediate. Ada gap teknologi yang cukup besar sebelum kamu bisa bersaing sehat di pasar kerja backend Python.",
    strengths: [
      "Keahlian Python dasar dan manipulasi berkas data (pandas) yang solid",
      "Gelar akademis sarjana ekonomi mendukung pemahaman bisnis/analitik transaksional",
      "Paham bagaimana mengoperasikan raw SQL untuk mengemas database PostgreSQL"
    ],
    missingSkills: [
      "Belum memiliki riwayat eksplisit dalam membangun API web menggunakan framework FastAPI",
      "Belum memahami implementasi ORM server-side seperti SQLAlchemy",
      "Minimnya eksposur portofolio backend yang menerapkan standar clean architecture atau pengemasan Docker"
    ],
    mustHaveRequirements: [
      "Kemampuan pemrograman Python minimal 1 tahun",
      "Pengalaman kerja HTTP REST API & penanganan error",
      "Pengetahuan database PostgreSQL"
    ],
    niceToHaveRequirements: [
      "Pernah menggunakan FastAPI",
      "SQLAlchemy ORM",
      "Docker container"
    ],
    risks: [
      "Kerjasama jarak jauh (Remote) menuntut kemandirian teknis ekstrem; rekruter berpotensi mencari yang langsung tancap gas tanpa pelatihan ulang dasar."
    ],
    roadmap30Days: {
      week1: [
        "Selesaikan tutorial resmi FastAPI dan pelajari Dependency Injection bawaannya.",
        "Rancang ulang CryptoTracker dari sekadar script scheduler menjadi API endpoints yang menyajikan data rute GET/POST."
      ],
      week2: [
        "Gunakan Pydantic v2 untuk validasi input schema secara ketat.",
        "Pelajari perbedaan raw query dengan representasi objek SQLAlchemy ORM."
      ],
      week3: [
        "Rancang session database asinkron (async session) untuk performa optimal FastAPI.",
        "Tambahkan migrasi database modular dengan alembic."
      ],
      week4: [
        "Buat berkas multi-stage Dockerfile untuk mengemas aplikasi FastAPI berbobot ringan.",
        "Eksplorasi pembuatan task scheduler background menggunakan Arq atau Celery dasar di Python.",
        "Tulis skenario pengujian endpoint menggunakan HTTPX dan pytest."
      ]
    },
    portfolioSuggestions: [
      "Rancang ulang CryptoTracker menjadi aplikasi web API utuh menggunakan FastAPI, lengkap dengan dokumentasi interaktif bawaan (/docs).",
      "Terapkan asinkronisasi penuh (async/await) pada rute database Anda untuk mendemonstrasikan keunggulan teknis Python modern.",
      "Gunakan alembic untuk membuktikan kemampuan mengelola histori migrasi skema tabel database."
    ],
    cvBulletSuggestions: [
      "Membangun API monitoring harga mata uang kripto berbasis FastAPI dengan Pydantic, menghasilkan validasi data real-time yang bersih bagi pipeline pengambil keputusan.",
      "Mengintegrasikan database relasional PostgreSQL menggunakan SQLAlchemy ORM, memisahkan logika kueri transaksional dari inti controller backend."
    ],
    applicationMessage: "Dear Recruiting Team, I am a highly motivated self-taught coder and Economics graduate transitioning into Python Backend Engineering. Having established robust foundational skills in Python scripts and Relational Databases (PostgreSQL) from my previous analytics career, I have dedicated myself to mastering FastAPI, async programming, and clean Docker deployment workflows. I am eager to apply this intense self-directed engineering mindset to your Junior Backend Developer role to deliver bulletproof endpoint services. Please find my portfolio and CV attached. Thank you for your time and consideration.",
    disclaimer: "Ulasan evaluasi ini merupakan analisis prediktif berbasis kecerdasan buatan dari LokerLens AI dan bukan jaminan penerimaan kerja. Wajib divalidasi mandiri sesuai perkembangan bursa karier."
  }
};
