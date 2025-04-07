import { useSelector } from "react-redux";

export const blogsSelector = () => useSelector((state) => state.blogs);
export const userSelector = () => useSelector((state) => state.user);
export const userIdSelector = () => useSelector((state) => state.user.userId);
export const userBlogsSelector = () => useSelector((state) => state.user.userBlogs);
