// store.js
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./EmployeeReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

const store = configureStore({
  reducer: {
    employee: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
