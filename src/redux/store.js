import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites/slice";
import filtersReducer from "./filters/slice";
import carsReducer from "./cars/slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
