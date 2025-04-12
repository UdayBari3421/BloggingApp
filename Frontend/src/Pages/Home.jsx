import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../Store/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { blogsSelector, genreSelector } from "../Store/Selectors";
import { addBlog } from "../Store/BlogSlice";
import { Blog, GenrePickerBar } from "../Components";
import { setError } from "../Store/BlogSlice";
import { setLoading } from "../Store/GenreSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, error } = blogsSelector();
  const { loading } = genreSelector();

  const { genreId } = useParams();

  const fetchBlogs = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, []);

  const filteredBlogs = genreId
    ? blogs.filter((blog) => blog.genre.toLowerCase() === genreId.toLowerCase())
    : blogs;

  return (
    <div>
      <GenrePickerBar />
      <div
        className={`top-10 gap-8 flex flex-col items-center justify-center p-4 ${
          error ? "h-[88vh]" : ""
        }`}>
        {filteredBlogs.length > 0 &&
          filteredBlogs.map((itm) => (
            <Blog
              blog={itm}
              key={itm.blogId}
            />
          ))}
        {!loading && error && (
          <div className="flex justify-center items-center text-red-500 text-lg font-bold mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
