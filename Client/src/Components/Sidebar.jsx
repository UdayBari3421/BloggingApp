import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector } from "../Store/Selectors";
import { setModalOpen } from "../Features/BlogSlice";

const Sidebar = ({ setVisible, handleLogout, visible }) => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector(blogSelector);

  const handleCreateBlog = () => {
    setVisible((prev) => !prev);
    dispatch(setModalOpen(true));
  };

  return (
    <div
      className={` shadow-2xl flex absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
        visible ? "w-full" : "w-0"
      } h-screen bg-white shadow-lg p-5 flex-col gap-5`}>
      <span className="flex text-2xl justify-between items-center">
        <h2 className="font-bold">BlogApp</h2>
        <IoIosCloseCircle onClick={() => setVisible((prev) => !prev)} />
      </span>
      <hr />
      <div className="flex flex-col gap-4">
        <Button
          onClickHandler={() => {
            handleLogout();
            setVisible((prev) => !prev);
          }}
          styles={"px-8 py-1.5 cursor-pointer text-start"}
          text="Logout"
        />
        <hr className="border-b border-gray-300 text-white" />

        <Button
          onClickHandler={handleCreateBlog}
          styles={"px-8 py-1.5 cursor-pointer text-start"}
          text="Create Blog"
        />
        <hr className="border-b border-gray-300 text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
