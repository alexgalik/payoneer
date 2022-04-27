import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
