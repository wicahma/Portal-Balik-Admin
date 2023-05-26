import {
  barangInterface,
  initBarang,
  reduxState,
} from "@/interfaces/reduxInterface";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BarangForm = () => {
  const dataBarangPilihan: barangInterface | undefined | null = useSelector(
      (state: reduxState) => state.item.barang
    ),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    dispatch = useDispatch(),
    [openPreview, setOpenPreview] = React.useState(false),
    files = React.useRef<HTMLInputElement>(null);
  // handleOpenPreview = () => setOpenPreview(!openPreview),

  useEffect(() => {
    if (!values.dokumenPemegang && dataBarangPilihan === undefined) {
      files.current!.value = "";
      files.current!.files = null;
    }
  }, [values.dokumenPemegang, dataBarangPilihan]);

  useEffect(() => {
    if (dataBarangPilihan) {
      setFieldValue("_id", dataBarangPilihan._id);
      setFieldValue("upb", dataBarangPilihan.upb);
      setFieldValue("jenisBarang", dataBarangPilihan.jenisBarang);
      setFieldValue("namaPemegang", dataBarangPilihan.namaPemegang);
      //   setFieldValue("dokumenPemegang", dataBarangPilihan.dokumenPemegang);
      setFieldValue("tanggalSPK", dataBarangPilihan.tanggalSPK);
      setFieldValue("nomorSPK", dataBarangPilihan.nomorSPK);
      setFieldValue("tanggalSPM", dataBarangPilihan.tanggalSPM);
      setFieldValue("nomorSPM", dataBarangPilihan.nomorSPM);
      setFieldValue("tanggalSP2D", dataBarangPilihan.tanggalSP2D);
      setFieldValue("nomorSP2D", dataBarangPilihan.nomorSP2D);
      setFieldValue("jumlahBarang", dataBarangPilihan.jumlahBarang);
      setFieldValue("hargaSatuan", dataBarangPilihan.hargaSatuan);
      setFieldValue("jumlahHarga", dataBarangPilihan.jumlahHarga);
      setFieldValue("fetchType", "update");
    }
  }, [dataBarangPilihan, setFieldValue]);

  return (
    <div className="grid grid-cols-2 gap-5">
      {dataBarangPilihan && (
        <div className="bg-white col-span-2 shadow-xl rounded-lg px-3 py-2 uppercase text-center font-normal">
          <span className="bg-red-400 rounded-md px-2 text-white mx-1">
            update
          </span>
          Id - {dataBarangPilihan._id}
        </div>
      )}
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${errors.upb && touched.upb ? errors.upb : "UPB Barang"}`}
        onChange={(e) => setFieldValue("upb", e.target.value)}
        error={errors.upb && touched.upb}
        value={values.upb ?? ""}
      />
      <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap md:col-span-1 col-span-2 row-span-6">
        <div className="border rounded-lg p-5 flex justify-center items-center gap-3 flex-col border-blue-gray-200 w-full border-dashed">
          <div className="space-y-2">
            {dataBarangPilihan?.fetchType !== "update" ? (
              <>
                <h3 className="text-sm font-semibold ">Dokumen Pemegang</h3>
                <div className="flex justify-start items-start gap-5">
                  <input
                    type="file"
                    ref={files}
                    accept="application/pdf,application/vnd.ms-excel"
                    onChange={(file: any) => {
                      const data = file.target.files[0];
                      setFieldValue("dokumenPemegang", data);
                    }}
                    className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-400 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                  />
                  <Tooltip
                    content={"Hapus files!"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="bg-white text-gray-700 shadow-xl"
                  >
                    <Button
                      disabled={!values.dokumenPemegang}
                      onClick={() => {
                        setFieldValue("dokumenPemegang", null);
                        files.current!.value = "";
                        files.current!.files = null;
                      }}
                      className="p-2 flex justify-center items-center aspect-square rounded-full"
                      color="red"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 aspect-square"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
                <div className="border-l-2 border-red-400 text-xs w-max text-red-400 pl-2">
                  <ErrorMessage name="dokumenPemegang" />
                </div>
              </>
            ) : (
              <Link
                target="_blank"
                className="bg-red-400 hover:bg-red-600 transition-colors inline-block w-fit text-white rounded-lg px-3"
                href={"https://google.com/"}
              >
                Lihat Dokumen
              </Link>
            )}
          </div>
        </div>
      </div>
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.jenisBarang && touched.jenisBarang
            ? errors.jenisBarang
            : "Jenis Barang"
        }`}
        onChange={(e) => setFieldValue("jenisBarang", e.target.value)}
        error={errors.jenisBarang && touched.jenisBarang}
        value={values.jenisBarang ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.namaPemegang && touched.namaPemegang
            ? errors.namaPemegang
            : "Nama Pemegang"
        }`}
        onChange={(e) => setFieldValue("namaPemegang", e.target.value)}
        error={errors.namaPemegang && touched.namaPemegang}
        value={values.namaPemegang ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="date"
        color="orange"
        label={`${
          errors.tanggalSPK && touched.tanggalSPK
            ? errors.tanggalSPK
            : "Tanggal SPK"
        }`}
        onChange={(e) => setFieldValue("tanggalSPK", e.target.value)}
        error={errors.tanggalSPK && touched.tanggalSPK}
        value={values.tanggalSPK ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.nomorSPK && touched.nomorSPK ? errors.nomorSPK : "Nomor SPK"
        }`}
        onChange={(e) => setFieldValue("nomorSPK", e.target.value)}
        error={errors.nomorSPK && touched.nomorSPK}
        value={values.nomorSPK ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="date"
        color="orange"
        label={`${
          errors.tanggalSPM && touched.tanggalSPM
            ? errors.tanggalSPM
            : "Tanggal SPM"
        }`}
        onChange={(e) => setFieldValue("tanggalSPM", e.target.value)}
        error={errors.tanggalSPM && touched.tanggalSPM}
        value={values.tanggalSPM ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.nomorSPM && touched.nomorSPM ? errors.nomorSPM : "Nomor SPM"
        }`}
        onChange={(e) => setFieldValue("nomorSPM", e.target.value)}
        error={errors.nomorSPM && touched.nomorSPM}
        value={values.nomorSPM ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="date"
        color="orange"
        label={`${
          errors.tanggalSP2D && touched.tanggalSP2D
            ? errors.tanggalSP2D
            : "Tanggal SP2D"
        }`}
        onChange={(e) => setFieldValue("tanggalSP2D", e.target.value)}
        error={errors.tanggalSP2D && touched.tanggalSP2D}
        value={values.tanggalSP2D ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.nomorSP2D && touched.nomorSP2D
            ? errors.nomorSP2D
            : "Nomor SP2D"
        }`}
        onChange={(e) => setFieldValue("nomorSP2D", e.target.value)}
        error={errors.nomorSP2D && touched.nomorSP2D}
        value={values.nomorSP2D ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.jumlahBarang && touched.jumlahBarang
            ? errors.jumlahBarang
            : "Jumlah Barang"
        }`}
        onChange={(e) => setFieldValue("jumlahBarang", e.target.value)}
        error={errors.jumlahBarang && touched.jumlahBarang}
        value={values.jumlahBarang ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.hargaSatuan && touched.hargaSatuan
            ? errors.hargaSatuan
            : "Harga Satuan"
        }`}
        onChange={(e) => setFieldValue("hargaSatuan", e.target.value)}
        error={errors.hargaSatuan && touched.hargaSatuan}
        value={values.hargaSatuan ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.jumlahHarga && touched.jumlahHarga
            ? errors.jumlahHarga
            : "Jumlah Harga"
        }`}
        onChange={(e) => setFieldValue("jumlahHarga", e.target.value)}
        error={errors.jumlahHarga && touched.jumlahHarga}
        value={values.jumlahHarga ?? ""}
      />
      <div className="flex gap-3 justify-end md:col-span-2 col-span-1">
        <Button
          color="red"
          variant="text"
          onClick={() => {
            dispatch({ type: "item/setBarang", payload: null });
            dispatch({
              type: "main/setAlert",
              payload: {
                type: "info",
                message: "Kolom berhasil dibersihkan!",
                show: true,
              },
            });
            resetForm();
          }}
          // disabled={!values ? true : false}
        >
          Bersihkan Form
        </Button>
        <Button
          color="green"
          onClick={() => {
            if (Object.keys(errors).length !== 0) {          
              console.log("errors", errors);
              dispatch({
                type: "main/setAlert",
                payload: {
                  type: "error",
                  message:
                    "Terdapat kolom yang belum diisi, silahkan di cek kembali!",
                  show: true,
                },
              });
            }
          }}
          type="submit"
          disabled={isSubmitting}
        >
          {dataBarangPilihan ? "Update Barang" : "Tambah Barang"}
        </Button>
      </div>
    </div>
  );
};

export default BarangForm;
