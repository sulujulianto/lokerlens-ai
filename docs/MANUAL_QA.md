# Panduan QA Manual untuk Rilis

Panduan ini mencakup pemeriksaan oleh manusia yang tidak dapat dibuktikan hanya
melalui pengujian peramban otomatis. Pemeriksaan ini sengaja dipisahkan dari validasi
penerapan publik. Jalankan terhadap paket produksi tanpa kredensial penyedia
agar empat demo luring fiktif tetap menjadi satu-satunya jalur analisis.

Keberhasilan perintah otomatis di bawah **tidak** menyelesaikan gerbang QA
manual. Seseorang harus menjalankan setiap pemeriksaan yang berlaku, mencatat
lingkungan, dan membiarkan item gagal atau terhalang tetap terbuka pada
[`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).

## Cakupan dan Batas Klaim

Panduan ini memverifikasi:

- tampilan desktop pada Chrome dan Firefox;
- penyesuaian tata letak pada lebar perangkat seluler 360–430 px dan tablet potret;
- navigasi hanya dengan papan ketik dan pemulihan fokus;
- perilaku pengurangan gerakan di luar indikator pemuatan;
- pembesaran peramban 200%; serta
- luapan horizontal, kontrol terpotong, dan konten yang tidak terbaca.

Panduan ini tidak memverifikasi layanan hosting publik, latensi penyedia,
pencatatan log produksi, pembatasan laju bersama, atau perilaku privasi khusus penerapan.

## Menyiapkan Paket Produksi Lokal

Gunakan salinan kerja bersih dan jangan mengekspos kredensial penyedia:

```bash
npm ci
npm run build
npx playwright install chromium firefox
npm run test:e2e:release-qa
```

Perintah Playwright terfokus memberikan dukungan yang dapat diulang untuk
pemeriksaan manual. Perintah tersebut memeriksa formulir awal dan hasil luring
lengkap pada 360, 390, 430, 640, dan 768 piksel CSS di Chromium dan Firefox.
Lebar 640 px merupakan proksi penyesuaian tata letak untuk desktop 1280 px pada
pembesaran 200%, bukan pengganti pengujian pembesaran peramban yang sebenarnya.

Jalankan server produksi untuk pemeriksaan manual:

```bash
NODE_ENV=production \
AI_PROVIDER=gemini \
GEMINI_API_KEY= \
OPENAI_API_KEY= \
npm start
```

Buka `http://localhost:3000`. Pastikan bagian kepala halaman melaporkan bahwa analisis langsung
belum dikonfigurasi dan seluruh empat demo luring tetap dapat digunakan.

## Mencatat Lingkungan

Catat informasi berikut bersama bukti QA akhir:

| Komponen | Nilai |
| --- | --- |
| SHA commit | |
| Tanggal dan zona waktu | |
| Sistem operasi | |
| Versi Chrome | |
| Versi Firefox | |
| Resolusi layar | |
| Tata letak papan ketik | |

Gunakan `LULUS`, `GAGAL`, atau `TERHALANG` pada setiap baris. Baris kosong bukan
bukti.

## Matriks Peramban Desktop

Jalankan formulir awal dan satu hasil luring lengkap pada kedua peramban.
Gunakan setidaknya 1280×720 dan, jika layar memungkinkan, 1440×900.

| Pemeriksaan | Chrome | Firefox | Catatan/bukti |
| --- | --- | --- | --- |
| Kepala halaman, bagian utama, pemilih demo, dan formulir tetap terbaca | | | |
| Seluruh elemen, label, penghitung, dan tombol tetap terlihat | | | |
| Demo terpilih dapat dibedakan tanpa hanya mengandalkan warna | | | |
| Status pemuatan luring dan hasil lengkap dirender dengan benar | | | |
| Kartu hasil, teks panjang, dan tombol salin tidak tumpang tindih | | | |
| Kembali ke formulir memulihkan fokus ke aksi demo | | | |

## Matriks Perangkat Seluler dan Tablet

Gunakan mode desain responsif pada setiap peramban. Pengguliran vertikal bukan
kegagalan; pengguliran horizontal atau konten terpotong merupakan kegagalan.

| Area tampilan | Formulir awal | Hasil luring | Luapan/terpotong | Catatan/bukti |
| --- | --- | --- | --- | --- |
| 360×800 | | | | |
| 390×844 | | | | |
| 430×932 | | | | |
| 768×1024 | | | | |

Pada setiap area tampilan, periksa label formulir terpanjang, pemilih demo,
penghitung teks lowongan, penyebut skor, bukti persyaratan, rencana empat
minggu, instruksi CV, pesan lamaran, dan kartu persiapan wawancara.

## Alur Hanya dengan Papan Ketik

Jangan gunakan tetikus selama pemeriksaan.

1. Muat ulang halaman lalu tekan `Tab`. Fokus pertama harus menuju **Form
   baru**.
2. Lanjutkan menggunakan `Tab` melalui empat pilihan demo dan seluruh kontrol
   formulir yang aktif. Fokus harus tetap terlihat dan mengikuti urutan baca
   visual.
3. Gunakan `Enter` atau `Space` untuk memilih demo lain. Status `pressed` harus
   berubah.
4. Lanjutkan ke **Tampilkan hasil demo terpilih** dan aktifkan tanpa penunjuk.
5. Pastikan fokus berpindah ke **Hasil analisis kesiapan kerja**.
6. Gunakan `Shift+Tab` untuk menuju **Kembali ke formulir**, aktifkan, dan
   pastikan fokus kembali ke aksi demo luring.
7. Atur ulang menjadi formulir kosong dan pastikan fokus berpindah ke **Bidang
   pekerjaan**.
8. Telusuri kembali formulir kosong. Pastikan tidak ada jebakan fokus, kontrol
   aktif yang terlewati, indikator fokus yang tidak terlihat, atau lompatan
   halaman yang tidak diharapkan.

Tombol analisis langsung memang harus tetap dinonaktifkan dalam lingkungan QA
tanpa kredensial. Pemeriksaan ini karena itu membuktikan jalur antarmuka luring,
bukan pengiriman ke penyedia langsung.

## Pengurangan Gerakan

Aktifkan preferensi sistem operasi atau emulasi peramban untuk
`prefers-reduced-motion: reduce`, kemudian muat ulang halaman.

| Pemeriksaan | Hasil | Catatan/bukti |
| --- | --- | --- |
| Indikator pemuatan bersifat statis | | |
| Perubahan status fokus dan sorotan penunjuk berlangsung efektif seketika | | |
| Tidak terjadi pengguliran halus otomatis | | |
| Pemuatan hasil dan pemulihan fokus tetap mudah dipahami | | |

## Pembesaran Peramban 200%

Gunakan kontrol pembesaran peramban yang sebenarnya, bukan pembesaran CSS atau
pengaturan skala tampilan sistem operasi. Mulai dari jendela desktop dengan
lebar minimal 1280 px.

| Pemeriksaan | Chrome | Firefox | Catatan/bukti |
| --- | --- | --- | --- |
| Halaman awal menyesuaikan tata letak tanpa pengguliran horizontal | | | |
| Kontrol formulir dan label wajib tetap dapat diakses seluruhnya | | | |
| Hasil luring menyesuaikan tata letak tanpa kartu atau teks terpotong | | | |
| Kontrol yang fokus tetap terlihat saat menggunakan `Tab` | | | |

## Bukti Kandidat yang Tercatat — 2026-08-17

Pemeriksaan manual berikut diselesaikan terhadap kandidat yang belum di-commit
pada cabang `test/add-manual-release-qa`, berdasarkan commit
`d57a1c0fb7bdf3831b9454788e07ea9bb6f28094`. Commit SHA kandidat kemudian
ditetapkan oleh Git setelah perubahan yang ditinjau di-commit.

| Komponen | Nilai yang tercatat |
| --- | --- |
| Tanggal dan zona waktu | 2026-08-17 01:50:15 UTC+07:00 |
| Sistem operasi | Linux Mint 22.2 |
| Versi Chrome | Google Chrome 151.0.7922.137 |
| Versi Firefox | Playwright Firefox 153.0 |
| Resolusi layar | 1280×720 |
| Tata letak papan ketik | US, PC105 |

| Pemeriksaan manual | Hasil | Ringkasan bukti |
| --- | --- | --- |
| Formulir dan hasil luring desktop Chrome | LULUS | Formulir dan hasil lengkap tetap terbaca tanpa tumpang tindih atau bagian terpotong. |
| Formulir dan hasil luring desktop Firefox | LULUS | Playwright Firefox dibuka secara interaktif terhadap server produksi lokal. |
| Alur hanya dengan papan ketik di Chrome dan Firefox | LULUS | Pemilihan demo, masuk ke hasil, kembali, pengaturan ulang, fokus terlihat, dan pemulihan fokus selesai tanpa jebakan. |
| Penyesuaian tata letak 360×800, 390×844, 430×932, dan 768×1024 | LULUS | Formulir awal dan hasil luring tetap dapat digunakan tanpa pengguliran horizontal. |
| Pembesaran peramban 200% sebenarnya | LULUS | Chrome dan Firefox menyesuaikan tata letak tanpa kontrol yang tidak dapat dijangkau, teks terpotong, atau pengguliran horizontal. |
| Pemeriksaan manual pengurangan gerakan | LULUS | Playwright Firefox dengan `reducedMotion: "reduce"` mempertahankan navigasi, fokus, dan alur hasil luring yang mudah dipahami. |
| Luapan horizontal dan konten terpotong | LULUS | Tidak ditemukan pada jalur desktop, seluler, tablet, hasil, papan ketik, maupun pembesaran yang ditinjau. |

Proses Playwright penuh yang diwajibkan menyelesaikan seluruh 18 eksekusi proyek
Chromium dan Firefox. Perintah uji tekanan khusus Firefox secara terpisah sesekali
menemui kegagalan kesiapan peramban atau proses awal server web lokal sebelum
asersi produk berjalan. CI cabang akhir tetap menjadi gerbang lingkungan
bersih yang otoritatif; bukti ini tidak menafsirkan kegagalan proses awal tersebut
sebagai asersi produk yang lulus.

## Penanganan Kegagalan dan Bukti

- Gunakan hanya data demo luring fiktif; jangan sertakan kunci API atau informasi
  pelamar sebenarnya pada tangkapan layar atau laporan.
- Catat peramban, area tampilan, pembesaran, tindakan, hasil yang diharapkan, dan hasil
  sebenarnya secara tepat untuk setiap kegagalan.
- Biarkan item daftar periksa rilis yang gagal tetap tidak dicentang sampai
  perbaikan terfokus, pengujian regresi, dan pengulangan pemeriksaan manual terkait
  semuanya lulus.
- Jangan menyembunyikan luapan dengan pemotongan visual apabila konten tetap tidak
  dapat dijangkau.

Setelah setiap baris yang berlaku memiliki bukti, perbarui daftar periksa rilis
dalam commit terfokus yang terpisah. Gerbang penerapan, privasi, dan versi rilis
tetap terbuka sampai platform sebenarnya dipilih.
