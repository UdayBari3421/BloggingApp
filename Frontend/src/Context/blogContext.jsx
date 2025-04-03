import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../States/UserSlice";
import { setBlogs, setBlogError, deleteBlog, setComments } from "../States/BlogSlice";
import axios from "axios";
import { toast } from "react-toastify";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const state_user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const blogs = useSelector((state) => state.blog.blogs);
  const comments = useSelector((state) => state.blog.comments);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/blog/getall");
      if (response.data.success) {
        setBlogsFunction(response.data.blogs);
      } else {
        setBlogErrorFunction(response.data.message);
      }
    } catch (error) {
      dispatch(setBlogError("An error occurred"));
    }
  };

  const fetchCommentsFunction = async (parentId) => {
    try {
      const response = await axios.get(backendUrl + "/api/comment/getall", { params: { parentId } });
      if (response.data.success) {
        setCommentsFunction(response.data.data);
      } else {
        setBlogErrorFunction(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching comments:", error.response.data.message);
    }
  };

  const createCommentFunction = async (comment, parentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/comment/create",
        {
          comment,
          parentId,
          userId: state_user._id,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchCommentsFunction(parentId);
      } else {
        toast.error("Error creating comment:", response.data.message);
      }
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const setBlogsFunction = (blogs) => {
    dispatch(setBlogs(blogs));
  };

  const setBlogErrorFunction = (error) => {
    dispatch(setBlogError(error));
  };

  const deleteBlogFunction = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const setCommentsFunction = (comments) => {
    dispatch(setComments(comments));
  };

  const value = {
    token,
    blogs,
    comments,
    createCommentFunction,
    navigate,
    state_user,
    backendUrl,
    setTokenFunction,
    setUserFunction,
    setBlogsFunction,
    setBlogErrorFunction,
    deleteBlogFunction,
    fetchCommentsFunction,
    setCommentsFunction,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
