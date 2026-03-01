"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Info, ShieldAlert, Cpu, Database, Award, Heart } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dokumentasi Aplikasi</h1>
        <p className="text-muted-foreground text-sm">Panduan lengkap penggunaan dan informasi teknis Akuntansi LKS.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-primary" /> Tentang Aplikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3 leading-relaxed">
          <p>
            <strong>Akuntansi LKS</strong> adalah aplikasi berbasis web yang dirancang untuk mempermudah pencatatan dan perhitungan <em>Persamaan Dasar Akuntansi</em> (Harta = Utang + Modal).
          </p>
          <p>
            Aplikasi ini mendigitalisasi proses pengerjaan Lembar Kerja Siswa (LKS) atau pembukuan dasar, secara otomatis menghitung saldo berjalan (running balance), dan memvalidasi keseimbangan neraca secara *real-time*.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cpu className="h-5 w-5 text-success" /> Fitur Utama
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-4">
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-primary mt-1 mb-1"></div>
            <div>
              <strong className="text-foreground">Dashboard Pintar:</strong>
              <p className="text-muted-foreground mt-0.5">Visualisasi data transaksi menggunakan grafik batang, ringkasan total Harta, Utang, Modal, serta status keseimbangan otomatis.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-success mt-1 mb-1"></div>
            <div>
              <strong className="text-foreground">Manajemen Transaksi:</strong>
              <p className="text-muted-foreground mt-0.5">Sistem input transaksi yang memisahkan kolom penambahan/pengurangan Harta, Utang, dan Modal secara spesifik.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-warning mt-1 mb-1"></div>
            <div>
              <strong className="text-foreground">Laporan Terstruktur:</strong>
              <p className="text-muted-foreground mt-0.5">Tampilan tabel yang menyerupai kertas kerja LKS asli, lengkap dengan garis pemisah antar transaksi dan perhitungan saldo di tiap barisnya.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-warning/50 bg-warning/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-warning-foreground">
            <ShieldAlert className="h-5 w-5 text-warning" /> Penyimpanan Data (Penting)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3 leading-relaxed">
          <p>
            Aplikasi ini beroperasi menggunakan arsitektur <strong>100% Client-Side (Full Frontend)</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Semua data transaksi yang Anda masukkan disimpan di dalam <strong>IndexedDB Browser</strong> perangkat Anda (Lokal).</li>
            <li>Tidak ada data yang dikirim atau disimpan di server/cloud luar.</li>
            <li><strong>Keuntungan:</strong> Aplikasi berjalan sangat cepat tanpa <em>loading</em> server dan dapat berfungsi walau tanpa koneksi internet yang stabil.</li>
            <li><strong>Kekurangan:</strong> Jika Anda melakukan <em>Clear Cache / Clear Data</em> browser, atau membuka web ini di HP/Laptop lain, data akan kosong.</li>
          </ul>
          <p className="mt-2 text-foreground font-medium">
            💡 Tips: Selalu gunakan tombol "Export JSON" di halaman Laporan untuk mem-backup data Anda.
          </p>
        </CardContent>
      </Card>

      {/* Bagian Credits & Attribution ala Perusahaan Besar */}
      <Card className="overflow-hidden border-primary/20 shadow-sm">
        <CardHeader className="pb-4 bg-muted/30 border-b border-border/50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" /> Credits & Attribution
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-6 pt-6">
          
          <div className="flex flex-col space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Lead Developer & Architect</span>
            <span className="text-2xl font-black text-primary tracking-tight">SANN404 FORUM</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">UI / UX Design</span>
              <span className="font-semibold text-foreground">SANN404 FORUM</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">System Logic Engine</span>
              <span className="font-semibold text-foreground">SANN404 FORUM</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">Open Source Technologies Powered By</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Next.js App Router</span>
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Tailwind CSS</span>
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Shadcn UI</span>
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Dexie.js</span>
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Recharts</span>
              <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium border border-border/50">Lucide Icons</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-muted-foreground text-xs italic bg-primary/5 p-3 rounded-lg border border-primary/10">
            <Heart className="h-4 w-4 text-destructive shrink-0" fill="currentColor" /> 
            <span>Dikembangkan dengan dedikasi tinggi untuk memfasilitasi dan memodernisasi pembelajaran akuntansi.</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-6 pb-12">
        <p className="text-xs text-muted-foreground">
          &copy; 2026 <strong>SANN404 FORUM</strong>. Hak Cipta Dilindungi.<br/>
          Versi 1.0.0 (Production Build)
        </p>
      </div>

    </div>
  );
}
