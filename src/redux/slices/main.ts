import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Main } from "@/interfaces/reduxInterface";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Main = {
  alert: {
    type: "error",
    message: "none",
    show: false,
  },
  isLoading: false,
  token: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
      // return {
      //   ...state,
      //   alert: action.payload,
      // };
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
      // return {
      //   ...state,
      //   isLoading: action.payload,
      // };
    },

    setToken(state, action) {
      state.token = action.payload;
      // return {
      //   ...state,
      //   token: action.payload,
      // };
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

export const { setToken, setAlert, setLoading } = mainSlice.actions;

export default mainSlice.reducer;
