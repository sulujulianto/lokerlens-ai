# LokerLens AI — Peta Jalan V2

Dokumen ini membedakan fondasi yang sudah selesai dari verifikasi yang masih
dibutuhkan sebelum kandidat rilis. V2 sekarang berada pada cabang `main`;
belum ada penerapan produksi atau tag rilis V2.

## Selesai untuk Fondasi V2

- kontrak permintaan dan respons bersama melalui Zod;
- validasi saat aplikasi berjalan pada antarmuka dan sisi server;
- sisi server dengan antarmuka penyedia AI;
- pemilih penyedia serta adaptor Gemini dan OpenAI;
- penyusun instruksi model dengan batas data tidak tepercaya;
- penguraian serta validasi respons penyedia;
- galat server yang dinormalisasi;
- layanan analisis yang terpisah dari Express;
- panduan khusus untuk TI & Digital, Administrasi, Layanan Pelanggan, dan
  Operasional/Gudang/Logistik;
- katalog 29 rumpun karier dengan panduan khusus untuk 27 rumpun dan mekanisme cadangan
  konservatif untuk dua rumpun terbuka;
- konteks jenis sumber, lembaga, serta program pelatihan yang bersifat opsional;
- rubrik penilaian dan kebijakan konsistensi skor-kesimpulan;
- rincian lima komponen skor, pencocokan persyaratan berbasis bukti, prioritas
  terurut, peta jalan dengan keluaran konkret, dan persiapan wawancara terstruktur;
- antarmuka yang mengutamakan input manual dengan 29 bidang pekerjaan, alur
  tunggal, dan visual putih–abu-abu kebiruan;
- dasbor hasil V2 yang ternormalisasi;
- empat demo luring deterministik;
- kompatibilitas sementara untuk permintaan dan respons V1;
- stabilisasi tata letak responsif, aksesibilitas, papan ketik, fokus, pemuatan,
  demo, pengaturan ulang, galat, dan konten panjang;
- pengujian deterministik tanpa panggilan penyedia eksternal;
- pembuatan paket antarmuka dan server produksi;
- batas waktu serta pembatalan permintaan penyedia;
- pembatasan laju endpoint analisis;
- header keamanan, CSP produksi, Permissions Policy, ID permintaan, dan tembolok
  aset yang tidak dapat diubah;
- GitHub Actions CI;
- ESLint untuk TypeScript, React Hooks, dan Vite Fast Refresh sebagai gerbang
  CI terpisah dari pemeriksaan tipe TypeScript;
- pembaruan dependensi kompatibel dengan hasil audit 0 temuan;
- gerbang kualitas untuk sapaan Indonesia dan klaim kelulusan atau sertifikasi
  pelatihan yang tidak didukung profil;
- 28 berkas pengujian dan 324 kasus uji, termasuk pengujian interaksi DOM serta
  batas HTTP Express untuk kesehatan layanan, analisis, galat, header keamanan,
  batas badan permintaan, pembatasan laju, dan CSP produksi;
- sembilan skenario Playwright yang dijalankan pada Chromium dan Firefox (18
  eksekusi proyek) untuk memverifikasi paket produksi, status tanpa penyedia,
  alur demo luring tanpa permintaan AI, fokus, pengaturan ulang formulir,
  penyesuaian tata letak pada matriks area tampilan 360–768 px, dan perjalanan
  bolak-balik dengan papan ketik tanpa jebakan fokus;
- pemeriksaan aksesibilitas peramban untuk formulir awal dan dasbor hasil terhadap
  aturan WCAG A/AA dengan axe-core, termasuk pengaturan ulang serta kembali dari
  hasil melalui papan ketik;
- laporan cakupan V8 untuk seluruh kode aplikasi dengan ambang global 75%
  pada pernyataan, cabang, fungsi, dan baris sebagai gerbang CI;
- verifikasi lokal paket produksi, pemeriksaan kesehatan, penolakan tanpa kunci
  API, header, dan pembatasan laju;
- evaluasi Gemini langsung berulang: putaran awal menghasilkan empat respons valid
  dan dua penolakan aman, sedangkan putaran setelah stabilisasi lulus 6/6 tanpa
  peringatan;
- tiga pengulangan pengembang antarmuka dengan skor 72, 70, dan 72 serta kesimpulan konsisten;
- latensi lokal enam permintaan tercatat 21.086–34.093 ms, di bawah batas waktu
  penyedia 45 detik;
- evaluasi Gemini langsung yang diperluas lulus 8/8 tanpa peringatan otomatis:
  tiga skor pengembang antarmuka konsisten pada 70, Cook Helper mendapat 72, dan Junior AC
  Maintenance Helper mendapat 89; durasi tercatat 24.448–36.845 ms per permintaan.
- skenario deterministik lowongan panjang dwibahasa dengan pengalaman informal
  lulus melalui validasi skema, penyusun instruksi model, dan batas HTTP tanpa
  pemotongan konten;
- adaptor Gemini dan OpenAI memiliki matriks kegagalan deterministik untuk
  respons kosong, rusak, ditolak, melewati batas waktu, dan kegagalan layanan
  hulu tanpa memakai kuota penyedia langsung;
- QA manual Chrome dan Firefox mencakup desktop, area tampilan 360–768 px, papan ketik,
- pengurangan gerakan, pembesaran 200%, serta pemeriksaan luapan tanpa temuan
  penghambat yang tercatat di `docs/MANUAL_QA.md`;
- panduan persiapan penerapan dan templat variabel lingkungan produksi tersedia tanpa
  memilih penyedia hosting, membuat layanan eksternal, memasukkan kartu,
  atau mengaktifkan biaya;
- konteks produk mendokumentasikan asal Juara Vibe Coding, sasaran awal pencari
  kerja yang baru masuk bidang IT, alasan input manual dibanding unggah CV, dan
  evolusi menuju V2 multi-bidang tanpa mengubah klaim produk;
- V2 dipromosikan ke `main`, cabang pengembangan lama dihapus, dan CI `main`
  lulus.

## Wajib Sebelum Kandidat Rilis V2

1. Memvalidasi batas waktu permintaan terhadap karakteristik platform penerapan;
   pengujian lokal belum membuktikan bahwa platform publik mendukung durasi
   24–37 detik.
2. Memilih platform dan memverifikasi konfigurasi, pemeriksaan kesehatan,
   pencatatan log, penyimpanan pembatasan laju, serta penanganan galat pada
   penerapan publik.
3. Meninjau ulang redaksi privasi setelah platform hosting, lokasi pemrosesan,
   pencatatan log, dan kebijakan penyedia final diketahui.
4. Mengisi bukti penerapan, uji terbatas, observabilitas, kontrol biaya, dan pemulihan
   pada `docs/DEPLOYMENT.md`; QA manual diulang bila penerapan atau perubahan
   antarmuka yang material menghasilkan perilaku yang berbeda.

## Kandidat Pasca-Rilis

Butir berikut bersifat opsional dan harus disetujui berdasarkan kebutuhan
pengguna, bukan dianggap sebagai prasyarat otomatis:

- penyimpanan draf atau riwayat lokal yang bersifat opsional;
- ekspor Markdown atau PDF;
- panduan spesialis lebih dalam untuk bidang tambahan;
- adaptor penyedia AI di luar Gemini dan OpenAI;
- akun dan sinkronisasi lintas perangkat hanya jika kebutuhan produk serta
  konsekuensi privasinya telah disetujui.

## Tetap Di Luar Cakupan Saat Ini

- pemindai CV atau pengurai PDF;
- pengambilan otomatis data lowongan;
- kalkulator peluang diterima kerja;
- pembayaran dan langganan;
- basis data kandidat tanpa kebutuhan produk yang jelas;
- jaminan wawancara atau pekerjaan.

## Riwayat

- `main` memuat kandidat V2 untuk penyerahan repositori dan demo lokal.
- Tag `v1.0.0` mempertahankan edisi Juara Vibe Coding.
- `docs/PRODUCT_CONTEXT.md` menjadi sumber narasi untuk membedakan asal proyek
  dari cakupan implementasi V2 saat ini.
- Adaptor lama tetap tersedia sementara selama migrasi klien menuju kontrak
  V2.
