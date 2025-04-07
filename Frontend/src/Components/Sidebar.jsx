import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Sidebar = ({ setVisible, handleLogout, visible }) => {
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

        <NavLink
          to="/createblog"
          onClick={() => setVisible((prev) => !prev)}>
          <Button
            styles={"px-8 py-1.5 cursor-pointer text-start"}
            text="Create Blog"
          />
        </NavLink>
        <hr className="border-b border-gray-300 text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
