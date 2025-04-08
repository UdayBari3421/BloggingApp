import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { backendURL, getTimeAgo } from "../Store/constants";
import {
  setComments,
  setError,
  setLoading,
  clearComments,
  setPagination,
} from "../Store/CommentSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { commentsSelector, userSelector } from "../Store/Selectors";
import CommentPagination from "./CommentPagination";
import { IoSendSharp } from "react-icons/io5";

const CommentsModal = ({ parentId, closeModal }) => {
  const dispatch = useDispatch();
  const { comments, pagination, loading, error } = commentsSelector(parentId);
  const [value, setValue] = useState("");
  const { token } = userSelector();

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        backendURL + "/api/comment/add",
        {
          parentId,
          comment: value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(setComments({ parentId, comments: [response.data.comment] }));
        setValue("");
        fetchComments(1);
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response?.data?.message || "Failed to add comment"));
    }
  };

  const fetchComments = async (page = 1) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(backendURL + "/api/comment/getall/", {
        params: {
          parentId,
          page,
          limit: pagination?.limit || 10,
        },
      });

      if (response.status === 200 && response.data.success) {
        dispatch(clearComments(parentId));

        if (response.data.comments && Array.isArray(response.data.comments)) {
          const formattedComments = response.data.comments.map((comment) => ({
            parentId: comment.parentId,
            commentId: comment._id,
            authorName: comment.authorName,
            content: comment.comment,
            timestamp: new Date(comment.createdAt).toLocaleString(),
          }));

          dispatch(setComments({ parentId, comments: formattedComments }));

          if (response.data.pagination) {
            dispatch(
              setPagination({
                parentId,
                pagination: response.data.pagination,
              })
            );
          } else {
            dispatch(
              setPagination({
                parentId,
                pagination: {
                  page,
                  limit: 10,
                  total: formattedComments.length,
                  totalPages: Math.ceil(formattedComments.length / 10),
                },
              })
            );
          }
        } else {
          console.log("No comments found for this post");
          dispatch(
            setPagination({
              parentId,
              pagination: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
              },
            })
          );
        }
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
      dispatch(setError(error.response?.data?.message || "Failed to load comments"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePageChange = (newPage) => {
    if (!pagination || newPage < 1 || newPage > pagination.totalPages) return;
    fetchComments(newPage);
  };

  useEffect(() => {
    fetchComments(1);
  }, [parentId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000063] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-8/12 lg:w-7/12 max-h-[90vh] overflow-y-auto">
        <span className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700">
            <MdOutlineClose />
          </button>
        </span>
        <p className="font-semibold text-gray-400">
          {pagination?.total || 0} Comments for this post
        </p>
        <label
          htmlFor="addcomment"
          className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 mt-4 mb-2">
          <input
            id="addcomment"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment();
                setValue("");
              }
            }}
            className="w-full outline-none border-none"
            placeholder="Write a comment..."
          />
          <button
            className="hover:text-blue-700"
            onClick={handleAddComment}>
            <IoSendSharp />
          </button>
        </label>
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="animate-spin border-2 border-gray-400 border-r-blue-500 rounded-full p-3 mb-2"></span>
              <p className="text-gray-500">Loading comments...</p>
            </div>
          ) : (
            <>
              {comments.length > 0 ? (
                comments.map((itm) => (
                  <div key={itm.commentId}>
                    <div className="flex flex-col gap-2 border-b border-gray-200 py-4">
                      <span className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold">{itm.authorName}</h1>
                        <p className="text-xs text-gray-500">{getTimeAgo(itm.timestamp)}</p>
                      </span>
                      <p className="text-sm text-gray-700">{itm.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">
                  {error || "No comments yet. Be the first to comment!"}
                </p>
              )}
            </>
          )}

          {pagination && pagination.totalPages > 1 && (
            <CommentPagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
