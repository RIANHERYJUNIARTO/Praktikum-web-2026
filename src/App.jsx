import React from "react";
import KartuProfil from "./KartuProfil";
import BadgeSkill from "./BadgeSkill";
import ItemMatkul from "./ItemMatkul";
import ProyekCard from "./ProyekCard";
import fotoSaya from "./assets/Hery2.jpeg";
const profil = {
  nama: "Rian Hery Juniarto",
  npm: "243040049",
  kelas: "D",
  status: "Aktif",
  fotoUrl: fotoSaya,};

const daftarPraktikum = [
  { id: 1, kode: "IF211", nama: "Pemrograman Web", sks: 3, hari: "Senin" },
  { id: 2, kode: "IF212", nama: "Basis Data", sks: 3, hari: "Rabu" },
  { id: 3, kode: "IF213", nama: "Rekayasa Perangkat Lunak", sks: 3, hari: "Kamis" },
  { id: 4, kode: "IF214", nama: "Jaringan Komputer", sks: 2, hari: "Jumat" },
];

const daftarSkill = [
  { id: 1, nama: "HTML & CSS", level: "Mahir" },
  { id: 2, nama: "JavaScript", level: "Menengah" },
  { id: 3, nama: "React JS", level: "Pemula" },
  { id: 4, nama: "Git & GitHub", level: "Menengah" },
];

const daftarProyek = [
  {
    id: 1,
    judul: "Website Portofolio Pribadi",
    deskripsi: "Halaman statis berisi biodata, riwayat pendidikan, dan minat dengan HTML semantik.",
    teknologi: ["HTML5", "CSS3"],
  },
  {
    id: 2,
    judul: "Kalkulator Sederhana",
    deskripsi: "Kalkulator tambah, kurang, kali, bagi yang interaktif di browser.",
    teknologi: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    judul: "Aplikasi Kasir Mini",
    deskripsi: "Program Java untuk menghitung total belanja dan diskon otomatis.",
    teknologi: ["Java", "OOP"],
  },
  {
    id: 4,
    judul: "Catatan Tugas Harian",
    deskripsi: "Daftar tugas kuliah yang bisa ditambah dan ditandai selesai.",
    teknologi: ["HTML", "CSS", "DOM"],
  },
];

const judulSeksi = {
  color: "#0F4C45",
  borderBottom: "2px solid #E8A33D",
  paddingBottom: "8px",
  fontSize: "20px",
};

function App() {
  const tampilkanPesan = () => {
    alert("Modul 1 selesai! Komponen, props, list rendering, dan event sudah jalan.");
  };

  return (
    <div style={{ maxWidth: "880px", margin: "40px auto", padding: "0 24px", fontFamily: "Georgia, serif" }}>
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ color: "#0F4C45", margin: "0 0 6px 0", fontSize: "34px" }}>Praktikum Pemrograman Web</h1>
        <p style={{ color: "#5B6B68", margin: 0 }}>Modul 1: Pengenalan React JS dan Vite</p>
      </header>

      <section style={{ marginBottom: "36px" }}>
        <h2 style={judulSeksi}>Profil Mahasiswa</h2>
        <KartuProfil
          nama={profil.nama}
          npm={profil.npm}
          kelas={profil.kelas}
          status={profil.status}
          fotoUrl={profil.fotoUrl}
        />
        <h4 style={{ margin: "18px 0 6px 0", color: "#37474F" }}>Keahlian</h4>
        <div>
          {daftarSkill.map((skill) => (
            <BadgeSkill key={skill.id} namaSkill={skill.nama} level={skill.level} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "36px" }}>
        <h2 style={judulSeksi}>Rencana Praktikum Semester</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {daftarPraktikum.map((matkul) => (
            <ItemMatkul
              key={matkul.id}
              kode={matkul.kode}
              nama={matkul.nama}
              sks={matkul.sks}
              hari={matkul.hari}
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "36px" }}>
        <h2 style={judulSeksi}>Portofolio Mini</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          {daftarProyek.map((proyek) => (
            <ProyekCard
              key={proyek.id}
              judul={proyek.judul}
              deskripsi={proyek.deskripsi}
              teknologi={proyek.teknologi}
            />
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={tampilkanPesan}
          style={{
            backgroundColor: "#0F4C45",
            color: "#FFFFFF",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Tes event klik
        </button>
      </div>
    </div>
  );
}

export default App;
