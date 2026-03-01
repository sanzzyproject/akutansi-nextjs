import Dexie, { type Table } from 'dexie';
import type { Transaksi, AnalisisRecord } from './types';

class AkuntansiDB extends Dexie {
  transaksi!: Table<Transaksi, number>;
  analisis!: Table<AnalisisRecord, number>; // TABEL BARU

  constructor() {
    super('AkuntansiLKS');
    // Versi dinaikkan ke 2 karena ada tabel baru
    this.version(2).stores({
      transaksi: '++id, tanggal, keterangan',
      analisis: '++id, tanggal, transaksi',
    });
  }
}

export const db = new AkuntansiDB();
