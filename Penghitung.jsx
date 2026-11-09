import Kartu from './Kartu';
function Penghitung() {
let jumlah = 0; // variabel biasa
const tambah = () => {
jumlah = jumlah + 1;
console.log('Nilai jumlah sekarang:', jumlah);
};
return (
<Kartu judul="Penghitung Klik">
<p>Tombol sudah diklik {jumlah} kali</p>
<button className="tombol" onClick={tambah}>Klik Saya</button>
</Kartu>
);
}
export default Penghitung;