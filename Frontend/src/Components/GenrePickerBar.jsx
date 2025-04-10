import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { genreSelector } from "../Store/Selectors";
import { useDispatch } from "react-redux";
import { setError, setGenres, setLoading } from "../Store/GenreSlice";
import { backendURL } from "../Store/constants";
import axios from "axios";

const GenrePickerBar = () => {
  const { genreId } = useParams();
  const { genres } = genreSelector();

  const genreOptions = genres;
  const dispatch = useDispatch();

  const getGenres = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${backendURL}/api/genre/getall`);

      if (data.success) {
        dispatch(setGenres(data.genres));
      } else {
        dispatch(setError("Failed to fetch genres"));
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
      return dispatch(setError("Failed to fetch genres"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

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
      {genreOptions &&
        genreOptions.map((genre, index) => (
          <Link
            to={`/genre/${genre.genre}`}
            className="flex flex-col items-center justify-center"
            key={index}>
            <h3
              className={`font-bold text-xs px-2 py-1 flex items-center justify-center text-black rounded-2xl ${
                genreId === genre.genre ? "bg-gray-600 text-white" : "bg-gray-300"
              }`}>
              {genre.genre.toUpperCase()}
            </h3>
          </Link>
        ))}
    </div>
  );
};

export default GenrePickerBar;
