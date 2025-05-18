import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // локальне сховище за замовчуванням
import favoritesReducer from "./favorites/slice";
import filtersReducer from "./filters/slice";
import carsReducer from "./cars/slice";

// Конфігурація для фільтрів
const filtersPersistConfig = {
  key: "filters",
  storage,
  // Можна вказати, які поля зберігати (опціонально)
  whitelist: ["brand", "price", "mileageFrom", "mileageTo", "filtersApplied"],
};

// Конфігурація для закладок (опціонально)
const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

// Створюємо персистентні редюсери
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

// Конфігуруємо store
export const store = configureStore({
  reducer: {
    cars: carsReducer, // немає потреби зберігати дані автомобілів
    favorites: persistedFavoritesReducer,
    filters: persistedFiltersReducer,
  },
  // Це важливо додати для коректної роботи з non-serializable значеннями
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Створюємо persistor
export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import favoritesReducer from "./favorites/slice";
// import filtersReducer from "./filters/slice";
// import carsReducer from "./cars/slice";

// export const store = configureStore({
//   reducer: {
//     cars: carsReducer,
//     favorites: favoritesReducer,
//     filters: filtersReducer,
//   },
// });
