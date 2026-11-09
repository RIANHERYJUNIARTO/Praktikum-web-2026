// src/ItemTransaksi.jsx
import React from "react";

function ItemTransaksi({ transaksi, onHapus }) {
  const isPemasukan = transaksi.jenis === "Pemasukan";

  return (
    <li className="item">
      <div style={{ flex: "1 1 auto" }}>
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1F2937" }}>
          {transaksi.keterangan}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280" }}>
          {transaksi.jenis}
        </div>
      </div>

      {/* Pemasukan hijau (#16A34A), Pengeluaran merah (#DC2626) */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          color: isPemasukan ? "#16A34A" : "#DC2626",
          marginRight: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {isPemasukan ? "+ " : "- "}
        Rp {transaksi.nominal.toLocaleString("id-ID")}
      </div>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;