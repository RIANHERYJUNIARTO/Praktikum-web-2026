// src/FormTransaksi.jsx
import { useState } from "react";

function FormTransaksi({ onTambahTransaksi }) {
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");
  const [jenis, setJenis] = useState("Pemasukan");

  // Validasi: keterangan tidak boleh kosong & nominal harus lebih dari 0
  const tidakValid = keterangan.trim() === "" || nominal === "" || Number(nominal) <= 0;

  const tanganiKirim = (e) => {
    e.preventDefault();
    if (tidakValid) return;

    // Kirim data ke induk (App) dengan nominal diubah ke angka (Number)
    onTambahTransaksi({
      id: Date.now(),
      keterangan: keterangan.trim(),
      nominal: Number(nominal),
      jenis: jenis,
    });

    // Reset input form
    setKeterangan("");
    setNominal("");
    setJenis("Pemasukan");
  };

  return (
    <form onSubmit={tanganiKirim} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="baris">
        <input
          className="input"
          type="text"
          placeholder="Keterangan transaksi (contoh: Kiriman Bulanan / Makan Siang)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
      </div>
      <div className="baris">
        <input
          className="input"
          type="number"
          placeholder="Nominal (Rp)"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
        />
        <select
          className="input"
          style={{ maxWidth: "160px" }}
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
        >
          <option value="Pemasukan">Pemasukan (+)</option>
          <option value="Pengeluaran">Pengeluaran (-)</option>
        </select>
        <button className="tombol" type="submit" disabled={tidakValid}>
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormTransaksi;