import { useSelector } from "react-redux";

export const blogsSelector = () => useSelector((state) => state.blogs);
export const userSelector = () => useSelector((state) => state.user);
export const userIdSelector = () => useSelector((state) => state.user.userId);
export const userBlogsSelector = () => useSelector((state) => state.user.userBlogs);

export const commentsSelector = (blogId) => {
  const { commentsByBlogId, paginationByBlogId, loading, error } = useSelector(
    (state) => state.comments
  );
  return {
    comments: blogId ? commentsByBlogId[blogId] || [] : [],
    pagination: blogId
      ? paginationByBlogId[blogId] || { page: 1, limit: 10, total: 0, totalPages: 0 }
      : null,
    totalComments: blogId && paginationByBlogId[blogId] ? paginationByBlogId[blogId].total : 0,
    loading,
    error,
  };
};
