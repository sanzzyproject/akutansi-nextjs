<div align="center">
  
  # 📊 Akuntansi LKS - Sistem Pembukuan Digital
  
  **Transformasi Digital untuk Pembelajaran Akuntansi & Pencatatan Kas Terpadu**

  [![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://movingdownloader.vercel.app/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

  [**Lihat Live Demo**](https://movingdownloader.vercel.app/) • [**Laporkan Bug**](https://github.com/sanzzyproject/akutansi-nextjs/issues) • [**Dokumentasi Lengkap**](https://movingdownloader.vercel.app/docs)

</div>

---

## 📖 Tentang Projek

**Akuntansi LKS** adalah aplikasi berbasis web revolusioner yang dikembangkan oleh **SANN404 FORUM**. Aplikasi ini dirancang untuk mendigitalisasi proses pengerjaan Lembar Kerja Siswa (LKS) Akuntansi serta memfasilitasi pencatatan arus kas harian secara fleksibel.

Dengan arsitektur modern, aplikasi ini menawarkan validasi *real-time* untuk Persamaan Dasar Akuntansi (Harta = Utang + Modal) dan dilengkapi dengan sistem cerdas untuk Analisis Debit/Kredit (D/K) yang sesuai dengan standar akuntansi profesional.

---

## ✨ Fitur Utama (Core Features)

### 1. 🧮 Dual Mode Pencatatan (Fleksibilitas Tinggi)
* **Mode Persamaan Akuntansi:** Pencatatan manual dengan validasi *running balance* antara Harta dan Pasiva. Cocok untuk *expense tracker* harian maupun tugas LKS.
* **Mode Analisis Debit/Kredit (D/K):** Algoritma sistem secara otomatis menentukan posisi Debit atau Kredit berdasarkan kategori akun (Harta, Utang, Modal, Pendapatan, Biaya) dan sifat pengaruhnya (+/-).

### 2. 📈 Dashboard Cerdas & Analitik
* **Visualisasi Data:** Menggunakan grafik batang responsif untuk memantau komposisi harta secara *real-time*.
* **Live Validator:** Indikator dinamis (✅ Seimbang / ❌ Tidak Seimbang) yang bertindak sebagai auditor otomatis untuk setiap mutasi yang diinput.

### 3. 📑 Laporan Terstruktur (Exportable)
* Tabel laporan digenerasi secara otomatis mengikuti format kertas kerja standar akuntansi.
* Dukungan penuh untuk kalkulasi saldo berjalan (*running balance*).
* Fitur **Export JSON** untuk *backup* data lokal.

### 4. 🚀 Performa & UI/UX Modern
* **Halaman Onboarding (Welcome Screen):** Animasi sambutan yang modern menggunakan murni CSS dan SVG.
* **Dark/Light Mode:** Terintegrasi penuh dengan *system preference* pengguna.
* **100% Offline Ready:** Arsitektur *Full Client-Side* tanpa hambatan *loading* jaringan.

---

## 🛠️ Stack Teknologi Terintegrasi

Aplikasi ini dikembangkan menggunakan *stack* teknologi yang sangat modern dan disesuaikan untuk *deployment* Vercel:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router) | *Routing* dan arsitektur UI berbasis React. |
| **Styling & UI** | **Tailwind CSS & Shadcn UI** | *Utility-first CSS* dengan komponen UI siap pakai. |
| **Database Lokal** | **Dexie.js (IndexedDB)** | Sistem penyimpanan *offline* murni di dalam *browser* (tanpa server). |
| **Data Visualization** | **Recharts** | *Rendering* grafik statistik di Dashboard. |
| **Backend / API Logic** | **FastAPI (Python)** | Arsitektur inti API (*Prepared for scale*). |
| **Deployment** | **Vercel** | Platform *hosting* dengan dukungan penuh CI/CD. |

---

## 📂 Arsitektur Database (Client-Side Storage)

Aplikasi ini menggunakan pendekatan **Privacy-First**. Seluruh mutasi keuangan disimpan secara lokal di perangkat pengguna menggunakan `IndexedDB`. 

> **⚠️ PERHATIAN:** Membersihkan *cache* browser atau membuka domain di perangkat berbeda akan menghasilkan halaman aplikasi yang kosong. Pengguna sangat dianjurkan untuk menggunakan fitur **Export JSON** secara berkala.

---

## 🚀 Panduan Instalasi Lokal (Getting Started)

Jika Anda ingin menjalankan atau mengembangkan sistem ini di komputer lokal Anda, ikuti langkah-langkah berikut:

### Prasyarat
* [Node.js](https://nodejs.org/) (Versi 18.x atau lebih baru)
* NPM / Yarn / PNPM

### Langkah Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/sanzzyproject/akutansi-nextjs.git](https://github.com/sanzzyproject/akutansi-nextjs.git)
   cd akutansi-nextjs
