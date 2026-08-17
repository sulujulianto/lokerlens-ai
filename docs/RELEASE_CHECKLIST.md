# Release Checklist — LokerLens AI V2

Checklist ini adalah gerbang fakta untuk kandidat rilis dan submission Pijak
Career Fest. Penyerahan repository dan demo lokal dipisahkan dari deployment
publik; item hanya boleh ditandai selesai bila memiliki bukti.

## Terverifikasi pada Snapshot `main`

- [x] TypeScript lulus tanpa emit.
- [x] ESLint lulus tanpa warning untuk TypeScript, React Hooks, dan Fast Refresh.
- [x] 28 berkas test dan 324 test lulus.
- [x] Integration test HTTP mencakup health, analisis valid, validasi request,
      kegagalan provider, JSON 404, body limit, rate limit, header keamanan,
      dan CSP produksi.
- [x] Lowongan panjang bilingual dengan pengalaman informal dipertahankan utuh
      melalui schema, prompt builder, dan boundary HTTP.
- [x] Fault matrix adapter Gemini dan OpenAI menormalisasi respons kosong,
      malformed, refusal, timeout, dan kegagalan upstream tanpa provider live.
- [x] Coverage V8 mencakup seluruh kode aplikasi dan memenuhi ambang global 75%
      untuk statements, branches, functions, serta lines.
- [x] Test interaksi DOM mencakup demo, reset, health state, submit, dan hasil.
- [x] Sembilan skenario Playwright berjalan pada Chromium dan Firefox (18
      project run) serta mencakup status tanpa provider, demo offline tanpa
      request analisis, fokus hasil, reset, matriks reflow 360–768 px, dan
      round trip keyboard tanpa focus trap.
- [x] axe-core memeriksa aturan WCAG A/AA pada form awal dan dashboard hasil,
      sedangkan Playwright memverifikasi reset formulir melalui keyboard.
- [x] Playwright mengemulasikan preferensi reduced motion dan memverifikasi
      spinner, scrolling, serta transisi pada Chromium maupun Firefox.
- [x] Build frontend serta server produksi berhasil.
- [x] `npm audit` melaporkan 0 kerentanan yang diketahui.
- [x] CI GitHub tersedia untuk typecheck, lint, test dengan coverage gate,
      build, E2E/aksesibilitas Chromium dan Firefox, serta audit.
- [x] Server produksi lokal mengembalikan halaman utama dan health response.
- [x] Server tanpa API key menolak analisis secara aman dengan 503.
- [x] Rate limit menghasilkan 429 setelah batas terlampaui.
- [x] CSP, security headers, Permissions Policy, request ID, dan cache aset aktif.
- [x] Tidak ada API key di source atau file contoh.
- [x] Demo offline tetap berfungsi tanpa provider live.
- [x] Satu smoke test Gemini end-to-end menghasilkan dashboard lengkap yang
      lolos kontrak respons.
- [x] Phase 5F menambahkan kalibrasi status persyaratan, waktu melamar, sapaan,
      dan klaim pelatihan.
- [x] Evaluasi live Phase 5F pertama menjalankan enam request: empat respons
      valid dan dua respons Frontend ditolak aman oleh gerbang kualitas.
- [x] Evaluasi live setelah stabilisasi menyelesaikan 6/6 request tanpa
      peringatan; skor Frontend 72, 70, dan 72 dengan verdict yang sama.
- [x] Evaluasi live yang diperluas menyelesaikan 8/8 request tanpa peringatan;
      tiga skor Frontend konsisten pada 70, Cook Helper mendapat 72, dan Junior
      AC Maintenance Helper mendapat 89.
- [x] Durasi evaluasi stabilisasi tercatat 21.086–34.093 ms per request
      (sekitar 21,1–34,1 detik), di bawah timeout provider lokal 45 detik.
- [x] V2 telah dipromosikan ke `main` dan branch `v2-development` telah dihapus
      dari repository lokal serta remote.
- [x] CI `main` lulus setelah fast-forward V2.

## Aman untuk Penyerahan Repository dan Demo Lokal

- [x] Review diff, commit, dan push perubahan V2 ke branch `main`.
- [x] Jalankan `npm ci`, typecheck, lint, test, build, audit, dan
      `git diff --check` di laptop.
- [x] API key Gemini aktif telah digunakan secara lokal tanpa dibagikan di chat
      atau commit.
- [x] Jalankan `npm run eval:gemini` untuk tiga pengulangan Frontend serta satu
      skenario Administrasi, Customer Service, Warehouse, Cook Helper, dan
      Junior AC Maintenance Helper.
- [x] Evaluasi live mencakup IT, administrasi, layanan pelanggan, logistik,
      kuliner, dan pemeliharaan AC dengan satu input lowongan bilingual.
- [x] Catat kualitas grounding, latensi, timeout, dan kegagalan provider dari
      dua putaran evaluasi Phase 5F.
- [x] Siapkan empat demo deterministik yang dapat dipakai tanpa provider live.

## Wajib Sebelum Deployment atau Rilis Publik

Gunakan [`MANUAL_QA.md`](MANUAL_QA.md) untuk mencatat browser, perangkat,
hasil, dan bukti. Gunakan [`DEPLOYMENT.md`](DEPLOYMENT.md) untuk keputusan
platform, runtime, biaya, proxy, observability, privasi, canary, dan rollback.
Pengujian otomatis pendukung tidak boleh dipakai untuk menandai item manual
atau deployment sebagai selesai.

- [x] Jalankan evaluator live delapan request dan tinjau hasil otomatis Cook
      Helper serta Junior AC Maintenance Helper.
- [x] Siapkan runbook deployment provider-neutral dan template environment
      produksi tanpa secret, akun hosting, kartu pembayaran, atau service aktif.
- [ ] Pilih serta konfigurasi platform deployment publik.
- [ ] Tinjau log, region, retensi, rate-limit store, dan kontrol biaya deployment.
- [x] QA manual Chrome dan Firefox pada desktop di luar skenario otomatis.
- [x] QA viewport ponsel sekitar 360–430 px dan tablet.
- [x] QA manual keyboard-only, focus order, reduced motion di luar spinner, dan
      pembesaran 200%.
- [x] Pastikan tidak ada horizontal overflow atau konten terpotong.
- [ ] Perbarui wording privasi berdasarkan platform dan provider nyata.
- [ ] Tetapkan versi kandidat rilis dan buat commit yang terfokus.
- [ ] Isi evidence record deployment dan buktikan health, timeout, proxy,
      observability, kontrol biaya, serta rollback pada canary nyata.
- [x] Ambil tiga screenshot aplikasi asli dengan data demo fiktif; masing-masing
      berada di bawah 5 MB dan tidak memuat API key atau data pribadi.
- [ ] Siapkan nama serta deskripsi submission yang sesuai dengan fitur teruji.
- [ ] Jika penyelenggara mewajibkan URL publik, submit hanya setelah URL dan
      screenshot final diperiksa.

## Di Luar Gerbang Submission

- login atau akun pengguna;
- database kandidat;
- CV scanner atau parser PDF;
- scraping lowongan;
- kalkulator probabilitas diterima;
- pembayaran, langganan, atau jaminan kerja.
