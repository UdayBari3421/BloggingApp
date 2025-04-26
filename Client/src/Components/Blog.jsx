import React, { useState } from "react";
import { getTimeAgo } from "../Store/Constants";

const Blog = ({ blog }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="min-w-full mx-auto md:w-11/12 lg:min-w-10/12 shadow-2xl px-6 md:px-12 py-8 border border-gray-200 rounded-lg bg-white">
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
        {/* <button
          onClick={() => setModalVisible(true)}
          className="text-sm text-gray-500 mt-4 border px-3 rounded-2xl hover:bg-gray-200 py-1 font-semibold flex items-center gap-2">
          Comments: {totalComments || 0}
        </button>
        {modalVisible && (
          <CommentsModal
            closeModal={() => setModalVisible(false)}
            parentId={blog.blogId}
          />
        )} */}
      </div>
    </div>
  );
};

export default Blog;
