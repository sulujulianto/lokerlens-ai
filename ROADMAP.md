# LokerLens AI — Roadmap V2

Dokumen ini membedakan fondasi yang sudah selesai dari verifikasi yang masih
dibutuhkan sebelum kandidat rilis. V2 sekarang berada pada branch `main`;
belum ada deployment produksi atau tag rilis V2.

## Selesai untuk Fondasi V2

- kontrak request dan response bersama melalui Zod;
- validasi runtime pada frontend dan backend;
- backend dengan interface provider AI;
- resolver provider serta adapter Gemini dan OpenAI;
- prompt builder dengan batas data tidak tepercaya;
- parsing serta validasi respons provider;
- error server yang dinormalisasi;
- service analisis yang terpisah dari Express;
- panduan khusus untuk IT & Digital, Administrasi, Customer Service, dan
  Operasional/Gudang/Logistik;
- katalog 29 rumpun karier dengan panduan khusus untuk 27 rumpun dan fallback
  konservatif untuk dua rumpun terbuka;
- konteks jenis sumber, lembaga, serta program pelatihan yang bersifat opsional;
- scoring rubric dan kebijakan konsistensi skor-verdict;
- rincian lima komponen skor, pencocokan persyaratan berbasis bukti, prioritas
  terurut, roadmap dengan keluaran konkret, dan persiapan wawancara terstruktur;
- frontend manual-first dengan 29 bidang pekerjaan, alur tunggal, dan visual putih–slate;
- dashboard hasil normalized V2;
- empat demo offline deterministik;
- kompatibilitas sementara untuk request dan response V1;
- stabilisasi responsive, aksesibilitas, keyboard, fokus, loading, demo, reset,
  error, dan konten panjang;
- test deterministik tanpa panggilan provider eksternal;
- build frontend dan backend produksi.
- timeout serta cancellation request provider;
- rate limit endpoint analisis;
- security headers, CSP produksi, Permissions Policy, request ID, dan cache
  aset immutable;
- GitHub Actions CI;
- ESLint untuk TypeScript, React Hooks, dan Vite Fast Refresh sebagai gerbang
  CI terpisah dari TypeScript typecheck;
- pembaruan dependency kompatibel dengan hasil audit 0 temuan;
- gerbang kualitas untuk sapaan Indonesia dan klaim kelulusan atau sertifikasi
  pelatihan yang tidak didukung profil;
- 26 berkas test dan 299 test, termasuk pengujian interaksi DOM serta boundary
  HTTP Express untuk health, analisis, error, header keamanan, batas body,
  rate limit, dan CSP produksi;
- tujuh skenario Playwright yang dijalankan pada Chromium dan Firefox (14
  project run) untuk memverifikasi bundle produksi, status tanpa provider,
  alur demo offline tanpa request AI, fokus, reset formulir, dan overflow pada
  viewport ponsel;
- pemeriksaan aksesibilitas browser untuk form awal dan dashboard hasil terhadap
  aturan WCAG A/AA dengan axe-core, reset melalui keyboard, serta penghentian
  animasi spinner ketika preferensi reduced motion aktif;
- laporan coverage V8 untuk seluruh kode aplikasi dengan ambang global 75%
  pada statements, branches, functions, dan lines sebagai gerbang CI;
- verifikasi lokal bundle produksi, health check, penolakan tanpa key, header,
  dan rate limit.
- evaluasi Gemini live berulang: putaran awal menghasilkan empat respons valid
  dan dua penolakan aman, sedangkan putaran setelah stabilisasi lulus 6/6 tanpa
  peringatan;
- tiga pengulangan Frontend dengan skor 72, 70, dan 72 serta verdict konsisten;
- latensi lokal enam request tercatat 21.086–34.093 ms, di bawah timeout
  provider 45 detik.
- V2 dipromosikan ke `main`, branch pengembangan lama dihapus, dan CI `main`
  lulus.

## Wajib Sebelum Kandidat Rilis V2

1. Mengevaluasi kualitas prompt dengan lowongan realistis minimal pada IT,
   administrasi, layanan pelanggan, logistik, kuliner, dan satu bidang teknik.
2. Menguji lowongan panjang, profil dengan pengalaman informal, dan input
   bilingual.
3. Menguji respons provider live yang kosong, malformed, lambat, atau gagal.
4. Memvalidasi batas waktu request terhadap karakteristik platform deployment;
   pengujian lokal belum membuktikan bahwa platform publik mendukung durasi
   21–34 detik.
5. Memilih platform dan memverifikasi konfigurasi, health check, logging,
   rate-limit store, serta error handling pada deployment publik.
6. Meninjau ulang wording privasi setelah platform hosting, lokasi pemrosesan,
   logging, dan kebijakan provider final diketahui.
7. Menjalankan pemeriksaan manual lintas browser untuk responsive, alur
   keyboard lengkap, dan pembesaran 200% di luar cakupan skenario otomatis
   Chromium/Firefox; pemeriksaan reduced motion otomatis baru mencakup spinner.

## Kandidat Pasca-Rilis

Item berikut bersifat opsional dan harus disetujui berdasarkan kebutuhan
pengguna, bukan dianggap sebagai prasyarat otomatis:

- penyimpanan draf atau riwayat lokal yang bersifat opt-in;
- export Markdown atau PDF;
- panduan spesialis lebih dalam untuk bidang tambahan;
- adapter provider AI di luar Gemini dan OpenAI;
- akun dan sinkronisasi lintas perangkat hanya jika kebutuhan produk serta
  konsekuensi privasinya telah disetujui.

## Tetap Di Luar Cakupan Saat Ini

- CV scanner atau parser PDF;
- scraping lowongan;
- kalkulator peluang diterima kerja;
- pembayaran dan langganan;
- database kandidat tanpa kebutuhan produk yang jelas;
- jaminan wawancara atau pekerjaan.

## Riwayat

- `main` memuat kandidat V2 untuk penyerahan repository dan demo lokal.
- Tag `v1.0.0` mempertahankan Juara Vibe Coding Edition.
- Adapter legacy tetap tersedia sementara selama migrasi klien menuju kontrak
  V2.
