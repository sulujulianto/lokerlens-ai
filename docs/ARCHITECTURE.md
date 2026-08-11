# Arsitektur LokerLens AI V2

Dokumen ini merangkum arsitektur V2 yang sudah diimplementasikan pada branch
`main`. Ini bukan spesifikasi untuk provider yang belum tersedia.

## Alur Request V2

```text
React form
  → shared request validation
  → POST /api/analyze
  → rate limit and cancellation context
  → strict V2 route validation
  → JobReadinessService
  → resolved AIProvider
  → GeminiProvider or OpenAIProvider
  → prompt builder
  → provider response text
  → JSON extraction and shared response validation
  → normalized JobReadinessAnalysis
  → frontend API response validation
  → results dashboard
```

Kontrak request dan response berada di
[`../shared/analysisSchemas.ts`](../shared/analysisSchemas.ts). Frontend dan
backend menggunakan schema yang sama sehingga tidak perlu mempertahankan dua
definisi bisnis V2.

## Bootstrap dan Hosting

[`../server.ts`](../server.ts) bertanggung jawab untuk:

- memuat environment;
- memvalidasi konfigurasi;
- membuat Express;
- memasang batas JSON 1 MB;
- menghapus header identitas Express;
- memasang security headers, CSP produksi, Permissions Policy, dan request ID;
- memasang rate limit pada endpoint analisis;
- mendaftarkan `/api/health` dan `/api/analyze`;
- memasang Vite middleware saat development;
- melayani aset hasil build dan fallback SPA saat production;
- memasang error handler;
- memulai server pada `PORT`.

Server dapat dimulai tanpa API key. Dalam kondisi tersebut, health check tetap
merespons tetapi `analysisAvailable` bernilai `false`.

## Konfigurasi

[`../server/config.ts`](../server/config.ts) memvalidasi:

- `AI_PROVIDER`, dengan nilai `gemini` atau `openai`;
- `GEMINI_API_KEY`, yang bersifat opsional saat server dimulai;
- `GEMINI_MODEL`, default `gemini-3.5-flash`;
- `OPENAI_API_KEY`, yang bersifat opsional saat server dimulai;
- `OPENAI_MODEL`, default `gpt-5.6-luna`;
- `PORT`, default `3000`.
- `AI_REQUEST_TIMEOUT_MS`, default `45000` dan dibatasi 5–120 detik;
- `ANALYSIS_RATE_LIMIT_MAX`, default `10`;
- `ANALYSIS_RATE_LIMIT_WINDOW_MS`, default `60000` dan dibatasi 10 detik–1 jam.

Konfigurasi menghasilkan flag generik `analysisAvailable`. Frontend V2 tidak
bergantung pada nama provider.

## Route Analisis dan Migrasi

[`../server/routes/analyze.ts`](../server/routes/analyze.ts) mencoba kontrak
dalam urutan berikut:

1. payload V2 divalidasi langsung dengan `AnalyzeJobReadinessRequestSchema`;
2. jika bukan V2, payload dicoba melalui adapter request V1;
3. seluruh analisis tetap memakai service V2 yang sama;
4. hasil request V2 dikembalikan sebagai `JobReadinessAnalysis`;
5. hasil request V1 dipetakan kembali ke bentuk response legacy.

Route membuat `AbortController` per request. Jika browser memutus koneksi,
signal diteruskan melalui service ke provider. Rate limit dijalankan sebelum
analisis untuk mengurangi penyalahgunaan biaya provider. Implementasi bawaan
menyimpan counter dalam memori proses; deployment multi-instance perlu store
bersama sebelum mengandalkan kuota global.

Adapter pada [`../server/compatibility/`](../server/compatibility/) adalah kode
migrasi sementara, bukan business schema kedua yang permanen.

## Service dan Provider

[`../server/services/jobReadinessService.ts`](../server/services/jobReadinessService.ts)
tidak bergantung pada Express. Service menerima request V2 tervalidasi, memanggil
`AIProvider` beserta cancellation signal, lalu memvalidasi hasil sekali lagi
sebelum mengembalikannya.

Interface provider berada di
[`../server/ai/provider.ts`](../server/ai/provider.ts). Resolver membaca
konfigurasi server dan membuat satu adapter sesuai `AI_PROVIDER`. Route,
service, frontend, serta kontrak hasil tidak bergantung pada nama provider.

Implementasi Gemini:

- membuat client SDK hanya saat dibutuhkan;
- mengambil system instruction dan user prompt dari prompt builder;
- meminta JSON terstruktur;
- tidak mengekspor tipe SDK ke service atau route;
- memetakan kegagalan ke `AppError`;
- menerapkan HTTP timeout yang tervalidasi;
- menerima AbortSignal dari siklus request;
- menyerahkan teks respons ke parser V2.

Implementasi OpenAI:

- memakai Responses API melalui request server-side;
- meminta Structured Outputs dari JSON Schema yang dihasilkan dari schema Zod;
- menonaktifkan penyimpanan response melalui `store: false`;
- menerapkan timeout dan cancellation signal yang sama;
- menormalisasi HTTP failure, refusal, respons incomplete, dan output kosong;
- menyerahkan teks respons ke parser V2 yang sama.

Model kedua provider dapat diubah melalui environment tanpa perubahan UI atau
kontrak API. Menambah provider ketiga tetap memerlukan adapter dan pengujian
eksplisit; resolver tidak melakukan fallback diam-diam antar-provider.

## Prompt dan Panduan Bidang

[`../server/ai/promptBuilder.ts`](../server/ai/promptBuilder.ts) menyusun:

- batas keamanan dan data tidak tepercaya;
- scoring rubric;
- aturan verdict;
- grounding terhadap profil dan lowongan;
- klasifikasi must-have dan nice-to-have;
- aturan roadmap, pesan lamaran, dan pertanyaan wawancara;
- aturan kedalaman hasil, status pencocokan persyaratan, prioritas, serta
  kerangka jawaban wawancara yang tetap berbasis bukti;
- schema output normalized;
- bahasa output yang diminta.

[`../shared/jobFieldCatalog.ts`](../shared/jobFieldCatalog.ts) menjadi sumber
bersama untuk 29 rumpun, tujuh kelompok UI, label, deskripsi, dan contoh peran.
[`../server/ai/jobFieldGuidance.ts`](../server/ai/jobFieldGuidance.ts)
menambahkan kompetensi, contoh bukti, dan kehati-hatian khusus untuk 27 rumpun.
Dua rumpun terbuka memakai fallback umum yang secara eksplisit menghindari klaim
spesialis.

## Parsing dan Error

[`../server/ai/responseParser.ts`](../server/ai/responseParser.ts):

1. menerima teks provider;
2. melepas Markdown code fence jika ada;
3. mem-parsing JSON;
4. memvalidasi seluruh response dengan `JobReadinessAnalysisSchema`;
5. menolak field asing, field hilang, batas berlebih, atau skor/verdict yang
   tidak konsisten.

Schema juga memastikan total komponen skor `40 + 25 + 20 + 10 + 5` sama dengan
`matchScore`, setiap minggu memiliki sedikitnya dua aksi, setiap pencocokan
persyaratan memuat status/bukti/rekomendasi, dan sedikitnya tiga item persiapan
wawancara tersedia. Validasi ini membuat provider tidak dapat menghilangkan
bagian penting lalu tetap menghasilkan respons yang dianggap sah.

Error publik hanya berisi kode stabil dan pesan aman. Raw response provider,
prompt, API key, stack trace, dan detail SDK tidak dikirim ke frontend.

## Frontend

[`../src/api/analysisClient.ts`](../src/api/analysisClient.ts) memvalidasi
response sukses sekali lagi dengan schema bersama. Komponen React tidak menerima
output provider yang belum tervalidasi.

Frontend health hanya menggunakan:

```json
{
  "ok": true,
  "analysisAvailable": false
}
```

Backend tidak mengekspos identitas provider atau model pada health response.

## Demo Offline

Demo frontend berada di
[`../src/demoScenarios.ts`](../src/demoScenarios.ts), dengan request fixture
bersama dari
[`../shared/crossFieldScenarios.ts`](../shared/crossFieldScenarios.ts).

Request dan analysis demo divalidasi melalui schema V2. Menampilkan demo tidak
memanggil `/api/analyze` atau provider eksternal. Bentuk hasil demo sama dengan
kontrak live agar dashboard offline menjadi representasi struktur keluaran,
bukan versi ringkas yang berbeda.

## Statelessness

Server tidak memiliki database kandidat, akun, atau penyimpanan riwayat. Request
diproses dalam memori selama siklus HTTP. Arsitektur aplikasi tidak sengaja
menyimpan profil atau lowongan, tetapi platform deployment dan provider AI dapat
memiliki logging atau kebijakan data tersendiri yang harus ditinjau sebelum
produksi.

## Status Verifikasi

Unit, integration-style, dan DOM interaction tests menggunakan fake provider,
mock fetch, dan jsdom. Lint, test, build, dan audit dapat berjalan tanpa API key
dan tanpa panggilan provider eksternal. Bundle produksi juga telah diperiksa
secara lokal untuk health response, fallback SPA, CSP, security headers,
request ID, penolakan tanpa provider, dan rate limit.

Integrasi Gemini live, kualitas respons, dan latensi lokal telah diverifikasi
melalui enam evaluasi berurutan. Integrasi OpenAI live, perilaku timeout dan
kegagalan terhadap layanan nyata, QA browser lintas perangkat, serta deployment
publik belum diverifikasi.
