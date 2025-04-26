import React from "react";
import { Skeleton, Space } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { blogSelector, genreSelector } from "../Store/Selectors";
import "../assets/genrepicker.scss";

const GenrePicker = ({ genres }) => {
  const { activeGenrePage, isLoading } = useSelector(genreSelector);
  const { isLoading: blogLoading } = useSelector(blogSelector);

  if (isLoading || blogLoading) {
    let skeletonArr = [];

    for (let i = 0; i < 10; i++) {
      skeletonArr.push(
        <Skeleton.Input
          block={{ block: true }}
          style={{ display: "flex", width: "20%", margin: "auto" }}
          paragraph={{ rows: 0 }}
          active={true}
          size="small"
        />
      );
    }

    return (
      <div className="p-4 border-b-2 flex-wrap gap-4 border-gray-200 bg-white w-full flex justify-evenly items-center">
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {skeletonArr.map((itm) => itm)}
        </Space>
      </div>
    );
  }
  return (
    <div className="genrepicker h-16 overflow-x-auto overflow-y-hidden p-4 border-b-2 gap-4 border-gray-200 bg-white w-full flex justify-evenly items-center">
      {genres.map((genre, index) => {
        return (
          <Link
            to={`/${genre.genre ? genre.genre : "all"}`}
            className="flex flex-col items-center justify-center"
            key={index}>
            <h3
              className={`font-bold text-xs px-2 py-1 flex items-center justify-center text-black rounded-2xl ${
                activeGenrePage?.toLowerCase() === genre.genre.toLowerCase()
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300"
              }`}>
              {genre.genre.toUpperCase()}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default GenrePicker;
