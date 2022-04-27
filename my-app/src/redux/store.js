import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
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
    store: {},
  },
});

sagaMiddleware.run(watcherSaga);

export default store;
