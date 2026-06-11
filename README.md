# LokerLens AI — Asisten Diagnostik Kesiapan Kerja SMK & Bootcamp
### v1.0.0 · Juara Vibe Coding Edition

LokerLens AI adalah sebuah platform evaluasi keahlian dan kesiapan kerja (*Career Alignment & Readiness Diagnostic Assistant*) yang dirancang khusus untuk mengatasi kesenjangan informasi dalam pencarian kerja yang dihadapi oleh lulusan kejuruan (SMK), alumni coding bootcamp, talenta belajar mandiri (*self-taught*), serta para pencari kerja lintas profesi (*career switcher*) di Indonesia.

Sistem mendiagnosis keselarasan keahlian kandidat dengan kebutuhan nyata lowongan pekerjaan (ATS), melakukan pemetaan gap secara transparan, serta menyajikan panduan pembelajaran 30 hari yang terencana agar mereka dapat melamar dengan lebih percaya diri dan matang.

---

## 🎯 Permasalahan (Problem Statement)
Pencari kerja tingkat pemula (*entry-level/junior/vokasi*) sering kali mengalami:
* **Penolakan Tanpa Ulasan (The Black Hole of ATS)**: Lamaran ditolak secara otomatis oleh sistem penyaringan tanpa pernah tahu apa yang menjadi kekurangan nyata dalam portofolionya.
* **Miskonsep Persyaratan Loker**: Kesulitan mencerna kualifikasi teknis yang kompleks atau berlebihan (*must-have* vs *nice-to-have*) pada deskripsi lowongan kerja.
* **Kebingungan Langkah Perbaikan**: Tidak memiliki peta jalan (*roadmap*) terarah untuk menutupi kesenjangan keterampilan tersebut setelah mengetahui penolakan atau kecocokan rendah.

---

## 💡 Solusi (The Solution)
LokerLens AI hadir menjembatani jurang tersebut dengan menyajikan **analisis diagnostik interaktif berbasis AI**. Daripada sekadar memberikan skor penolakan mentah, LokerLens AI membedah kebutuhan lowongan secara terperinci, menilai kesiapan portofolio kandidat secara adil, dan memetakan aksi nyata mingguan berdurasi 30 hari yang dipersonalisasi demi mendongkrak daya saing kandidat.

---

## 👥 Pengguna Sasaran (Target Users)
1. **Lulusan SMK Jurusan RPL / TI**: Talenta muda kejuruan yang ingin memulai debut profesional di dunia rekayasa perangkat lunak.
2. **Alumni Coding Bootcamp**: Individu dengan keahlian praktis intensif yang memerlukan validasi resume di kancah industri.
3. **Pencari Kerja Lintas Bidang (Career Changer)**: Profesional non-teknis yang bermigrasi ke industri digital dan membutuhkan kurasi portofolio relevan.
4. **Talenta Belajar Mandiri (Self-taught)**: Pemelajar otonom yang ingin menyelaraskan portofolio rancangannya dengan ekspektasi standar industri terkini.

---

## 🚀 Fitur Utama (Core Features)

* **Analisis Kesiapan Kerja Real-Time**: Mengukur skor kecocokan dalam persentase kuantitatif antara data kualifikasi kandidat dengan naskah kualifikasi lowongan pekerjaan standar industri.
* **Peta Jalan Strategis 30 Hari (30-Day Action Roadmap)**: Menyusun langkah taktis mingguan yang dipersonalisasi untuk menutupi kesenjangan keahlian dalam satu bulan ke depan.
* **Rekomendasi Portofolio Proyek**: Menyajikan rekomendasi studi kasus dan perbaikan konkret pada portofolio pendukung agar fungsional sesuai kebutuhan rekruter.
* **Usulan Kalimat Aktif CV (ATS-Friendly)**: Membantu merumuskan poin deskripsi *hands-on* yang kompatibel dengan pelacak lamaran kerja modern.
* **Draf Pesan Lamaran Cepat**: Menyusun kalimat perkenalan profesional dinamis yang siap disalin untuk platform LinkedIn, WhatsApp HRD, maupun email resmi kandidat.
* **Preset Skenario Industri**: Menyediakan visualisasi kasus nyata pra-konfigurasi untuk mempermudah demo fungsi aplikasi secara instan.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

Aplikasi dibangun sebagai **Full-Stack Web App** yang handal, cepat, dan responsif:
* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion (f.k.a. Framer Motion).
* **Backend**: Express (Node.js fungsional) melayani API Gateway terintegrasi untuk menyaring beban kueri.
* **Layanan Inteligensi**: **Gemini 3.5 Flash** (melalui library modern `@google/genai` fungsional SDK server-side) memberikan ulasan diagnostik terstruktur melalui parameter JSON Schema terarah demi keaslian data.
* **Pendidikan & Keamanan**: Proteksi prompt-injection terintegrasi untuk mendeteksi kueri yang tidak sah, disertai dengan pembatasan ukuran payload (maksimal 1MB) serta batas teks deskripsi lowongan maksimal 12,000 karakter.
* **Penyimpanan**: Pendekatan tanpa database server (state dinamis lokal & simulasi sandboxed data) untuk menjamin privasi serta mendukung navigasi audit yang lancar.

---

## ⚙️ Mengapa Menggunakan Input Manual & Bukan Unggah PDF/CV? (Design Metathesis)
LokerLens AI secara sengaja memilih **pendekatan input formulir modular** (*manual entry*) sebagai pengganti fitur pemindaian CV instan:
1. **Akurasi Pemindaian**: Parser PDF tradisional (*regex/heuristics*) sering kali gagal membaca layout CV kreatif atau format dua-kolom secara akurat, mendistorsi hasil analisis AI.
2. **Keterlibatan Pengguna Aktif (*Mindful Engineering*)**: Mengharuskan pengguna menulis latar belakang, daftar keterampilan, dan studi kasus proyek unggulan secara manual akan menumbuhkan kesadaran diri terhadap portofolio mereka sendiri, melatih mereka agar menyusun deskripsi pencapaian secara terstruktur.
3. **Kerahasiaan & Privasi Data**: Menjaga data sensitif kandidat agar tidak tersimpan di server awan tanpa izin eksplisit atau pengelolaan data pribadi yang berisiko bocor.

---

## 🔮 Rencana Arah Pengembangan v2 (Planned Direction for v2)
LokerLens AI v1.0.0 adalah rintisan tangguh dalam edisi **Juara Vibe Coding**. Pada rilis v2 mendatang, kami merencanakan:
* **Perluasan Non-IT**: Menyediakan kategori evaluasi untuk bidang pemasaran (*digital marketing*), administrasi, perhotelan, desain grafis, dan akuntansi.
* **Navigasi Riwayat Lokal**: Mengintegrasikan penyimpanan lokal browser (`localStorage` / `IndexedDB`) untuk memulihkan draf portofolio analisis masa lalu tanpa perlu server basis data yang rumit.
* **Ekspor Laporan PDF**: Unduh hasil ulasan, draf CV, dan 30-Day Roadmap langsung sebagai berkas PDF cetak siap pakai.

---

## 🔑 Variabel Lingkungan (Environment Variables)

Aplikasi membutuhkan satu kunci otorisasi rahasia untuk merutekan analisis ke server Google Gemini AI secara langsung:

```env
GEMINI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini
```

Pastikan variabel ini diekspos di lingkungan server sebelum meluncurkan analisis langsung (*live analysis*).

---

## 💻 Panduan Instalasi Lokal (Local Setup)

Ikuti langkah mudah di bawah ini untuk mengompilasi dan menjalankan LokerLens AI pada komputer lokal Anda:

### 1. Unduh Dependensi
Instal seluruh modul pendukung yang diperlukan lewat NPM:
```bash
npm install
```

### 2. Konfigurasi Kunci API (Secrets)
* Buat sebuah file bernama `.env` di direktori akar proyek:
  ```env
  GEMINI_API_KEY=your_gemini_api_key_here
  AI_PROVIDER=gemini
  ```
* Atau jika Anda mengevaluasi aplikasi ini langsung dalam ekosistem **Google AI Studio**, Anda cukup mendaftarkan kunci API di menu samping **Secrets** dengan nama variabel `GEMINI_API_KEY`.

### 3. Jalankan Mode Pengembangan (Development)
Aktifkan server lokal Express yang membungkus hot-reload otomatis dari Vite:
```bash
npm run dev
```
Buka penjelajah web Anda di alamat: `http://localhost:3000`

### 4. Eksekusi Produksi (Build & Start)
Kompilasi bundel TypeScript frontend ke aset statis murni, lalu kemas server Express backend lewat ESBuild:
```bash
npm run build
```

Setelah build selesai dan sukses, luncurkan server produksi mandiri:
```bash
npm run start
```

---

## 🏆 Alur Evaluasi Juri & Penilai (Demo Flow for Judges)

Untuk memudahkan peninjauan fungsi utama LokerLens AI, silakan ikuti petunjuk eksplorasi terarah berikut ini:

1. **Jelajahi preset industri (Skenario 1 - 3)**:
   * Klik tombol Skenario di bar menu atas navigasi:
     * **Skenario 1**: Lulusan SMK & Career Switcher (Junior Web Developer).
     * **Skenario 2**: Lulusan SMK RPL (Junior Backend Developer).
     * **Skenario 3**: Self-taught Career Switcher (Junior Python Backend - English).
   * Perhatikan bagaimana isian form di sisi portofolio dan isi deskripsi lowongan asli berubah secara dinamis.

2. **Gunakan Coba Demo Cepat (Sandbox Preview)**:
   * Jika Anda belum menaruh `GEMINI_API_KEY` di server rahasia, klik tombol **"Coba Demo Cepat"** di bawah halaman input formulir.
   * Model simulasi sandboxed akan memicu visualisasi laporan kesiapan komplet beserta ulasan gap, draf pesan WhatsApp/LinkedIn lamaran kerja cepat, peta jalan belajar 30 hari secara bertahap, dan kalimat aktif CV unggulan dalam 2 detik.

3. **Gunakan Analisis Live (Gemini Dynamic)**:
   * Daftarkan kunci API Anda di Settings -> Secrets. Indikator di kanan atas akan berubah warna menjadi hijau dengan tulisan **"Gemini API key terpasang"**.
   * Ubah isi keahlian, tambahkan proyek unik Anda, atau tempelkan iklan lowongan pekerjaan apa pun secara kustom pada kolom kanan.
   * Klik tombol **"Analisis dengan Gemini"** untuk menghasilkan evaluasi dinamis berdasarkan profil kandidat dan deskripsi lowongan secara langsung.
