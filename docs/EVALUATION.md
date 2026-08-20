# Catatan Evaluasi AI Langsung

Dokumen ini memisahkan bukti dari penyedia langsung dengan pengujian otomatis
yang deterministik. Evaluasi menggunakan permintaan Gemini sebenarnya, memakai
kuota penyedia, dan tidak menjadi bagian CI.

Penanganan kegagalan penyedia diverifikasi secara terpisah melalui pengujian
adaptor terkontrol. Pengujian tersebut menyimulasikan keluaran terstruktur
kosong dan rusak, penolakan, batas waktu, serta kegagalan layanan hulu umum
untuk Gemini dan
OpenAI tanpa memakai kuota. Pengujian ini membuktikan perilaku normalisasi lokal,
bukan latensi atau reliabilitas penerapan penyedia tertentu.

## Cakupan

`npm run eval:gemini` mengirim delapan permintaan secara berurutan:

- Pengembang Antarmuka Junior (`Junior Frontend Developer`) sebanyak tiga kali
  untuk memeriksa variasi skor dan kesimpulan;
- Junior Administrative Staff sebanyak satu kali;
- Entry-Level Customer Service sebanyak satu kali;
- Warehouse Staff sebanyak satu kali;
- Cook Helper sebanyak satu kali; dan
- Junior AC Maintenance Helper sebanyak satu kali menggunakan teks lowongan
  dwibahasa Indonesia/Inggris.

Skrip mencatat durasi, skor, kesimpulan, dan status persyaratan wajib. Skrip
memberikan tanda untuk sapaan pembaca yang tidak konsisten, klaim pelatihan
tanpa bukti, ketidaksesuaian kesimpulan dan waktu melamar, faktor risiko yang
terlalu dangkal, serta rentang skor pengembang antarmuka di atas sepuluh poin.

## Hasil yang Diamati

Evaluasi yang diperluas pada 13 Agustus 2026 menyelesaikan seluruh delapan
permintaan tanpa peringatan otomatis:

| Skenario | Skor | Kesimpulan | Durasi |
| --- | ---: | --- | ---: |
| Pengembang Antarmuka #1 | 70 | `APPLY_WITH_IMPROVEMENTS` | 36,170 detik |
| Pengembang Antarmuka #2 | 70 | `APPLY_WITH_IMPROVEMENTS` | 36,845 detik |
| Pengembang Antarmuka #3 | 70 | `APPLY_WITH_IMPROVEMENTS` | 34,835 detik |
| Administrasi | 91 | `APPLY_NOW` | 29,206 detik |
| Layanan Pelanggan | 62 | `APPLY_WITH_IMPROVEMENTS` | 24,448 detik |
| Gudang | 72 | `APPLY_WITH_IMPROVEMENTS` | 28,263 detik |
| Kuliner | 72 | `APPLY_WITH_IMPROVEMENTS` | 26,626 detik |
| Pemeliharaan AC | 89 | `APPLY_NOW` | 26,417 detik |

Ketiga hasil pengembang antarmuka memiliki rentang nol poin dan satu kesimpulan yang sama.
Skenario kuliner serta listrik/refrigerasi dwibahasa sama-sama menyelesaikan
alur terstruktur. Seluruh permintaan selesai dalam batas waktu penyedia lokal 45 detik,
dengan durasi 24,448 hingga 36,845 detik.

### Evaluasi stabilisasi sebelumnya

Evaluasi tahap 5F pertama menghasilkan empat respons yang valid terhadap
skema. Dua respons pengembang antarmuka ditolak secara aman oleh gerbang kualitas dan
tidak ditampilkan kepada pengguna. Setelah batas instruksi model dan pemeriksaan
stabilitas diperketat, evaluasi ulang pada 11 Agustus 2026 menyelesaikan seluruh
enam permintaan tanpa peringatan otomatis.

| Skenario | Skor | Kesimpulan | Durasi |
| --- | ---: | --- | ---: |
| Pengembang Antarmuka #1 | 72 | `APPLY_WITH_IMPROVEMENTS` | 30,695 detik |
| Pengembang Antarmuka #2 | 70 | `APPLY_WITH_IMPROVEMENTS` | 34,093 detik |
| Pengembang Antarmuka #3 | 72 | `APPLY_WITH_IMPROVEMENTS` | 29,095 detik |
| Administrasi | 91 | `APPLY_NOW` | 27,890 detik |
| Layanan Pelanggan | 62 | `APPLY_WITH_IMPROVEMENTS` | 24,501 detik |
| Gudang | 73 | `APPLY_WITH_IMPROVEMENTS` | 21,086 detik |

Ketiga hasil pengembang antarmuka memiliki rentang dua poin, satu kesimpulan yang sama, dan
perlakuan `PARTIAL` yang konsisten untuk pengalaman REST API. Seluruh permintaan
yang dicatat selesai dalam batas waktu penyedia lokal 45 detik.

## Hal yang Didukung oleh Bukti Ini

- Alur Gemini dapat menyelesaikan kontrak V2 terstruktur saat ini dari awal
  hingga akhir.
- Keluaran tidak valid dapat ditolak dengan aman dan tidak ditampilkan.
- Skenario yang dievaluasi menghasilkan keluaran yang sesuai dengan bukti dan valid terhadap
  skema setelah stabilisasi.
- Keluaran pengembang antarmuka berulang memiliki hasil yang berdekatan pada satu sesi yang
  diamati.

## Hal yang Tidak Dibuktikan

- Keluaran model bersifat deterministik. Nilai `temperature` sebesar `0` dan
  `seed` tetap merupakan kontrol berbasis upaya terbaik, bukan jaminan.
- Latensi yang tercatat berlaku umum pada akun, wilayah, jaringan, versi
  penyedia, atau platform hosting lain.
- Evaluasi delapan skenario membuktikan kualitas lintas bidang atau ketiadaan
  bias. Evaluator yang diperluas tetap merupakan sampel kecil yang dikurasi.
- Integrasi langsung OpenAI telah diverifikasi.
- Sistem siap produksi atau skor dapat memprediksi hasil rekrutmen.

## Menjalankan Ulang Evaluasi

Konfigurasikan kunci API Gemini yang valid secara lokal, tinjau kebutuhan kuota
untuk delapan permintaan, kemudian jalankan:

```bash
npm run eval:gemini
```

Jangan memasukkan `.env` ke commit atau membagikannya. Periksa kuota dan biaya penyedia
sebelum menjalankan skrip. Tanda otomatis hanya merupakan pemeriksaan awal;
peninjau manusia tetap perlu memeriksa:

1. apakah setiap status persyaratan mengikuti bukti profil yang diberikan;
2. apakah penilaian persyaratan wajib sesuai dengan status tersebut;
3. apakah rekomendasi mengarang pengalaman, hasil, sertifikat, atau kebijakan
   perusahaan;
4. apakah faktor risiko menyebut ketidakpastian yang konkret; dan
5. apakah sapaan bahasa Indonesia konsisten serta pesan lamaran menggunakan
   sudut pandang kandidat.
