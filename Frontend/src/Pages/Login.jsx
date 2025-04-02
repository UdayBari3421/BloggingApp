import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BlogContext } from "../Context/blogContext";
import { setUser } from "../States/UserSlice";

const Login = () => {
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { backendUrl, setToken, navigate, token } = useContext(BlogContext);

  const validateFormData = (data) => {
    if (!data.email) {
      if (!errors.includes("Email is required")) {
        setErrors("Email is required");
      }
      return;
    } else if (!data.password || data.password.length < 6) {
      if (!errors.includes("Password should be atleast 6 characters long")) {
        setErrors("Password should be atleast 6 characters long");
      }
      return;
    }

    setErrors([]);
    return true;
  };

  const handleLoginForm = async (e) => {
    try {
      e.preventDefault();
      if (validateFormData(formData)) {
        const response = await axios.post(backendUrl + "/api/user/login", formData);
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);
          setToken(response.data.token);
          setUser(response.data.user);
          toast.success("Logged in successfully");
        }
      } else {
        toast.error("Form validation failed");
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="w-full h-[100vh] absolute -z-50 top-0 flex justify-center items-center flex-col">
      <form onSubmit={handleLoginForm} className="outline outline-[#cbcbcb] rounded-xl shadow-2xl px-8 py-8 w-4/12">
        <h1 className="p-4 text-3xl text-center font-bold rounded-xl">Login</h1>
        {errors && <div className="text-center mb-4 text-red-500 p-2 rounded">{errors}</div>}
        <hr className="w-full mb-8 border-t-0 text-white border-b border-gray-400" />
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="outline rounded mb-4 p-2 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="outline rounded my-2 p-2 w-full"
          placeholder="Password"
        />

        <button type="submit" className="cursor-pointer bg-black text-white p-3 w-full mt-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
