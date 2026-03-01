import Dexie, { type Table } from 'dexie';
import type { Transaksi, AnalisisRecord } from './types';

class AkuntansiDB extends Dexie {
  transaksi!: Table<Transaksi, number>;
  analisis!: Table<AnalisisRecord, number>;

  constructor() {
    super('AkuntansiLKS');
    this.version(2).stores({
      transaksi: '++id, tanggal, keterangan',
      analisis: '++id, tanggal, transaksi',
    });
  }
}

export const db = new AkuntansiDB();

// Dikembalikan agar layanan API tidak error saat proses build Vercel
export const dataDummy: Omit<Transaksi, 'id'>[] = [
  { tanggal: '2026-01-01', keterangan: 'Investasi awal pemilik', kas: 50000000, perlengkapan: 0, peralatan: 0, utangUsaha: 0, modal: 50000000 }
];
