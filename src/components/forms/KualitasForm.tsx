import {
  barangInterface,
  kualitasInterface,
  reduxState,
} from "@/interfaces/reduxInterface";
import {
  Button,
  Input,
  Option,
  Select,
  Tooltip,
} from "@material-tailwind/react";
import { ErrorMessage, useFormikContext } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const KualitasForm = () => {
  const dataKualitasPilihan: kualitasInterface | undefined | null = useSelector(
      (state: reduxState) => state.item.kualitas
    ),
    barang: barangInterface[] = useSelector(
      (state: reduxState) => state.item.dataBarang
    ),
    [dataBarang, setDataBarang] = React.useState<barangInterface[]>(barang),
    [dataBarangKe, setDataBarangKe] = React.useState<number[]>([]),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    dispatch = useDispatch(),
    gambar = React.useRef<HTMLInputElement>(null),
    files = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!values.gambar && dataKualitasPilihan === undefined) {
      gambar.current!.value = "";
      gambar.current!.files = null;
    }
  }, [values.gambar, dataKualitasPilihan]);

  useEffect(() => {
    if (!values.dokumenPemegang && dataKualitasPilihan === undefined) {
      files.current!.value = "";
      files.current!.files = null;
    }
  }, [values.dokumenPemegang, dataKualitasPilihan]);

  useEffect(() => {
    if (dataKualitasPilihan) {
      setFieldValue("_id", dataKualitasPilihan._id);
      setFieldValue("_idBarang", dataKualitasPilihan._idBarang);
      setFieldValue("namaPemegang", dataKualitasPilihan.namaPemegang);
      setFieldValue("barangKe", dataKualitasPilihan.barangKe);
      setFieldValue("kualitas", dataKualitasPilihan.kualitas);
      setFieldValue("status", dataKualitasPilihan.status);
      setFieldValue("fetchType", "update");
    }
  }, [dataKualitasPilihan, setFieldValue]);

  const addBarangKe = (id: string | undefined) => {
    const data: barangInterface = barang.filter(
      (item: barangInterface) => item._id === id
    )[0];
    for (let i = 1; i <= data.jumlahBarang; i++) {
      setDataBarangKe((prev) => [...prev, i]);
    }
  };

  const findBarang = (input: string) => {
    if (input.length > 0) {
      return setDataBarang(
        barang.filter(
          (item: barangInterface | any) =>
            item._id.includes(input) ||
            item.jenisBarang.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
    return setDataBarang(barang);
  };

  return (
    <div className="grid grid-cols-9 gap-3">
      {dataKualitasPilihan && (
        <div className="bg-white col-span-9 shadow-xl rounded-lg px-3 py-2 uppercase text-center font-normal">
          <span className="bg-red-400 rounded-md px-2 text-white mx-1">
            update
          </span>
          Id - {dataKualitasPilihan._id}
        </div>
      )}
      <div className="col-span-9 relative">
        <Select
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          label={`${
            errors._idBarang && touched._idBarang
              ? errors._idBarang
              : "ID Barang"
          }`}
          value={values._idBarang}
          error={touched._idBarang && errors._idBarang ? true : false}
          onMouseUp={() => setDataBarang(barang)}
          onChange={(e) => {
            setFieldValue("_idBarang", e);
            addBarangKe(e);
          }}
        >
          <Input
            type="text"
            color="gray"
            label="Cari ID / Nama Barang"
            onChange={(e) => findBarang(e.target.value)}
          />
          {dataBarang?.map((item: barangInterface, i: number) => (
            <Option value={item._id} key={item._id} className="uppercase">
              {item._id} - {item.jenisBarang}
            </Option>
          ))}
        </Select>
        <div className="absolute top-3 left-3 uppercase text-sm -z-10">
          {values._idBarang &&
            dataBarang.filter((item) => item._id === values._idBarang)[0]
              ._id}{" "}
          -{" "}
          {values._idBarang &&
            dataBarang.filter((data) => data._id === values._idBarang)[0]
              .jenisBarang}
        </div>
      </div>

      <div className="col-span-9">
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
      </div>

      <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap md:col-span-3 col-span-9 row-span-3">
        <div className="border rounded-lg p-5 flex justify-center items-center gap-3 flex-col border-blue-gray-200 w-full border-dashed">
          <div className="space-y-2">
            {dataKualitasPilihan?.fetchType !== "update" ? (
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
      <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap md:col-span-3 col-span-9 row-span-3">
        <div className="border rounded-lg p-5 flex justify-center items-center gap-3 flex-col border-blue-gray-200 w-full border-dashed">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold ">Foto Kualitas Barang</h3>
            <div className="flex justify-start items-start gap-5">
              <input
                type="file"
                ref={gambar}
                accept="image/*"
                multiple={false}
                onChange={(file: any) => {
                  const data = file.target.files[0];
                  setFieldValue("gambar", data);
                }}
                className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-400 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
              />
              <Tooltip
                content={"Hapus Gambar!"}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="bg-white text-gray-700 shadow-xl"
              >
                <Button
                  disabled={!values.gambar}
                  onClick={() => {
                    setFieldValue("gambar", null);
                    gambar.current!.value = "";
                    gambar.current!.files = null;
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
              <ErrorMessage name="gambar" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-3 col-span-9">
        <Select
          label={`${
            errors.kualitas && touched.kualitas
              ? errors.kualitas
              : "Kualitas Barang"
          }`}
          value={values.kualitas}
          error={touched.kualitas && errors.kualitas ? true : false}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => setFieldValue("kualitas", e)}
        >
          <Option value="baik">Baik</Option>
          <Option value="rusak">Rusak</Option>
        </Select>
      </div>

      <div className="md:col-span-3 col-span-9">
        <Select
          label={`${
            errors.status && touched.status ? errors.status : "Status Barang"
          }`}
          value={values.status}
          error={touched.status && errors.status ? true : false}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => setFieldValue("status", e)}
        >
          <Option value="digunakan">Digunakan</Option>
          <Option value="tidak-digunakan">Tidak Digunakan</Option>
          <Option value="service">Service</Option>
        </Select>
      </div>
      <div className="md:col-span-3 col-span-9">
        <Select
          label={`${
            errors.barangKe && touched.barangKe
              ? errors.barangKe
              : "Barang Keberapa"
          }`}
          value={values.barangKe}
          error={touched.barangKe && errors.barangKe ? true : false}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => setFieldValue("barangKe", e)}
        >
          {values._idBarang ? (
            dataBarangKe?.map((item: any, i: number) => (
              <Option value={`${i + 1}`} key={`BarangKe-${i}`}>
                {
                  dataBarang.filter((data) => data._id === values._idBarang)[0]
                    .jenisBarang
                }{" "}
                - {i + 1}
              </Option>
            ))
          ) : (
            <Option value="Nothing" key={"Nothing"} disabled>
              Silahkan pilih ID Barang dahulu
            </Option>
          )}
        </Select>
      </div>

      <div className="flex gap-3 justify-end md:col-span-9 col-span-1">
        <Button
          color="red"
          variant="text"
          onClick={() => {
            dispatch({ type: "item/setKualitas", payload: null });
            dispatch({
              type: "main/setAlert",
              payload: {
                type: "info",
                message: "Kolom berhasil dibersihkan!",
                show: true,
              },
            });
            files.current!.value = "";
            files.current!.files = null;
            gambar.current!.value = "";
            gambar.current!.files = null;
            setDataBarangKe([]);
            resetForm();
          }}
        >
          Bersihkan Form
        </Button>
        <Button
          color="green"
          onClick={() => {
            if (errors) {
              console.log(errors);
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
          {dataKualitasPilihan ? "Update Barang" : "Tambah Barang"}
        </Button>
      </div>
    </div>
  );
};

export default KualitasForm;
