import React, { useState, useEffect } from "react";
import { getTimeAgo } from "../Store/constants.js";
import CommentsModal from "./CommentsModal.jsx";
import { commentsSelector } from "../Store/Selectors";
import { useDispatch } from "react-redux";
import axios from "axios";
import { backendURL } from "../Store/constants";
import { setPagination } from "../Store/CommentSlice";

const Blog = ({ blog }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [commentsFetched, setCommentsFetched] = useState(false);
  const dispatch = useDispatch();
  const { totalComments, pagination } = commentsSelector(blog.blogId);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!commentsFetched) {
        try {
          const response = await axios.get(`${backendURL}/api/comment/count`, {
            params: { parentId: blog.blogId },
          });

          if (response.data && response.data.success) {
            dispatch(
              setPagination({
                parentId: blog.blogId,
                pagination: {
                  page: 1,
                  limit: 10,
                  total: response.data.count,
                  totalPages: Math.ceil(response.data.count / 10),
                },
              })
            );
          }
          setCommentsFetched(true);
        } catch (error) {
          console.error("Error fetching comment count", error);
        }
      }
    };

    fetchCommentCount();
  }, [blog.blogId, dispatch, commentsFetched]);

  return (
    <div className="md:w-8/12 shadow-2xl px-12 py-8 border border-gray-200 rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <span className="md:flex-nowrap flex-wrap flex md:gap-2 items-end">
          <h1 className="text-xl font-semibold">{"@" + blog.authorName.split(" ").join("_")}</h1>
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
          onClick={() => setModalVisible(true)}
          className="text-sm text-gray-500 mt-4 border px-3 rounded-2xl hover:bg-gray-200 py-1 font-semibold flex items-center gap-2">
          Comments: {totalComments || 0}
        </button>
        {modalVisible && (
          <CommentsModal
            closeModal={() => setModalVisible(false)}
            parentId={blog.blogId}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
