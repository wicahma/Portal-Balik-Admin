export interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface Main {
  alert: AlertProps;
  isLoading: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export interface barangInterface {
  _id?: string;
  upb: string;
  jenisBarang: string;
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
  _uuid?: string;
  _idBarang: string;
  gambar: string;
  namaPemegang: string;
  dokumenPemegang: [File] | null;
  kondisi: "baik" | "rusak" | "service" | "";
  status: "digunakan" | "tidak-digunakan" | "";
  barangKe: string;
  updatedAt: string;
  fetchType?: "create" | "update";
  isDocumentSame?: boolean;
}

export const initKualitas: kualitasInterface = {
  _id: "",
  _uuid: "",
  _idBarang: "",
  gambar: "",
  namaPemegang: "",
  dokumenPemegang: null,
  kondisi: "",
  status: "",
  barangKe: "",
  updatedAt: "",
  fetchType: "create",
  isDocumentSame: false,
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
