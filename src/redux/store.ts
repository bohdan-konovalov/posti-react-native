import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import usersReducer from "./users/usersSlice";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
};

export const store = setupStore();
