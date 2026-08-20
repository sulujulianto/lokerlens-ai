# Catatan Perubahan

Seluruh perubahan penting pada **LokerLens AI** dicatat dalam dokumen ini.
Entri rilis historis menjelaskan implementasi dan redaksi pada rilis masing-
masing; status pengembangan terkini dicatat pada bagian **Belum Dirilis**.

## [Belum Dirilis]

### Ditambahkan

- Lisensi MIT dan tangkapan layar aplikasi yang ditujukan bagi perekrut,
  diambil dari alur demo luring sebenarnya.
- Dokumen evaluasi langsung khusus yang memisahkan bukti teramati dari CI
  deterministik dan menyatakan batas klaim secara eksplisit.
- Kontrak permintaan dan respons Zod bersama untuk alur analisis V2
  ternormalisasi.
- Antarmuka sisi server netral terhadap penyedia, pemilih penyedia, adaptor Gemini
  dan OpenAI, penyusun instruksi model, pengurai respons, serta layanan analisis.
- Katalog bersama yang mencakup 29 pengenal rumpun pekerjaan stabil dalam
  tujuh kelompok antarmuka, dengan konteks sumber, penyedia, dan program
  pelatihan opsional.
- Panduan khusus untuk TI & Digital, Administrasi, Layanan Pelanggan, serta
  Operasional/Gudang/Logistik, dengan mekanisme cadangan konservatif bagi bidang lain
  yang didukung.
- Dasbor hasil ternormalisasi dengan persyaratan, risiko, peta jalan empat
  minggu, saran bukti kompetensi, instruksi perbaikan CV yang dapat digunakan
  ulang, pesan lamaran, pertanyaan wawancara, dan penafian.
- Rincian skor berbasis bukti pada lima dimensi tetap, pencocokan persyaratan
  dengan status serta langkah berikutnya, prioritas terurut, dan persiapan
  wawancara dengan kerangka jawaban.
- Empat skenario demo luring deterministik yang tidak memerlukan kunci API.
- Pengujian deterministik terfokus untuk skema, modul sisi server, kompatibilitas,
  klien API, formulir, demo, hasil, aksesibilitas, dan perilaku interaksi.
- Dukungan batas waktu penyedia dan pembatalan permintaan secara menyeluruh.
- Pembatasan laju analisis per klien, ID permintaan, header keamanan Helmet, CSP
  produksi ketat, Permissions Policy, dan tembolok aset yang tidak dapat diubah.
- GitHub Actions CI untuk pemeriksaan tipe, lint, pengujian, pembuatan paket produksi,
  dan audit dependensi.
- Konfigurasi datar ESLint untuk TypeScript, React Hooks, dan Vite Fast Refresh,
  dengan gerbang lint eksplisit di CI serta paket tipe React yang dideklarasikan.
- Laporan cakupan V8 untuk seluruh kode aplikasi dengan ambang global 75%
  untuk pernyataan, cabang, fungsi, dan baris yang ditegakkan pada CI.
- Pengujian integrasi HTTP untuk kesehatan layanan, analisis, validasi,
  kegagalan penyedia, API 404, batas badan permintaan, pembatasan laju, header
  keamanan, dan CSP produksi.
- E2E Playwright Chromium untuk paket produksi, proses awal tanpa penyedia,
  isolasi demo luring, perilaku fokus/pengaturan ulang, serta pemeriksaan luapan pada lebar
  seluler yang ditegakkan di CI.
- Pemeriksaan axe-core otomatis untuk pelanggaran WCAG A/AA pada formulir awal
  dan hasil luring serta pengujian pengaturan ulang melalui papan ketik pada tingkat peramban.
- Cakupan Playwright lintas peramban di Chromium dan Firefox, termasuk
  pemeriksaan pengurangan gerakan yang memastikan animasi indikator pemuatan berhenti ketika
  preferensi sistem operasi meminta pengurangan gerakan.
- Panduan QA manual untuk rilis beserta pemeriksaan pendukung lintas peramban
  untuk penyesuaian tata letak 360–768 px, proksi pembesaran 200%, navigasi demo
  hanya dengan papan ketik, pemulihan fokus, dan pengurangan pengguliran serta transisi.
- Panduan persiapan penerapan yang netral terhadap penyedia dan templat
  variabel lingkungan produksi yang mencakup perintah saat aplikasi berjalan,
  pemeriksaan kesehatan, nilai rahasia, kondisi penghentian biaya, risiko
  proksi/pembatasan laju, observabilitas, bukti privasi, validasi uji terbatas, dan
  pemulihan tanpa memilih atau menyediakan layanan hosting.
- Catatan keputusan konteks produk yang mencakup asal Juara Vibe Coding,
  sasaran awal orang yang memasuki TI, alasan profil manual, perkembangan V1
  ke V2, dan batas klaim eksplisit.
- Pengujian interaksi jsdom untuk pemilihan demo, pengaturan ulang, pengiriman langsung,
  dan penampilan hasil.
- Pengujian Structured Outputs pada OpenAI Responses API dengan penyimpanan
  respons dinonaktifkan, kegagalan ternormalisasi, dan tanpa identitas penyedia pada
  antarmuka.
- Cakupan kegagalan deterministik adaptor Gemini/OpenAI untuk respons kosong,
  rusak, ditolak, melewati batas waktu, dan gagal, ditambah permintaan panjang dwibahasa
  dengan pengalaman informal pada batas skema, instruksi model, dan HTTP.
- Skrip evaluasi Gemini langsung yang dapat diulang untuk tiga proses pengembang antarmuka
  serta skenario Administrasi, Layanan Pelanggan, Gudang, Kuliner, dan
  Pemeliharaan AC; evaluasi 8/8 yang diperluas selesai tanpa peringatan otomatis.

### Diubah

- Navigasi Playwright kini memeriksa respons dokumen yang telah diterima dan
  judul aplikasi eksplisit, bukan bergantung pada peristiwa siklus hidup peramban
  yang dapat berhenti sesekali di Firefox.
- Halaman awal repositori disusun ulang untuk menampilkan posisi produk,
  bukti rekayasa, arsitektur, verifikasi, status rilis, dan navigasi langsung
  menuju dokumentasi teknis.
- Ringkasan arsitektur berbasis teks diganti dengan diagram sistem dan siklus
  permintaan serta batas kepercayaan, data, dan kegagalan yang eksplisit.
- Posisi proyek diperluas dari prototipe tantangan yang berfokus pada TI menjadi
  asisten kesiapan kerja lintas bidang yang mengutamakan input manual bagi pelamar pemula
  Indonesia.
- Alasan input manual diperjelas sebagai cara menampilkan bukti yang sering
  hilang dari CV tingkat pemula yang ringkas, sekaligus membedakan cakupan
  tantangan Google AI Studio/Gemini dari sistem V2 netral terhadap penyedia.
- Antarmuka dimigrasikan menuju kontrak permintaan dan respons V2 ternormalisasi.
- Pemilihan penyedia dan kredensial dipindahkan sepenuhnya ke balik API server.
- Tanggung jawab sisi server dipisahkan menjadi konfigurasi, penyedia, instruksi
  model, penguraian, layanan, rute, dan modul kompatibilitas.
- Tata letak bagian utama/formulir terpisah diganti dengan satu alur baca terurut,
  sedangkan pasangan properti ringkas hanya dipertahankan pada lebar desktop.
- Sistem visual diubah menjadi palet putih–abu-abu kebiruan yang tenang dengan aksen
  indigo terbatas, batas formulir netral, dan jarak seluler lebih kuat.
- Properti penyedia dan program pelatihan diubah menjadi masukan teks bebas tanpa
  daftar saran peramban.
- Setiap profil demo luring dilengkapi agar pemilihan skenario mengisi seluruh
  formulir dan memberikan contoh menyeluruh yang konkret.
- Setiap hasil demo luring diperluas agar mencerminkan kontrak analisis
  langsung lengkap, termasuk alasan skor, bukti persyaratan, keluaran mingguan
  terukur, instruksi perbaikan CV, dan panduan wawancara.
- Redaksi hasil disempurnakan dengan suara penasihat yang lebih alami, pesan
  lamaran profesional yang siap disunting, dan persiapan wawancara yang
  distandardisasi menjadi tepat empat pertanyaan.
- Status persyaratan dan penilaian wajib dikalibrasi, waktu melamar
  diselaraskan dengan kesimpulan, dan ketidakpastian spesifik lowongan diwajibkan.
- `README` disusun ulang berdasarkan perilaku produk, pengaturan lokal,
  evaluasi Gemini langsung, batas privasi, dan gerbang rilis yang tersisa.
- Tata letak responsif, struktur semantik, pelabelan formulir, navigasi papan ketik,
  penanganan fokus, perilaku demo/pengaturan ulang, dan penampilan konten panjang
  ditingkatkan.
- Sistem visual diolah menjadi antarmuka karier vokasi yang lebih hangat dengan
  hierarki lebih jelas, contoh terkelompok, dan bahasa yang tidak terlalu
  berorientasi pengembang.
- Panduan bukti khusus bidang diperluas dari empat belas menjadi dua puluh tujuh
  rumpun karier, dengan mekanisme cadangan konservatif untuk kategori terbuka.
- Dependensi kompatibel diperbarui dalam batas versi mayor yang sama dan
  versi paket diselaraskan dengan `v2.0.0-dev`.
- Adaptor permintaan dan respons V1 sementara dipertahankan selama migrasi.
- Pemeriksaan tipe TypeScript dipisahkan dari ESLint agar setiap gerbang CI melaporkan
  tanggung jawab sebenarnya.
- Penyusunan aplikasi Express diekstrak dari titik masuk proses sehingga batas
  perangkat perantara (*middleware*) dan rute HTTP lengkap dapat diuji tanpa
  memulai Vite atau mengikat proses ke port produksi.
- Narasi dokumentasi publik diterjemahkan ke bahasa Indonesia formal dan
  profesional, sementara pengenal kode, perintah, nama teknologi, dan teks
  resmi lisensi tetap dipertahankan.

### Diperbaiki

- Pemulihan terbatas ditambahkan untuk batas waktu navigasi dokumen awal
  Playwright setelah server produksi terbukti sehat, sehingga hambatan
  transport Firefox tidak menghabiskan seluruh percobaan ulang pengujian.
- Kontras metadata demo, nomor skenario, pemisah bagian, dan penyebut skor
  ditingkatkan agar status formulir/hasil yang diuji memenuhi pemeriksaan
  kontras warna WCAG 2 AA oleh axe-core.
- Konsistensi saat aplikasi berjalan antara rentang skor kecocokan dan pengenal kesimpulan stabil
  ditegakkan.
- Lima komponen skor diwajibkan berjumlah sama dengan skor akhir; setiap minggu
  peta jalan harus memiliki beberapa tindakan; serta struktur persyaratan dan
  wawancara harus lengkap sebelum hasil mencapai antarmuka.
- Saran butir CV yang ambigu diganti dengan satu instruksi yang mempertahankan
  fakta untuk digunakan bersama CV pengguna pada alat AI terpisah.
- Respons penyedia yang rusak atau tidak lengkap ditolak sebelum mencapai
  antarmuka.
- Bagian hasil kosong, keadaan analisis tidak tersedia, galat jaringan, JSON
  tidak valid, pengiriman ganda, dan pengatur waktu demo distabilkan.
- Kode kegagalan API ternormalisasi diterjemahkan menjadi pesan bahasa Indonesia
  yang konsisten.
- Area teks kekuatan pribadi dan bukti disejajarkan dengan memindahkan panduan
  ke placeholder dan memberikan tinggi awal yang sama.
- Keluaran bahasa Indonesia yang kembali memakai sapaan informal, berbicara atas
  nama asisten menggunakan `kami`, atau mengklaim kelulusan/sertifikasi tanpa
  bukti profil ditolak.
- Variasi keluaran Gemini dikurangi dan batas status pelatihan khusus kandidat
  serta pemeriksaan kepatuhan akhir ditambahkan tanpa melemahkan validasi.
- Jalur Gemini yang distabilkan diverifikasi melalui enam evaluasi langsung,
  termasuk tiga proses pengembang antarmuka dengan satu kesimpulan dan rentang dua poin.
- Pembaruan status pemuatan sinkron di dalam efek React dihapus dan fungsi bantu
  presentasi kesimpulan dipisahkan dari modul komponen untuk perilaku Fast Refresh
  yang andal.
- Fokus dipulihkan menuju aksi demo luring ketika pengguna papan ketik kembali
  dari hasil yang dirender.

### Keamanan

- Validasi permintaan dan respons penyedia yang ketat ditambahkan dengan batas
  properti, daftar, dan badan permintaan.
- Batas instruksi model ditambahkan agar profil kandidat dan teks lowongan diperlakukan
  sebagai data tidak tepercaya.
- Galat publik dinormalisasi agar keluaran mentah penyedia, instruksi model,
  kredensial, jejak tumpukan galat, dan detail SDK tidak diekspos kepada antarmuka.
- Kunci API dipertahankan pada server dan pemilihan penyedia/model dihapus dari
  kontrak antarmuka.
- Header identitas Express dihapus; pembingkaian, skrip, gaya, koneksi, gambar,
  font, kamera, lokasi, dan mikrofon dibatasi.
- Hasil audit npm yang diverifikasi dikurangi menjadi nol kerentanan yang
  diketahui.

## [1.0.0] - 2026-06-11

### Edisi Juara Vibe Coding

Rilis resmi `v1.0.0` dikirimkan sebagai edisi tantangan LokerLens AI untuk
**Juara Vibe Coding** atau kegiatan setara. Rilis ini berfokus pada peningkatan
kesiapan karier melalui analisis cepat kandidat pemula terhadap spesifikasi
pekerjaan yang dituju.

### Fitur yang Ditambahkan

- **Masukan Profil Kandidat Manual**: pengguna memasukkan Peran Tujuan, Latar
  Belakang Pendidikan, Keahlian, Detail Proyek dan Studi Kasus Unggulan, serta
  Pengalaman Kerja Praktik/Magang secara terpisah daripada memproses berkas
  statis yang tidak selalu dapat dibaca dengan andal.
- **Masukan Lowongan**: menerima teks iklan pekerjaan yang ditempelkan untuk
  menyelaraskan keterampilan kandidat dengan persyaratan perekrut.
- **Analisis Gemini**: menggunakan Gemini 3.5 Flash pada server melalui SDK
  modern `@google/genai` untuk evaluasi karier terstruktur.
- **Perlindungan Injeksi Instruksi**: instruksi sistem diperketat agar
  instruksi dari profil kandidat atau teks lowongan tidak mengalihkan model
  dari tugas utama.
- **Batas Ukuran Permintaan**: muatan di atas 1 MB ditolak dan deskripsi pekerjaan
  dibatasi hingga 12.000 karakter.
- **Skor Kecocokan**: menampilkan meter skor visual untuk menunjukkan keselarasan
  terhadap lowongan tujuan.
- **Kesenjangan Keterampilan**: menemukan kesenjangan keterampilan antara bukti pengguna dan
  kebutuhan pekerjaan.
- **Rincian Persyaratan**: memisahkan persyaratan menjadi wajib dan opsional.
- **Rencana Tindakan 30 Hari**: memberikan panduan mingguan untuk mempelajari
  atau memperbaiki materi agar kesenjangan utama berkurang.
- **Saran Butir CV**: pada edisi historis, menghasilkan saran butir berorientasi
  ATS dalam bahasa Indonesia/Inggris untuk disunting pengguna.
- **Pesan Lamaran**: membuat draf pengantar untuk LinkedIn, email, atau
  WhatsApp.
- **Skenario Demo**:
  - *Skenario 1*: Lulusan SMK dan peralihan karier (Pengembang Web Junior atau
    `Junior Web Developer`);
  - *Skenario 2*: Lulusan SMK RPL (Pengembang Sisi Server Junior atau
    `Junior Backend Developer`);
  - *Skenario 3*: Peralihan karier otodidak (Pengembang Sisi Server Python
    Junior atau `Junior Python Backend`, bahasa
    Inggris); serta
  - mode demo cepat ketika `GEMINI_API_KEY` tidak tersedia pada konfigurasi
    server.

---

*Catatan: repositori ini tidak menerapkan autentikasi, pembayaran, pengambilan
otomatis data lowongan, atau basis data server permanen agar tetap sesuai dengan batas minimal
proyek awal.*
