import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByBlogId: {},
    paginationByBlogId: {},
    loading: false,
    error: null,
  },

  reducers: {
    setComments: (state, action) => {
      const { parentId, comments } = action.payload;
      state.commentsByBlogId[parentId] = comments;
    },
    setPagination: (state, action) => {
      const { parentId, pagination } = action.payload;
      state.paginationByBlogId[parentId] = pagination;
    },
    addComment: (state, action) => {
      const { parentId } = action.payload;
      if (!state.commentsByBlogId[parentId]) {
        state.commentsByBlogId[parentId] = [];
      }
      const exists = state.commentsByBlogId[parentId].some(
        (comment) => comment.commentId === action.payload.commentId
      );
      if (!exists) {
        state.commentsByBlogId[parentId].push(action.payload);
      }

      if (state.paginationByBlogId[parentId]) {
        state.paginationByBlogId[parentId].total += 1;
        state.paginationByBlogId[parentId].totalPages = Math.ceil(
          state.paginationByBlogId[parentId].total / state.paginationByBlogId[parentId].limit
        );
      }
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setError: (state, actions) => {
      state.error = actions.payload;
    },
    clearComments: (state, action) => {
      const parentId = action.payload;
      if (parentId) {
        state.commentsByBlogId[parentId] = [];
      } else {
        state.commentsByBlogId = {};
      }
    },
  },
});

export const { addComment, setComments, setLoading, setError, clearComments, setPagination } =
  commentSlice.actions;
export default commentSlice.reducer;
