import * as Yup from "yup";

export function checkIfFilesAreTooBig(files?: any): boolean {
  let valid = true;
  if (files) {
    files.map((file: any) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesAreCorrectType(files?: any): boolean {
  let valid = true;
  if (files) {
    files.map((file: any) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
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
    .test("is-correct-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
    .test(
      "is-big-file",
      "VALIDATION_FIELD_FILE_WRONG_TYPE",
      checkIfFilesAreCorrectType
    ),
  kualitas: Yup.string().required("Kualitas dibutuhkan!"),
  status: Yup.string().required("Status dibutuhkan!"),
  barangKe: Yup.string().required("Barang Ke dibutuhkan!"),
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
    .test("is-correct-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
    .test(
      "is-big-file",
      "VALIDATION_FIELD_FILE_WRONG_TYPE",
      checkIfFilesAreCorrectType
    ),
  tanggalSPK: Yup.string()
    .required("Tanggal SPK dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  nomorSPK: Yup.string()
    .required("Nomor SPK dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  tanggalSPM: Yup.string()
    .required("Tanggal SPM dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  nomorSPM: Yup.string()
    .required("Nomor SPM dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  tanggalSP2D: Yup.string()
    .required("Tanggal SP2D dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  nomorSP2D: Yup.string()
    .required("Nomor SP2D dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  jumlahBarang: Yup.string()
    .required("Jumlah Barang dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  hargaSatuan: Yup.string()
    .required("Harga Satuan dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  jumlahHarga: Yup.string()
    .required("Jumlah Harga dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
  totalBelanja: Yup.string()
    .required("Total Belanja dibutuhkan!")
    .max(255, "Karakter maksimal 255!"),
});
