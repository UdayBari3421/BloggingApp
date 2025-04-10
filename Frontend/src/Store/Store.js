import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import blogReducer from "./BlogSlice";
import commentReducer from "./CommentSlice";
import genreReducer from "./GenreSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    comments: commentReducer,
    genre: genreReducer,
  },
});

export default store;
