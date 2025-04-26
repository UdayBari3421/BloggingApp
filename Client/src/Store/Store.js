import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import genreReducer from "../Features/GenreSlice";
import blogReducer from "../Features/BlogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genreReducer,
    blogs: blogReducer,
  },
});

export default store;
