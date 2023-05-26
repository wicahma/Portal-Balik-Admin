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
  dokumenPemegang: [File] | null;
  tanggalSPK: string;
  nomorSPK: string;
  tanggalSPM: string;
  nomorSPM: string;
  tanggalSP2D: string;
  nomorSP2D: string;
  jumlahBarang: number;
  hargaSatuan: number;
  jumlahHarga: number;
  fetchType?: "create" | "update";
}

export const initBarang: barangInterface = {
  _id: "",
  upb: "",
  jenisBarang: "",
  namaPemegang: "",
  dokumenPemegang: null,
  tanggalSPK: "",
  nomorSPK: "",
  tanggalSPM: "",
  nomorSPM: "",
  tanggalSP2D: "",
  nomorSP2D: "",
  jumlahBarang: 0,
  hargaSatuan: 0,
  jumlahHarga: 0,
  fetchType: "create",
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
  barang: barangInterface | null | undefined;
  kualitas: kualitasInterface | null | undefined;
  dataBarang: barangInterface[];
  dataKualitas: kualitasInterface[];
}

export interface reduxState {
  main: Main;
  item: Item;
}
