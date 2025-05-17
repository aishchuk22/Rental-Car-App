import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 0,
    totalCars: 0,

    selectedCar: null,
    isCarLoading: false,
    carError: null,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.page = 1;
    },
    nextPage(state) {
      state.page = Number(state.page) + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (action.payload.page === 1) {
          state.items = [...action.payload.items];
        } else {
          state.items = [...state.items, ...action.payload.items];
        }

        state.totalCars = action.payload.totalCars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCarById.pending, (state) => {
        state.isCarLoading = true;
        state.carError = null;
        state.selectedCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isCarLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isCarLoading = false;
        state.carError = action.payload;
      });
  },
});

export const { resetCars, nextPage } = carsSlice.actions;
export default carsSlice.reducer;
