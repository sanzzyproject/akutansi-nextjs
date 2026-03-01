"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { hitungRingkasan } from '@/services/api';
import type { RingkasanAkuntansi } from '@/db/types';
import { DollarSign, TrendingUp, TrendingDown, CheckCircle, XCircle, Plus, FileText, Wallet, Package, Monitor } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- KOMPONEN BARU: HALAMAN WELCOME (ONBOARDING) ---
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col justify-between overflow-hidden text-black animate-in fade-in duration-500">
      {/* Background Wavy Shapes - CSS Murni tanpa gambar */}
      <div className="absolute top-0 left-0 w-[150%] h-[55vh] bg-[#cdeaf8] rounded-b-[50%] -translate-x-[10%] -z-10"></div>
      <div className="absolute bottom-[-5%] left-[-20%] w-[150%] h-[35vh] bg-[#cdeaf8] rounded-t-[50%] -z-10 transform rotate-[-5deg]"></div>

      <div className="px-8 pt-32 pb-10 flex-1 flex flex-col justify-center relative w-full max-w-md mx-auto">
        {/* Dekorasi Bintang (Sparkles) */}
        <svg className="absolute top-20 right-8 text-white w-12 h-12 rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
        <svg className="absolute top-64 left-6 text-black w-14 h-14 -rotate-12 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
        <svg className="absolute top-72 left-20 text-black w-8 h-8 rotate-45 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L14.15 9.85L22 12L14.15 14.15L12 22L9.85 14.15L2 12L9.85 9.85L12 2Z" /></svg>
        <svg className="absolute bottom-16 right-10 text-white w-16 h-16 rotate-45 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>

        <h1 className="text-[2.75rem] font-black leading-[1.1] mb-5 tracking-tight text-black relative z-10">
          Kelola<br/>Keuangan<br/>Jadi Mudah
        </h1>
        <p className="text-gray-800 text-lg mb-8 leading-relaxed max-w-[280px] font-medium relative z-10">
          Atur kas dan transaksi lebih mudah dengan aplikasi LKS akuntansi ini.
        </p>

        {/* Indikator Titik (Pagination Dots) */}
        <div className="flex items-center gap-2 mb-8 mt-2">
          <div className="w-6 h-2 bg-black rounded-full"></div>
          <div className="w-4 h-2 bg-transparent border-2 border-gray-400 rounded-full"></div>
          <div className="w-4 h-2 bg-transparent border-2 border-gray-400 rounded-full"></div>
        </div>
      </div>

      <div className="px-8 pb-10 flex flex-col items-center gap-4 z-10 w-full max-w-md mx-auto">
        <button onClick={onStart} className="w-full bg-[#1a1a1a] text-white py-4 rounded-full text-center font-bold text-lg hover:bg-black transition-all shadow-lg active:scale-95 touch-target">
          Mulai Sekarang
        </button>
        <button onClick={onStart} className="text-gray-600 font-medium hover:text-black transition-colors py-2 underline-offset-4 hover:underline">
          Masuk
        </button>
        <p className="text-xs text-gray-500 mt-2 font-medium">Power by saanndec5ty</p>
      </div>
    </div>
  );
}
// --------------------------------------------------

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

function formatGrafik(value: number) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'jt';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return value.toString();
}

export default function Dashboard() {
  const [data, setData] = useState<RingkasanAkuntansi | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk mengontrol kemunculan halaman Welcome
  const [showWelcome, setShowWelcome] = useState(false);
  const [mounted, setMounted] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await hitungRingkasan();
    setData(r);
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    // Cek apakah user sudah pernah klik "Mulai Sekarang" sebelumnya
    if (!localStorage.getItem('welcomeSeen')) {
      setShowWelcome(true);
    }
    load();
  }, []);

  const handleStart = () => {
    // Simpan status agar halaman welcome tidak muncul lagi saat di-refresh
    localStorage.setItem('welcomeSeen', 'true');
    setShowWelcome(false);
  };

  // Mencegah error hydration di Next.js
  if (!mounted) return null;

  // Jika showWelcome aktif, Tampilkan layar Welcome di atas segalanya
  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // JIKA SUDAH MULAI SEKARANG, TAMPILKAN DASHBOARD NORMAL KITA
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  const chartData = [
    { name: 'Kas', value: data.detail.kas, color: 'hsl(217, 91%, 50%)' },
    { name: 'Perlengkapan', value: data.detail.perlengkapan, color: 'hsl(142, 76%, 36%)' },
    { name: 'Peralatan', value: data.detail.peralatan, color: 'hsl(38, 92%, 50%)' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className={`border-2 ${data.seimbang ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'}`}>
        <CardContent className="p-4 flex items-center gap-3">
          {data.seimbang
            ? <CheckCircle className="h-8 w-8 text-success shrink-0" />
            : <XCircle className="h-8 w-8 text-destructive shrink-0" />}
          <div>
            <p className="font-semibold text-sm">Persamaan Akuntansi</p>
            <p className="text-xs text-muted-foreground">
              Harta ({formatRupiah(data.totalHarta)}) = Utang ({formatRupiah(data.totalUtang)}) + Modal ({formatRupiah(data.totalModal)})
            </p>
            <p className={`text-xs font-bold mt-1 ${data.seimbang ? 'text-success' : 'text-destructive'}`}>
              {data.seimbang ? '✅ Seimbang' : '❌ Tidak Seimbang'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <SummaryCard icon={TrendingUp} label="Total Harta" value={formatRupiah(data.totalHarta)} color="text-primary" />
        <SummaryCard icon={TrendingDown} label="Total Utang" value={formatRupiah(data.totalUtang)} color="text-destructive" />
        <SummaryCard icon={DollarSign} label="Total Modal" value={formatRupiah(data.totalModal)} color="text-success" />
        <SummaryCard icon={FileText} label="Transaksi" value={data.jumlahTransaksi.toString()} color="text-warning" />
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-sm">Komposisi Harta</h3>
          <div className="space-y-2">
            <DetailRow icon={Wallet} label="Kas" value={formatRupiah(data.detail.kas)} />
            <DetailRow icon={Package} label="Perlengkapan" value={formatRupiah(data.detail.perlengkapan)} />
            <DetailRow icon={Monitor} label="Peralatan" value={formatRupiah(data.detail.peralatan)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-4">Grafik Harta</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 10 }} width={40} tickFormatter={formatGrafik} />
              <Tooltip formatter={(v: number) => formatRupiah(v)} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button asChild size="lg" className="touch-target">
          <Link href="/transaksi"><Plus className="mr-2 h-5 w-5" />Tambah Transaksi</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="touch-target">
          <Link href="/laporan"><FileText className="mr-2 h-5 w-5" />Lihat Laporan</Link>
        </Button>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Icon className={`h-5 w-5 ${color} mb-2`} />
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-bold mt-0.5 truncate">{value}</p>
      </CardContent>
    </Card>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
