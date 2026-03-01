<div align="center">
  
  # 📊 Akuntansi LKS - Sistem Pembukuan Digital
  
  **Aplikasi Web Client-Side untuk Pembelajaran Akuntansi & Pencatatan Kas Terpadu**

  [![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![IndexedDB](https://img.shields.io/badge/Storage-IndexedDB_via_Dexie.js-4CAF50?style=for-the-badge&logo=databricks&logoColor=white)](https://dexie.org/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://movingdownloader.vercel.app/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

  [**Lihat Live Demo**](https://movingdownloader.vercel.app/) • [**Laporkan Bug**](https://github.com/sanzzyproject/akutansi-nextjs/issues) • [**Dokumentasi Lengkap**](https://movingdownloader.vercel.app/docs)

</div>

---

## 📖 Tentang Projek

**Akuntansi LKS** adalah aplikasi berbasis web revolusioner yang dikembangkan oleh **SANN404 FORUM**. Aplikasi ini dirancang 100% *Client-Side* untuk mendigitalisasi proses pengerjaan Lembar Kerja Siswa (LKS) Akuntansi serta memfasilitasi pencatatan arus kas harian secara fleksibel, cepat, dan aman langsung di perangkat pengguna.

Sistem ini tidak bergantung pada *database server*, melainkan memanfaatkan teknologi penyimpanan *browser* modern untuk memberikan pengalaman *zero-latency* saat melakukan analisis keuangan.

---

## ✨ Fitur Utama (Real Implemented Features)

Aplikasi ini memiliki 5 modul halaman utama dengan fitur yang sangat spesifik:

### 1. 🚀 Halaman Welcome (Onboarding)
* Tampilan sambutan layar penuh (overlay) murni menggunakan CSS Shapes dan SVG (tanpa aset gambar eksternal yang memberatkan).
* Otomatis muncul di awal saat membuka web dan akan menutup mulus ke Dashboard saat tombol "Mulai Sekarang" ditekan.

### 2. 📈 Dashboard Pintar (Analitik Visual)
* **Status Keseimbangan Real-time:** Kartu indikator dinamis (✅ Seimbang / ❌ Tidak Seimbang) yang menghitung *Harta = Utang + Modal*.
* **Ringkasan Finansial:** Menampilkan total Harta, Utang, Modal, dan jumlah transaksi dengan format Rupiah yang otomatis rapi.
* **Grafik Batang Harta:** Visualisasi komposisi Kas, Perlengkapan, dan Peralatan menggunakan **Recharts**. Skala (Y-Axis) otomatis menyesuaikan *k* (ribuan) atau *jt* (jutaan) agar label tidak menumpuk.

### 3. 🧮 Mode Transaksi (Persamaan Dasar Akuntansi)
* Sistem pencatatan *Double-Entry* manual untuk Harta (Kas, Perlengkapan, Peralatan) dan Pasiva (Utang Usaha, Modal).
* Format nominal pintar (+ dan -).
* **Bebas Blokir (Fleksibel):** Form input sengaja tidak dikunci meski tidak seimbang, memungkinkan aplikasi ini berubah fungsi dari LKS Akuntansi menjadi sekadar *expense tracker* harian untuk pengguna umum.

### 4. ⚖️ Mode Analisis Debit/Kredit (D/K)
* Tabel pencatatan jurnal lanjutan untuk 5 pilar akun (Harta, Utang, Modal, Pendapatan, Biaya).
* **Algoritma Auto D/K:** Sistem akan mendeteksi Kategori Akun dan Sifat (+/-) yang dipilih pengguna, lalu secara otomatis mengunci indikator **Debit (D)** atau **Kredit (K)** dengan warna biru/merah sesuai hukum baku akuntansi.

### 5. 📑 Laporan (Kertas Kerja) & Manajemen Data
* Tampilan tabel bergaris menyerupai buku LKS fisik.
* **Auto Running Balance:** Saldo berjalan dihitung otomatis dan disisipkan di bawah setiap baris transaksi. Angka defisit (minus) otomatis berwarna merah.
* **Export JSON:** Fitur untuk mengunduh semua data transaksi menjadi file `.json` sebagai *backup* karena aplikasi bersifat *local-storage*.
* **Reset Data:** Menghapus seluruh memori *database* (kembali ke Rp 0).
* **Dokumentasi Internal:** Halaman `/docs` bawaan (Built-in) yang menjelaskan panduan lengkap penggunaan web kepada *user*.
* **Dark / Light Mode:** *Toggle* tema otomatis yang terintegrasi dengan Tailwind CSS dan preferensi sistem *user*.

---

## 🛠️ Stack Teknologi Terintegrasi (100% Frontend)

Aplikasi ini tidak memiliki *backend/server* terpisah. Berikut adalah tumpukan teknologi asli yang digunakan dalam proyek ini:

| Kategori | Teknologi/Library | Fungsi Spesifik di Proyek |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14.2.3** | Menggunakan arsitektur App Router untuk navigasi antar menu halaman secara dinamis. |
| **Bahasa** | **TypeScript** | *Type-safety* ketat untuk mendefinisikan tipe data *Transaksi*, *Saldo*, dan *Analisis*. |
| **Database** | **Dexie.js** | Wrapper *IndexedDB* untuk menyimpan semua mutasi akuntansi langsung ke memori lokal *browser*. |
| **Styling** | **Tailwind CSS** | Pembuatan tata letak (*layouting*), warna khusus (success, warning, destructive), dan *Dark Mode*. |
| **UI Components** | **Shadcn UI** | Elemen *interface* siap pakai seperti Card, Button, Input, Label, dan Skeleton Loading. |
| **Grafik** | **Recharts** | *Rendering* `BarChart` interaktif pada halaman Dashboard. |
| **Iconography** | **Lucide React** | Ikon minimalis dan modern di menu navigasi, tombol, dan dekorasi halaman. |
| **Peringatan** | **Radix UI (Toast)** | Sistem notifikasi *pop-up* (sukses simpan, gagal, data di-reset, dll). |

---

## 🗂️ Struktur Folder Projek

Aplikasi ini menggunakan sistem *App Router* dari Next.js 14. Berikut adalah struktur direktori yang digunakan:

```text
akutansi-nextjs/
├── app/
│   ├── analisis/
│   │   └── page.tsx       # Halaman Analisis Debit/Kredit (Pilar Akuntansi)
│   ├── docs/
│   │   └── page.tsx       # Halaman Dokumentasi Panduan Web
│   ├── laporan/
│   │   └── page.tsx       # Halaman Laporan & Tabel Kertas Kerja
│   ├── transaksi/
│   │   └── page.tsx       # Halaman Input Transaksi (Persamaan Dasar)
│   ├── globals.css        # File CSS utama (Konfigurasi warna Tailwind)
│   ├── layout.tsx         # Root layout aplikasi
│   └── page.tsx           # Halaman Welcome Screen Overlay & Dashboard Utama
├── components/
│   ├── ui/                # Kumpulan komponen UI dari Shadcn (Card, Button, Input, dll)
│   └── Layout.tsx         # Komponen Master Navigasi (Sidebar Desktop & Bottom-bar Mobile)
├── db/
│   ├── database.ts        # Inisialisasi IndexedDB menggunakan Dexie.js
│   └── types.ts           # Definisi antarmuka (Interfaces) TypeScript
├── hooks/
│   ├── use-mobile.ts      # Kustom hook deteksi layar perangkat mobile
│   └── use-toast.ts       # Hook pengelola pop-up notifikasi (Radix UI)
├── services/
│   └── api.ts             # Kumpulan fungsi CRUD untuk jembatan UI ke Database Lokal
├── public/                # Folder aset statis (favicon, logo, dll)
├── package.json           # Konfigurasi module & script Node.js
├── tailwind.config.ts     # Konfigurasi utility Tailwind CSS
├── tsconfig.json          # Konfigurasi compiler TypeScript
└── README.md              # File panduan repository ini
```

## 📂 Penyimpanan Data (Privacy & Local Storage)

Aplikasi ini menggunakan pendekatan **100% Client-Side**. 
* Seluruh mutasi keuangan disimpan secara **Lokal** di `IndexedDB` *browser* perangkat pengguna (HP/Laptop).
* **TIDAK ADA** data yang dikirim, diproses, atau disimpan di *server cloud*.
* **PENTING:** Jika pengguna melakukan *Clear Cache / Clear Data browser*, atau membuka URL melalui perangkat/browser yang berbeda, data akan kosong. Gunakan fitur **Export JSON** di halaman Laporan untuk memindahkan/menyimpan data.

---

## 🚀 Panduan Instalasi Lokal

Jika Anda ingin menjalankan sistem ini di komputer Anda sendiri:

### Prasyarat
* [Node.js](https://nodejs.org/) (Versi 18.x atau lebih baru) disarankan.
* NPM atau Yarn.

### Langkah Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/sanzzyproject/akutansi-nextjs.git](https://github.com/sanzzyproject/akutansi-nextjs.git)
   cd akutansi-nextjs
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

4. **Akses Aplikasi:**
   Buka `http://localhost:3000` di *browser* Anda.

---

## 👨‍💻 Pengembang & Atribusi

Dikembangkan secara penuh oleh **SANN404 FORUM** dengan dedikasi tinggi untuk memodernisasi pembelajaran akuntansi.

* **Lead Developer & System Logic:** SANN404 FORUM
* **UI/UX Architect:** SANN404 FORUM
* **Domain & Hosting:** Vercel (`https://kasflowapp.vercel.app`)

Aplikasi ini mampu melayani ribuan pengguna karena tidak ada beban pengolahan data pada *server* (setiap *browser* memproses datanya sendiri).

---

## 📄 Lisensi

Mendistribusikan perangkat lunak ini di bawah lisensi **MIT**. Hak cipta © 2026 SANN404 FORUM. Anda bebas menggunakan, memodifikasi, dan mendistribusikan proyek ini dengan tetap menyertakan atribusi orisinil.

<div align="center">
  <br/>
  <sub><b>Dibangun dengan ❤️ oleh SANN404 FORUM</b></sub>
</div>
