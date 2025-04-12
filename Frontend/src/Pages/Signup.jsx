import { useState } from "react";
import { userSelector } from "../Store/Selectors";
import { useDispatch } from "react-redux";
import { Button } from "../Components";
import { backendURL } from "../Store/constants";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../Store/UserSlice";
import axios from "axios";

const Signup = () => {
  const { error, isLoading } = userSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendURL}/api/user/register`, formData);
      dispatch(setLoading(true));
      if (response.data.success) {
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          })
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoginError(null);
        navigate("/");
        dispatch(setLoading(false));
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="m-auto min-h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="min-w-[350px] border-gray-300 shadow-2xl p-8 border rounded-2xl flex flex-col justify-between gap-4 w-4/12">
        <h1 className="text-3xl pb-2 font-bold text-center">Signup</h1>
        <hr className="border-gray-300 mb-4 border-b" />
        {(error || loginError) && <p className="text-red-500 text-center">{error || loginError}</p>}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="border border-gray-300 p-2 rounded"
        />
        <div className="flex gap-6 mb-4">
          <label
            htmlFor="male"
            className="flex gap-2 items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: "MALE" })}
            />
            Male
          </label>
          <label
            htmlFor="female"
            className="flex gap-2 items-center">
            <input
              id="female"
              type="radio"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: "FEMALE" })}
            />
            Female
          </label>
          <label
            htmlFor="other"
            className="flex gap-2 items-center">
            <input
              id="other"
              type="radio"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: "OTHER" })}
            />
            Other
          </label>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          styles={
            "disabled:cursor-not-allowed disabled:hover:text-white disabled:bg-gray-400 bg-black text-white px-8 py-1.5 rounded hover:outline hover:bg-white hover:text-black"
          }
          text={`${isLoading ? "Loading..." : "Signup"} `}>
          {isLoading ? (
            <div className="flex font-bold items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-[10px] p-2 aspect-square w-[10px] border-4 border-l-blue-500 border-gray-600"></span>
              Loading...
            </div>
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </div>
  );
};
export default Signup;
