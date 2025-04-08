import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import blogReducer from "./BlogSlice";
import commentReducer from "./CommentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    comments: commentReducer,
  },
});

export default store;
