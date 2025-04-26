import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector, genreSelector, userSelector } from "../Store/Selectors";
import { addBLog, setBlogs, setModalOpen } from "../Features/BlogSlice";
import Button from "./Button";
import axios from "axios";
import { backendUrl } from "../Store/Constants";
import { toast } from "react-toastify";

const CreateBlogModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, isLoading } = useSelector(blogSelector);
  const { token } = useSelector(userSelector);
  const { genres: genreOptions } = useSelector(genreSelector);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    dispatch(setModalOpen(true));
    try {
      const formData = new FormData(e.target);
      const newformData = Object.fromEntries(formData.entries());

      if (!newformData.title) {
        toast.error("Please enter a title");
        return;
      } else if (!newformData.content) {
        toast.error("Please enter content");
        return;
      } else if (!newformData.genre) {
        return;
      }

      const { data } = await axios.post(backendUrl + "/api/blog/create", newformData, {
        headers: { token },
      });

      console.log(data);
      if (data.success) {
        dispatch(addBLog(data.blog));
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      dispatch(setModalOpen(false));
    }
  };

  return (
    <Modal
      open={modalOpen}
      footer={null}
      onCancel={() => dispatch(setModalOpen(false))}>
      <h1 className="text-2xl pb-3 font-bold text-center">Create New Blog</h1>

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
          {genreOptions?.map((genre, index) => (
            <option
              value={genre.genre}
              key={index}>
              {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
            </option>
          ))}
        </select>
        <Button
          disabled={isLoading}
          type="submit"
          styles="w-full font-bold text-lg min-fit disabled:cursor-not-allowed disabled:hover:text-white disabled:bg-gray-400 bg-black text-white px-8 py-1.5 rounded hover:outline hover:bg-white hover:text-black"
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
      </form>
    </Modal>
  );
};

export default CreateBlogModal;
