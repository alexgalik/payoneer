import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import storeSlice from "./slices/store.slice";
import watcherSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    sagaMiddleware,
  ],
  reducer: {
    store: storeSlice,
  },
});

sagaMiddleware.run(watcherSaga);

export default store;
