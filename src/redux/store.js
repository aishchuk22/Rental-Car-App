import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice";
import favoritesReducer from "./favorites/slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
  },
});
