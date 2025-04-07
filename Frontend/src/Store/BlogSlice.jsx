import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    isLoading: false,
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs = action.payload;
    },
    pushBlog: (state, action) => {
      console.log(action.payload);
      state.blogs.push(action.payload);
    },
  },
});

export const { setLoading, setError, addBlog, pushBlog } = blogSlice.actions;
export default blogSlice.reducer;
