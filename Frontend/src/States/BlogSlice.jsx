import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: "",
    comments: [],
  },

  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setBlogLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlogError: (state, action) => {
      state.error = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { setBlogs, setBlogLoading, setBlogError, deleteBlog, setComments } = blogSlice.actions;
export default blogSlice.reducer;
