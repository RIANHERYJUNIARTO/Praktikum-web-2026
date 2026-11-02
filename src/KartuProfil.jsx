import React from "react";
function KartuProfil({ nama, npm, kelas, status, fotoUrl }) {
  const inisial = nama
    .split(" ")
    .map((kata) => kata[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const aktif = status === "Aktif";

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        padding: "22px",
        maxWidth: "520px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CFE0DC",
        borderLeft: "6px solid #0F4C45",
        borderRadius: "6px",
      }}
    >
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt={`Foto ${nama}`}
          style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            backgroundColor: "#0F4C45",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {inisial}
        </div>
      )}

      <div>
        <h3 style={{ margin: "0 0 6px 0", color: "#0F4C45", fontSize: "20px" }}>{nama}</h3>
        <p style={{ margin: "2px 0", fontSize: "14px", color: "#4A5A57" }}>NPM: {npm}</p>
        <p style={{ margin: "2px 0", fontSize: "14px", color: "#4A5A57" }}>Kelas: {kelas}</p>
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "3px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            backgroundColor: aktif ? "#DDF3E4" : "#FDECC8",
            color: aktif ? "#14532D" : "#7A4B00",
          }}
        >
          Status: {status}
        </span>
      </div>
    </div>
  );
}

export default KartuProfil;
