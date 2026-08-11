# Catatan Privasi dan Penanganan Data

Dokumen ini menjelaskan perilaku teknis branch `v2-development`. Dokumen ini
bukan kebijakan privasi produksi, audit keamanan, atau nasihat hukum.

## Data yang Dimasukkan

Pengguna dapat memasukkan pendidikan, pengalaman, keterampilan, tanggung jawab,
pencapaian, pelatihan, kekuatan, bukti kompetensi, tantangan melamar, target
peran, dan teks lowongan.

Pengguna sebaiknya menghindari informasi yang tidak diperlukan, seperti:

- nomor identitas;
- alamat rumah lengkap;
- nomor rekening;
- data kesehatan;
- kredensial akun;
- API key;
- data rahasia perusahaan atau pihak lain.

## Penyimpanan oleh Aplikasi

Desain saat ini:

- tidak memerlukan akun atau login;
- tidak memiliki database kandidat;
- tidak menyediakan riwayat server;
- tidak menggunakan `localStorage` atau IndexedDB;
- tidak sengaja menulis profil atau lowongan ke penyimpanan permanen aplikasi.

Data form tetap berada pada state halaman selama sesi browser berlangsung.
Reset atau reload dapat menghilangkan data tersebut karena tidak ada fitur
persistensi.

## Analisis Live

Saat pengguna menjalankan analisis live:

1. browser mengirim profil dan lowongan ke server LokerLens melalui
   `/api/analyze`;
2. server memvalidasi input;
3. server mengirim konten yang diperlukan ke provider AI yang dikonfigurasi;
4. server memvalidasi output sebelum mengirim hasil ke browser.

Karena itu, klaim “data tidak pernah meninggalkan perangkat” tidak berlaku untuk
analisis live.

Kebijakan retensi, logging, region pemrosesan, dan penggunaan data oleh provider
AI atau platform hosting tidak ditentukan oleh repository ini. Hal tersebut
harus ditinjau berdasarkan deployment dan akun provider yang benar-benar
digunakan sebelum rilis produksi.

## Demo Offline

Empat demo menggunakan data fiktif yang dibundel bersama aplikasi. Menampilkan
hasil demo tidak mengirim request analisis ke provider AI.

Browser masih dapat memuat aset aplikasi dari server hosting. Istilah “offline
demo” pada produk berarti hasil analisis demo tidak membutuhkan provider live,
bukan jaminan bahwa seluruh aplikasi web selalu berjalan tanpa koneksi.

## Logging

Kode aplikasi menormalisasi error dan tidak sengaja mencetak profil, lowongan,
prompt, raw response provider, API key, atau stack trace pada public response.
Namun, reverse proxy, platform hosting, observability tooling, atau provider AI
dapat memiliki logging sendiri. Konfigurasi tersebut berada di luar repository
dan perlu diaudit sebelum produksi.

## API Key

`GEMINI_API_KEY` atau `OPENAI_API_KEY` dibaca hanya oleh server sesuai provider
yang dipilih. Frontend tidak menyediakan input API key dan tidak menerima
identitas provider atau model dari API analisis. Adapter OpenAI juga meminta
`store: false`; kebijakan akun dan platform tetap harus diverifikasi terpisah.

API key tidak boleh:

- ditulis di source code;
- dimasukkan ke data kandidat atau lowongan;
- disimpan dalam file `.env` yang di-commit;
- dibagikan melalui screenshot atau log.

## Batas Klaim Privasi

Ketiadaan akun dan database mengurangi jumlah data yang sengaja dipertahankan
oleh LokerLens, tetapi tidak menjamin anonimitas, keamanan absolut, atau
kerahasiaan end-to-end.

Wording privasi harus ditinjau kembali setelah lingkungan hosting, provider,
logging, dan kebijakan operasional produksi dipilih.

## Kontrol Transport dan Penyalahgunaan

Server memasang security headers, CSP produksi, larangan framing, request ID,
dan rate limit pada endpoint analisis. Browser dapat membatalkan request, dan
server meneruskan cancellation signal ke SDK provider. Menurut perilaku SDK,
pembatalan sisi klien tidak selalu menghentikan pekerjaan yang sudah diterima
oleh layanan provider sehingga penggunaan dapat tetap tercatat.

Rate limit bawaan menggunakan memori satu proses. Kontrol ini memadai sebagai
perlindungan dasar pada satu instance, tetapi bukan kuota global untuk
deployment horizontal dan bukan pengganti kontrol biaya pada akun provider.
