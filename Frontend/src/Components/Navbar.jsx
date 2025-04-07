import { NavLink, useNavigate } from "react-router-dom";
import { Button, Sidebar } from "./index.js";
import Logo from "../assets/LOGO.png";
import { userSelector } from "../Store/Selectors.js";
import axios from "axios";
import { backendURL } from "../Store/constants.js";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const user = userSelector();
  const { isAuthenticated, token } = user;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = axios.delete(backendURL + "/api/user/logout", { token });
      if (response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white flex justify-between items-center p-4 border-b-2 border-gray-200">
      <NavLink to="/">
        <div className="flex gap-2 items-center">
          <img
            className="w-[50px]"
            src={Logo}
          />
          <h1 className="boldonse text-xl font-bold">BlogApp</h1>
        </div>
      </NavLink>
      {!isAuthenticated ? (
        <div className="flex gap-4">
          <NavLink to="/login">
            <Button
              styles={
                "bg-black text-white px-8 py-1.5 rounded-full hover:outline hover:bg-white hover:text-black"
              }
              text="Login"
            />
          </NavLink>
          <NavLink to="/signup">
            <Button
              styles={
                "bg-black text-white px-8 py-1.5 rounded-full hover:outline hover:bg-white hover:text-black"
              }
              text="Signup"
            />
          </NavLink>
        </div>
      ) : (
        <>
          <div className="md:flex gap-4 hidden">
            <Button
              onClickHandler={handleLogout}
              styles={
                "bg-black text-white px-8 py-1.5 rounded-full hover:outline hover:bg-white hover:text-black"
              }
              text="Logout"
            />

            <NavLink to="/createblog">
              <Button
                styles={
                  "bg-black text-white px-8 py-1.5 rounded-full hover:outline hover:bg-white hover:text-black"
                }
                text="Create Blog"
              />
            </NavLink>
          </div>

          <div className="md:hidden flex gap-4">
            <Button className="text-3xl">
              <HiMenu
                className="text-3xl"
                onClick={() => setVisible((prev) => !prev)}
              />
            </Button>

            {visible && (
              <Sidebar
                visible={visible}
                setVisible={setVisible}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </>
      )}
    </nav>
  );
};
export default Navbar;
