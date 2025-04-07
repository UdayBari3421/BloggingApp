import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
    success: false,
    message: "",
  },

  reducers: {
    comment: (state, actions) => {},
  },
});

export const { comment } = commentSlice.actions;
export default commentSlice.reducer;
