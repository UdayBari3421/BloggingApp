import { createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../Store/Constants";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [null],
    token: null,
    isAuthenticated: false,
    isLoading: false,
    errorMessage: null,
    apiStatus: API_STATUS.INIT,
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = payload.isAuthenticated ? payload.isAuthenticated : true;
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
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.errorMessage = null;
      state.token = null;
    },
  },
});

export const { setUser, setLoading, setApiStatus, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
