"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addTransaksi } from '@/services/api';
import { Save } from 'lucide-react';

export default function TransaksiPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: '',
    kas: 0,
    perlengkapan: 0,
    peralatan: 0,
    utangUsaha: 0,
    modal: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTransaksi(form);
      toast({ title: "Berhasil", description: "Data transaksi tersimpan!" });
      router.push('/laporan');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Gagal", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  return (
    <Card className="max-w-xl mx-auto border-none shadow-md">
      <CardHeader>
        <CardTitle>Input Transaksi Baru</CardTitle>
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

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
