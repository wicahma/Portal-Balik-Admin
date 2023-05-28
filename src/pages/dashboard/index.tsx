import React from "react";
import Product from "@/components/Product";
import { wrapper } from "@/redux/store";
import { setDataBarang, setDataKualitas } from "@/redux/slices/item";
import Layout from "@/components/Layout";

const barang = [
  {
    _id: "1",
    upb: "bagian umum",
    jenisBarang: "Printer HP",
    tanggalSPK: "2022-05-19",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2022-05-14",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2023-01-19",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "2",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "2",
    upb: "bagian umum",
    jenisBarang: "Proyektor Epson",
    tanggalSPK: "2023-05-19",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2023-05-13",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2023-05-16",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "1",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "3",
    upb: "bagian umum",
    jenisBarang: "Laptop Kantor",
    tanggalSPK: "2022-7-1",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2022-03-01",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2022-05-01",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "3",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
  {
    _id: "4",
    upb: "bagian umum",
    jenisBarang: "Printer HP",
    tanggalSPK: "2022-05-21",
    nomorSPK: "B/027/274/KPA/PPK/Umum.2/III/2022",
    tanggalSPM: "2022-05-01",
    nomorSPM: "15.13/03.0/000242/LS/4.01.0.00.0.00.01.0000/M/4/2022",
    tanggalSP2D: "2022-3-27",
    nomorSP2D: "15.13/04.0/000337/LS/4.01.0.00.0.00.01.0000/M/5/2022",
    jumlahBarang: "1",
    hargaSatuan: (4_300_000).toString(),
    jumlahHarga: (12_900_000).toString(),
    totalBelanja: (12_900_000).toString(),
  },
];
const kualitas = [
  {
    _id: "1",
    _idBarang: "1",
    gambar: "gambar testing",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
    kondisi: "baik",
    updateAt: "2022-05-19",
    status: "digunakan",
    barangKe: "1",
  },
  {
    _id: "2",
    _idBarang: "1",
    gambar: "gambar testing",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
    kondisi: "rusak",
    updateAt: "2022-05-19",
    status: "digunakan",
    barangKe: "2",
  },
  {
    _id: "3",
    _idBarang: "1",
    gambar: "gambar testing",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
    kondisi: "rusak",
    updateAt: "2022-05-19",
    status: "tidak-digunakan",
    barangKe: "2",
  },
  {
    _id: "4",
    _idBarang: "1",
    gambar: "gambar testing",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
    kondisi: "baik",
    updateAt: "2022-05-19",
    status: "digunakan",
    barangKe: "2",
  },
  {
    _id: "5",
    _idBarang: "2",
    gambar: "gambar testing",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
    kondisi: "baik",
    updateAt: "2022-05-19",
    status: "tidak-digunakan",
    barangKe: "1",
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
    <Layout>
      <Product />
    </Layout>
  );
};

export default index;
