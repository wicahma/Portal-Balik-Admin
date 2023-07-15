import { Item, Main } from "@/interfaces/reduxInterface";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setDataBarang } from "../slices/item";
import { setAlert, setLoading } from "../slices/main";

export const getAllBarang = async ({
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
      `${process.env.NEXT_PUBLIC_API_URL}api/barang/all`,
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
          message: "Gagal mengambil data barang!",
          show: true,
        })
      );
    }
    const data = res.data.data;
    dispatch(setDataBarang(data));
  } catch (error) {
    console.log(error);
  }
};

export const createBarang = async ({
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
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/barang`, datas, {
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
      getAllBarang({ dispatch, session });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal mengambil data barang!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const updateBarang = async ({
  id,
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
  id: string | undefined;
  datas: any;
  session: any;
  resetForm: any;
}) => {
  await axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}api/barang/${id}`, datas, {
      headers: {
        Authorization: `Bearer ${session.data.token}`,
      },
    })
    .then(async (res) => {
      dispatch(
        setAlert({
          type: "success",
          message: "Data berhasil diupdate!",
          show: true,
        })
      );
      getAllBarang({ dispatch: dispatch, session: session.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal mengupdate data barang!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const deleteBarang = async ({
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
  await axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}api/barang/${id}`, {
      headers: {
        Authorization: `Bearer ${session.data.token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: "Data berhasil dihapus!",
          show: true,
        })
      );
      getAllBarang({ dispatch: dispatch, session: session.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Gagal menghapus data barang!",
          show: true,
        })
      );
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
