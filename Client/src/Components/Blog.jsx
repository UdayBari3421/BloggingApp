import React, { useEffect } from "react";
import { backendUrl, getTimeAgo } from "../Store/Constants";
import { useDispatch, useSelector } from "react-redux";
import { commentSelector } from "../Store/Selectors";
import {
  setComments,
  setCurrentBlogId,
  setError,
  setLoading,
  setModalOpen,
} from "../Features/CommentSlice";
import axios from "axios";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const { commentsByBlogId, isLoading } = useSelector(commentSelector);

  const fetchComments = async (blogId) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(backendUrl + "/api/comment/getall", {
        params: { parentId: blogId.toString() },
      });

      if (response.data.success) {
        // Store comments in Redux state
        dispatch(
          setComments({
            parentId: blogId,
            comments: response.data.comments || [],
          })
        );
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (blog) {
      fetchComments(blog.blogId);
    }
  }, [blog]);

  return (
    <div
      className={`${blog.sentiment.toLowerCase()} min-w-full mx-auto md:w-11/12 lg:min-w-10/12 shadow-2xl px-6 md:px-12 py-8 border border-gray-200 rounded-lg `}>
      <div className="flex justify-between md:items-center mb-4">
        <span className="md:flex-nowrap flex-wrap flex gap-2 md:items-end">
          <h1 className="text-md sm:text-xl font-semibold">
            {"@" + blog.authorName.split(" ").join("_")}
          </h1>
          <p className="text-xs py-1 text-blue-500">{getTimeAgo(blog.timestamp)}</p>
        </span>
        <p className="align-baseline hover:bg-gray-700 hover:ring-amber-600 hover:ring-2 hover:text-white py-1 px-3 text-xs rounded-full border border-gray-300 bg-gray-100 font-semibold text-gray-600">
          {blog.genre.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold ">{blog.title}</h1>
        <p className="text-sm text-gray-700 ">{blog.content}</p>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => {
            dispatch(setCurrentBlogId(blog.blogId));
            dispatch(setModalOpen(true));
          }}
          className="text-sm text-gray-500 mt-4 border px-3 rounded-2xl hover:bg-gray-200 py-1 font-semibold flex items-center gap-2">
          Comments: {commentsByBlogId[blog.blogId]?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default Blog;
