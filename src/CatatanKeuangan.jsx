// src/CatatanKeuangan.jsx
// Tugas 3 - Catatan Keuangan Mini (SATU FILE: CSS + semua komponen)
import { useState, useEffect } from 'react';

/* ============================================================
   1. GAYA TAMPILAN (CSS) - dipasang lewat tag <style> di komponen App
   ============================================================ */
const gaya = `
.wadah { max-width: 640px; margin: 40px auto; padding: 0 20px; font-family: Arial, sans-serif; color: #1F2937; }
.judul { color: #1B365D; margin-bottom: 4px; }
.subjudul { color: #6B7280; margin-top: 0; margin-bottom: 24px; }

.kartu { background: #FFFFFF; border: 1px solid #D0D7DE; border-radius: 10px;
  padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08); }
.kartu h2 { margin-top: 0; font-size: 18px; color: #1B365D; }

.baris { display: flex; gap: 8px; }
.form-kolom { display: flex; flex-direction: column; gap: 8px; }
.input { flex: 1; padding: 10px; border: 1px solid #D0D7DE; border-radius: 6px; font-size: 14px; min-width: 0; }
.pilihan { flex: 0 0 auto; background: #FFFFFF; }

.tombol { padding: 10px 16px; border: none; border-radius: 6px; background: #1B365D;
  color: #FFFFFF; font-weight: bold; cursor: pointer; }
.tombol:disabled { background: #9CA3AF; cursor: not-allowed; }
.tombol-merah { background: #DC2626; }
.tombol-kecil { padding: 6px 10px; font-size: 12px; }

.daftar { list-style: none; padding: 0; margin: 0; }
.item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #E5E7EB; }
.item span { flex: 1; }

.kosong { color: #6B7280; text-align: center; font-style: italic; }
.galat { color: #DC2626; font-size: 13px; margin: 6px 0 0; }

/* Warna nominal: hijau = pemasukan, merah = pengeluaran */
.masuk { color: #16A34A; }
.keluar { color: #DC2626; }

/* Ringkasan saldo */
.label-saldo { display: block; margin: 0; font-size: 13px; color: #6B7280; }
.saldo { margin: 4px 0 16px; font-size: 32px; font-weight: bold; }
.ringkasan-baris { gap: 12px; }
.kotak-ringkas { flex: 1; background: #F3F4F6; border-radius: 8px; padding: 12px; }
.kotak-ringkas strong { display: block; margin-top: 4px; }
`;

/* ============================================================
   2. KOMPONEN PEMBUNGKUS: Kartu (judul lewat props, isi lewat children)
   ============================================================ */
function Kartu({ judul, children }) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

/* ============================================================
   3. KOMPONEN TAMPILAN: RingkasanSaldo (hanya menerima props, tanpa state)
   ============================================================ */
function RingkasanSaldo({ totalPemasukan, totalPengeluaran, saldo }) {
  return (
    <div>
      <p className="label-saldo">Saldo Saat Ini</p>
      {/* className dinamis: hijau jika saldo >= 0, merah jika minus */}
      <p className={saldo >= 0 ? 'saldo masuk' : 'saldo keluar'}>Rp {saldo}</p>

      <div className="baris ringkasan-baris">
        <div className="kotak-ringkas">
          <span className="label-saldo">Total Pemasukan</span>
          <strong className="masuk">Rp {totalPemasukan}</strong>
        </div>
        <div className="kotak-ringkas">
          <span className="label-saldo">Total Pengeluaran</span>
          <strong className="keluar">Rp {totalPengeluaran}</strong>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   4. KOMPONEN ANAK: FormTransaksi (formulir terkendali)
      Punya state sendiri untuk isi input, tetapi TIDAK menyimpan daftar
      transaksi. Ia "melapor" ke induk lewat fungsi onTambah.
   ============================================================ */
function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState(''); // nilai input selalu berupa TEKS
  const [jenis, setJenis] = useState('pemasukan');

  // Nilai turunan untuk validasi (tidak perlu state baru)
  const angka = Number(nominal); // ubah teks menjadi angka
  const nominalSalah = nominal !== '' && !(angka > 0);
  const tidakValid = keterangan.trim() === '' || nominal === '' || nominalSalah;

  const tanganiKirim = (event) => {
    event.preventDefault(); // cegah halaman reload
    if (tidakValid) return;

    // Kirim data ke induk. nominal dikirim sebagai ANGKA, bukan teks.
    onTambah({ keterangan: keterangan.trim(), nominal: angka, jenis: jenis });

    setKeterangan('');
    setNominal('');
  };

  return (
    <form onSubmit={tanganiKirim}>
      <div className="form-kolom">
        <input
          className="input"
          type="text"
          placeholder="Keterangan, contoh: Uang saku bulanan"
          value={keterangan}
          onChange={(event) => setKeterangan(event.target.value)}
        />

        <div className="baris">
          <input
            className="input"
            type="number"
            placeholder="Nominal (Rp)"
            min="1"
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          />
          <select
            className="input pilihan"
            value={jenis}
            onChange={(event) => setJenis(event.target.value)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
          <button className="tombol" type="submit" disabled={tidakValid}>
            Tambah
          </button>
        </div>
      </div>

      {nominalSalah && <p className="galat">Nominal harus berupa angka lebih dari 0.</p>}
    </form>
  );
}

/* ============================================================
   5. KOMPONEN ANAK: ItemTransaksi (satu baris transaksi)
      "Melapor" ke induk lewat onHapus(id).
   ============================================================ */
function ItemTransaksi({ transaksi, onHapus }) {
  const adalahPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>

      {/* className dinamis + ternary: hijau untuk pemasukan, merah untuk pengeluaran */}
      <strong className={adalahPemasukan ? 'masuk' : 'keluar'}>
        {adalahPemasukan ? '+ ' : '- '}Rp {transaksi.nominal}
      </strong>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

/* ============================================================
   6. KOMPONEN INDUK: App
      HANYA di sini state daftar transaksi disimpan (lifting state up).
   ============================================================ */
const KUNCI_STORAGE = 'catatan-keuangan';

function App() {
  // State utama: baca dari localStorage dulu (hanya dijalankan sekali saat pertama tampil)
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
      return dataTersimpan ? JSON.parse(dataTersimpan) : [];
    } catch {
      return []; // jika isi localStorage rusak, mulai dari kosong
    }
  });

  // useEffect: sinkronkan ke localStorage setiap daftarTransaksi berubah
  useEffect(() => {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  // Menambah: buat array BARU (spread), jangan push
  const tambahTransaksi = ({ keterangan, nominal, jenis }) => {
    const transaksiBaru = { id: Date.now(), keterangan, nominal, jenis };
    setDaftarTransaksi([...daftarTransaksi, transaksiBaru]);
  };

  // Menghapus: array BARU tanpa transaksi ber-id tersebut
  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((transaksi) => transaksi.id !== id));
  };

  // Nilai turunan: dihitung dari state, BUKAN disimpan sebagai state baru
  const totalPemasukan = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pemasukan')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const totalPengeluaran = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pengeluaran')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <>
      <style>{gaya}</style>

      <div className="wadah">
        <h1 className="judul">Catatan Keuangan Mini</h1>
        <p className="subjudul">Laboratorium Informatika - Modul 2: Tugas 3</p>

        <Kartu judul="Ringkasan">
          <RingkasanSaldo
            totalPemasukan={totalPemasukan}
            totalPengeluaran={totalPengeluaran}
            saldo={saldo}
          />
        </Kartu>

        <Kartu judul="Tambah Transaksi">
          <FormTransaksi onTambah={tambahTransaksi} />
        </Kartu>

        <Kartu judul="Daftar Transaksi">
          {/* Conditional rendering dengan ternary: pesan khusus jika belum ada transaksi */}
          {daftarTransaksi.length === 0 ? (
            <p className="kosong">Belum ada transaksi. Catat pemasukan atau pengeluaran pertamamu!</p>
          ) : (
            <ul className="daftar">
              {daftarTransaksi.map((transaksi) => (
                <ItemTransaksi
                  key={transaksi.id}
                  transaksi={transaksi}
                  onHapus={hapusTransaksi}
                />
              ))}
            </ul>
          )}
        </Kartu>
      </div>
    </>
  );
}

export default App;
