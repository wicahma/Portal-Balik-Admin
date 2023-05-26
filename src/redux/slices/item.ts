import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Item, initBarang, initKualitas } from "@/interfaces/reduxInterface";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Item = {
  barang: initBarang,
  kualitas: initKualitas,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setBarang(state, action) {
      state.barang = action.payload;
      //     return {
      //     ...state,
      //     barang: action.payload,
      //   };
    },
    setKualitas(state, action) {
      state.kualitas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.main,
      };
    });
  },
});

export const { setBarang, setKualitas } = itemSlice.actions;

export default itemSlice.reducer;
