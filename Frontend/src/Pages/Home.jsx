import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/blogContext";

const Home = () => {
  const { token } = useContext(BlogContext);

  return <div>Home</div>;
};
export default Home;
