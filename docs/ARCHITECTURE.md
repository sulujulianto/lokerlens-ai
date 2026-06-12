# Arsitektur LokerLens AI V2

Dokumen ini merangkum arsitektur yang sudah diimplementasikan pada branch
`v2-development`. Ini bukan spesifikasi untuk provider yang belum tersedia.

## Alur Request V2

```text
React form
  → shared request validation
  → POST /api/analyze
  → strict V2 route validation
  → JobReadinessService
  → resolved AIProvider
  → GeminiProvider
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
- mendaftarkan `/api/health` dan `/api/analyze`;
- memasang Vite middleware saat development;
- melayani aset hasil build dan fallback SPA saat production;
- memasang error handler;
- memulai server pada `PORT`.

Server dapat dimulai tanpa API key. Dalam kondisi tersebut, health check tetap
merespons tetapi `analysisAvailable` bernilai `false`.

## Konfigurasi

[`../server/config.ts`](../server/config.ts) memvalidasi:

- `AI_PROVIDER`, dengan nilai yang didukung saat ini hanya `gemini`;
- `GEMINI_API_KEY`, yang bersifat opsional saat server dimulai;
- `PORT`, default `3000`.

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

Adapter pada [`../server/compatibility/`](../server/compatibility/) adalah kode
migrasi sementara, bukan business schema kedua yang permanen.

## Service dan Provider

[`../server/services/jobReadinessService.ts`](../server/services/jobReadinessService.ts)
tidak bergantung pada Express. Service menerima request V2 tervalidasi, memanggil
`AIProvider`, lalu memvalidasi hasil sekali lagi sebelum mengembalikannya.

Interface provider berada di
[`../server/ai/provider.ts`](../server/ai/provider.ts). Resolver membaca
konfigurasi server dan saat ini hanya dapat membuat `GeminiProvider`.

Implementasi Gemini:

- membuat client SDK hanya saat dibutuhkan;
- mengambil system instruction dan user prompt dari prompt builder;
- meminta JSON terstruktur;
- tidak mengekspor tipe SDK ke service atau route;
- memetakan kegagalan ke `AppError`;
- menyerahkan teks respons ke parser V2.

Provider atau model lain belum diimplementasikan.

## Prompt dan Panduan Bidang

[`../server/ai/promptBuilder.ts`](../server/ai/promptBuilder.ts) menyusun:

- batas keamanan dan data tidak tepercaya;
- scoring rubric;
- aturan verdict;
- grounding terhadap profil dan lowongan;
- klasifikasi must-have dan nice-to-have;
- aturan roadmap, pesan lamaran, dan pertanyaan wawancara;
- schema output normalized;
- bahasa output yang diminta.

[`../server/ai/jobFieldGuidance.ts`](../server/ai/jobFieldGuidance.ts)
menambahkan panduan khusus untuk empat bidang awal. Bidang lain memakai fallback
umum yang secara eksplisit menghindari klaim spesialis.

## Parsing dan Error

[`../server/ai/responseParser.ts`](../server/ai/responseParser.ts):

1. menerima teks provider;
2. melepas Markdown code fence jika ada;
3. mem-parsing JSON;
4. memvalidasi seluruh response dengan `JobReadinessAnalysisSchema`;
5. menolak field asing, field hilang, batas berlebih, atau skor/verdict yang
   tidak konsisten.

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

Backend masih menyertakan `geminiConfigured` untuk klien V1, tetapi frontend V2
tidak menggunakannya.

## Demo Offline

Demo frontend berada di
[`../src/demoScenarios.ts`](../src/demoScenarios.ts), dengan request fixture
bersama dari
[`../shared/crossFieldScenarios.ts`](../shared/crossFieldScenarios.ts).

Request dan analysis demo divalidasi melalui schema V2. Menampilkan demo tidak
memanggil `/api/analyze` atau provider eksternal.

## Statelessness

Server tidak memiliki database kandidat, akun, atau penyimpanan riwayat. Request
diproses dalam memori selama siklus HTTP. Arsitektur aplikasi tidak sengaja
menyimpan profil atau lowongan, tetapi platform deployment dan provider AI dapat
memiliki logging atau kebijakan data tersendiri yang harus ditinjau sebelum
produksi.

## Status Verifikasi

Unit dan integration-style tests menggunakan fake provider dan mock fetch.
Lint, test, dan build dapat berjalan tanpa API key dan tanpa panggilan jaringan
eksternal.

Integrasi Gemini live, ketersediaan model, latensi, timeout, dan deployment
produksi belum diverifikasi.
