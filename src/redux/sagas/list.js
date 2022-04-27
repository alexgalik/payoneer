import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { getList, setList, setListError } from "../slices/store.slice";

import { getUnreliableProducts } from "../../server/client_utils/esmodules/basket_server_api";

export function* handleGetList() {
  try {
    const responce = yield call(getUnreliableProducts);
    if (responce && responce.length) {
      yield put(setList(responce));
    } else {
      yield put(setListError());
    }
  } catch (error) {
    console.log("OOPS, something went wrong", error);
  }
}

export default function* listSaga() {
  yield all([takeLatest(getList.type, handleGetList)]);
}
