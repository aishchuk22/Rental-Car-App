import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const { data } = await api.get("/cars", {
        params: { page, limit },
      });
      return {
        items: data.cars,
        totalCars: data.totalCars,
        page: data.page,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
