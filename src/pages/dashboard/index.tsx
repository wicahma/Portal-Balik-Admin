import Navbars from "@/components/Navbar";
import React from "react";
import Product from "@/components/Product";
import Alerts from "@/components/Alert";
import Loading from "@/components/Loading";
import AdminCard from "@/components/AdminCard";
import { wrapper } from "@/redux/store";
import { setDataBarang, setDataKualitas } from "@/redux/slices/item";

const barang = [
  {
    _id: "a3su5si23mn4c7123s3u7",
    upb: "bagian umum",
    jenisBarang: "Printer HP",
    namaPemegang: "Al Husain Mardani",
    tanggalSPK: "21 Maret 2022",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "23 Maret 2022",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "1 Januari 2023",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "3",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "789asdf2345bjknsd7f8asd",
    upb: "bagian umum",
    jenisBarang: "Proyektor Epson",
    namaPemegang: "Al Husain Mardani",
    tanggalSPK: "2023-5-19",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2023-5-13",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2023-5-16",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "3",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "ads789hjk23b4556n7m8asd",
    upb: "bagian umum",
    jenisBarang: "Laptop Kantor",
    namaPemegang: "Al Husain Mardani",
    tanggalSPK: "2022-7-1",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2022-3-1",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2022-5-1",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "3",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "890gdfhuj412345b6nm78907sd",
    upb: "bagian umum",
    jenisBarang: "Printer HP",
    namaPemegang: "Al Husain Mardani",
    tanggalSPK: "2022-5-21",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2022-5-1",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2022-3-27",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "3",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
];
const kualitas = [
  {
    _id: "93syfdi23mn4c7asd7us0m",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    dokumenPemegang: "Dokumen PDF",
    kualitas: "sedang",
    status: "digunakan",
    barangKe: "1",
  },
  {
    _id: "93syfdi23mn4c7asd7u123",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    dokumenPemegang: "Dokumen PDF",
    kualitas: "baik",
    status: "tidak digunakan",
    barangKe: "2",
  },
  {
    _id: "93syfdi23mn4c7asd7us01",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    dokumenPemegang: "Dokumen PDF",
    kualitas: "buruk",
    status: "digunakan",
    barangKe: "3",
  },
];

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      dispatch(setDataBarang(barang));
      dispatch(setDataKualitas(kualitas));
      return { props: {} };
    }
);

const index = (props: any) => {
  return (
    <>
      <main className="bg-white">
        <Alerts />
        <Loading />
        <Navbars />
        <div className="min-h-screen w-full border-l grow flex flex-col overflow-hidden">
          <div className="flex gap-5 bg-blue-400 md:pb-20 md:pt-36 pb-10 pt-24 justify-center items-center flex-col xl:flex-row">
            <AdminCard
              header="Total Barang"
              data={235}
              logoClass="bg-orange-500"
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                  <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                </svg>
              }
            />
            <AdminCard
              header="Total Jenis Barang"
              data={235}
              logoClass="bg-yellow-500"
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z" />
                </svg>
              }
            />
            <AdminCard
              header="Kondisi Rusak"
              data={235}
              logoClass="bg-red-500"
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path
                    fill-rule="evenodd"
                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            />
            <AdminCard
              header="Kondisi Service"
              data={235}
              logoClass="bg-blue-500"
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path
                    fill-rule="evenodd"
                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            />

            <AdminCard
              header="Kondisi Baik"
              data={235}
              logoClass="bg-green-500"
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path
                    fill-rule="evenodd"
                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <Product />
        </div>
      </main>
    </>
  );
};

export default index;
