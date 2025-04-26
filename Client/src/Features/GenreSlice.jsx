import { createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../Store/Constants";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    isLoading: false,
    errorMessage: null,
    apiStatus: API_STATUS.INIT,
    activeGenrePage: null,
  },

  reducers: {
    setGenres: (state, { payload }) => {
      state.genres = payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setApiStatus: (state, { payload }) => {
      state.apiStatus = payload;
    },
    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setActiveGenrePage: (state, { payload }) => {
      state.activeGenrePage = payload;
    },
  },
});

export const { setGenres, setLoading, setApiStatus, setError, setActiveGenrePage } =
  genreSlice.actions;
export default genreSlice.reducer;
