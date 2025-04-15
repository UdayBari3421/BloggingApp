import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // Format the date to a readable string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {blog.genre.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{truncateContent(blog.content)}</p>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-gray-500">{blog.authorName}</span>
          </div>

          <div className="text-gray-500">{blog.timestamp && formatDate(blog.timestamp)}</div>
        </div>

        <Link
          to={`/blog/${blog.blogId}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
