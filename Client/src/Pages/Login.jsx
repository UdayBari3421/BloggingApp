import React, { useState } from "react";
import { Button } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../Store/Selectors";
import axios from "axios";
import { API_STATUS, backendUrl } from "../Store/Constants";
import { setLoading, setApiStatus, setUser, setError } from "../Features/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isLoading, errorMessage } = useSelector(userSelector);

  async function handleLogin(e) {
    dispatch(setLoading(true));
    dispatch(setApiStatus(API_STATUS.PENDING));
    try {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        dispatch(setApiStatus(API_STATUS.ERROR));
        dispatch(setError("Please fill in all fields."));
        return;
      }
      const response = await axios.post(backendUrl + "/api/user/login", formData);

      if (response.status >= 200 && response.status < 300) {
        dispatch(setUser({ user: response.data.user, token: response.data.token }));
        dispatch(setApiStatus(API_STATUS.SUCCESS));

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
      } else {
        dispatch(setApiStatus(API_STATUS.ERROR));
        dispatch(setError(response.data.message));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(setApiStatus(API_STATUS.ERROR));
        dispatch(setError(error.response.data.message));
      } else {
        dispatch(setError("Something went wrong!"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="m-auto min-h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="min-w-[350px] border-gray-300 shadow-2xl p-8 border rounded-2xl flex flex-col justify-between gap-4 w-4/12">
        <h1 className="text-3xl pb-2 font-bold text-center">Login</h1>
        <hr className="border-gray-300 mb-4 border-b" />
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
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
