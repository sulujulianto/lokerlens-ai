# Persiapan Deployment — LokerLens AI V2

Status dokumen: **persiapan saja**. Belum ada platform yang dipilih, service
publik yang dibuat, kartu pembayaran yang disimpan, domain produksi, atau
deployment V2 yang diklaim berhasil.

Dokumen ini memisahkan fakta yang sudah dibuktikan secara lokal dari keputusan
yang baru boleh diisi setelah platform dan akun nyata tersedia. Harga, kuota,
syarat kartu, region, serta kebijakan provider dapat berubah; semuanya harus
diverifikasi kembali pada saat deployment, bukan diasumsikan dari nama paket
“gratis”.

## Batas Pekerjaan Branch Persiapan

Branch persiapan boleh:

- mendokumentasikan kontrak build, start, health check, dan environment;
- menyediakan template tanpa secret;
- menentukan bukti yang wajib dikumpulkan sebelum rilis;
- menjalankan production bundle secara lokal;
- mengevaluasi platform tanpa membuat komitmen biaya.

Branch persiapan tidak boleh:

- membuat atau mengaktifkan service hosting;
- memasukkan kartu atau menyetujui authorization charge;
- memasukkan Gemini/OpenAI API key ke source, chat, log, atau screenshot;
- mengklaim region, retensi, privasi, uptime, atau biaya yang belum diverifikasi;
- mengubah checklist deployment menjadi selesai hanya karena build lokal lulus.

Jika alur pendaftaran meminta kartu, deposit, authorization, atau paket berbayar
yang tidak disetujui, hentikan proses. Jangan mengandalkan asumsi bahwa biaya
akan tetap nol.

## Kontrak Runtime

LokerLens dijalankan sebagai **satu Node.js web service**. Server Express
menyajikan bundle React dan endpoint API dari origin yang sama. Static hosting
saja tidak menyediakan `/api/health` atau `/api/analyze`.

| Item | Nilai yang harus dipakai |
| --- | --- |
| Runtime | Node.js 20.9 atau lebih baru; Node.js 22 sesuai CI |
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm start` |
| Bind address | `0.0.0.0` sudah digunakan oleh server |
| Port | `PORT` dari platform; fallback lokal `3000` |
| Health path | `/api/health` |
| Persistent disk | Tidak diperlukan |
| Database | Tidak digunakan |
| Working directory | Root repository |
| Output | `dist/public` dan `dist/server.cjs` |

Build harus terjadi sebelum start. `NODE_ENV=production` wajib agar server
menyajikan aset dari `dist/public`, bukan membuat middleware Vite development.

## Environment dan Secret

Gunakan [`.env.production.example`](../.env.production.example) hanya sebagai
daftar nama. Nilai nyata dimasukkan melalui secret manager atau dashboard
platform. Jangan mengunggah file `.env` berisi secret.

| Nama | Sifat | Aturan |
| --- | --- | --- |
| `NODE_ENV` | wajib | `production` |
| `PORT` | platform | Gunakan nilai yang diinjeksi platform |
| `AI_PROVIDER` | wajib | `gemini` atau `openai` |
| `GEMINI_API_KEY` | secret kondisional | Hanya bila provider `gemini` |
| `GEMINI_MODEL` | opsional | Default aplikasi bila kosong |
| `OPENAI_API_KEY` | secret kondisional | Hanya bila provider `openai` |
| `OPENAI_MODEL` | opsional | Default aplikasi bila kosong |
| `AI_REQUEST_TIMEOUT_MS` | opsional | Integer 5.000–120.000; default 45.000 |
| `ANALYSIS_RATE_LIMIT_MAX` | opsional | Integer 1–100; default 10 |
| `ANALYSIS_RATE_LIMIT_WINDOW_MS` | opsional | Integer 10.000–3.600.000; default 60.000 |

Service boleh dimulai tanpa API key untuk smoke test demo offline. Dalam mode
itu health tetap `200` dengan analisis live tidak tersedia, sedangkan request
analisis harus ditolak aman dengan `503`.

## Gerbang Pemilihan Platform

Isi tabel ini menggunakan bukti dari dokumentasi resmi dan dashboard akun pada
hari evaluasi. `TBD` bukan persetujuan.

| Keputusan | Bukti yang wajib dicatat | Status |
| --- | --- | --- |
| Platform dan paket | Nama, URL kebijakan, tanggal pemeriksaan | TBD |
| Biaya | Harga, batas gratis, risiko overage, mata uang, pajak | TBD |
| Kartu | Wajib/tidak, authorization/deposit, cara menghapus | TBD |
| Region | Lokasi runtime dan apakah dapat dipilih | TBD |
| Idle behavior | Sleep, cold start, dan batas waktu bangun | TBD |
| Request timeout | Harus mendukung provider timeout + overhead | TBD |
| Log | Isi, akses, retensi, redaction, dan penghapusan | TBD |
| Network/TLS | HTTPS, proxy, forwarded headers, custom domain | TBD |
| Resource limit | RAM, CPU, storage sementara, concurrency | TBD |
| Rollback | Cara kembali ke commit/image sebelumnya | TBD |
| Penghapusan | Cara menghapus service, secret, log, dan akun | TBD |

Jangan memilih platform hanya karena tombol antarmuka menampilkan `Free`.
Syarat akun aktual, kartu, wilayah, dan potensi biaya harus cocok dengan batas
pengguna pada saat itu.

## Risiko Proxy dan Rate Limit

Rate limiter saat ini memakai memory satu proses. Konsekuensinya:

- restart menghapus counter;
- beberapa instance tidak berbagi counter;
- deployment horizontal memerlukan external store yang belum dipilih;
- reverse proxy dapat membuat semua pengguna terlihat berasal dari IP yang
  sama bila konfigurasi trusted proxy tidak sesuai.

Kode saat ini tidak menetapkan `trust proxy`. Setelah platform dipilih,
verifikasi dokumentasi forwarded headers dan jumlah trusted hops. Jangan
mengaktifkan `app.set("trust proxy", true)` secara umum tanpa model proxy yang
jelas karena konfigurasi yang terlalu longgar dapat memengaruhi identitas klien
dan rate limiting.

Untuk canary awal, gunakan satu instance. Multi-instance bukan target sebelum
store rate-limit bersama dan perilaku proxy dibuktikan.

## Tahapan Verifikasi

### 1. Production bundle lokal

```bash
npm ci
npm run typecheck
npm run lint
npm run test:coverage
npm run build

NODE_ENV=production \
AI_PROVIDER=gemini \
GEMINI_API_KEY= \
PORT=3000 \
npm start
```

Pada terminal lain:

```bash
curl --fail --silent --show-error http://127.0.0.1:3000/api/health
curl --fail --silent --show-error http://127.0.0.1:3000/ > /dev/null
```

### 2. Canary tanpa provider live

Deployment pertama, bila kelak disetujui, dimulai tanpa API key:

1. pastikan health `200`;
2. buka halaman utama dan empat demo offline;
3. pastikan live analysis dinonaktifkan secara aman;
4. periksa CSP, Permissions Policy, request ID, dan cache aset;
5. periksa log dan pastikan body profil/lowongan tidak tercatat;
6. ukur cold start dan waktu respons setelah idle;
7. uji rollback sebelum menambahkan provider key.

### 3. Canary provider live

Tambahkan satu API key hanya melalui secret manager. Gunakan profil dan
lowongan fiktif, lalu catat:

- waktu respons end-to-end;
- status HTTP dan request ID;
- apakah proxy/platform memutus request lebih awal;
- hasil timeout dan pembatalan;
- konsumsi kuota/biaya pada dashboard provider;
- isi log platform serta provider;
- respons setelah rate limit tercapai.

Evaluasi Gemini lokal yang dicatat sebelumnya membutuhkan sekitar 24–37 detik
per request. Platform harus mendukung durasi provider yang dikonfigurasi plus
overhead jaringan. Menaikkan timeout tanpa bukti bukan solusi.

### 4. Review publik

Sebelum membagikan URL:

- jalankan ulang `docs/MANUAL_QA.md` pada URL canary;
- periksa mobile, keyboard, reduced motion, 200% zoom, dan overflow;
- perbarui `docs/PRIVACY.md` dengan platform, region, logging, retensi, dan
  provider nyata;
- periksa screenshot tidak memuat secret atau data pribadi;
- pastikan cost alert, quota, dan jalur penghentian tersedia;
- isi seluruh evidence record di bawah.

## Observability Minimum

Tanpa mencatat body request, minimum yang perlu tersedia:

- uptime dan health-check failures;
- jumlah status `5xx`, `429`, dan provider timeout;
- latensi p50/p95 untuk `/api/analyze`;
- cold-start duration;
- request ID untuk korelasi error;
- CPU/RAM dan restart count;
- kuota serta biaya provider AI.

Log tidak boleh berisi profil kandidat, teks lowongan, prompt, raw response,
API key, atau stack trace pada respons publik. Aturan redaction dan retensi
harus dicatat berdasarkan platform nyata.

## Rollback dan Penghentian

Sebelum go-live, buktikan prosedur berikut:

1. simpan SHA commit canary yang sehat;
2. ketahui cara deploy ulang SHA/image sebelumnya;
3. verifikasi health setelah rollback;
4. cabut atau rotasi API key bila ada dugaan kebocoran;
5. nonaktifkan auto-deploy sebelum investigasi insiden;
6. hapus service dan secret bila batas biaya atau privasi tidak terpenuhi.

## Evidence Record

Bagian ini tetap `TBD` sampai deployment benar-benar dilakukan.

| Bukti | Nilai |
| --- | --- |
| Tanggal dan timezone | TBD |
| Commit SHA | TBD |
| Platform/paket/region | TBD |
| URL canary | TBD |
| Build dan start command | TBD |
| Health check | TBD |
| Cold start | TBD |
| Live request latency | TBD |
| Timeout/cancellation | TBD |
| Proxy/client IP | TBD |
| Rate-limit behavior | TBD |
| Logging dan retensi | TBD |
| Cost/quota alert | TBD |
| Privacy review | TBD |
| Rollback test | TBD |
| Manual QA URL publik | TBD |
| Keputusan akhir | TBD |

Ketiadaan data pada tabel ini berarti deployment belum diverifikasi, bukan
berarti platform memakai default yang aman.
