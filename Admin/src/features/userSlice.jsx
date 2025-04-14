import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    token: localStorage.getItem("token") || null,
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.token = payload.token;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser, setLoading, setError, setToken } = userSlice.actions;
export default userSlice.reducer;
