import { main } from "@/interfaces/mainSliceInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: main = {
  alert: {
    show: false,
    message: "",
    type: "success",
  },
  loading: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: () => initialState,
    setAlert: (state, action) => {
      state.alert = action.payload;
      setTimeout(() => {
        state.alert = initialState.alert;
      }, 3000);
    },
  },
});

export const { reset, setAlert } = mainSlice.actions;

export default mainSlice.reducer;
