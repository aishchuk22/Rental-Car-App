import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchPriceOptions } from "./operations";

const initialState = {
  brands: [],
  priceOptions: [],
  isLoading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPriceOptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPriceOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.priceOptions = action.payload;
      })
      .addCase(fetchPriceOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filtersSlice.reducer;
