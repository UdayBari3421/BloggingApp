import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/blogContext";

const Home = () => {
  const { token, blogs } = useContext(BlogContext);

  return <div></div>;
};
export default Home;
