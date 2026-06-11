export interface DemoTemplate {
  name: string;
  roleType: string;
  profile: {
    education: string;
    skills: string;
    projects: string;
    experience: string;
    targetRole: string;
    language: 'Indonesian' | 'English';
  };
  jobPosting: string;
}

export const demoTemplates: DemoTemplate[] = [
  {
    name: "Lulusan SMK & Career Switcher (Junior Web Developer)",
    roleType: "Dioptimasi untuk evaluasi Frontend & Web",
    profile: {
      education: "Lulusan SMK RPL / Career Switcher mandiri (Peralihan dari bidang operasional)",
      skills: "HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Git/GitHub, integrasi REST API, pemeliharaan basis data dasar",
      projects: "- StoreFront: Aplikasi e-commerce responsif buatan sendiri dengan React Context, Tailwind CSS, dan mockup pemrosesan pembayaran.\n- KeranjangBelanja: Aplikasi pengelolaan pengeluaran harian menggunakan grafik interaktif Recharts.\n- Portofolio Karier: Halaman pencapaian web interaktif mandiri yang menyajikan dokumentasi kode terstruktur di GitHub.",
      experience: "1,5 tahun bekerja sebagai Operator Gudang / Staf Operasional Retail. Belajar web development secara mandiri (self-taught) secara intensif selama 8 bulan terakhir.",
      targetRole: "Junior Web Developer",
      language: "Indonesian"
    },
    jobPosting: `Dibutuhkan Segera: Junior Web Developer (Lokasi Jakarta / Penempatan Jabodetabek WFO)

Tanggung Jawab:
- Merancang komponen web yang responsif dengan React.js dan Tailwind CSS.
- Menghubungkan antarmuka pengguna dengan sistem RESTful API backend perusahaan.
- Mengelola repository kode dan berkolaborasi menggunakan Version Control Git.
- Membantu debugging masalah tampilan dan alur interaksi pengguna.

Persyaratan Utama:
- Mahir mendesain UI dinamis berpemikiran modern (React/Javascript).
- Terbiasa berkolaborasi via GitHub, pull request, dan workflow standard.
- Pemahaman dasar manajemen state (React Context/Redux) & caching API.
- Pendidikan minimal SMK Rekayasa Perangkat Lunak (RPL) atau lulusan bootcamp setara.
- Nilai Tambah: Memahami backend dasar Node.js / Express.`
  },
  {
    name: "Lulusan SMK RPL (Junior Backend Developer)",
    roleType: "Dioptimasi untuk evaluasi database & backend",
    profile: {
      education: "SMK (Vocational High School) - Rekayasa Perangkat Lunak (RPL)",
      skills: "Node.js, Express.js, MySQL, PostgreSQL, RESTful API design, Postman, Web socket fundamentals, Git & GitHub",
      projects: "- E-Library REST API: Secure backend for managing book rentals, built with Express and PostgreSQL, containing unit tests.\n- TaskManager API: Express API with JWT authentication and MySQL persistence.",
      experience: "Mempunyai pengalaman magang selama 3 bulan di Software House lokal (membangun dasbor admin operasional CRUD).",
      targetRole: "Junior Backend Engineer",
      language: "Indonesian"
    },
    jobPosting: `Dibutuhkan Segera: Junior Backend Developer (Full-time, Jakarta/Remote Hybrid)

Tanggung Jawab:
- Merancang, memelihara, dan mengoptimalkan RESTful API menggunakan Node.js/Express.
- Mengelola database relational (MySQL / PostgreSQL) dan membuat query yang efisien.
- Menulis kode yang bersih, terdokumentasi dengan baik, dan mudah dipelihara.
- Berkolaborasi dengan Frontend team untuk integrasi API dan troubleshooting.

Persyaratan Utama:
- Lulusan SMK RPL, Diploma, atau S1 Informatika / sederajat.
- Menguasai JavaScript (Node.js & Express).
- Terbiasa merancang schema database SQL secara optimal.
- Memahami autentikasi seperti JWT (JSON Web Tokens).
- Pernah menggunakan Docker, Redis, atau Cloud platform menjadi nilai tambah yang besar.
- Memiliki portfolio project backend yang aktif di GitHub.`
  },
  {
    name: "Self-taught Career Switcher (Junior Python Backend - English)",
    roleType: "Recommended for Backend estimation (English)",
    profile: {
      education: "Self-taught via Coursera, FreeCodeCamp & YouTube. Bachelor's degree in Economics.",
      skills: "Python, FastAPI, Pandas, SQL (PostgreSQL), REST APIs, Docker basics, Git, English (Intermediate)",
      projects: "- CryptoTracker: A Python script querying CoinGecko API, storing price trends in PostgreSQL, and scheduling alert emails.\n- DataCleaner CLI: Fast command-line interface helper to parse & deduplicate excel/csv files.",
      experience: "1.5 years as Junior Data Analyst in an logistics firm. Managing spreadsheets and basic SQL reports. Wanting to pivot to backend development.",
      targetRole: "Junior Backend Developer",
      language: "English"
    },
    jobPosting: `Junior Python/FastAPI Backend Developer (Remote OK)

Job Description:
- Develop and maintain scalable API microservices using Python and FastAPI.
- Write raw SQL or utilize ORM (SQLAlchemy) to query and store app transaction records.
- Package software codebases into Docker containers.
- Work within a small team using Agile methodology (Jira, daily standups).

Requirements:
- At least 1 year of practical script writing or basic application building in Python.
- Understanding of HTTP protocols, REST architectural style, and error handling.
- Basic understanding of Relational Databases (PostgreSQL/MySQL) and Docker.
- Good communication in English (written and spoken).`
  }
];
