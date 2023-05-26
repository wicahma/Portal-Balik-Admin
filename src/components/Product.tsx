import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import DataTable from "./DataTable";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import BarangForm from "./forms/BarangForm";
import KualitasForm from "./forms/KualitasForm";
import {
  initBarang,
  initKualitas,
  reduxState,
} from "@/interfaces/reduxInterface";
import {
  barangValidationSchema,
  kualitasValidationSchema,
} from "@/interfaces/adminPageInterface";

const Product = (props: any) => {
  const dispatch = useDispatch();
  const barang = useSelector((state: reduxState) => state.item.dataBarang);
  const kualitas = useSelector((state: reduxState) => state.item.dataKualitas);
  const data = [
    {
      label: "Barang",
      value: "barang",
      desc: (
        <>
          <Formik
            initialValues={initBarang}
            validationSchema={barangValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              // dispatch({
              //   type: "main/setLoading",
              //   payload: true,
              // });
              console.log(values);
              setSubmitting(true);
              //   fetchProduk("outbond", values, values._id);
              return false;
            }}
          >
            <Form>
              <BarangForm />
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
            </Form>
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
            initialValues={initKualitas}
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
            <Form>
              <KualitasForm />
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
            </Form>
          </Formik>
        </>
      ),
    },
  ];

  return (
    <div className=" container mx-auto block md:p-10 py-10 px-2">
      <Tabs value="kualitas" className="max-w-full">
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
