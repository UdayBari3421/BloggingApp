import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    status: "Hero",
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUser, setToken, setIsAuthenticated, setLoading, setStatus } = userReducer.actions;
export default userReducer.reducer;
