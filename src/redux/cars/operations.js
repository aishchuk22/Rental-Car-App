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

export const fetchFilteredCars = createAsyncThunk(
  "cars/fetchFiltered",
  async ({ brand, price, mileageFrom, mileageTo }, thunkAPI) => {
    try {
      const params = {};

      if (brand) params.brand = brand;
      if (price) params.rentalPrice = price;
      if (mileageFrom) params.mileageFrom = mileageFrom.replace(/,/g, "");
      if (mileageTo) params.mileageTo = mileageTo.replace(/,/g, "");

      const { data } = await api.get("/cars", { params });

      return {
        items: data.cars,
        totalCars: data.totalCars || data.cars.length,
        page: 1,
        totalPages: 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
