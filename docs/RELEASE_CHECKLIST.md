# Daftar Periksa Rilis — LokerLens AI V2

Daftar periksa ini adalah gerbang fakta untuk kandidat rilis dan penyerahan
Pijak Career Fest. Penyerahan repositori dan demo lokal dipisahkan dari penerapan
publik; butir hanya boleh ditandai selesai bila memiliki bukti.

## Terverifikasi pada Kondisi Commit `main`

- [x] TypeScript lulus tanpa menghasilkan paket keluaran.
- [x] ESLint lulus tanpa peringatan untuk TypeScript, React Hooks, dan Fast Refresh.
- [x] 28 berkas pengujian dan 324 kasus uji lulus.
- [x] Pengujian integrasi HTTP mencakup kesehatan layanan, analisis valid,
      validasi permintaan, kegagalan penyedia, JSON 404, batas badan permintaan,
      pembatasan laju, header keamanan,
      dan CSP produksi.
- [x] Lowongan panjang bilingual dengan pengalaman informal dipertahankan utuh
      melalui skema, penyusun instruksi model, dan batas HTTP.
- [x] Matriks kegagalan adaptor Gemini dan OpenAI menormalisasi respons kosong,
      rusak, ditolak, melewati batas waktu, dan kegagalan layanan hulu tanpa
      penyedia langsung.
- [x] Cakupan V8 mencakup seluruh kode aplikasi dan memenuhi ambang global 75%
      untuk pernyataan, cabang, fungsi, serta baris.
- [x] Pengujian interaksi DOM mencakup demo, pengaturan ulang, status kesehatan, pengiriman,
      dan hasil.
- [x] Sembilan skenario Playwright berjalan pada Chromium dan Firefox (18
      eksekusi proyek) serta mencakup status tanpa penyedia, demo luring tanpa
      permintaan analisis, fokus hasil, pengaturan ulang, matriks penyesuaian tata letak
      360–768 px, dan perjalanan bolak-balik dengan papan ketik tanpa jebakan fokus.
- [x] axe-core memeriksa aturan WCAG A/AA pada formulir awal dan dasbor hasil,
      sedangkan Playwright memverifikasi pengaturan ulang formulir melalui papan ketik.
- [x] Playwright mengemulasikan preferensi pengurangan gerakan dan memverifikasi
      indikator pemuatan, pengguliran, serta transisi pada Chromium maupun Firefox.
- [x] Pembuatan paket antarmuka serta server produksi berhasil.
- [x] `npm audit` melaporkan 0 kerentanan yang diketahui.
- [x] CI GitHub tersedia untuk pemeriksaan tipe, lint, pengujian dengan gerbang
      cakupan, pembuatan paket, E2E/aksesibilitas Chromium dan Firefox, serta audit.
- [x] Server produksi lokal mengembalikan halaman utama dan respons kesehatan.
- [x] Server tanpa kunci API menolak analisis secara aman dengan 503.
- [x] Pembatasan laju menghasilkan 429 setelah batas terlampaui.
- [x] CSP, header keamanan, Permissions Policy, ID permintaan, dan tembolok aset aktif.
- [x] Tidak ada kunci API di kode sumber atau berkas contoh.
- [x] Demo luring tetap berfungsi tanpa penyedia langsung.
- [x] Satu pengujian awal Gemini secara menyeluruh menghasilkan dasbor lengkap yang
      lolos kontrak respons.
- [x] Tahap 5F menambahkan kalibrasi status persyaratan, waktu melamar, sapaan,
      dan klaim pelatihan.
- [x] Evaluasi langsung tahap 5F pertama menjalankan enam permintaan: empat respons
      valid dan dua respons pengembang antarmuka ditolak aman oleh gerbang kualitas.
- [x] Evaluasi langsung setelah stabilisasi menyelesaikan 6/6 permintaan tanpa
      peringatan; skor pengembang antarmuka 72, 70, dan 72 dengan kesimpulan yang sama.
- [x] Evaluasi langsung yang diperluas menyelesaikan 8/8 permintaan tanpa peringatan;
      tiga skor pengembang antarmuka konsisten pada 70, Cook Helper mendapat 72, dan Junior
      AC Maintenance Helper mendapat 89.
- [x] Durasi evaluasi stabilisasi tercatat 21.086–34.093 ms per permintaan
      (sekitar 21,1–34,1 detik), di bawah batas waktu penyedia lokal 45 detik.
- [x] V2 telah dipromosikan ke `main` dan cabang `v2-development` telah dihapus
      dari repositori lokal serta repositori jarak jauh.
- [x] CI `main` lulus setelah proses *fast-forward* V2.

## Aman untuk Penyerahan Repositori dan Demo Lokal

- [x] Tinjau `diff`, commit, dan `push` perubahan V2 ke cabang `main`.
- [x] Jalankan `npm ci`, pemeriksaan tipe, lint, pengujian, pembuatan paket, audit, dan
      `git diff --check` di laptop.
- [x] Kunci API Gemini aktif telah digunakan secara lokal tanpa dibagikan dalam percakapan
      atau commit.
- [x] Jalankan `npm run eval:gemini` untuk tiga pengulangan pengembang antarmuka serta satu
      skenario Administrasi, Layanan Pelanggan, Gudang, Cook Helper, dan
      Junior AC Maintenance Helper.
- [x] Evaluasi langsung mencakup IT, administrasi, layanan pelanggan, logistik,
      kuliner, dan pemeliharaan AC dengan satu input lowongan bilingual.
- [x] Catat kesesuaian dengan bukti, latensi, batas waktu, dan kegagalan penyedia dari
      dua putaran evaluasi tahap 5F.
- [x] Siapkan empat demo deterministik yang dapat dipakai tanpa penyedia langsung.

## Wajib Sebelum Penerapan atau Rilis Publik

Gunakan [`MANUAL_QA.md`](MANUAL_QA.md) untuk mencatat peramban, perangkat,
hasil, dan bukti. Gunakan [`DEPLOYMENT.md`](DEPLOYMENT.md) untuk keputusan
platform, lingkungan eksekusi, biaya, proksi, observabilitas, privasi, uji terbatas,
dan pemulihan.
Pengujian otomatis pendukung tidak boleh dipakai untuk menandai butir manual
atau penerapan sebagai selesai.

- [x] Jalankan evaluator langsung dengan delapan permintaan dan tinjau hasil otomatis Cook
      Helper serta Junior AC Maintenance Helper.
- [x] Siapkan panduan penerapan yang netral terhadap penyedia dan templat
      variabel lingkungan produksi tanpa nilai rahasia, akun hosting, kartu pembayaran, atau
      layanan aktif.
- [ ] Pilih serta konfigurasi platform penerapan publik.
- [ ] Tinjau log, wilayah, retensi, penyimpanan pembatasan laju, dan kontrol
      biaya penerapan.
- [x] QA manual Chrome dan Firefox pada desktop di luar skenario otomatis.
- [x] QA area tampilan ponsel sekitar 360–430 px dan tablet.
- [x] QA manual hanya dengan papan ketik, urutan fokus, pengurangan gerakan di luar indikator pemuatan, dan
      pembesaran 200%.
- [x] Pastikan tidak ada luapan horizontal atau konten terpotong.
- [ ] Perbarui redaksi privasi berdasarkan platform dan penyedia nyata.
- [ ] Tetapkan versi kandidat rilis dan buat commit yang terfokus.
- [ ] Isi catatan bukti penerapan dan buktikan kesehatan layanan, batas waktu,
      proksi, observabilitas, kontrol biaya, serta pemulihan pada uji terbatas nyata.
- [x] Ambil tiga tangkapan layar aplikasi asli dengan data demo fiktif; masing-masing
      berada di bawah 5 MB dan tidak memuat kunci API atau data pribadi.
- [ ] Siapkan nama serta deskripsi penyerahan yang sesuai dengan fitur teruji.
- [ ] Jika penyelenggara mewajibkan URL publik, kirim hanya setelah URL dan
      tangkapan layar final diperiksa.

## Di Luar Gerbang Penyerahan

- autentikasi atau akun pengguna;
- basis data kandidat;
- pemindai CV atau pengurai PDF;
- pengambilan otomatis data lowongan;
- kalkulator probabilitas diterima;
- pembayaran, langganan, atau jaminan kerja.
