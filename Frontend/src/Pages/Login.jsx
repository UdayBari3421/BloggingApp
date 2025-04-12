import { useState } from "react";
import axios from "axios";
import { Button } from "../Components";
import { userSelector } from "../Store/Selectors";
import { backendURL } from "../Store/constants.js";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { error, isLoading } = userSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${backendURL}/api/user/login`, formData);
      if (response.data.success) {
        const userData = {
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        };
        dispatch(setUser(userData));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoginError(null);
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
      dispatch(setError(error.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="m-auto min-h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="min-w-[350px] border-gray-300 shadow-2xl p-8 border rounded-2xl flex flex-col justify-between gap-4 w-4/12">
        <h1 className="text-3xl pb-2 font-bold text-center">Login</h1>
        <hr className="border-gray-300 mb-4 border-b" />
        {(error || loginError) && <p className="text-red-500 text-center">{error || loginError}</p>}
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
        <Button
          disabled={isLoading}
          type="submit"
          styles={
            "disabled:cursor-not-allowed disabled:hover:text-white disabled:bg-gray-400 bg-black text-white px-8 py-1.5 rounded hover:outline hover:bg-white hover:text-black"
          }
          text={`${isLoading ? "Loading..." : "Login"} `}>
          {isLoading ? (
            <div className="flex font-bold items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-[10px] p-2 aspect-square w-[10px] border-4 border-l-blue-500 border-gray-600"></span>
              Loading...
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};
export default Login;
