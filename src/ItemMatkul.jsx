import React from "react";

function ItemMatkul({ kode, nama, sks, hari }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CFE0DC",
        borderLeft: "5px solid #E8A33D",
        borderRadius: "4px",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold", color: "#0F4C45" }}>
          {kode} - {nama}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7A77", marginTop: "4px" }}>
          Praktikum hari {hari}
        </div>
      </div>
      <span
        style={{
          backgroundColor: "#0F4C45",
          color: "#FFFFFF",
          padding: "4px 12px",
          borderRadius: "4px",
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        {sks} SKS
      </span>
    </div>
  );
}

export default ItemMatkul;
