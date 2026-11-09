// src/RingkasanSaldo.jsx
import React from "react";

function RingkasanSaldo({ totalPemasukan, totalPengeluaran, totalSaldo }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          background: "#F0FDF4",
          border: "1px solid #BBF7D0",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: "#15803D", fontWeight: "bold" }}>
          Total Pemasukan
        </span>
        <p style={{ margin: "4px 0 0 0", fontWeight: "bold", color: "#16A34A", fontSize: "15px" }}>
          Rp {totalPemasukan.toLocaleString("id-ID")}
        </p>
      </div>

      <div
        style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: "#B91C1C", fontWeight: "bold" }}>
          Total Pengeluaran
        </span>
        <p style={{ margin: "4px 0 0 0", fontWeight: "bold", color: "#DC2626", fontSize: "15px" }}>
          Rp {totalPengeluaran.toLocaleString("id-ID")}
        </p>
      </div>

      <div
        style={{
          background: totalSaldo >= 0 ? "#EFF6FF" : "#FFF7ED",
          border: totalSaldo >= 0 ? "1px solid #BFDBFE" : "1px solid #FED7AA",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: totalSaldo >= 0 ? "#1D4ED8" : "#C2410C",
            fontWeight: "bold",
          }}
        >
          Sisa Saldo
        </span>
        <p
          style={{
            margin: "4px 0 0 0",
            fontWeight: "bold",
            color: totalSaldo >= 0 ? "#1D4ED8" : "#EA580C",
            fontSize: "15px",
          }}
        >
          Rp {totalSaldo.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default RingkasanSaldo;