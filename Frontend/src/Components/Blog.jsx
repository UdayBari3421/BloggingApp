import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { useContext, useState } from "react";
import { BlogContext } from "../Context/blogContext";
import { IoSend } from "react-icons/io5";

export const Blog = ({ blog }) => {
  const { comments, fetchCommentsFunction, createCommentFunction } = useContext(BlogContext);
  const [inputValue, setInputValue] = useState("");
  const [inputValueVisible, setInputValueVisible] = useState(false);

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

  const handleCommentClick = async () => {
    fetchCommentsFunction(blog.blogId);
    setInputValueVisible((prev) => !prev);
  };

  const handleEnterClick = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      await createCommentFunction(inputValue, blog.blogId);
      setInputValue("");
    }
    if (e.key === "Escape") {
      setInputValue("");
      setInputValueVisible(false);
    }
  };

  const handleBtnClick = async () => {
    if (inputValue.trim()) {
      await createCommentFunction(inputValue, blog.blogId);
      setInputValue("");
    } else {
      alert("Please enter a comment");
    }
  };

  return (
    <div>
      <div key={blog.blogId} id={blog.blogId} className="p-4 my-4 rounded-md w-fit bg-white shadow-md">
        <span className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <p className="text-gray-600 my-2">{getTimeAgo(blog.timestamp)}</p>
        </span>
        <p className="text-gray-600 my-2">{blog.content}</p>
        <p className="text-gray-600 my-2">Genre: {blog.genre}</p>
        <p className="text-gray-600 my-2">Author: {blog.authorName}</p>
        <div className="flex gap-4 my-8 justify-evenly">
          <button className="cursor-pointer ">
            <FaPencilAlt />
          </button>
          <button className="cursor-pointer ">
            <RiDeleteBin6Line />
          </button>
          <button onClick={handleCommentClick} className="cursor-pointer ">
            <FaRegComment />
          </button>
          <button className="cursor-pointer ">
            <BiSolidLike />
          </button>
        </div>
        {inputValueVisible && (
          <label htmlFor="commentInput" className="overflow-clip my-4 mb-6 rounded-xl flex justify-between items-center border gap-1 w-full">
            <input
              type="text"
              id="commentInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a comment"
              className="outline-none p-2 rounded grow"
              onKeyDown={handleEnterClick}
            />
            <button type="button" className="p-2 rounded-full bg-blue-500 text-white" onClick={handleBtnClick}>
              <IoSend />
            </button>
          </label>
        )}
        {comments.length > 0 && (
          <div className="border border-gray-400 p-3 rounded-2xl">
            {comments?.map((comment) => (
              <div key={comment._id}>
                <div className="border bg-white border-gray-300 p-2 my-2 rounded-md flex justify-between items-center">
                  <p className="text-xl">{comment.comment}</p>
                  <p className="text-gray-600">{getTimeAgo(comment.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
