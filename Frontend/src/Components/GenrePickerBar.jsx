import React from "react";
import { genreOptions } from "../Store/constants";
import { Link, useParams } from "react-router-dom";

const GenrePickerBar = () => {
  const { genreId } = useParams();

  return (
    <div className="p-4 border-b-2 flex-wrap gap-4 border-gray-200 bg-white w-full flex justify-evenly items-center">
      <Link
        to="/"
        className="flex flex-col items-center justify-center">
        <h3
          className={`font-bold text-xs px-2 py-1 flex items-center justify-center text-black rounded-2xl ${
            !genreId ? "bg-gray-600 text-white" : "bg-gray-300"
          }`}>
          ALL
        </h3>
      </Link>
      {genreOptions.map((genre, index) => (
        <Link
          to={`/genre/${genre.id}`}
          className="flex flex-col items-center justify-center"
          key={index}>
          <h3
            className={`font-bold text-xs px-2 py-1 flex items-center justify-center text-black rounded-2xl ${
              genreId === genre.id ? "bg-gray-600 text-white" : "bg-gray-300"
            }`}>
            {genre.title.toUpperCase()}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default GenrePickerBar;
