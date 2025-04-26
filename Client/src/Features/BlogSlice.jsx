import { createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../Store/Constants";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    filteredBlogs: [],
    isLoading: false,
    errorMessage: null,
    apiStatus: API_STATUS.INIT,
    modalOpen: false,
  },
  reducers: {
    setBlogs: (state, { payload }) => {
      state.blogs = payload;
    },
    addBLog: (state, { payload }) => {
      state.blogs = [...state.blogs, payload];
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setApiStatus: (state, { payload }) => {
      state.apiStatus = payload;
    },
    setFilteredBlogs: (state, { payload }) => {
      state.filteredBlogs = payload;
    },
    setModalOpen: (state, { payload }) => {
      state.modalOpen = payload;
    },
  },
});

export const {
  setBlogs,
  setLoading,
  setError,
  setApiStatus,
  setFilteredBlogs,
  setModalOpen,
  addBLog,
} = blogSlice.actions;

export default blogSlice.reducer;
