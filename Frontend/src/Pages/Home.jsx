import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../Store/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { blogsSelector, genreSelector } from "../Store/Selectors";
import { addBlog, setError, setLoading } from "../Store/BlogSlice";
import { Blog } from "../Components";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, error, isLoading } = blogsSelector();
  const { genreId } = useParams();
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const fetchBlogs = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${backendURL}/api/blog/getall`);
      if (response.data.success) {
        dispatch(addBlog(response.data.blogs));
      } else {
        toast.error("Failed to fetch blogs.");
        dispatch(setError(response.data.message || "Failed to fetch blogs"));
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      dispatch(setError(error.response?.data?.message || "Failed to fetch blogs"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      if (!genreId || genreId.toLowerCase() === "all") {
        setFilteredBlogs(blogs);
      } else {
        const filtered = blogs.filter((blog) => blog.genre.toLowerCase() === genreId.toLowerCase());
        setFilteredBlogs(filtered);
      }
    } else {
      setFilteredBlogs([]);
    }
  }, [blogs, genreId]);

  return (
    <div>
      <div className="top-10 gap-8 flex flex-col items-center justify-center p-4">
        {filteredBlogs.length > 0 ? (
          <h1 className="text-2xl font-bold w-full text-center">
            {!genreId || genreId === "all" ? "All Blogs" : `${genreId.toUpperCase()} Blogs`}
          </h1>
        ) : (
          <></>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="animate-spin border-2 border-gray-400 border-r-blue-500 rounded-full p-3 mb-2"></span>
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-red-500 text-lg font-bold mt-4">
            {error}
          </div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Blog
              blog={blog}
              key={blog.blogId}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">No blogs found for this genre.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
