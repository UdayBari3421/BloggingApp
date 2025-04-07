import React from "react";

// authorName: "Uday Bari";
// blogId: "67f372a828660a51e5460e5b";
// content: "JHSDG G GHGHG HH GSD ";
// genre: "POLITICS";
// timestamp: "2025-04-07T06:37:28.613Z";
// title: "DUMMMMM MM MM M";

const Blog = ({ blog }) => {
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} s ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} d ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} m ago`;

    return `${Math.floor(diffInMonths / 12)} yr ago`;
  };

  return (
    <div className="w-8/12 shadow-2xl px-12 py-8 border border-gray-200 rounded-lg bg-white">
      <h1 className="text-2xl pb-3 font-bold text-center">{blog.title}</h1>
      <hr className="border-gray-100 mb-6 border-b" />
      <p className="text-lg">{blog.content}</p>
      <div className="flex justify-between mt-4">
        <span className="text-sm text-gray-500">{blog.genre}</span>
        <span className="text-sm text-gray-500">{getTimeAgo(blog.timestamp)}</span>
      </div>
    </div>
  );
};

export default Blog;
