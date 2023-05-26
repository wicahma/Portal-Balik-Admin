import { reduxState } from "@/interfaces/reduxInterface";
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BarangForm = () => {
  const dataBarangPilihan: any | undefined | null = useSelector(
      (state: reduxState) => state.item.barang
    ),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    dispatch = useDispatch(),
    [openPreview, setOpenPreview] = React.useState(false),
    handleOpenPreview = () => setOpenPreview(!openPreview),
    gambar = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!values.images && dataBarangPilihan === undefined) {
      gambar.current!.value = "";
      gambar.current!.files = null;
    }
  }, [values.gambar]);

  useEffect(() => {
    if (dataBarangPilihan) {
      setFieldValue("_id", dataBarangPilihan._id);
      setFieldValue("fetchType", "update");
    }
  }, [dataBarangPilihan]);

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
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${
          errors.jenisBarang && touched.jenisBarang
            ? errors.jenisBarang
            : "jenisBarang"
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
            : "namaPemegang"
        }`}
        onChange={(e) => setFieldValue("namaPemegang", e.target.value)}
        error={errors.namaPemegang && touched.namaPemegang}
        value={values.namaPemegang ?? ""}
      />
      <Input
        className="md:col-span-1 col-span-2"
        type="text"
        color="orange"
        label={`${errors.anjay && touched.anjay ? errors.anjay : "anjay"}`}
        onChange={(e) => setFieldValue("anjay", e.target.value)}
        error={errors.anjay && touched.anjay}
        value={values.anjay ?? ""}
      />
      {dataBarangPilihan ? (
        <>
          <Button
            color="light-blue"
            variant="outlined"
            size="sm"
            onClick={handleOpenPreview}
            className="mx-auto block"
          >
            Lihat Gambar
          </Button>
          <Dialog open={openPreview} handler={handleOpenPreview}>
            <DialogBody className="border-b">
              <Image
                src={`${process.env.API_URL}/images/${dataBarangPilihan.imageId}`}
                alt={`Gambar Mobil - ${dataBarangPilihan.imageId}`}
                width={400}
                height={400}
                className="rounded-lg w-full"
              />
            </DialogBody>
            <DialogFooter>
              <Button
                variant="outlined"
                color="green"
                size="sm"
                onClick={handleOpenPreview}
                className="mr-1"
              >
                <span>Oke</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </>
      ) : (
        <>
          <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
            <div className="border-2 rounded-lg p-5 flex justify-center items-center gap-3 flex-col border-blue-gray-200 md:w-1/2 w-full border-dashed">
              <div className="flex justify-center items-center gap-5">
                <input
                  type="file"
                  ref={gambar}
                  accept="image/*"
                  onChange={(image: any) => {
                    const data = image.target.files[0];
                    if (data) {
                      return (
                        data.type.includes("image") &&
                        data.size <= 5_000_000 &&
                        setFieldValue("images", data)
                      );
                    }
                    image.target.files = [];
                    image.target.value = "";
                    return setFieldValue("images", undefined);
                  }}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-400 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                />
                <Tooltip
                  content={"Hapus gambar!"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-white text-gray-700 shadow-xl"
                >
                  <Button
                    disabled={!values.images}
                    onClick={() => {
                      setFieldValue("images", undefined);
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
                <ErrorMessage name="images" />
              </div>
              {values.images && (
                <p className="text-xs text-gray-500">
                  {values.images.name} ({values.images.size / 1_000_000} MB)
                </p>
              )}
            </div>
            <Image
              src={
                values.images
                  ? window.URL.createObjectURL(values.images)
                  : "https://via.placeholder.com/150"
              }
              alt="gambar-mobil"
              height={300}
              width={300}
              className="bg-black md:w-1/2 w-full object-cover rounded-xl"
            />
          </div>
        </>
      )}
      <div className="flex gap-3 justify-end">
        <Button
          color="red"
          variant="text"
          onClick={() => {
            dispatch({ type: "produk/setSelectedDataMobil", payload: null });
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
            if (errors) {
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
