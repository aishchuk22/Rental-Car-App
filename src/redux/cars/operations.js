import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const pageNum = Number(page);

      const { data } = await api.get("/cars", {
        params: { page: pageNum, limit },
      });

      return {
        items: data.cars,
        totalCars: data.totalCars,
        page: pageNum,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
