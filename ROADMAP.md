# LokerLens AI — Roadmap V2

Dokumen ini membedakan fondasi yang sudah selesai dari verifikasi yang masih
dibutuhkan sebelum kandidat rilis. V2 masih berada pada branch
`v2-development`; belum ada rilis atau tag V2.

## Selesai untuk Fondasi V2

- kontrak request dan response bersama melalui Zod;
- validasi runtime pada frontend dan backend;
- backend dengan interface provider AI;
- resolver provider dan adapter Gemini;
- prompt builder dengan batas data tidak tepercaya;
- parsing serta validasi respons provider;
- error server yang dinormalisasi;
- service analisis yang terpisah dari Express;
- panduan khusus untuk IT & Digital, Administrasi, Customer Service, dan
  Operasional/Gudang/Logistik;
- fallback umum yang konservatif untuk bidang lain;
- scoring rubric dan kebijakan konsistensi skor-verdict;
- frontend manual-first dengan sepuluh bidang pekerjaan;
- dashboard hasil normalized V2;
- empat demo offline deterministik;
- kompatibilitas sementara untuk request dan response V1;
- stabilisasi responsive, aksesibilitas, keyboard, fokus, loading, demo, reset,
  error, dan konten panjang;
- test deterministik tanpa panggilan provider eksternal;
- build frontend dan backend produksi.

## Wajib Sebelum Kandidat Rilis V2

1. Memperoleh dan mengonfigurasi API key Gemini pada lingkungan pengujian yang
   aman.
2. Memverifikasi bahwa model yang dikonfigurasi benar-benar tersedia untuk
   akun, region, dan versi SDK yang digunakan.
3. Menjalankan analisis live end-to-end dari frontend sampai provider dan
   kembali ke dashboard.
4. Mengevaluasi kualitas prompt dengan lowongan realistis pada empat bidang
   spesialis awal.
5. Menguji lowongan panjang, profil dengan pengalaman informal, dan input
   bilingual.
6. Menguji respons provider yang kosong, malformed, lambat, atau gagal.
7. Mengukur latensi dan menentukan strategi timeout/cancellation yang aman.
8. Memverifikasi konfigurasi, static hosting, health check, logging, dan error
   handling pada lingkungan deployment produksi.
9. Meninjau ulang wording privasi setelah platform hosting, lokasi pemrosesan,
   logging, dan kebijakan provider final diketahui.
10. Menjalankan pemeriksaan manual responsive dan keyboard pada browser nyata.

## Kandidat Pasca-Rilis

Item berikut bersifat opsional dan harus disetujui berdasarkan kebutuhan
pengguna, bukan dianggap sebagai prasyarat otomatis:

- penyimpanan draf atau riwayat lokal yang bersifat opt-in;
- export Markdown atau PDF;
- panduan spesialis lebih dalam untuk bidang tambahan;
- adapter provider AI tambahan;
- redesign visual yang lebih luas;
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

- `main` mempertahankan rilis stabil V1.
- Tag `v1.0.0` mempertahankan Juara Vibe Coding Edition.
- Adapter legacy tetap tersedia sementara selama migrasi klien menuju kontrak
  V2.
