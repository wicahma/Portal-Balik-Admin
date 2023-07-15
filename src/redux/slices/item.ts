import { Item, initBarang, initKualitas } from "@/interfaces/reduxInterface";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Item = {
  barang: null,
  dataBarang: [initBarang],
  kualitas: null,
  dataKualitas: [initKualitas],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setBarang(state, action) {
      state.barang = action.payload;
    },
    setKualitas(state, action) {
      state.kualitas = action.payload;
    },
    setDataBarang(state, action) {
      state.dataBarang = action.payload;
    },
    setDataKualitas(state, action) {
      state.dataKualitas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.item,
      };
    });
  },
});

export const { setBarang, setKualitas, setDataBarang, setDataKualitas } =
  itemSlice.actions;

export default itemSlice.reducer;
