import React from "react";
import { Button } from "../Components";
import { blogsSelector, userSelector } from "../Store/Selectors";
import { useDispatch } from "react-redux";
import axios from "axios";
import { backendURL, genreOptions } from "../Store/constants";
import { pushBlog, setError } from "../Store/BlogSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = blogsSelector();
  const { token } = userSelector();

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      if (!data.title) {
        setError("Title is required");
        return;
      } else if (!data.content) {
        setError("Content is required");
        return;
      } else if (!data.genre) {
        setError("Genre is required");
        return;
      }

      const response = await axios.post(backendURL + "/api/blog/create", data, {
        headers: { token },
      });

      if (response.data.success) {
        dispatch(pushBlog(response.data.blog));
        e.target.reset();
        toast.success("Blog created successfully");
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
      navigate("/login");
    }
  };

  return (
    <div className="max-h-[90vh] h-[90vh] overflow-y-auto flex flex-col items-center justify-center p-4">
      <div className="min-w-[350px] w-6/12 shadow-2xl px-12 py-8 border border-gray-200 rounded-lg bg-white">
        <h1 className="text-2xl pb-3 font-bold text-center">Create New Blog</h1>
        {error && (
          <div className="flex justify-center items-center text-red-500 text-lg font-bold mt-4">
            {error}
          </div>
        )}
        <hr className="border-gray-100 mb-6 border-b" />
        <form
          onSubmit={handleCreateBlog}
          className="flex flex-col items-center mt-4 w-full">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <textarea
            placeholder="Content"
            name="content"
            className="border max-h-[100px] border-gray-300 rounded p-2 mb-4 w-full h-32"></textarea>
          <select
            name="genre"
            className="border border-gray-300 rounded p-2 mb-4 w-full">
            <option value="All">All</option>
            {genreOptions.map((genre, index) => (
              <option
                value={genre.id}
                key={index}>
                {genre.title.toUpperCase()}
              </option>
            ))}
          </select>
          <Button
            disabled={isLoading}
            type="submit"
            styles={
              "w-full min-fit disabled:cursor-not-allowed disabled:hover:text-white disabled:bg-gray-400 bg-black text-white px-8 py-1.5 rounded hover:outline hover:bg-white hover:text-black"
            }
            text={`${isLoading ? "Loading..." : "Create Blog"} `}>
            {isLoading ? (
              <div className="flex font-bold items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-[10px] p-2 aspect-square w-[10px] border-4 border-l-blue-500 border-gray-600"></span>
                Loading...
              </div>
            ) : (
              "Create Blog"
            )}
          </Button>
          <Link
            to="/"
            className="text-blue-500 text-sm mt-4">
            Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
