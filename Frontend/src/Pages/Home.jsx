import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../Store/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { blogsSelector } from "../Store/Selectors";
import { addBlog } from "../Store/BlogSlice";
import { Blog } from "../Components";
import { setError } from "../Store/BlogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, error } = blogsSelector();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(backendURL + "/api/blog/getall");
      if (response.data.success) {
        toast.success("Blogs fetched successfully!");
        dispatch(addBlog(response.data.blogs));
      } else {
        toast.error("Failed to fetch blogs.");
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(setError(error.response.data.message));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, []);
  return (
    <div className="top-10 gap-8 flex flex-col items-center justify-center p-4">
      {blogs.map((itm) => (
        <Blog
          blog={itm}
          key={itm.blogId}
        />
      ))}
      {error && (
        <div className="flex justify-center items-center text-red-500 text-lg font-bold mt-4">
          {error}
        </div>
      )}
    </div>
  );
};
export default Home;
