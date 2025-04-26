import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogSelector, genreSelector } from "../Store/Selectors";
import { setActiveGenrePage } from "../Features/GenreSlice";
import { API_STATUS, backendUrl } from "../Store/Constants";
import { EmptyPage } from "../Pages";
import {
  setBlogs,
  setLoading,
  setApiStatus,
  setError,
  setFilteredBlogs,
} from "../Features/BlogSlice";
import { Blog } from "../Components";
import { Skeleton } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const { activeGenrePage, isLoading: genreLoading } = useSelector(genreSelector);
  const { blogs, isLoading, filteredBlogs, apiStatus } = useSelector(blogSelector);

  let { genreId } = useParams();
  !genreId && (genreId = "all");

  useEffect(() => {
    if (activeGenrePage !== genreId) {
      dispatch(setActiveGenrePage(genreId));
    }
  }, [genreId]);

  useEffect(() => {
    if (blogs.length > 0) {
      filter(blogs);
    }
  }, [blogs, genreId]);

  const filter = (blogs) => {
    if (genreId === "all") {
      dispatch(setFilteredBlogs(blogs));
      return;
    } else {
      const filterBlogsarr = blogs.filter((blog) => blog.genre === genreId);
      dispatch(setFilteredBlogs(filterBlogsarr));
    }
  };

  const fetchBlogs = async () => {
    dispatch(setLoading(true));
    dispatch(setApiStatus(API_STATUS.PENDING));
    try {
      const { data } = await axios.get(`${backendUrl}/api/blog/getall`);
      if (data.success) {
        dispatch(setBlogs(data.blogs));
        const filterBlogsarr = data.blogs.filter(
          (blog) => blog.genre !== "all" || blog.genre === genreId
        );
        dispatch(setFilteredBlogs(filterBlogsarr));
        dispatch(setApiStatus(API_STATUS.SUCCESS));
      } else {
        dispatch(setApiStatus(API_STATUS.ERROR));
        dispatch(setError(data.message));
      }
    } catch (error) {
      dispatch(setApiStatus(API_STATUS.ERROR));
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (apiStatus === API_STATUS.SUCCESS && filteredBlogs.length === 0) {
    return <EmptyPage topic={genreId} />;
  }

  if (isLoading || genreLoading) {
    let skeletonArr = [];
    skeletonArr.length = 3;
    skeletonArr.fill(0);

    skeletonArr = skeletonArr.map((itm, ind) => {
      return (
        <Skeleton
          key={ind}
          active
          paragraph={{ rows: 4 }}
          title={true}
          style={{
            borderRadius: "1rem",
            border: "1px solid #eaeaea",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            width: "90%",
            padding: "1rem",
            margin: "auto",
            marginBottom: "1rem",
          }}
        />
      );
    });

    return (
      <div className="flex flex-col gap-2.5 pt-8 items-center justify-center">{skeletonArr}</div>
    );
  }
  return (
    <div className="top-10 gap-8 flex flex-col items-center justify-center p-4">
      <div className="p-4 w-full flex gap-4 flex-col">
        {filteredBlogs.map((blog, ind) => (
          <Blog
            blog={blog}
            key={blog.blogId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
