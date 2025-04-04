import axios from "axios";
import Logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../Context/blogContext";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../States/UserSlice";

const Navbar = () => {
  const { token, backendUrl, setTokenFunction, setUserFunction } = useContext(BlogContext);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenFunction(null);
    setUserFunction(null);
    dispatch(setIsLoggedIn(false));

    try {
      const res = await axios.delete(backendUrl + "/api/user/logout");
      if (res.data.success || res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <nav className="border-b-2 border-gray-200 flex justify-between items-center py-4 px-8">
      <div className="flex items-center justify-center gap-2 text-xl font-bold">
        <img src={Logo} className="w-[50px] h-[50px]" />
        <h1 className="boldonse">BlogApp</h1>
      </div>
      {token ? (
        <div className="flex gap-4">
          <button onClick={handleLogout} className="cursor-pointer bg-black text-white transition duration-150 hover:bg-white hover:outline-2 hover:text-black px-8 py-2 rounded-full">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <NavLink to="/login" className="bg-black text-white transition duration-150 hover:bg-white hover:outline-2 hover:text-black px-8 py-2 rounded-full">
            Login
          </NavLink>
          <NavLink to="/signup" className="text-black outline outline-black transition duration-150 hover:bg-black hover:text-white px-8 py-2 rounded-full">
            Signup
          </NavLink>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
