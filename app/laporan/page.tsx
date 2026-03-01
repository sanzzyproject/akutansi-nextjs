"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { hitungSaldo, exportJSON, resetTransaksi } from '@/services/api';
import type { SaldoBerjalan } from '@/db/types';
import { Download, RotateCcw, FileText } from 'lucide-react';

function formatRp(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

function ValueCell({ value }: { value: number }) {
  if (value === 0) return <span className="text-muted-foreground">—</span>;
  return (
    <span className={`font-medium ${value > 0 ? 'text-success' : 'text-destructive'}`}>
      {value > 0 ? '+' : ''}{formatRp(value)}
    </span>
  );
}

function BalanceCell({ value }: { value: number }) {
  return <span className="font-semibold text-xs">{formatRp(value)}</span>;
}

export default function Laporan() {
  const [data, setData] = useState<SaldoBerjalan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const r = await hitungSaldo();
    setData(r);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleExport = async () => {
    const json = await exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akuntansi-lks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Berhasil', description: 'Data berhasil di-export' });
  };

  const handleReset = async () => {
    if (window.confirm("Reset Semua Data? Semua transaksi akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.")) {
      await resetTransaksi();
      toast({ title: 'Berhasil', description: 'Semua data telah direset' });
      load();
    }
  };

  if (loading) return <Skeleton className="h-96 rounded-xl" />;

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center space-y-3">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">Belum Ada Data Laporan</h3>
        <p className="text-sm text-muted-foreground">Tambahkan transaksi terlebih dahulu.</p>
      </div>
    );
  }

  const last = data[data.length - 1].spiegel;
  const totalHarta = last.kas + last.perlengkapan + last.peralatan;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={handleExport} variant="outline" className="flex-1 touch-target">
          <Download className="mr-2 h-4 w-4" />Export JSON
        </Button>
        <Button onClick={handleReset} variant="destructive" className="touch-target">
          <RotateCcw className="mr-2 h-4 w-4" />Reset
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3 min-w-[150px]">Keterangan</th>
                <th className="p-3 text-right">Kas</th>
                <th className="p-3 text-right">Perlengkapan</th>
                <th className="p-3 text-right">Peralatan</th>
                <th className="p-3 text-right">Utang Usaha</th>
                <th className="p-3 text-right">Modal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row, idx) => (
                <React.Fragment key={`group-${row.transaksi.id}`}>
                  <tr>
                    <td className="p-3 font-medium">{idx + 1}</td>
                    <td className="p-3">
                      <p className="font-medium text-xs">{row.transaksi.keterangan}</p>
                      <p className="text-[10px] text-muted-foreground">{row.transaksi.tanggal}</p>
                    </td>
                    <td className="p-3 text-right"><ValueCell value={row.transaksi.kas} /></td>
                    <td className="p-3 text-right"><ValueCell value={row.transaksi.perlengkapan} /></td>
                    <td className="p-3 text-right"><ValueCell value={row.transaksi.peralatan} /></td>
                    <td className="p-3 text-right"><ValueCell value={row.transaksi.utangUsaha} /></td>
                    <td className="p-3 text-right"><ValueCell value={row.transaksi.modal} /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="p-3"></td>
                    <td className="p-3 text-[10px] text-muted-foreground italic">Saldo</td>
                    <td className="p-3 text-right"><BalanceCell value={row.spiegel.kas} /></td>
                    <td className="p-3 text-right"><BalanceCell value={row.spiegel.perlengkapan} /></td>
                    <td className="p-3 text-right"><BalanceCell value={row.spiegel.peralatan} /></td>
                    <td className="p-3 text-right"><BalanceCell value={row.spiegel.utangUsaha} /></td>
                    <td className="p-3 text-right"><BalanceCell value={row.spiegel.modal} /></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            <tfoot className="bg-muted/50 border-t-2 border-border font-bold">
              <tr>
                <td colSpan={2} className="p-3">TOTAL</td>
                <td className="p-3 text-right">{formatRp(last.kas)}</td>
                <td className="p-3 text-right">{formatRp(last.perlengkapan)}</td>
                <td className="p-3 text-right">{formatRp(last.peralatan)}</td>
                <td className="p-3 text-right">{formatRp(last.utangUsaha)}</td>
                <td className="p-3 text-right">{formatRp(last.modal)}</td>
              </tr>
              <tr>
                <td colSpan={2} className="p-3 text-primary">HARTA = UTANG + MODAL</td>
                <td colSpan={3} className="p-3 text-right text-primary">{formatRp(totalHarta)}</td>
                <td colSpan={2} className="p-3 text-right text-primary">{formatRp(last.utangUsaha + last.modal)}</td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
