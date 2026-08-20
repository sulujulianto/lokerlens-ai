# Konteks dan Dasar Keputusan Produk

Dokumen ini mencatat alasan LokerLens AI dibuat, alasan produk mengutamakan
input manual terpandu, dan perbedaan sistem V2 saat ini dengan prototipe
tantangan awal. Dokumen ini menjadi sumber narasi utama untuk `README`,
deskripsi portofolio, CV, dan jawaban wawancara.

## Asal Proyek

LokerLens AI bermula sebagai proyek **Juara Vibe Coding** yang dibangun dengan
Google AI Studio dan Gemini. Masalah awalnya dekat dengan pencari kerja pemula
di Indonesia: mereka dapat membaca lowongan, tetapi sering belum dapat menilai
apakah sudah siap melamar, persyaratan apa yang dapat didukung dengan bukti,
keterampilan apa yang benar-benar kurang, dan hal apa yang harus diprioritaskan.

Sasaran awal sengaja dibuat sempit:

- lulusan SMK;
- lulusan program pelatihan intensif (*bootcamp*);
- pengembang otodidak; dan
- pekerja yang beralih karier untuk memasuki industri TI.

Edisi tantangan dipertahankan melalui tag `v1.0.0`. Redaksi historis pada edisi
tersebut menjelaskan cakupan rilis saat itu, bukan klaim bahwa V2 masih terbatas
pada bidang TI atau hanya menggunakan Gemini.

## Alur Produk Awal

Konsep produk pertama meminta pengguna untuk:

1. mengisi profil singkat yang mencakup pendidikan, keterampilan, pengalaman,
   proyek, dan peran yang dituju;
2. menempelkan deskripsi lowongan tujuan;
3. meminta Gemini membandingkan bukti yang diberikan dengan lowongan; dan
4. meninjau skor, kesimpulan, kesenjangan, rincian persyaratan, rencana tindakan
   30 hari, panduan portofolio, bahan perbaikan CV, pesan lamaran, dan persiapan
   wawancara.

Produk tidak pernah menjanjikan pengguna akan diterima kerja. Tujuannya adalah
membantu pengguna membuat keputusan melamar yang lebih realistis, terarah, dan
dapat ditindaklanjuti.

## Alasan Input Manual Dipilih daripada Unggah CV

Unggah CV sempat dipertimbangkan, tetapi tidak dipilih untuk cakupan saat ini.
CV pelamar pemula umumnya dipadatkan menjadi satu halaman dan dapat
menghilangkan pekerjaan informal, proyek sekolah, konteks pelatihan, tanggung
jawab, atau bukti kompetensi. Pengurai hanya dapat mengekstrak informasi yang
tersedia; pengurai tidak dapat memulihkan fakta yang memang tidak pernah ditulis
dan dapat menimbulkan keyakinan palsu ketika format atau redaksi bersifat
ambigu.

Formulir manual terpandu karena itu meminta bukti yang terbatas dan sesuai
tujuan. Keputusan ini:

- menyediakan tempat khusus bagi pengalaman informal dan pekerjaan proyek;
- memungkinkan pengguna memperbaiki konteks sebelum analisis;
- mencegah keluaran pengurai diperlakukan sebagai fakta yang telah diverifikasi;
- menghindari penambahan batas unggah berkas, OCR, penyimpanan dokumen, dan
  risiko privasi terkait; serta
- menjaga penilaian tetap berdasarkan klaim yang dapat diperiksa pengguna.

Keputusan tersebut merupakan kompromi desain, bukan klaim bahwa input manual
selalu lebih baik. Pengguna perlu memberikan usaha lebih besar dan belum dapat
mengimpor CV secara otomatis. Pengguna sebaiknya hanya memasukkan informasi
yang relevan dengan lowongan tujuan dan tidak memasukkan data sensitif yang
tidak diperlukan.

## Perkembangan dari V1 ke V2

| Aspek | Edisi tantangan (`v1.0.0`) | Kandidat V2 saat ini |
| --- | --- | --- |
| Sasaran utama | Pencari kerja yang memasuki bidang TI | Pelamar pemula dan vokasi Indonesia pada 29 rumpun karier |
| Integrasi AI | Google AI Studio / Gemini | Gemini atau OpenAI di balik antarmuka penyedia bersama |
| Model masukan | Profil manual dan teks lowongan | Formulir bukti manual yang diperluas dan teks lowongan |
| Kontrak keluaran | Analisis berorientasi tantangan | Skema bersama yang ketat, struktur bukti, gerbang kualitas, dan hasil ternormalisasi |
| Mode operasi | Gemini langsung dan demo cadangan | Penyedia terkonfigurasi secara langsung dan empat demo luring deterministik |
| Status pengiriman | Rilis tantangan historis bertag | Pra-rilis terverifikasi lokal; belum ada penerapan publik |

V2 memperluas rumpun yang didukung dan kontrol rekayasa, tetapi mempertahankan
gagasan utama produk: penilaian kesiapan yang bermanfaat harus membedakan bukti
yang dinyatakan dari asumsi dan mengubah kesenjangan penting menjadi langkah
berikutnya yang konkret.

## Batas Produk

LokerLens saat ini tidak:

- mengunggah atau menguraikan berkas CV/PDF;
- mengambil data lowongan secara otomatis dari situs lain;
- memprediksi probabilitas diterima kerja;
- memverifikasi kebenaran klaim pengguna;
- menggantikan pertimbangan perekrut;
- menjamin wawancara atau pekerjaan; maupun
- menyimpan akun, profil, atau riwayat analisis kandidat.

Skor merupakan estimasi keselarasan terhadap satu lowongan yang diberikan.
Skor harus dijelaskan sebagai dukungan pengambilan keputusan, bukan keputusan
rekrutmen otomatis.

## Narasi yang Akurat untuk Portofolio dan Wawancara

Deskripsi yang ringkas dan akurat:

> Saya memulai LokerLens AI untuk Juara Vibe Coding sebagai asisten berbasis
> Google AI Studio/Gemini bagi pencari kerja Indonesia yang memasuki bidang TI.
> Saya memilih formulir manual terpandu karena CV singkat pelamar pemula sering
> tidak memuat pengalaman informal dan bukti proyek. V2 mempertahankan
> pendekatan berbasis bukti tersebut, memperluas cakupan menjadi 29 rumpun
> karier, serta mendukung Gemini atau OpenAI melalui kontrak server yang
> tervalidasi. Sistem memperkirakan keselarasan dengan lowongan dan memberikan
> langkah berikutnya; sistem tidak memprediksi hasil rekrutmen.

Saat menjelaskan proyek, pisahkan asal historis dari implementasi saat ini.
Keduanya penting, tetapi menjawab pertanyaan yang berbeda: asal proyek
menjelaskan masalah pengguna dan keputusan desain, sedangkan V2 menunjukkan
perkembangan prototipe menjadi sistem rekayasa yang lebih kuat.
