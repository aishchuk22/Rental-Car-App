import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.page = 1;
    },
    nextPage(state) {
      state.page += 1;
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
        state.items = action.payload.items; // Тепер це action.payload.items
        state.totalCars = action.payload.totalCars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars, nextPage } = carsSlice.actions;
export default carsSlice.reducer;
