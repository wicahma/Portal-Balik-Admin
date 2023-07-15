import {
  barangValidationSchema,
  kualitasValidationSchema,
} from "@/interfaces/adminPageInterface";
import {
  barangInterface,
  initBarang,
  initKualitas,
  kualitasInterface,
  reduxState,
} from "@/interfaces/reduxInterface";
import { createBarang, updateBarang } from "@/redux/actions/barang-action";
import {
  createKualitas,
  createKualitasNoPDF,
} from "@/redux/actions/kualitas-action";
import { setLoading } from "@/redux/slices/main";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import Finder from "./finder/Finder";
import BarangForm from "./forms/BarangForm";
import KualitasForm from "./forms/KualitasForm";

const Product = (props: any) => {
  const dispatch = useDispatch(),
    barang = useSelector((state: reduxState) => state.item.dataBarang),
    [filteredBarang, setFilteredBarang] = React.useState<barangInterface[]>([]),
    session = useSession(),
    kualitas = useSelector((state: reduxState) => state.item.dataKualitas),
    [filteredKualitas, setFilteredKualitas] = React.useState<
      kualitasInterface[]
    >([]);

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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              dispatch(setLoading(true));

              if (values.fetchType === "create") {
                createBarang({
                  dispatch: dispatch,
                  datas: values,
                  session: session,
                  resetForm: resetForm,
                });
              } else {
                updateBarang({
                  id: values._id,
                  dispatch,
                  datas: values,
                  session: session,
                  resetForm: resetForm,
                });
              }
              return false;
            }}
          >
            <Form>
              <BarangForm />
              <Finder
                initData={barang}
                identifier="barang"
                resultCallback={(result) => setFilteredBarang(result)}
              />
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
                    "dibuat pada",
                    "diperbarui pada",
                  ]}
                  tableData={filteredBarang}
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              resetForm();
              if (
                values.fetchType === "update" &&
                values.isDocumentSame === true
              ) {
                createKualitasNoPDF({
                  dispatch,
                  datas: values,
                  session: session,
                  resetForm: resetForm,
                });
              } else {
                createKualitas({
                  dispatch: dispatch,
                  datas: values,
                  session: session,
                  resetForm: resetForm,
                });
              }
              return false;
            }}
          >
            <Form>
              <KualitasForm />
              <Finder
                initData={kualitas}
                identifier="kualitas"
                resultCallback={(result) => setFilteredKualitas(result)}
              />
              <div className="w-full overflow-x-auto">
                <DataTable
                  identifier="kualitas"
                  tableTitle={[
                    "qr Code",
                    "ID Kualitas",
                    "UUID Kualitas",
                    "ID Barang",
                    "Gambar",
                    "Nama Pemegang",
                    "Dokumen Pemegang",
                    "Kondisi",
                    "Status",
                    "Barang Ke",
                    "Tanggal pembuatan",
                    "Tanggal Pengecekan",
                  ]}
                  tableData={filteredKualitas}
                />
              </div>
            </Form>
          </Formik>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto block md:p-10 py-10 px-2">
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
