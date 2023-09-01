import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMeter, IMeterBody } from "../types";
import { AppThunk, RootState } from "./store";
import ApiService from "../services/api";
export interface IMetersState {
  meters: IMeter[];
  isLoading: boolean;
  error: string;
}

const initialState: IMetersState = {
  meters: [],
  isLoading: false,
  error: "",
};

export const meterSlice = createSlice({
  name: "meter",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMeters: (state, action: PayloadAction<IMeter[]>) => {
      state.meters = action.payload;
    },
    delMeter: (state, action: PayloadAction<string>) => {
      state.meters = state.meters.filter((m) => m.id !== action.payload);
    },
  },
});

export const getMeters = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await ApiService?.getMeters();
    dispatch(setMeters(response));
    dispatch(setLoading(false));
  } catch (error) {
    //dispatch(handleError(error));
    dispatch(setLoading(false));
  }
};

export const addMeter =
  (payload: IMeterBody): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService?.createMeter(payload);
      console.log("addMeter", response);
      const meters = await ApiService?.getMeters();
      dispatch(setMeters(meters));
      dispatch(setLoading(false));
    } catch (error) {
      //dispatch(handleError(error));
      dispatch(setLoading(false));
    }
  };

export const editMeter =
  (meterId: string, payload: IMeterBody): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService?.updateMeter(meterId, payload);
      console.log("editMeter", response);
      const meters = await ApiService?.getMeters();
      dispatch(setMeters(meters));
      dispatch(setLoading(false));
    } catch (error) {
      //dispatch(handleError(error));
      dispatch(setLoading(false));
    }
  };

export const deleteMeter =
  (meterId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService?.deleteMeter(meterId);
      dispatch(delMeter(meterId));
      dispatch(setLoading(false));
    } catch (error) {
      //dispatch(handleError(error));
      dispatch(setLoading(false));
    }
  };

export const { setMeters, setLoading, delMeter } = meterSlice.actions;
export const selectMeters = (state: RootState) => state.meter.meters;
export const selectedMeter = (id: string) => (state: RootState) =>
  state.meter.meters.find((m: IMeter) => m.id === id);
export const selectLoading = (state: RootState) => state.meter.isLoading;

export default meterSlice.reducer;
