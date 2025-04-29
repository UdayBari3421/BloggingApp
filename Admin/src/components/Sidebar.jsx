import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/userSlice";
import axios from "axios";
import { backendUrl } from "../store/constants";
import { userSelector } from "../store/selectors";
import { MdMenu } from "react-icons/md";
import { Modal } from "antd";

const Sidebar = () => {
  const { token, user, isLoading } = useSelector(userSelector);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/logout",
        { userId: user._id },
        { headers: { token } }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[300px] h-screen md:flex hidden">
        <div className="flex flex-col w-full bg-gray-800 text-white p-4">
          <span className="flex gap-2 items-center ">
            <img
              src={Logo}
              alt="Logo"
              className="w-8 h-8 rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          </span>
          <ul className="space-y-2 flex flex-col">
            <Link
              to={"/"}
              className="hover:bg-gray-700 p-2 rounded">
              Dashboard
            </Link>
            <Link
              to={"/add-genre"}
              className="hover:bg-gray-700 p-2 rounded">
              Add Genre
            </Link>
            <Link
              to={"/get-users"}
              className="hover:bg-gray-700 p-2 rounded">
              Users
            </Link>
            <Button
              onClickHandler={handleLogout}
              disabled={isLoading}
              to={"/"}
              styles="hover:bg-gray-700 p-2 rounded text-start">
              Logout
            </Button>
          </ul>
        </div>
      </div>
      <div className="md:hidden flex p-4 ">
        <MdMenu
          className="text-2xl"
          onClick={() => setModalVisible(true)}
        />
        <Modal
          footer={null}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}></Modal>
      </div>
    </>
  );
};

export default Sidebar;
