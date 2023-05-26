export interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface Main {
  alert: AlertProps;
  isLoading: boolean;
  token: string;
}

export interface barangInterface {
  _id?: string;
  upb: string;
  jenisBarang: string;
  namaPemegang: string;
  dokumenPemegang: [File] | string;
  tanggalSPK: string;
  nomorSPK: string;
  tanggalSPM: string;
  nomorSPM: string;
  tanggalSP2D: string;
  nomorSP2D: string;
  jumlahBarang: string;
  hargaSatuan: string;
  jumlahHarga: string;
  totalBelanja: string;
}

export const initBarang: barangInterface = {
  _id: "",
  upb: "",
  jenisBarang: "",
  namaPemegang: "",
  dokumenPemegang: "",
  tanggalSPK: "",
  nomorSPK: "",
  tanggalSPM: "",
  nomorSPM: "",
  tanggalSP2D: "",
  nomorSP2D: "",
  jumlahBarang: "",
  hargaSatuan: "",
  jumlahHarga: "",
  totalBelanja: "",
};

export interface kualitasInterface {
  _id?: string;
  _idBarang: string;
  gambar: string;
  kualitas: string;
  status: string;
  barangKe: string;
}

export const initKualitas: kualitasInterface = {
  _id: "",
  _idBarang: "",
  gambar: "",
  kualitas: "",
  status: "",
  barangKe: "1",
};

export interface Item {
  barang: barangInterface;
  kualitas: kualitasInterface;
}

export interface reduxState {
  main: Main;
  item: Item;
}
