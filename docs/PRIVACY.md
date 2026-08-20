# Catatan Privasi dan Penanganan Data

Dokumen ini menjelaskan perilaku teknis V2 pada cabang `main`. Dokumen ini
bukan kebijakan privasi produksi, audit keamanan, atau nasihat hukum.
Bukti platform, wilayah, pencatatan log, retensi, proksi, kontrol biaya, dan
pemulihan yang wajib dikumpulkan sebelum redaksi produksi ditetapkan berada di
[`DEPLOYMENT.md`](DEPLOYMENT.md).

## Data yang Dimasukkan

Pengguna dapat memasukkan pendidikan, pengalaman, keterampilan, tanggung jawab,
pencapaian, pelatihan, kekuatan, bukti kompetensi, tantangan melamar, target
peran, dan teks lowongan.

Masukan manual dipilih agar pengguna dapat menyebutkan pengalaman informal,
proyek sekolah, konteks pelatihan, dan bukti yang sering dipadatkan atau tidak
ditulis pada CV satu halaman. Aplikasi saat ini tidak menerima unggahan CV,
tidak menjalankan OCR atau pengurai CV, dan tidak boleh mengarang informasi
yang tidak diberikan pengguna. Keputusan ini tidak berarti pengguna perlu
memasukkan lebih banyak data pribadi; masukkan hanya bukti yang relevan untuk
lowongan target. Latar keputusan produk dijelaskan lebih lanjut di
[`PRODUCT_CONTEXT.md`](PRODUCT_CONTEXT.md).

Pengguna sebaiknya menghindari informasi yang tidak diperlukan, seperti:

- nomor identitas;
- alamat rumah lengkap;
- nomor rekening;
- data kesehatan;
- kredensial akun;
- kunci API;
- data rahasia perusahaan atau pihak lain.

## Penyimpanan oleh Aplikasi

Desain saat ini:

- tidak memerlukan akun atau proses masuk;
- tidak memiliki basis data kandidat;
- tidak menyediakan riwayat server;
- tidak menggunakan `localStorage` atau IndexedDB;
- tidak sengaja menulis profil atau lowongan ke penyimpanan permanen aplikasi.

Data formulir tetap berada pada keadaan halaman selama sesi peramban berlangsung.
Pengaturan ulang atau pemuatan ulang dapat menghilangkan data tersebut karena tidak ada fitur
persistensi.

## Analisis Langsung

Saat pengguna menjalankan analisis langsung:

1. peramban mengirim profil dan lowongan ke server LokerLens melalui
   `/api/analyze`;
2. server memvalidasi masukan;
3. server mengirim konten yang diperlukan ke penyedia AI yang dikonfigurasi;
4. server memvalidasi keluaran sebelum mengirim hasil ke peramban.

Karena itu, klaim “data tidak pernah meninggalkan perangkat” tidak berlaku untuk
analisis langsung.

Kebijakan retensi, pencatatan log, wilayah pemrosesan, dan penggunaan data oleh penyedia
AI atau platform hosting tidak ditentukan oleh repositori ini. Hal tersebut
harus ditinjau berdasarkan penerapan dan akun penyedia yang benar-benar
digunakan sebelum rilis produksi.

## Demo Luring

Empat demo menggunakan data fiktif yang disertakan bersama aplikasi. Menampilkan
hasil demo tidak mengirim permintaan analisis ke penyedia AI.

Peramban masih dapat memuat aset aplikasi dari server hosting. Istilah “demo
luring” pada produk berarti hasil analisis demo tidak membutuhkan penyedia langsung,
bukan jaminan bahwa seluruh aplikasi web selalu berjalan tanpa koneksi.

## Pencatatan Log

Kode aplikasi menormalisasi galat dan tidak mencetak profil, lowongan,
instruksi model, respons mentah penyedia, kunci API, atau jejak tumpukan galat
pada respons publik. Namun, proksi balik, platform hosting, perangkat observabilitas, atau penyedia
AI dapat memiliki pencatatan log sendiri. Konfigurasi tersebut berada di luar repositori
dan perlu diaudit sebelum produksi.

## Kunci API

`GEMINI_API_KEY` atau `OPENAI_API_KEY` dibaca hanya oleh server sesuai penyedia
yang dipilih. Antarmuka tidak menyediakan masukan kunci API dan tidak menerima
identitas penyedia atau model dari API analisis. Adaptor OpenAI juga meminta
`store: false`; kebijakan akun dan platform tetap harus diverifikasi terpisah.

Kunci API tidak boleh:

- ditulis di kode sumber;
- dimasukkan ke data kandidat atau lowongan;
- disimpan dalam berkas `.env` yang disertakan dalam commit;
- dibagikan melalui tangkapan layar atau log.

## Batas Klaim Privasi

Ketiadaan akun dan basis data mengurangi jumlah data yang sengaja dipertahankan
oleh LokerLens, tetapi tidak menjamin anonimitas, keamanan absolut, atau
kerahasiaan menyeluruh.

Redaksi privasi harus ditinjau kembali setelah lingkungan hosting, penyedia,
pencatatan log, dan kebijakan operasional produksi dipilih serta catatan bukti
pada panduan penerapan terisi.

## Kontrol Transport dan Penyalahgunaan

Server memasang header keamanan, CSP produksi, larangan framing, ID permintaan,
dan pembatasan laju pada endpoint analisis. Peramban dapat membatalkan
permintaan, dan server meneruskan sinyal pembatalan ke SDK penyedia. Menurut perilaku SDK,
pembatalan sisi klien tidak selalu menghentikan pekerjaan yang sudah diterima
oleh layanan penyedia sehingga penggunaan dapat tetap tercatat.

Pembatasan laju bawaan menggunakan memori satu proses. Kontrol ini memadai sebagai
perlindungan dasar pada satu instans, tetapi bukan kuota global untuk
penerapan horizontal dan bukan pengganti kontrol biaya pada akun penyedia.
