import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import favoritesReducer from "./favorites/slice";
import filtersReducer from "./filters/slice";
import carsReducer from "./cars/slice";

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["brand", "price", "mileageFrom", "mileageTo", "filtersApplied"],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer, 
    favorites: persistedFavoritesReducer,
    filters: persistedFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);