import React from "react";

const skemaWarna = {
  Pemula: { bg: "#ECEFF1", text: "#37474F", border: "#B0BEC5" },
  Menengah: { bg: "#FFF1D6", text: "#7A4B00", border: "#F2C879" },
  Mahir: { bg: "#D8F0EA", text: "#0B4A40", border: "#8FD0C2" },
};

function BadgeSkill({ namaSkill, level }) {
  const tema = skemaWarna[level] || skemaWarna.Pemula;
  
  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 14px",
        margin: "4px",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: tema.bg,
        color: tema.text,
        border: `1px solid ${tema.border}`,
      }}
    >
      {namaSkill} ({level})
    </span>
  );
}

export default BadgeSkill;
