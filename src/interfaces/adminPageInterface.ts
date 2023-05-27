import * as Yup from "yup";

export function checkIfFilesAreTooBig(files?: any): boolean {
  let valid = true;
  if (files) {
    const size = files.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
  }
  return valid;
}

export function checkPDF(files?: any): boolean {
  let valid = true;
  if (files) {
    if (!"application/pdf".includes(files.type)) {
      valid = false;
    }
  }
  return valid;
}

export function checkImage(files?: any): boolean {
  let valid = true;
  if (files) {
    if (!files.type.includes("image")) {
      valid = false;
    }
  }
  return valid;
}

export interface AdminCardInterface {
  header: string;
  data: number;
  logo: React.ReactNode;
  logoClass?: string;
}

export const kualitasValidationSchema = Yup.object().shape({
  _idBarang: Yup.string().required("ID Barang dibutuhkan!"),
  gambar: Yup.mixed()
    .nullable()
    .required("Gambar dibutuhkan!")
    .test(
      "is-correct-file",
      "Ukuran File terlalu besar, maksimal 5Mb!",
      checkIfFilesAreTooBig
    )
    .test(
      "is-big-file",
      "Tipe File Salah, hanya menerima tipedata Gambar!",
      checkImage
    ),
  kualitas: Yup.string().required("Kualitas dibutuhkan!"),
  status: Yup.string().required("Status dibutuhkan!"),
  barangKe: Yup.number()
    .required("Barang Ke dibutuhkan!")
    .typeError("List Barang harus berupa angka!"),
});

export const barangValidationSchema = Yup.object().shape({
  upb: Yup.string()
    .required("UPB dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  jenisBarang: Yup.string()
    .required("Jenis Barang dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  namaPemegang: Yup.string()
    .required("Nama Pemegang dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  dokumenPemegang: Yup.mixed()
    .nullable()
    .required("Dokumen Pemegang dibutuhkan!")
    .test(
      "is-correct-file",
      "Ukuran File Terlalu besar! maks 5Mb",
      checkIfFilesAreTooBig
    )
    .test("is-big-file", "Tipe File Salah! Hanya menerima file PDF", checkPDF),
  tanggalSPK: Yup.date().required("Tanggal SPK dibutuhkan!"),
  nomorSPK: Yup.string()
    .required("Nomor SPK dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  tanggalSPM: Yup.date().required("Tanggal SPM dibutuhkan!"),
  nomorSPM: Yup.string()
    .required("Nomor SPM dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  tanggalSP2D: Yup.date().required("Tanggal SP2D dibutuhkan!"),
  nomorSP2D: Yup.string()
    .required("Nomor SP2D dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  jumlahBarang: Yup.number()
    .required("Jumlah Barang dibutuhkan!")
    .typeError("Jumlah Barang harus berupa angka!")
    .min(1, "Jumlah Barang tidak boleh kurang dari 0!"),
  hargaSatuan: Yup.number()
    .required("Harga Satuan dibutuhkan!")
    .typeError("Harga Satuan harus berupa angka!")
    .min(1, "Harga Satuan tidak boleh kurang dari 0!"),
  jumlahHarga: Yup.number()
    .required("Jumlah Harga dibutuhkan!")
    .typeError("Jumlah Harga harus berupa angka!")
    .min(1, "Jumlah Harga tidak boleh kurang dari 0!"),
});
