import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { jsonPlaceholderApiSlice } from "./api/apiSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";

const rootReducer = combineReducers({
  [jsonPlaceholderApiSlice.reducerPath]: jsonPlaceholderApiSlice.reducer,
});

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(jsonPlaceholderApiSlice.middleware),
    preloadedState,
  });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
