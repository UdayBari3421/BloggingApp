import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../Context/blogContext";
import { toast } from "react-toastify";

const Signup = () => {
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const { backendUrl, setTokenFunction, navigate, token, setUserFunction } = useContext(BlogContext);

  const validateFormData = (data) => {
    let regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!data.email || !regexEmail.test(data.email)) {
      setErrors("Please enter a valid email address");
      return;
    } else if (!data.password || data.password.length < 6) {
      setErrors("Password should be atleast 6 characters long");
      return;
    } else if (!data.name || data.name.length < 3) {
      setErrors("Name should be atleast 3 characters long");
      return;
    } else if (!data.gender) {
      setErrors("Gender is required");
      return;
    } else {
      setErrors();
      return true;
    }
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();

    try {
      if (validateFormData(formData)) {
        const response = await axios.post(backendUrl + "/api/user/register", formData);
        if (response.data.success) {
          console.log(response.data);
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setTokenFunction(response.data.token);
          setUserFunction(response.data.user);
          setErrors("");
          navigate("/");
        } else {
          setErrors(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
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
    <div className="w-full h-[100vh] absolute -z-50 top-0 flex justify-center items-center">
      <form onSubmit={handleOnRegister} className="outline outline-[#cbcbcb] rounded-xl shadow-2xl px-8 py-8 w-4/12">
        <h1 className="p-4 text-3xl text-center font-bold rounded-xl">Signup</h1>
        {errors && <div className="text-center mb-4 text-red-500 p-2 rounded">{errors}</div>}
        <hr className="w-full mb-8 border-t-0 text-white border-b border-gray-400" />

        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="outline rounded mb-4 p-2 w-full" placeholder="Name" />

        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="outline rounded mb-4 p-2 w-full" placeholder="Email" />

        <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="outline rounded my-2 p-2 w-full" placeholder="Password" />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4 justify-center">
            <span className="hover:cursor-pointer flex items-center gap-1 p-1 justify-center">
              <input className="hover:cursor-pointer" onChange={() => setFormData({ ...formData, gender: "MALE" })} type="radio" name="gender" id="MALE" />
              <label className="hover:cursor-pointer" htmlFor="MALE">
                Male
              </label>
            </span>
            <span className="hover:cursor-pointer flex items-center gap-1 p-1 justify-center">
              <input className="hover:cursor-pointer" onChange={() => setFormData({ ...formData, gender: "FEMALE" })} type="radio" name="gender" id="FEMALE" />
              <label className="hover:cursor-pointer" htmlFor="FEMALE">
                Female
              </label>
            </span>
            <span className="hover:cursor-pointer flex items-center gap-1 p-1 justify-center">
              <input className="hover:cursor-pointer" onChange={() => setFormData({ ...formData, gender: "OTHER" })} type="radio" name="gender" id="OTHER" />
              <label className="hover:cursor-pointer" htmlFor="OTHER">
                Other
              </label>
            </span>
          </div>
        </div>
        <button className="cursor-pointer bg-black text-white p-3 w-full mt-4 rounded">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
