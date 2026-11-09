// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Kartu from "./Kartu";
import Penghitung from "./Penghitung";
import FormTugas from "./FormTugas";
import ItemTugas from "./ItemTugas";
import FormTransaksi from "./FormTransaksi";
import ItemTransaksi from "./ItemTransaksi";
import RingkasanSaldo from "./RingkasanSaldo";

function App() {
  // =========================================================================
  // STATE & LOGIKA: DAFTAR TUGAS PRAKTIKUM (Langkah 4 - 7, Tugas 1 & Tugas 2)
  // =========================================================================
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem("daftar-tugas");
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: "Install Node.js dan Vite", selesai: true },
      { id: 2, judul: "Pelajari useState", selesai: false },
    ];
  });

  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    console.log("Aplikasi Praktikum Modul 2 siap digunakan!");
  }, []);

  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  useEffect(() => {
    localStorage.setItem("daftar-tugas", JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
    });
    setDaftarTugas(daftarBaru);
  };

  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  const tugasTerfilter = daftarTugas.filter((tugas) => {
    if (filter === "belum") return !tugas.selesai;
    if (filter === "selesai") return tugas.selesai;
    return true;
  });

  // =========================================================================
  // STATE & LOGIKA: CATATAN KEUANGAN MINI (Tugas 3 - Laporan Mandiri)
  // =========================================================================
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    const dataTersimpan = localStorage.getItem("catatan-keuangan");
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, keterangan: "Uang Saku Bulanan", nominal: 1500000, jenis: "Pemasukan" },
      { id: 2, keterangan: "Beli Token Listrik Kos", nominal: 100000, jenis: "Pengeluaran" },
    ];
  });

  // Sinkronisasi transaksi ke localStorage
  useEffect(() => {
    localStorage.setItem("catatan-keuangan", JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  const tambahTransaksi = (transaksiBaru) => {
    setDaftarTransaksi([...daftarTransaksi, transaksiBaru]);
  };

  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((item) => item.id !== id));
  };

  // Nilai turunan otomatis: total pemasukan, pengeluaran, dan saldo
  const totalPemasukan = daftarTransaksi
    .filter((t) => t.jenis === "Pemasukan")
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const totalPengeluaran = daftarTransaksi
    .filter((t) => t.jenis === "Pengeluaran")
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const totalSaldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="wadah">
      <h1 className="judul">Praktikum Pemrograman Web</h1>
      <p className="subjudul">
        Rian Hery Juniarto - 243040049
      </p>

      {/* Bagian Latihan 1: Komponen Penghitung */}
      <Penghitung />

      {/* Bagian 2: Daftar Tugas Praktikum */}
      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas Praktikum">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p className="ringkasan" style={{ margin: 0 }}>
            {jumlahSelesai} dari {daftarTugas.length} tugas selesai
          </p>

          {/* Conditional Rendering: Tombol Hapus Semua Selesai (Tugas 2) */}
          {jumlahSelesai > 0 && (
            <button
              className="tombol tombol-merah tombol-kecil"
              onClick={hapusSemuaSelesai}
            >
              Hapus Semua yang Selesai
            </button>
          )}
        </div>

        {/* Filter Tombol Dinamis (Tugas 1) */}
        <div className="baris" style={{ margin: "16px 0" }}>
          <button
            className="tombol tombol-kecil"
            style={{
              backgroundColor: filter === "semua" ? "#1B365D" : "#E5E7EB",
              color: filter === "semua" ? "#FFFFFF" : "#374151",
            }}
            onClick={() => setFilter("semua")}
          >
            Semua
          </button>
          <button
            className="tombol tombol-kecil"
            style={{
              backgroundColor: filter === "belum" ? "#1B365D" : "#E5E7EB",
              color: filter === "belum" ? "#FFFFFF" : "#374151",
            }}
            onClick={() => setFilter("belum")}
          >
            Belum Selesai
          </button>
          <button
            className="tombol tombol-kecil"
            style={{
              backgroundColor: filter === "selesai" ? "#1B365D" : "#E5E7EB",
              color: filter === "selesai" ? "#FFFFFF" : "#374151",
            }}
            onClick={() => setFilter("selesai")}
          >
            Selesai
          </button>
        </div>

        {tugasTerfilter.length === 0 ? (
          <p className="kosong">Tidak ada tugas dalam kategori ini.</p>
        ) : (
          <ul className="daftar">
            {tugasTerfilter.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}
      </Kartu>

      {/* Bagian 3: Catatan Keuangan Mini (Tugas 3) */}
      <Kartu judul="Tambah Transaksi Keuangan">
        <FormTransaksi onTambahTransaksi={tambahTransaksi} />
      </Kartu>

      <Kartu judul="Catatan Keuangan Mini">
        {/* Komponen Ringkasan Saldo Otomatis */}
        <RingkasanSaldo
          totalPemasukan={totalPemasukan}
          totalPengeluaran={totalPengeluaran}
          totalSaldo={totalSaldo}
        />

        {/* Conditional Rendering Pesan Kosong */}
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Silakan catat transaksi baru!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((item) => (
              <ItemTransaksi
                key={item.id}
                transaksi={item}
                onHapus={hapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default App;