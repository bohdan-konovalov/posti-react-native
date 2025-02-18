import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import usersReducer from "./users/usersSlice";
import { jsonPlaceholderApiSlice } from "./api/apiSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  [jsonPlaceholderApiSlice.reducerPath]: jsonPlaceholderApiSlice.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

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
