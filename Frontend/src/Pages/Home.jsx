import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/blogContext";
import { Blog } from "../Components/Blog";

const Home = () => {
  const { blogs } = useContext(BlogContext);
  return <div className="px-4 py-2">{blogs?.length > 0 ? blogs.map((blog) => <Blog key={blog.blogId} blog={blog} />) : <h1 className="text-2xl font-bold text-center">No blogs found</h1>}</div>;
};
export default Home;
