import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByBlogId: {},
    paginationByBlogId: {},
    isLoading: false,
    error: null,
    modalOpen: false,
    currentBlogId: null,
    totalComments: {},
  },

  reducers: {
    setModalOpen: (state, { payload }) => {
      state.modalOpen = payload;
    },
    setComments: (state, { payload }) => {
      const { parentId, comments } = payload;
      state.commentsByBlogId[parentId] = comments;
    },
    setPagination: (state, { payload }) => {
      const { parentId, pagination } = payload;
      state.paginationByBlogId[parentId] = pagination;
    },
    addComment: (state, { payload }) => {
      const { parentId } = payload;
      if (!state.commentsByBlogId[parentId]) {
        state.commentsByBlogId[parentId] = [];
      }
      const exists = state.commentsByBlogId[parentId].some(
        (comment) => comment.commentId === payload.commentId
      );
      if (!exists) {
        state.commentsByBlogId[parentId].push(payload);
      }

      if (state.paginationByBlogId[parentId]) {
        state.paginationByBlogId[parentId].total += 1;
        state.paginationByBlogId[parentId].totalPages = Math.ceil(
          state.paginationByBlogId[parentId].total / state.paginationByBlogId[parentId].limit
        );
      }
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearComments: (state, { payload }) => {
      const parentId = payload;
      if (parentId) {
        state.commentsByBlogId[parentId] = [];
      } else {
        state.commentsByBlogId = {};
      }
    },
    setCurrentBlogId: (state, { payload }) => {
      state.currentBlogId = payload;
    },
    setTotalComments: (state, { payload }) => {
      const { parentId, total } = payload;
      state.totalComments[parentId] = total;
    },
  },
});

export const {
  addComment,
  setComments,
  setLoading,
  setError,
  clearComments,
  setPagination,
  setModalOpen,
  setCurrentBlogId,
  setTotalComments,
} = commentSlice.actions;
export default commentSlice.reducer;
