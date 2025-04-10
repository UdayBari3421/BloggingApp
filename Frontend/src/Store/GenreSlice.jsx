import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    error: null,
    loading: false,
  },

  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGenres, setLoading, setError } = genreSlice.actions;
export default genreSlice.reducer;
