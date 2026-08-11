# LokerLens AI

**v2.0.0-dev · Asisten kesiapan kerja lintas bidang**

LokerLens AI membantu pencari kerja entry-level membandingkan profilnya dengan
sebuah lowongan. Pengguna menuliskan pengalaman, keterampilan, pelatihan, dan
bukti kerja secara manual; aplikasi kemudian menyusun analisis yang terstruktur
dan dapat ditindaklanjuti.

V2 sekarang berada pada branch `main` sebagai kandidat penyerahan repository
dan demo lokal, tetapi belum menjadi rilis produksi. Tag `v1.0.0` tetap
menyimpan versi historis **Juara Vibe Coding Edition**.

## Apa yang Dihasilkan?

Satu analisis berisi:

- skor keselarasan 0–100 beserta lima komponen pembentuknya;
- kesimpulan kapan sebaiknya melamar;
- pencocokan setiap persyaratan lowongan dengan status `Terpenuhi`, `Sebagian`,
  atau `Belum terbukti`;
- kekuatan yang dapat ditelusuri ke profil dan kesenjangan yang dapat ditelusuri
  ke lowongan;
- prioritas perbaikan dan rencana 30 hari dengan keluaran yang terukur;
- saran bukti kompetensi yang sesuai dengan bidang kerja;
- satu prompt untuk memperbaiki CV yang sudah dimiliki pengguna;
- contoh pesan lamaran yang sopan dan siap disesuaikan;
- empat pertanyaan wawancara, tujuan pertanyaan, dan kerangka jawaban;
- disclaimer bahwa hasil bukan jaminan rekrutmen.

Skor adalah estimasi keselarasan untuk membantu pengambilan keputusan. Skor
bukan peluang diterima kerja, nilai psikotes, atau pengganti keputusan rekruter.

```text
0–49   → Belum siap untuk lowongan ini
50–74  → Melamar sambil melakukan perbaikan
75–100 → Siap melamar sekarang
```

Waktu melamar harus mengikuti putusan tersebut. Model juga diwajibkan
membedakan kompetensi yang benar-benar terbukti, baru terbukti sebagian, dan
belum memiliki bukti di profil.

## Cara Kerja

```text
Pilih bidang dan peran target
→ isi profil secara manual
→ tempel teks lowongan
→ jalankan analisis
→ tinjau bukti, kesenjangan, dan langkah berikutnya
```

Pendekatan *manual-first* adalah keputusan produk. Banyak pelamar pemula belum
memiliki CV yang rapi, tetapi sudah mempunyai pengalaman informal, tugas
sekolah, kegiatan organisasi, magang, proyek, pelatihan, atau tanggung jawab
operasional yang relevan.

LokerLens tidak mengunggah atau memindai CV. Prompt perbaikan CV pada hasil
analisis dapat disalin ke layanan AI pilihan pengguna bersama CV yang mereka
miliki. Prompt itu meminta AI mempertahankan fakta, menandai informasi yang
belum ada dengan `[perlu dilengkapi]`, dan tidak mengarang pengalaman maupun
angka.

## Cakupan Bidang

Tersedia 29 rumpun pekerjaan dalam tujuh kelompok:

- Teknologi, Data & Produk Digital;
- Bisnis & Fungsi Profesional;
- Layanan, Perdagangan & Operasional;
- Industri, Teknik & Keterampilan Kerja;
- Kreatif, Media & Komunikasi;
- Pendidikan, Sosial & Pelayanan Publik;
- Lingkungan & Bidang Lainnya.

Dua puluh tujuh rumpun memiliki panduan kompetensi, contoh bukti kerja, dan
peringatan analisis khusus. `Teknik & Vokasional Lainnya` serta `Bidang
Lainnya` memakai panduan konservatif yang tetap mengikuti isi lowongan.

Jenis sumber pelatihan bersifat opsional. Nama lembaga dan program ditulis bebas
tanpa daftar pilihan. Nama tersebut hanya menjadi konteks dan tidak dianggap
sebagai bukti kelulusan, sertifikasi, atau kompetensi. Jika profil tidak
menyatakan kelulusan secara jelas, hasil hanya boleh menggunakan ungkapan netral
seperti “pernah mengikuti pelatihan”.

## Demo Offline

Empat demo deterministik dapat digunakan tanpa API key:

- Junior Frontend Developer;
- Junior Administrative Staff;
- Entry-Level Customer Service;
- Warehouse Staff.

Setiap demo mengisi seluruh formulir dan menampilkan struktur hasil yang sama
dengan analisis live. Profil, lowongan, dan hasil demo bersifat fiktif serta
tidak memanggil provider AI.

## Teknologi dan Arsitektur

| Lapisan | Teknologi dan tanggung jawab |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, validasi respons Zod |
| Backend | Node.js, Express, konfigurasi tervalidasi, rate limit, timeout, cancellation |
| AI | Adapter Gemini dan OpenAI di belakang interface provider yang sama |
| Kontrak | Schema Zod bersama untuk request dan response V2 |
| Keamanan | Helmet, CSP produksi, request ID, batas body, error publik ternormalisasi |
| Pengujian | Vitest, Testing Library, jsdom, build produksi, npm audit, GitHub Actions |

Frontend hanya berkomunikasi dengan `/api/analyze` dan `/api/health`. Provider,
model, serta API key dipilih di server dan tidak diekspos ke antarmuka. Tidak ada
fallback diam-diam dari satu provider ke provider lain.

Kontrak utama berada di
[`shared/analysisSchemas.ts`](shared/analysisSchemas.ts). Alur backend dipisah
menjadi konfigurasi, provider, prompt builder, parser, gerbang kualitas, service,
dan route. Penjelasan lebih rinci tersedia di
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Menjalankan Secara Lokal

Persyaratan:

- Node.js 20 atau lebih baru;
- npm;
- API key Gemini hanya jika ingin menjalankan analisis live.

```bash
npm ci
cp .env.example .env
npm run dev
```

Aplikasi tersedia secara default di `http://localhost:3000`. Port dapat diubah
melalui `PORT`.

### Konfigurasi Gemini

Simpan key di `.env`; jangan memasukkannya ke source, screenshot, chat, commit,
atau log.

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
AI_REQUEST_TIMEOUT_MS=45000
ANALYSIS_RATE_LIMIT_MAX=10
ANALYSIS_RATE_LIMIT_WINDOW_MS=60000
```

Model tetap dapat diubah melalui environment karena ketersediaannya dapat
berbeda menurut akun dan waktu. Tanpa key yang valid, server tetap berjalan,
`/api/health` mengembalikan `analysisAvailable: false`, analisis live
dinonaktifkan, dan demo offline tetap dapat dipakai.

Adapter OpenAI juga tersedia sebagai jalur alternatif, tetapi fokus verifikasi
pra-rilis saat ini adalah Gemini.

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.6-luna
```

## Perintah Proyek

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan Express dan Vite untuk development |
| `npm run lint` | Memeriksa TypeScript tanpa menghasilkan file |
| `npm test` | Menjalankan Vitest dalam mode watch |
| `npm run test:run` | Menjalankan seluruh tes deterministik sekali |
| `npm run build` | Membuat bundle frontend dan server produksi |
| `npm start` | Menjalankan `dist/server.cjs` |
| `npm run eval:gemini` | Menjalankan enam analisis Gemini live secara berurutan |
| `npm run clean` | Menghapus output build lokal |

## Verifikasi Sebelum Push

Jalankan pemeriksaan berikut sebelum setiap push:

```bash
npm ci
npm run lint
npm run test:run
npm run build
npm audit
git diff --check
git status --short --branch
```

Tes deterministik tidak memanggil provider eksternal. Suite saat ini mencakup
schema, prompt, gerbang kualitas, provider, parser, service, route, API client,
formulir, demo, aksesibilitas, interaksi, dan rendering hasil.

### Evaluasi Gemini Live

Smoke test Gemini dari formulir sampai dashboard telah berhasil menghasilkan
respons yang lolos schema. Evaluasi pertama Phase 5F kemudian menghasilkan
empat respons valid dan dua penolakan aman pada keluaran Frontend yang melanggar
gerbang kualitas. Setelah batas fakta dan stabilitas prompt diperketat,
pengulangan evaluasi pada 11 Agustus 2026 berhasil menyelesaikan seluruh enam
request tanpa peringatan otomatis.

Setelah `.env` berisi key yang valid, jalankan:

```bash
npm run eval:gemini
```

Perintah ini membuat enam request berurutan:

- Frontend sebanyak tiga kali untuk melihat sebaran skor dan verdict;
- Administrasi satu kali;
- Customer Service satu kali;
- Warehouse satu kali.

Hasil pengulangan yang lulus:

| Skenario | Skor | Verdict | Durasi |
| --- | --- | --- | --- |
| Frontend #1 | 72 | `APPLY_WITH_IMPROVEMENTS` | 30.695 ms |
| Frontend #2 | 70 | `APPLY_WITH_IMPROVEMENTS` | 34.093 ms |
| Frontend #3 | 72 | `APPLY_WITH_IMPROVEMENTS` | 29.095 ms |
| Administrasi | 91 | `APPLY_NOW` | 27.890 ms |
| Customer Service | 62 | `APPLY_WITH_IMPROVEMENTS` | 24.501 ms |
| Warehouse | 73 | `APPLY_WITH_IMPROVEMENTS` | 21.086 ms |

Tiga hasil Frontend memiliki rentang dua poin, verdict yang sama, dan status
REST API yang konsisten `PARTIAL`. Durasi seluruh request berada di bawah batas
provider lokal 45 detik. Angka ini adalah snapshot satu sesi lokal, bukan
jaminan latensi atau determinisme pada akun, jaringan, dan platform deployment
lain.

Script mencatat durasi, skor, verdict, dan status persyaratan wajib. Script juga
menandai sapaan yang tidak konsisten, klaim pelatihan yang tidak terbukti,
ketidaksesuaian waktu melamar, risiko yang terlalu tipis, serta sebaran skor
Frontend di atas 10 poin. Karena panggilan ini menggunakan API live, perhatikan
kuota dan biaya akun yang dipakai.

Konfigurasi Gemini menggunakan suhu `0` dan seed tetap agar model berupaya
memberikan hasil yang lebih stabil untuk input yang sama. Seed bersifat
*best-effort*, sehingga tiga pengulangan Frontend tetap diperlukan dan hasil
live tidak boleh dianggap sepenuhnya deterministik.

Hasil otomatis tetap perlu dibaca manusia. Periksa khususnya:

1. apakah setiap status persyaratan sesuai dengan bukti profil;
2. apakah skor persyaratan wajib mengikuti status tersebut;
3. apakah saran tidak mengarang pengalaman, pencapaian, sertifikat, atau aturan
   perusahaan;
4. apakah faktor risiko menyebut ketidakpastian yang konkret;
5. apakah bahasa konsisten menggunakan “Anda” dan pesan lamaran menggunakan
   sudut pandang “Saya”.

## Privasi dan Batas Produk

Desain saat ini tidak memiliki akun maupun database kandidat. Namun, saat
analisis live dijalankan, profil dan teks lowongan dikirim ke provider AI yang
dikonfigurasi. Hindari memasukkan NIK, alamat lengkap, nomor rekening, data
kesehatan, atau informasi sensitif lain yang tidak dibutuhkan.

LokerLens bukan:

- ATS atau pemindai CV;
- portal maupun scraper lowongan;
- kalkulator peluang diterima;
- pengganti penilaian rekruter;
- pemberi jaminan wawancara atau pekerjaan.

Lihat [`docs/PRIVACY.md`](docs/PRIVACY.md) untuk batas teknis yang lebih rinci.
Dokumen tersebut belum menjadi kebijakan privasi produksi dan perlu ditinjau
lagi setelah platform deployment dipilih.

## Status Menuju Rilis

Sudah tersedia:

- alur manual-first yang responsif dengan palet putih–slate dan aksen indigo;
- 29 rumpun karier dan 27 panduan khusus;
- Gemini dan OpenAI adapter;
- empat demo lengkap;
- hasil terstruktur dengan skor yang tervalidasi;
- prompt CV, pesan lamaran, dan empat persiapan wawancara;
- gerbang kualitas untuk sapaan Indonesia dan klaim pelatihan;
- evaluasi Gemini live enam request yang lulus tanpa peringatan, termasuk tiga
  pengulangan Frontend dengan rentang skor dua poin;
- timeout, cancellation, rate limit, security headers, CSP, dan CI.
- V2 telah dipromosikan ke `main`, branch pengembangan lama telah dihapus, dan
  CI pada `main` telah lulus.

Masih harus diselesaikan sebelum rilis publik:

- uji bidang Kuliner serta satu bidang Teknik;
- verifikasi latensi serta batas waktu pada platform deployment yang dipilih;
- QA desktop, ponsel, keyboard, reduced motion, dan pembesaran 200%;
- pemilihan platform deployment beserta region, logging, retensi, dan kontrol
  biaya;
- pembaruan dokumen privasi sesuai deployment.

Checklist lengkap tersedia di
[`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md). Riwayat perubahan ada
di [`CHANGELOG.md`](CHANGELOG.md), sedangkan pekerjaan lanjutan dicatat di
[`ROADMAP.md`](ROADMAP.md).
