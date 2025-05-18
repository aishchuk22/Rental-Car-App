import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchBrands = createAsyncThunk(
  "filters/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/brands");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPriceOptions = createAsyncThunk(
  "filters/fetchPriceOptions",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cars?page=1&limit=100");
      const prices = data.cars.map((car) =>
        parseInt(car.rentalPrice.replace("$", ""))
      );
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const options = [];
      for (let i = min; i <= max; i += 10) {
        options.push(i);
      }
      return options;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
