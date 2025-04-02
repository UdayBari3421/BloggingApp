import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../States/UserSlice";
// import {} from "../States/BlogSlice";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const state_user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && state_user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(state_user));
    }
  }, [token, state_user]);

  const setUserFunction = (user) => {
    dispatch(setUser(user));
  };

  const setTokenFunction = (token) => {
    dispatch(setToken(token));
  };

  const value = {
    token,
    navigate,
    state_user,
    backendUrl,
    setTokenFunction,
    setUserFunction,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
