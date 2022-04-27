import { all, call, put, select, takeLatest } from "@redux-saga/core/effects";
import { handleSubmit, setError, setSuccess } from "../slices/store.slice";

import { checkout as checkoutCall } from "../../server/client_utils/esmodules/basket_server_api";
import { toast } from "react-toastify";

export function* sendCheckout() {
  const { checkout, cardNumber } = yield select((state) => state.store);
  try {
    const basket = Object.entries(checkout)
      .filter(([, value]) => value)
      .map(([key, value]) => ({ sku: Number(key), quantity: Number(value) }));
    const responce = yield call(checkoutCall, { basket, cardNumber });
    if (responce.error) {
      yield put(setError(responce.error));
    } else {
      toast.success("The checkout transaction was completed successfully.");
      yield put(setSuccess());
    }
  } catch (error) {
    console.log("OOPS, something went wrong", error);
  }
}

export default function* checkoutSaga() {
  yield all([takeLatest(handleSubmit.type, sendCheckout)]);
}
