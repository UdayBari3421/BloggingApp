import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./States/Store.js";
import { BlogProvider } from "./Context/blogContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <BlogProvider>
        <App />
      </BlogProvider>
    </BrowserRouter>
  </Provider>
);
