# Persiapan Penerapan — LokerLens AI V2

Status dokumen: **persiapan saja**. Belum ada platform yang dipilih, layanan
publik yang dibuat, kartu pembayaran yang disimpan, domain produksi, atau
penerapan V2 yang diklaim berhasil.

Dokumen ini memisahkan fakta yang sudah dibuktikan secara lokal dari keputusan
yang baru boleh diisi setelah platform dan akun nyata tersedia. Harga, kuota,
syarat kartu, wilayah, serta kebijakan penyedia dapat berubah; semuanya harus
diverifikasi kembali pada saat penerapan, bukan diasumsikan dari nama paket
“gratis”.

## Batas Pekerjaan Cabang Persiapan

Cabang persiapan boleh:

- mendokumentasikan kontrak pembuatan paket, proses awal, pemeriksaan kesehatan,
  dan variabel lingkungan;
- menyediakan templat tanpa nilai rahasia;
- menentukan bukti yang wajib dikumpulkan sebelum rilis;
- menjalankan paket produksi secara lokal;
- mengevaluasi platform tanpa membuat komitmen biaya.

Cabang persiapan tidak boleh:

- membuat atau mengaktifkan layanan hosting;
- memasukkan kartu atau menyetujui otorisasi sementara;
- memasukkan kunci API Gemini/OpenAI ke kode sumber, percakapan, log, atau
  tangkapan layar;
- mengklaim wilayah, retensi, privasi, waktu aktif, atau biaya yang belum diverifikasi;
- mengubah daftar periksa penerapan menjadi selesai hanya karena pembuatan paket lokal lulus.

Jika alur pendaftaran meminta kartu, deposit, otorisasi, atau paket berbayar
yang tidak disetujui, hentikan proses. Jangan mengandalkan asumsi bahwa biaya
akan tetap nol.

## Kontrak Saat Aplikasi Berjalan

LokerLens dijalankan sebagai **satu layanan web Node.js**. Server Express
menyajikan paket React dan endpoint API dari origin yang sama. Hosting statis
saja tidak menyediakan `/api/health` atau `/api/analyze`.

| Komponen | Nilai yang harus dipakai |
| --- | --- |
| Lingkungan eksekusi | Node.js 20.9 atau lebih baru; Node.js 22 sesuai CI |
| Instalasi | `npm ci` |
| Pembuatan paket | `npm run build` |
| Proses awal | `npm start` |
| Alamat jaringan | `0.0.0.0` sudah digunakan oleh server |
| Port | `PORT` dari platform; nilai cadangan lokal `3000` |
| Jalur kesehatan | `/api/health` |
| Disk persisten | Tidak diperlukan |
| Basis data | Tidak digunakan |
| Direktori kerja | Akar repositori |
| Keluaran | `dist/public` dan `dist/server.cjs` |

Paket harus dibuat sebelum aplikasi dimulai. `NODE_ENV=production` wajib agar
server menyajikan aset dari `dist/public`, bukan membuat perangkat perantara
(*middleware*) pengembangan Vite.

## Lingkungan dan Nilai Rahasia

Gunakan [`.env.production.example`](../.env.production.example) hanya sebagai
daftar nama. Nilai nyata dimasukkan melalui pengelola nilai rahasia atau dasbor
platform. Jangan mengunggah file `.env` berisi nilai rahasia.

| Nama | Sifat | Aturan |
| --- | --- | --- |
| `NODE_ENV` | wajib | `production` |
| `PORT` | platform | Gunakan nilai yang disediakan platform |
| `AI_PROVIDER` | wajib | `gemini` atau `openai` |
| `GEMINI_API_KEY` | rahasia kondisional | Hanya bila penyedia `gemini` |
| `GEMINI_MODEL` | opsional | Nilai bawaan aplikasi bila kosong |
| `OPENAI_API_KEY` | rahasia kondisional | Hanya bila penyedia `openai` |
| `OPENAI_MODEL` | opsional | Nilai bawaan aplikasi bila kosong |
| `AI_REQUEST_TIMEOUT_MS` | opsional | Bilangan bulat 5.000–120.000; nilai bawaan 45.000 |
| `ANALYSIS_RATE_LIMIT_MAX` | opsional | Bilangan bulat 1–100; nilai bawaan 10 |
| `ANALYSIS_RATE_LIMIT_WINDOW_MS` | opsional | Bilangan bulat 10.000–3.600.000; nilai bawaan 60.000 |

Layanan boleh dimulai tanpa kunci API untuk pengujian awal demo luring. Dalam mode
itu endpoint kesehatan tetap `200` dengan analisis langsung tidak tersedia,
sedangkan permintaan
analisis harus ditolak aman dengan `503`.

## Gerbang Pemilihan Platform

Isi tabel ini menggunakan bukti dari dokumentasi resmi dan dasbor akun pada
hari evaluasi. Status "belum ditentukan" bukan persetujuan.

| Keputusan | Bukti yang wajib dicatat | Status |
| --- | --- | --- |
| Platform dan paket | Nama, URL kebijakan, tanggal pemeriksaan | Belum ditentukan |
| Biaya | Harga, batas gratis, risiko biaya berlebih, mata uang, pajak | Belum ditentukan |
| Kartu | Wajib/tidak, otorisasi/deposit, cara menghapus | Belum ditentukan |
| Wilayah | Lokasi lingkungan eksekusi dan apakah dapat dipilih | Belum ditentukan |
| Perilaku saat tidak aktif | Penonaktifan, waktu aktif awal, dan batas waktu bangun | Belum ditentukan |
| Batas waktu permintaan | Harus mendukung batas waktu penyedia beserta waktu tambahan | Belum ditentukan |
| Log | Isi, akses, retensi, penyamaran data, dan penghapusan | Belum ditentukan |
| Jaringan/TLS | HTTPS, proksi, header yang diteruskan, domain khusus | Belum ditentukan |
| Batas sumber daya | RAM, CPU, penyimpanan sementara, konkurensi | Belum ditentukan |
| Pemulihan | Cara kembali ke commit/citra sebelumnya | Belum ditentukan |
| Penghapusan | Cara menghapus layanan, nilai rahasia, log, dan akun | Belum ditentukan |

Jangan memilih platform hanya karena tombol antarmuka menampilkan `Free`.
Syarat akun aktual, kartu, wilayah, dan potensi biaya harus cocok dengan batas
pengguna pada saat itu.

## Risiko Proksi dan Pembatasan Laju

Pembatas laju saat ini memakai memori satu proses. Konsekuensinya:

- proses mulai ulang menghapus penghitung;
- beberapa instans tidak berbagi penghitung;
- penerapan horizontal memerlukan penyimpanan eksternal yang belum dipilih;
- proksi balik dapat membuat semua pengguna terlihat berasal dari IP yang
  sama bila konfigurasi proksi tepercaya tidak sesuai.

Kode saat ini tidak menetapkan `trust proxy`. Setelah platform dipilih,
verifikasi dokumentasi header yang diteruskan dan jumlah lompatan tepercaya.
Jangan
mengaktifkan `app.set("trust proxy", true)` secara umum tanpa model proksi yang
jelas karena konfigurasi yang terlalu longgar dapat memengaruhi identitas klien
dan pembatasan laju.

Untuk uji terbatas awal, gunakan satu instans. Penerapan dengan banyak instans
bukan target sebelum penyimpanan pembatasan laju bersama dan perilaku proksi dibuktikan.

## Tahapan Verifikasi

### 1. Paket Produksi Lokal

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

### 2. Uji Terbatas tanpa Penyedia Langsung

Penerapan pertama, bila kelak disetujui, dimulai tanpa kunci API:

1. pastikan endpoint kesehatan mengembalikan `200`;
2. buka halaman utama dan empat demo luring;
3. pastikan analisis langsung dinonaktifkan secara aman;
4. periksa CSP, Permissions Policy, ID permintaan, dan cache aset;
5. periksa log dan pastikan badan permintaan profil/lowongan tidak tercatat;
6. ukur waktu aktif awal dan waktu respons setelah layanan tidak aktif;
7. uji pemulihan sebelum menambahkan kunci API penyedia.

### 3. Uji Terbatas dengan Penyedia Langsung

Tambahkan satu kunci API hanya melalui pengelola nilai rahasia. Gunakan profil dan
lowongan fiktif, lalu catat:

- waktu respons dari awal hingga akhir;
- status HTTP dan ID permintaan;
- apakah proksi/platform memutus permintaan lebih awal;
- hasil batas waktu dan pembatalan;
- konsumsi kuota/biaya pada dasbor penyedia;
- isi log platform serta penyedia;
- respons setelah pembatasan laju tercapai.

Evaluasi Gemini lokal yang dicatat sebelumnya membutuhkan sekitar 24–37 detik
per permintaan. Platform harus mendukung durasi penyedia yang dikonfigurasi
beserta waktu tambahan akibat jaringan. Menaikkan batas waktu tanpa bukti bukan solusi.

### 4. Peninjauan Publik

Sebelum membagikan URL:

- jalankan ulang `docs/MANUAL_QA.md` pada URL uji terbatas;
- periksa perangkat seluler, papan ketik, pengurangan gerakan, pembesaran 200%,
  dan luapan;
- perbarui `docs/PRIVACY.md` dengan platform, wilayah, pencatatan log, retensi,
  dan penyedia nyata;
- periksa tangkapan layar tidak memuat nilai rahasia atau data pribadi;
- pastikan peringatan biaya, kuota, dan jalur penghentian tersedia;
- isi seluruh catatan bukti di bawah.

## Observabilitas Minimum

Tanpa mencatat badan permintaan, hal minimum yang perlu tersedia:

- waktu aktif dan kegagalan pemeriksaan kesehatan;
- jumlah status `5xx`, `429`, dan batas waktu penyedia;
- latensi p50/p95 untuk `/api/analyze`;
- durasi waktu aktif awal;
- ID permintaan untuk korelasi galat;
- CPU/RAM dan jumlah mulai ulang;
- kuota serta biaya penyedia AI.

Log tidak boleh berisi profil kandidat, teks lowongan, instruksi model, respons
mentah, kunci API, atau jejak tumpukan galat pada respons publik. Aturan penyamaran data dan retensi
harus dicatat berdasarkan platform nyata.

## Pemulihan dan Penghentian

Sebelum aplikasi tersedia bagi publik, buktikan prosedur berikut:

1. simpan SHA commit uji terbatas yang sehat;
2. ketahui cara menerapkan ulang SHA/citra sebelumnya;
3. verifikasi kesehatan layanan setelah pemulihan;
4. cabut atau rotasi kunci API bila ada dugaan kebocoran;
5. nonaktifkan penerapan otomatis sebelum investigasi insiden;
6. hapus layanan dan nilai rahasia bila batas biaya atau privasi tidak terpenuhi.

## Catatan Bukti

Bagian ini tetap berstatus **belum ditentukan** sampai penerapan benar-benar dilakukan.

| Bukti | Nilai |
| --- | --- |
| Tanggal dan zona waktu | Belum ditentukan |
| SHA commit | Belum ditentukan |
| Platform/paket/wilayah | Belum ditentukan |
| URL uji terbatas | Belum ditentukan |
| Perintah pembuatan paket dan proses awal | Belum ditentukan |
| Pemeriksaan kesehatan | Belum ditentukan |
| Waktu aktif awal | Belum ditentukan |
| Latensi permintaan langsung | Belum ditentukan |
| Batas waktu/pembatalan | Belum ditentukan |
| Proksi/IP klien | Belum ditentukan |
| Perilaku pembatasan laju | Belum ditentukan |
| Pencatatan log dan retensi | Belum ditentukan |
| Peringatan biaya/kuota | Belum ditentukan |
| Peninjauan privasi | Belum ditentukan |
| Pengujian pemulihan | Belum ditentukan |
| URL publik untuk QA manual | Belum ditentukan |
| Keputusan akhir | Belum ditentukan |

Ketiadaan data pada tabel ini berarti penerapan belum diverifikasi, bukan
berarti platform memakai nilai bawaan yang aman.
