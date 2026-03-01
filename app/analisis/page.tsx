"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getAnalisis, addAnalisis, deleteAnalisis } from '@/services/api';
import type { AnalisisRecord, DetailAnalisis } from '@/db/types';
import { Plus, Trash2, Save, X, Scale } from 'lucide-react';

// FUNGSI OTOMATIS PENENTU DEBIT/KREDIT SESUAI HUKUM AKUNTANSI (LKS)
function calculateDK(kategori: string, pengaruh: string) {
  if (!kategori || !pengaruh) return '';
  if (kategori === 'Harta' || kategori === 'Biaya') {
    return pengaruh === '+' ? 'D' : 'K';
  } else if (kategori === 'Utang' || kategori === 'Modal' || kategori === 'Pendapatan') {
    return pengaruh === '+' ? 'K' : 'D';
  }
  return '';
}

function formatRp(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

export default function AnalisisPage() {
  const { toast } = useToast();
  const [data, setData] = useState<AnalisisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const emptyDetail: DetailAnalisis = { kategori: '', akun: '', pengaruh: '', dk: '', jumlah: 0 };
  
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    transaksi: '',
    dokumen: '',
    details: [{ ...emptyDetail }, { ...emptyDetail }] // Default 2 baris akun
  });

  const loadData = async () => {
    setLoading(true);
    const result = await getAnalisis();
    setData(result);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (window.confirm("Hapus analisis transaksi ini?")) {
      await deleteAnalisis(id);
      toast({ title: "Terhapus", description: "Analisis berhasil dihapus." });
      loadData();
    }
  };

  const handleDetailChange = (index: number, field: keyof DetailAnalisis, value: any) => {
    const newDetails = [...form.details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    
    // Auto-calculate D/K if kategori or pengaruh changes
    if (field === 'kategori' || field === 'pengaruh') {
       newDetails[index].dk = calculateDK(newDetails[index].kategori, newDetails[index].pengaruh) as any;
    }
    
    setForm(prev => ({ ...prev, details: newDetails }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Basic
    if (!form.transaksi || form.details[0].jumlah <= 0) {
      toast({ variant: "destructive", title: "Error", description: "Lengkapi data transaksi dan jumlahnya." });
      return;
    }

    setFormLoading(true);
    try {
      await addAnalisis(form);
      toast({ title: "Berhasil", description: "Analisis transaksi tersimpan!" });
      setShowForm(false);
      setForm({
        tanggal: new Date().toISOString().split('T')[0],
        transaksi: '', dokumen: '', details: [{ ...emptyDetail }, { ...emptyDetail }]
      });
      loadData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Gagal", description: error.message });
    } finally {
      setFormLoading(false);
    }
  };

  if (showForm) {
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-md animate-in fade-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
          <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5 text-primary"/> Analisis Debit/Kredit</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}><X className="h-5 w-5" /></Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deskripsi Transaksi</Label>
                <Input placeholder="Cth: Pembayaran gaji..." value={form.transaksi} onChange={e => setForm({...form, transaksi: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="space-y-2">
                   <Label>Tanggal</Label>
                   <Input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                   <Label>Bukti Dokumen</Label>
                   <Input placeholder="Cth: Bukti kas keluar" value={form.dokumen} onChange={e => setForm({...form, dokumen: e.target.value})} required />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-primary font-bold border-b pb-2 block">Akun yang Dipengaruhi</Label>
              
              {form.details.map((detail, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-end p-3 bg-muted/10 rounded-xl border border-border/50">
                  <div className="col-span-12 md:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Kategori (Sistem)</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                            value={detail.kategori} onChange={e => handleDetailChange(idx, 'kategori', e.target.value)} required>
                      <option value="">Pilih...</option>
                      <option value="Harta">Harta/Aset</option>
                      <option value="Utang">Kewajiban/Utang</option>
                      <option value="Modal">Ekuitas/Modal</option>
                      <option value="Pendapatan">Pendapatan</option>
                      <option value="Biaya">Beban/Biaya</option>
                    </select>
                  </div>
                  <div className="col-span-12 md:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Nama Akun</Label>
                    <Input placeholder="Cth: Kas" value={detail.akun} onChange={e => handleDetailChange(idx, 'akun', e.target.value)} required />
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Sifat (+/-)</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-bold text-center" 
                            value={detail.pengaruh} onChange={e => handleDetailChange(idx, 'pengaruh', e.target.value)} required>
                      <option value="">?</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="col-span-3 md:col-span-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">D/K</Label>
                    <Input value={detail.dk} readOnly className={`text-center font-bold ${detail.dk === 'D' ? 'text-blue-500' : detail.dk === 'K' ? 'text-red-500' : ''}`} placeholder="Auto" tabIndex={-1} />
                  </div>
                  <div className="col-span-5 md:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Jumlah (Rp)</Label>
                    <Input type="number" min="0" value={detail.jumlah || ''} onChange={e => handleDetailChange(idx, 'jumlah', Number(e.target.value))} required />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Batal</Button>
              <Button type="submit" className="flex-1" disabled={formLoading}><Save className="mr-2 h-4 w-4" /> Simpan Analisis</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Tabel Analisis Transaksi</h2>
          <p className="text-sm text-muted-foreground">Harta, Utang, Modal, Pendapatan & Biaya</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto shadow-md rounded-xl"><Plus className="mr-2 h-4 w-4" /> Analisis Baru</Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : data.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl border-border">
          <Scale className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">Belum ada data analisis.</p>
        </div>
      ) : (
        <Card className="overflow-hidden shadow-sm border-primary/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-primary/5 text-primary">
                <tr>
                  <th className="p-4 border-b">Transaksi</th>
                  <th className="p-4 border-b">Dokumen</th>
                  <th className="p-4 border-b">Akun Dipengaruhi</th>
                  <th className="p-4 border-b text-center">+/-</th>
                  <th className="p-4 border-b text-center">D/K</th>
                  <th className="p-4 border-b text-right">Jumlah</th>
                  <th className="p-4 border-b w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.details.map((detail, idx) => (
                      <tr key={`${item.id}-${idx}`} className={idx === 0 ? "bg-background" : "bg-muted/10"}>
                        {idx === 0 ? (
                          <>
                            <td rowSpan={item.details.length} className="p-4 align-top border-b">
                              <span className="font-semibold block whitespace-normal min-w-[150px]">{item.transaksi}</span>
                              <span className="text-[10px] text-muted-foreground">{item.tanggal}</span>
                            </td>
                            <td rowSpan={item.details.length} className="p-4 align-top border-b text-muted-foreground whitespace-normal min-w-[120px]">
                              {item.dokumen}
                            </td>
                          </>
                        ) : null}
                        <td className="p-3 border-l border-border/30">
                          <span className="font-medium">{detail.akun}</span>
                          <span className="text-[10px] block text-muted-foreground">{detail.kategori}</span>
                        </td>
                        <td className="p-3 text-center font-bold text-lg">{detail.pengaruh}</td>
                        <td className={`p-3 text-center font-bold ${detail.dk === 'D' ? 'text-blue-500' : 'text-red-500'}`}>{detail.dk}</td>
                        <td className="p-3 text-right font-medium">{formatRp(detail.jumlah)}</td>
                        {idx === 0 ? (
                           <td rowSpan={item.details.length} className="p-4 align-top border-b text-center border-l border-border/30">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </td>
                        ) : null}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
