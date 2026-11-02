import React from "react";

function ProyekCard({ judul, deskripsi, teknologi }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "18px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CFE0DC",
        borderTop: "4px solid #0F4C45",
        borderRadius: "4px",
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 8px 0", color: "#0F4C45", fontSize: "16px" }}>{judul}</h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#4A5A57", lineHeight: 1.5 }}>
          {deskripsi}
        </p>
      </div>

      {/* Tagar teknologi dirender dari array dengan .map() */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {teknologi.map((tech) => (
          <span
            key={tech}
            style={{
              backgroundColor: "#E6F2EF",
              color: "#0F4C45",
              padding: "3px 8px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            #{tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProyekCard;
