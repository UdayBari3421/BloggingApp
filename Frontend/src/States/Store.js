import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";
import blogReducer from "./BlogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export default store;
