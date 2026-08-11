# Release Checklist — LokerLens AI V2

Checklist ini adalah gerbang fakta untuk kandidat rilis dan submission Pijak
Career Fest. Item hanya boleh ditandai selesai bila memiliki bukti.

## Terverifikasi pada Snapshot Pengembangan

- [x] TypeScript lulus tanpa emit.
- [x] 24 berkas test dan 286 test lulus.
- [x] Test interaksi DOM mencakup demo, reset, health state, submit, dan hasil.
- [x] Build frontend serta server produksi berhasil.
- [x] `npm audit` melaporkan 0 kerentanan yang diketahui.
- [x] CI GitHub tersedia untuk typecheck, test, build, dan audit.
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
- [x] Durasi evaluasi stabilisasi tercatat 21.086–34.093 ms per request, di
      bawah timeout provider lokal 45 detik.

## Wajib Sebelum Submission Publik

- [ ] Salin perubahan ke repository Git branch `v2-development` dan review diff.
- [x] Jalankan `npm ci`, lint, test, build, audit, dan `git diff --check` di laptop.
- [x] API key Gemini aktif telah digunakan secara lokal tanpa dibagikan di chat
      atau commit.
- [x] Jalankan `npm run eval:gemini` untuk tiga pengulangan Frontend serta satu
      skenario Administrasi, Customer Service, dan Warehouse.
- [ ] Jalankan skenario live minimal pada IT, administrasi, layanan, logistik,
      kuliner, dan satu bidang teknik.
- [x] Catat kualitas grounding, latensi, timeout, dan kegagalan provider dari
      dua putaran evaluasi Phase 5F.
- [ ] Pilih serta konfigurasi platform deployment publik.
- [ ] Tinjau log, region, retensi, rate-limit store, dan kontrol biaya deployment.
- [ ] QA Chrome dan Firefox pada desktop.
- [ ] QA viewport ponsel sekitar 360–430 px dan tablet.
- [ ] QA keyboard-only, focus order, reduced motion, dan pembesaran 200%.
- [ ] Pastikan tidak ada horizontal overflow atau konten terpotong.
- [ ] Perbarui wording privasi berdasarkan platform dan provider nyata.
- [ ] Tetapkan versi kandidat rilis dan buat commit yang terfokus.
- [ ] Ambil maksimal tiga screenshot, masing-masing di bawah 5 MB.
- [ ] Siapkan nama serta deskripsi submission yang sesuai dengan fitur teruji.
- [ ] Submit hanya setelah URL publik dan screenshot final diperiksa.

## Di Luar Gerbang Submission

- login atau akun pengguna;
- database kandidat;
- CV scanner atau parser PDF;
- scraping lowongan;
- kalkulator probabilitas diterima;
- pembayaran, langganan, atau jaminan kerja.
