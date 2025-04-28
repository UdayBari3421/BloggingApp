import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import genreReducer from "../Features/GenreSlice";
import blogReducer from "../Features/BlogSlice";
import commentReducer from "../Features/CommentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genreReducer,
    blogs: blogReducer,
    comments: commentReducer,
  },
});

export default store;
