import { barangInterface, reduxState } from "@/interfaces/reduxInterface";
import { Button, Input } from "@material-tailwind/react";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BarangForm = () => {
  const dataBarangPilihan: barangInterface | undefined | null = useSelector(
      (state: reduxState) => state.item.barang
    ),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    dispatch = useDispatch();

  useEffect(() => {
    if (dataBarangPilihan) {
      setFieldValue("_id", dataBarangPilihan._id);
      setFieldValue("upb", dataBarangPilihan.upb);
      setFieldValue("jenisBarang", dataBarangPilihan.jenisBarang);
      //   setFieldValue("dokumenPemegang", dataBarangPilihan.dokumenPemegang);
      setFieldValue(
        "tanggalSPK",
        new Date(dataBarangPilihan.tanggalSPK).toISOString().slice(0, 10)
      );
      setFieldValue("nomorSPK", dataBarangPilihan.nomorSPK);
      setFieldValue(
        "tanggalSPM",
        new Date(dataBarangPilihan.tanggalSPM).toISOString().slice(0, 10)
      );
      setFieldValue("nomorSPM", dataBarangPilihan.nomorSPM);
      setFieldValue(
        "tanggalSP2D",
        new Date(dataBarangPilihan.tanggalSP2D).toISOString().slice(0, 10)
      );
      setFieldValue("nomorSP2D", dataBarangPilihan.nomorSP2D);
      setFieldValue("jumlahBarang", dataBarangPilihan.jumlahBarang);
      setFieldValue("hargaSatuan", dataBarangPilihan.hargaSatuan);
      setFieldValue("jumlahHarga", dataBarangPilihan.jumlahHarga);
      setFieldValue("fetchType", "update");
    }
  }, [dataBarangPilihan, setFieldValue]);

  return (
    <div className="grid grid-cols-2 gap-5 mb-10">
      {dataBarangPilihan && (
        <div className="bg-white col-span-2 shadow-xl rounded-lg px-3 py-2 uppercase text-center font-normal">
          <span className="bg-red-400 rounded-md px-2 text-white mx-1">
            update
          </span>
          Id - {dataBarangPilihan._id}
        </div>
      )}
      <div className="col-span-2">
        <Input
          className="md:col-span-1 col-span-2"
          type="text"
          color="orange"
          label={`${
            errors.jenisBarang && touched.jenisBarang
              ? errors.jenisBarang
              : "Nama Barang"
          }`}
          onChange={(e) => setFieldValue("jenisBarang", e.target.value)}
          error={errors.jenisBarang && touched.jenisBarang}
          value={values.jenisBarang ?? ""}
        />
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
          type="text"
          color="orange"
          label={`${errors.upb && touched.upb ? errors.upb : "UPB Barang"}`}
          onChange={(e) => setFieldValue("upb", e.target.value)}
          error={errors.upb && touched.upb}
          value={values.upb ?? ""}
        />
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
          type="text"
          color="orange"
          label={`${
            errors.nomorSPK && touched.nomorSPK ? errors.nomorSPK : "Nomor SPK"
          }`}
          onChange={(e) => setFieldValue("nomorSPK", e.target.value)}
          error={errors.nomorSPK && touched.nomorSPK}
          value={values.nomorSPK ?? ""}
        />
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
          type="text"
          color="orange"
          label={`${
            errors.nomorSPM && touched.nomorSPM ? errors.nomorSPM : "Nomor SPM"
          }`}
          onChange={(e) => setFieldValue("nomorSPM", e.target.value)}
          error={errors.nomorSPM && touched.nomorSPM}
          value={values.nomorSPM ?? ""}
        />
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="md:col-span-1 col-span-2">
        <Input
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
      </div>
      <div className="flex gap-3 justify-end col-span-2">
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
