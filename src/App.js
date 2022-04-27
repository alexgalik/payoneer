import { Navigate, Route, Routes } from "react-router-dom";

import Checkout from "./pages/Checkout/Checkout";
import List from "./pages/List/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/list" />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="list" element={<List />} />
    </Routes>
  );
}

export default App;
