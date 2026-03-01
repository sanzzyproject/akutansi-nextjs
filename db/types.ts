export interface Transaksi {
  id?: number;
  tanggal: string;
  keterangan: string;
  kas: number;
  perlengkapan: number;
  peralatan: number;
  utangUsaha: number;
  modal: number;
}

export interface SaldoBerjalan {
  transaksi: Transaksi;
  spiegel: {
    kas: number;
    perlengkapan: number;
    peralatan: number;
    utangUsaha: number;
    modal: number;
  };
}

export interface RingkasanAkuntansi {
  totalHarta: number;
  totalUtang: number;
  totalModal: number;
  seimbang: boolean;
  jumlahTransaksi: number;
  detail: { kas: number; perlengkapan: number; peralatan: number; };
}

// TIPE DATA BARU UNTUK ANALISIS D/K
export interface DetailAnalisis {
  kategori: 'Harta' | 'Utang' | 'Modal' | 'Pendapatan' | 'Biaya' | '';
  akun: string;
  pengaruh: '+' | '-' | '';
  dk: 'D' | 'K' | '';
  jumlah: number;
}

export interface AnalisisRecord {
  id?: number;
  tanggal: string;
  transaksi: string;
  dokumen: string;
  details: DetailAnalisis[];
}
