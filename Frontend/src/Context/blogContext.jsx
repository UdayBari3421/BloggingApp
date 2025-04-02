import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../States/UserSlice";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const state_user = useSelector((state) => state.user);
  const { token } = state_user;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const setUserFunction = (user) => {
    dispatch(setUser(user));
  };

  const value = {
    token,
    setToken,
    navigate,
    state_user,
    backendUrl,
    setUserFunction,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
