import { Item, Main } from "@/interfaces/reduxInterface";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setDataKualitas } from "../slices/item";
import { setAlert, setLoading } from "../slices/main";

export const getAllKualitas = async ({
  dispatch,
  session,
}: {
  dispatch: ThunkDispatch<
    {
      main: Main;
      item: Item;
    },
    undefined,
    AnyAction
  >;
  session: any;
}) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/kualitas/all`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    if (res.status !== 200) {
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal mengambil data kualitas!",
          show: true,
        })
      );
    }
    const data = res.data.data;
    dispatch(setDataKualitas(data));
  } catch (error) {
    console.log(error);
  }
};

export const createKualitas = async ({
  datas,
  dispatch,
  session,
  resetForm,
}: {
  dispatch: ThunkDispatch<
    {
      main: Main;
      item: Item;
    },
    undefined,
    AnyAction
  >;
  datas: any;
  session: any;
  resetForm: any;
}) => {
  const formData = new FormData();
  formData.append("_idBarang", datas._idBarang);
  formData.append("gambar", datas.gambar);
  formData.append("namaPemegang", datas.namaPemegang);
  formData.append("dokumenPemegang", datas.dokumenPemegang);
  formData.append("kondisi", datas.kondisi);
  formData.append("status", datas.status);
  formData.append("barangKe", datas.barangKe);
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/kualitas`, formData, {
      headers: {
        Authorization: `Bearer ${session.data.token}`,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(
        setAlert({
          type: "success",
          message: "Data berhasil ditambahkan!",
          show: true,
        })
      );
      getAllKualitas({ dispatch, session });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal mengambil data kualitas!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const createKualitasNoPDF = async ({
  datas,
  dispatch,
  session,
  resetForm,
}: {
  dispatch: ThunkDispatch<
    {
      main: Main;
      item: Item;
    },
    undefined,
    AnyAction
  >;
  datas: any;
  session: any;
  resetForm: any;
}) => {
  const formData = new FormData();
  formData.append("_idBarang", datas._idBarang);
  formData.append("gambar", datas.gambar);
  formData.append("namaPemegang", datas.namaPemegang);
  formData.append("dokumenPemegang", datas.dokumenPemegang);
  formData.append("kondisi", datas.kondisi);
  formData.append("status", datas.status);
  formData.append("barangKe", datas.barangKe);
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/kualitas/no-pdf`, formData, {
      headers: {
        Authorization: `Bearer ${session.data.token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: "Data berhasil ditambahkan!",
          show: true,
        })
      );
      getAllKualitas({ dispatch, session });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal mengambil data kualitas!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const deleteKualitas = async ({
  id,
  dispatch,
  session,
  data,
}: {
  dispatch: ThunkDispatch<
    {
      main: Main;
      item: Item;
    },
    undefined,
    AnyAction
  >;
  id: string;
  session: any;
  data: any;
}) => {
  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}api/kualitas/delete/${id}&${data.idBarang}&${data.barangKe}&${data.pdf}`,
      {
        headers: {
          Authorization: `Bearer ${session.data.token}`,
        },
      }
    )
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: "Data berhasil dihapus!",
          show: true,
        })
      );
      getAllKualitas({ dispatch: dispatch, session: session.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal menghapus data kualitas!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getQrCode = async ({
  id,
  dispatch,
  session,
}: {
  dispatch: ThunkDispatch<
    {
      main: Main;
      item: Item;
    },
    undefined,
    AnyAction
  >;
  id: string;
  session: any;
}) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/kualitas/qrcode/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.data.token}`,
        },
      }
    );
    if (res.status !== 200) {
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal membuat QR Code!",
          show: true,
        })
      );
    }
    dispatch(
      setAlert({
        type: "success",
        message: "QR Code Generated!",
        show: true,
      })
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
