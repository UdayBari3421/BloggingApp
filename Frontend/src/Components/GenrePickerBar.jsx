import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { genreSelector } from "../Store/Selectors";
import { useDispatch } from "react-redux";
import { setError, setGenres, setLoading } from "../Store/GenreSlice";
import { backendURL } from "../Store/constants";
import axios from "axios";

const GenrePickerBar = () => {
  const { genreId } = useParams();
  const { genres, loading } = genreSelector();
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
  let isSelected;
  useEffect(() => {
    if (genreId) {
      const currentGenre = genreId.toLowerCase();
      isSelected =
        currentGenre === "all" ? !genreId || genreId === "all" : genreId === currentGenre;
    } else {
      isSelected = false;
    }
  }, [genreId, isSelected]);

  return (
    <>
      {!loading ? (
        <>
          {genres.length > 0 && (
            <div className="p-4 border-b-2 flex-wrap gap-4 border-gray-200 bg-white w-full flex justify-evenly items-center">
              {genres.map((genre, index) => {
                const currentGenre = genre.genre.toLowerCase();

                isSelected =
                  currentGenre === "all" ? !genreId || genreId === "all" : genreId === currentGenre;

                return (
                  <Link
                    to={`/genre/${currentGenre}`}
                    className="flex flex-col items-center justify-center"
                    key={index}>
                    <h3
                      className={`font-bold text-xs px-2 py-1 flex items-center justify-center text-black rounded-2xl ${
                        isSelected ? "bg-gray-600 text-white" : "bg-gray-300"
                      }`}>
                      {genre.genre.toUpperCase()}
                    </h3>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <span className="animate-spin border-2 border-gray-400 border-r-blue-500 rounded-full p-3 mb-2"></span>
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </>
  );
};

export default GenrePickerBar;
