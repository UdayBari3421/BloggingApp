import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),
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
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUser, setToken, setIsLoggedIn, setLoading, setStatus } = userReducer.actions;
export default userReducer.reducer;
