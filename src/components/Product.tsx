import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import DataTable from "./DataTable";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const initialBarang = {};
const initialKualitas = {};

const kualitasValidationSchema = Yup.object().shape({});
const barangValidationSchema = Yup.object().shape({});

const barang = [
  {
    _id: "a3su5si23mn4c7123s3u7",
    upb: "bagian umum",
    jenisBarang: "Printer HP",
    namaPemegang: "Al Husain Mardani",
    dokumenPemegang: "Dokumen PDF",
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
];
const kualitas = [
  {
    _id: "93syfdi23mn4c7asd7us0m",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    kualitas: "sedang",
    status: "digunakan",
    barangKe: "1",
  },
  {
    _id: "93syfdi23mn4c7asd7u123",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    kualitas: "baik",
    status: "tidak digunakan",
    barangKe: "2",
  },
  {
    _id: "93syfdi23mn4c7asd7us01",
    _idBarang: "a3su5si23mn4c7123s3u7",
    gambar: "gambar testing",
    kualitas: "buruk",
    status: "digunakan",
    barangKe: "3",
  },
];

const Product = (props: any) => {
  const dispatch = useDispatch();
  const data = [
    {
      label: "Barang",
      value: "barang",
      desc: (
        <>
          <Formik
            initialValues={initialBarang}
            validationSchema={barangValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              //   fetchProduk("outbond", values, values._id);
              return false;
            }}
          >
            <div className="w-full overflow-x-auto">
              <DataTable
                identifier="barang"
                tableTitle={[
                  "ID Barang",
                  "UPB",
                  "Jenis Barang",
                  "Nama Pemegang",
                  "Dokumen Pemegang",
                  "Tanggal SPK",
                  "Nomor SPK",
                  "Tanggal SPM",
                  "Nomor SPM",
                  "Tanggal SP2D",
                  "Nomor SP2D",
                  "Jumlah Barang",
                  "Harga Satuan",
                  "Jumlah Harga",
                  "Total Belanja",
                ]}
                tableData={barang}
              />
            </div>
          </Formik>
        </>
      ),
    },
    {
      label: "Kualitas",
      value: "kualitas",
      desc: (
        <>
          <Formik
            initialValues={initialKualitas}
            validationSchema={kualitasValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              //   fetchProduk("outbond", values, values._id);
              return false;
            }}
          >
            <div className="w-full overflow-x-auto">
              <DataTable
                identifier="kualitas"
                tableTitle={[
                  "ID Kualitas",
                  "ID Barang",
                  "Gambar",
                  "Kualitas",
                  "Status",
                  "Barang Ke",
                ]}
                tableData={kualitas}
              />
            </div>
          </Formik>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-full w-full block md:p-10 py-10 px-2">
      <Tabs value="barang" className="max-w-full">
        <TabsHeader className="">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel className="" key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Product;
