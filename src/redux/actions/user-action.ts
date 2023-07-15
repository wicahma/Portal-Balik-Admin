import { Item, Main } from "@/interfaces/reduxInterface";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "../slices/main";

export const checkSession = async ({
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
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/re-login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    )
    .then((res) => {
      if (res.status.toString().slice(0, 1) === "4") {
        dispatch(
          setAlert({
            type: "error",
            message: "Session habis, silahkan login ulang!",
            show: true,
          })
        );
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setAlert({
          type: "error",
          message: "Session habis, silahkan login ulang!",
          show: true,
        })
      );
      return false;
    });
};
