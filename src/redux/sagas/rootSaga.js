import { all, fork } from "@redux-saga/core/effects";

import checkoutSaga from "./checkout";
import listSaga from "./list";

function* watcherSaga() {
  yield all([fork(listSaga), fork(checkoutSaga)]);
}

export default watcherSaga;
