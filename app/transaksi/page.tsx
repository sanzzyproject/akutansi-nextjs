"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getTransaksi, addTransaksi, deleteTransaksi } from '@/services/api';
import type { Transaksi } from '@/db/types';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

// Komponen kotak kecil untuk menampilkan nilai uang
function DataBox({ label, value }: { label: string; value: number }) {
  const isEmpty = !value || value === 0;
  const isPos = value > 0;
  
  let bgClass = "bg-muted/20"; 
  if (!isEmpty) {
    bgClass = isPos ? "bg-success/10" : "bg-destructive/10";
  }

  return (
    <div className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-border/50 ${bgClass}`}>
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      <span className="text-sm">
        {isEmpty ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          <span className={isPos ? "text-success font-semibold" : "text-destructive font-semibold"}>
            {isPos ? '+' : '-'}{(Math.abs(value) / 1000000).toFixed(1)}jt
          </span>
        )}
      </span>
    </div>
  );
}

export default function TransaksiPage() {
  const { toast } = useToast();
  const [data, setData] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // State form
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: '',
    kas: 0,
    perlengkapan: 0,
    peralatan: 0,
    utangUsaha: 0,
    modal: 0
  });

  const loadData = async () => {
    setLoading(true);
    const result = await getTransaksi();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (window.confirm("Hapus transaksi ini?")) {
      await deleteTransaksi(id);
      toast({ title: "Terhapus", description: "Transaksi berhasil dihapus." });
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await addTransaksi(form);
      toast({ title: "Berhasil", description: "Data transaksi tersimpan!" });
      setShowForm(false);
      
      // Reset form
      setForm({
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: '', kas: 0, perlengkapan: 0, peralatan: 0, utangUsaha: 0, modal: 0
      });
      loadData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Gagal", description: error.message });
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  // 1. Tampilan Form Input
  if (showForm) {
    return (
      <Card className="max-w-xl mx-auto border-none shadow-md animate-in fade-in slide-in-from-bottom-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Input Transaksi Baru</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Input placeholder="Contoh: Beli peralatan" name="keterangan" value={form.keterangan} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold text-primary">Harta (+) / (-)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Kas</Label><Input type="number" name="kas" value={form.kas} onChange={handleChange} /></div>
                <div className="space-y-1"><Label>Perlengkapan</Label><Input type="number" name="perlengkapan" value={form.perlengkapan} onChange={handleChange} /></div>
                <div className="space-y-1"><Label>Peralatan</Label><Input type="number" name="peralatan" value={form.peralatan} onChange={handleChange} /></div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold text-destructive">Utang & Modal (+) / (-)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Utang Usaha</Label><Input type="number" name="utangUsaha" value={form.utangUsaha} onChange={handleChange} /></div>
                <div className="space-y-1"><Label>Modal</Label><Input type="number" name="modal" value={form.modal} onChange={handleChange} /></div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Batal</Button>
              <Button type="submit" className="flex-1" disabled={formLoading}>
                <Save className="mr-2 h-4 w-4" /> {formLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // 2. Tampilan List Transaksi (Seperti di Screenshot)
  return (
    <div className="space-y-4 max-w-xl mx-auto animate-in fade-in duration-500">
      <Button onClick={() => setShowForm(true)} className="w-full py-6 text-base font-semibold shadow-md rounded-xl touch-target">
        <Plus className="mr-2 h-5 w-5" /> Tambah Transaksi
      </Button>

      {loading ? (
        <div className="space-y-4 mt-4">
          <div className="h-40 bg-muted/50 animate-pulse rounded-xl"></div>
          <div className="h-40 bg-muted/50 animate-pulse rounded-xl"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Belum ada transaksi.
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {data.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-foreground leading-tight">{item.keterangan}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.tanggal}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => toast({ description: "Fitur edit menyusul" })}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <DataBox label="Kas" value={item.kas} />
                  <DataBox label="Perlengkapan" value={item.perlengkapan} />
                  <DataBox label="Peralatan" value={item.peralatan} />
                  <DataBox label="Utang" value={item.utangUsaha} />
                  <DataBox label="Modal" value={item.modal} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
