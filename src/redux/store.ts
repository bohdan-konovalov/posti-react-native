import {
  configureStore,
  combineReducers,
  Middleware,
  UnknownAction,
} from "@reduxjs/toolkit";
import { jsonPlaceholderApiSlice } from "./api/apiSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";

export interface MockEnhancedStore extends AppStore {
  getActions?(): UnknownAction[];
}

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

export let store = setupStore();
let actions: UnknownAction[] = [];

export const mockStore = function mockStore(_middlewares?: Middleware[]) {
  return (preloadedState?: Partial<RootState>): MockEnhancedStore => {
    store = setupStore(preloadedState);

    actions = []; // empty it out after every test run
    const mockedStore: MockEnhancedStore = store;
    mockedStore.getActions = () => {
      return actions;
    };
    return mockedStore;
  };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
