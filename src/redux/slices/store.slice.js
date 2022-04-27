import { createSlice } from "@reduxjs/toolkit";
import luhnCheck from "../../server/client_utils/esmodules/luhn_check";

const initialState = {
  cardNumber: "",
  checkout: {},
  error: "",
  isValid: false,
  list: [],
  listError: false,
  loading: false,
  loadingSubmit: false,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    getList: (state) => {
      state.loading = true;
      state.listError = false;
    },
    setList: (state, action) => {
      const list = action.payload;
      state.loading = false;
      state.list = list;
      list.forEach(({ sku }) => {
        state.checkout[sku] = 0;
      });
    },
    setListError: (state) => {
      state.loading = false;
      state.listError = true;
    },
    addToBusket: (state, action) => {
      state.checkout[action.payload] += 1;
    },
    removeFromBusket: (state, action) => {
      state.checkout[action.payload] -= 1;
    },
    removeAll: (state, action) => {
      state.checkout[action.payload] = 0;
    },
    changeCardNumber: (state, action) => {
      state.cardNumber = action.payload;
      state.error = "";
      state.isValid = luhnCheck(action.payload);
    },
    handleSubmit: (state) => {
      state.loadingSubmit = true;
    },
    setSuccess: (state) => {
      state.loadingSubmit = false;
    },
    setError: (state, action) => {
      state.isValid = false;
      state.loadingSubmit = false;
      state.error = action.payload;
    },
    setQuatity: (state, action) => {
      const { key, value } = action.payload;
      state.checkout[key] = Number(value);
    },
    addNewItemToList: (state, action) => {
      state.list = [...state.list, action.payload];
      state.checkout = { ...state.checkout, [action.payload.sku]: 0 };
    },
  },
});

export const {
  addToBusket,
  addNewItemToList,
  changeCardNumber,
  getList,
  handleSubmit,
  removeAll,
  removeFromBusket,
  setError,
  setList,
  setListError,
  setQuatity,
  setSuccess,
} = storeSlice.actions;

export default storeSlice.reducer;
