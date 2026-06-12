# LokerLens AI

**v2.0.0-dev · Multi-Field Job Readiness**

LokerLens AI adalah asisten kesiapan kerja berbasis AI dengan pendekatan
*manual-first* untuk pencari kerja *entry-level* di Indonesia, terutama pengguna
yang belum memiliki CV terstruktur.

Versi historis **v1.0.0 · Juara Vibe Coding Edition** tetap dipertahankan pada
branch `main` dan tag `v1.0.0`. Pengembangan V2 berlangsung pada branch
`v2-development` dan belum merupakan rilis produksi.

## Ringkasan Produk

LokerLens membantu pengguna:

- menyusun latar belakang profesional secara manual;
- membandingkan profil dengan teks lowongan yang ditempel;
- mengenali kekuatan dan kesenjangan material;
- membedakan persyaratan *must-have* dan *nice-to-have*;
- menyusun langkah perbaikan praktis;
- menyiapkan bukti kompetensi dan bahan CV;
- membuat pesan lamaran;
- mengantisipasi kemungkinan pertanyaan wawancara.

Alur utamanya:

```text
Pilih bidang dan peran target
→ susun profil manual
→ tempel teks lowongan
→ terima panduan kesiapan kerja
```

LokerLens bukan ATS, pemindai CV, kalkulator peluang diterima, portal lowongan,
*job scraper*, pengganti penilaian rekruter, atau jaminan mendapat wawancara
maupun pekerjaan.

## Mengapa Manual-First?

Input manual adalah keputusan produk, bukan pengganti sementara untuk unggah CV.
Banyak pelamar pemula belum memiliki CV yang rapi, tetapi sudah mempunyai
pengalaman informal, organisasi, sekolah, magang, tugas operasional, proyek,
pelatihan, atau tanggung jawab praktis.

Formulir terpandu membantu pengguna mengubah pengalaman mentah tersebut menjadi
informasi yang dapat dibandingkan dengan kebutuhan lowongan dan kemudian
digunakan untuk menyusun CV atau bahan lamaran.

## Pengguna Sasaran

- lulusan SMK;
- *fresh graduate*;
- lulusan *bootcamp*;
- pembelajar mandiri;
- *career switcher*;
- pengguna dengan pengalaman kerja informal atau operasional;
- pelamar *entry-level* pada bidang yang didukung.

## Bidang Pekerjaan

Pilihan bidang yang tersedia:

1. IT & Digital
2. Administrasi
3. Customer Service
4. Sales & Marketing
5. Operasional, Gudang & Logistik
6. Hospitality
7. Teknis & Vokasional
8. Pendidikan & Pelatihan
9. Keuangan & Akuntansi
10. Bidang entry-level lainnya

Panduan spesifik terdalam saat ini tersedia untuk:

- IT & Digital;
- Administrasi;
- Customer Service;
- Operasional, Gudang & Logistik.

Bidang lain tetap dapat digunakan, tetapi saat ini memakai panduan umum
*entry-level* yang konservatif. Sistem tidak mengklaim kedalaman spesialis yang
sama untuk seluruh bidang.

## Hasil Analisis

Kontrak hasil V2 mencakup:

- skor keselarasan 0–100;
- verdict stabil;
- ringkasan kesiapan;
- kekuatan kandidat;
- kesenjangan utama;
- persyaratan wajib;
- persyaratan nilai tambah;
- faktor risiko;
- rencana aksi empat minggu;
- saran bukti kompetensi;
- saran bahan CV;
- pesan lamaran;
- kemungkinan pertanyaan wawancara;
- disclaimer.

Skor merupakan estimasi keselarasan untuk panduan, bukan probabilitas diterima
kerja dan bukan jaminan hasil rekrutmen.

Rentang verdict internal:

```text
0–49   → NOT_READY_YET
50–74  → APPLY_WITH_IMPROVEMENTS
75–100 → APPLY_NOW
```

Frontend menampilkan label yang dilokalkan dan tidak menampilkan identifier
tersebut secara langsung kepada pengguna.

## Demo Offline

Empat skenario deterministik tersedia tanpa API key:

- Junior Frontend Developer;
- Junior Administrative Staff;
- Entry-Level Customer Service;
- Warehouse Staff.

Demo menggunakan profil, lowongan, dan hasil fiktif yang tersimpan di aplikasi.
Demo tidak memanggil provider AI dan tetap dapat digunakan ketika analisis
langsung belum dikonfigurasi.

## Arsitektur

### Frontend

- React 19;
- TypeScript;
- Vite;
- Tailwind CSS;
- kontrak Zod bersama;
- API client yang memvalidasi respons sebelum dirender.

Frontend hanya memanggil endpoint aplikasi `/api/analyze` dan membaca status
umum dari `/api/health`. Frontend tidak memilih atau mengetahui model AI.

### Backend

- Node.js dan Express;
- konfigurasi server tervalidasi;
- interface provider AI;
- implementasi Gemini;
- resolver provider;
- *prompt builder*;
- parser dan validasi respons provider;
- service orkestrasi analisis;
- error publik yang dinormalisasi;
- pemrosesan kandidat tanpa database server.

### Kontrak Bersama

Request dan response V2 didefinisikan di
[`shared/analysisSchemas.ts`](shared/analysisSchemas.ts). Modul ini menjadi
sumber tipe TypeScript sekaligus validasi runtime bagi frontend dan backend.

Diagram dan batas migrasi yang lebih rinci tersedia di
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Desain Provider AI

- Gemini adalah satu-satunya provider live yang telah diimplementasikan.
- Pemilihan provider dilakukan melalui konfigurasi server.
- Frontend tidak menyediakan pemilih provider, model, atau input API key.
- Interface provider memungkinkan adapter lain ditambahkan kemudian tanpa
  mengganti kontrak frontend.
- Belum ada provider live lain yang diimplementasikan.

Arsitektur provider dan parsing telah diuji secara offline. Namun, karena belum
ada API key pada lingkungan pengembangan saat ini, koneksi Gemini end-to-end,
ketersediaan model yang dikonfigurasi, kualitas respons live, latensi, dan
perilaku timeout belum diverifikasi.

## Privasi dan Penanganan Data

- tidak ada login atau akun pengguna;
- tidak ada database kandidat di server;
- LokerLens tidak sengaja menyimpan profil kandidat atau teks lowongan pada
  servernya dalam desain saat ini;
- analisis live mengirim konten yang diberikan pengguna ke provider AI yang
  dikonfigurasi;
- pengguna sebaiknya tidak memasukkan data pribadi sensitif yang tidak
  diperlukan;
- demo offline menggunakan data fiktif lokal;
- `localStorage` dan riwayat browser belum digunakan.

Ketiadaan database tidak berarti data analisis live tidak pernah meninggalkan
perangkat. Lihat [`docs/PRIVACY.md`](docs/PRIVACY.md) untuk batasan yang lebih
jelas. Dokumen tersebut bukan kebijakan privasi produksi atau nasihat hukum.

## Kontrol Keamanan

Kontrol yang sudah diimplementasikan:

- API key hanya dibaca di server;
- request JSON dibatasi maksimal 1 MB;
- panjang field dan jumlah item dibatasi melalui schema;
- request V2 divalidasi secara ketat;
- respons provider diparsing dan divalidasi secara ketat;
- kombinasi skor dan verdict harus konsisten;
- profil dan lowongan diperlakukan sebagai data tidak tepercaya dalam prompt;
- error publik menggunakan kode dan pesan yang dinormalisasi;
- respons mentah provider, prompt, stack trace, dan API key tidak dikirim ke
  frontend;
- provider atau model tidak dapat dipilih dari frontend.

Batas prompt membantu memitigasi prompt injection, tetapi tidak boleh dianggap
sebagai pencegahan sempurna terhadap seluruh serangan atau kegagalan model.

## Menjalankan Secara Lokal

Persyaratan: Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env
npm run dev
```

Konfigurasi minimum untuk analisis live:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

Gunakan placeholder pada dokumentasi dan file contoh. Jangan commit API key.

Tanpa `GEMINI_API_KEY`:

- server tetap dapat dijalankan;
- `/api/health` mengembalikan `analysisAvailable: false`;
- tombol analisis live dinonaktifkan;
- empat demo offline tetap tersedia.

Port default adalah `3000` dan dapat diubah melalui `PORT`.

## Script

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan Express dengan middleware Vite untuk development |
| `npm run lint` | Menjalankan pemeriksaan TypeScript tanpa emit |
| `npm test` | Menjalankan Vitest dalam mode interaktif/watch |
| `npm run test:run` | Menjalankan seluruh test sekali |
| `npm run build` | Membuat bundle frontend dan server produksi |
| `npm start` | Menjalankan hasil build dari `dist/server.cjs` |
| `npm run clean` | Menghapus output build lokal |

## Validasi Deterministik

Validasi pengembangan meliputi:

- pemeriksaan TypeScript;
- test Vitest untuk schema, provider resolver, prompt, parser, service, route,
  kompatibilitas, API client, form, demo, dan rendering;
- build produksi frontend dan backend;
- test otomatis tanpa panggilan provider atau jaringan eksternal.

Perintah validasi:

```bash
npm run lint
npm run test:run
npm run build
git diff --check
```

## Status Pengembangan

### Sudah Diimplementasikan

- schema request dan response runtime bersama;
- backend provider-neutral;
- adapter Gemini;
- prompt dan panduan lintas bidang;
- panduan spesifik untuk empat bidang awal;
- fallback umum untuk bidang lain;
- frontend manual multi-bidang;
- dashboard hasil V2 tervalidasi;
- empat demo offline;
- kebijakan konsistensi skor-verdict;
- error handling yang dinormalisasi;
- stabilisasi responsive, aksesibilitas, keyboard, dan fokus;
- jalur kompatibilitas sementara untuk payload V1.

### Belum Diverifikasi

- analisis Gemini end-to-end dengan API key nyata;
- ketersediaan dan perilaku model yang dikonfigurasi;
- kualitas prompt live pada seluruh bidang awal;
- latensi dan timeout provider;
- deployment produksi.

### Ditunda

- login dan akun;
- database pengguna;
- unggah atau pemindaian CV;
- scraping lowongan;
- pembayaran atau langganan;
- riwayat lokal;
- export dokumen;
- provider AI tambahan;
- redesign visual besar.

## Riwayat Repository dan Migrasi

- `main` mempertahankan rilis stabil V1.
- Tag `v1.0.0` mempertahankan Juara Vibe Coding Edition.
- Pengembangan V2 berjalan pada `v2-development`.
- `/api/analyze` menerima request V2 secara langsung.
- Adapter request dan response V1 masih dipertahankan sementara untuk
  kompatibilitas migrasi.
- `/api/health` masih mengembalikan field kompatibilitas
  `geminiConfigured`, tetapi frontend V2 hanya menggunakan
  `analysisAvailable`.

Lihat [`CHANGELOG.md`](CHANGELOG.md) untuk perubahan dan
[`ROADMAP.md`](ROADMAP.md) untuk pekerjaan sebelum kandidat rilis.
