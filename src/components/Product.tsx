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
    _id: "1",
    upb: "1",
    jenisBarang: "Buku",
    tanggalSPK: "2021-08-01",
    nomorSPK: "1",
    tanggalSPM: "2021-08-01",
    nomorSPM: "1",
    tanggalSP2D: "2021-08-01",
    nomorSP2D: "1",
    jumlahBarang: "1",
    hargaSatuan: "1",
    jumlahHarga: "1",
    totalBelanja: "1",
  },
];
const kualitas = [
  {
    _id: "1",
    _idBarang: "1",
    gambar: "1",
    kualitas: "Baik",
    status: "digunakan",
    barangKe: "1",
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
                tableTitle={["ID Kualitas", "ID Barang"]}
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
