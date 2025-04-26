import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
