import { Main } from "@/interfaces/reduxInterface";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Main = {
  alert: {
    type: "error",
    message: "none",
    show: false,
  },
  isLoading: false,
  token: "",
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
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

export const { setToken, setAlert, setLoading, setUser } = mainSlice.actions;

export default mainSlice.reducer;
