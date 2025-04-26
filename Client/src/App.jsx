import React, { useEffect } from "react";
import { Home, Signup, NotFound } from "./Pages";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar, GenrePicker, CreateBlogModal } from "./Components";
import { Login } from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { genreSelector, userSelector } from "./Store/Selectors";
import { setUser } from "./Features/UserSlice";
import { setApiStatus, setGenres } from "./Features/GenreSlice";
import { API_STATUS, backendUrl } from "./Store/Constants";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(userSelector);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(userSelector);
  const { genres, activeGenrePage } = useSelector(genreSelector);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    fetchGenres();

    if (token && user) {
      try {
        dispatch(setUser({ isAuthenticated: true, user: JSON.parse(user), token }));
        if (isAuthenticated) {
          navigate("/all");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const fetchGenres = async () => {
    dispatch(setApiStatus(API_STATUS.PENDING));
    try {
      const { data } = await axios.get(`${backendUrl}/api/genre/getall`);

      if (data.success) {
        dispatch(setGenres(data.genres));
        dispatch(setApiStatus(API_STATUS.SUCCESS));
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
      dispatch(setApiStatus(API_STATUS.ERROR));
    }
  };

  return (
    <div>
      <Navbar />
      <CreateBlogModal />
      {isAuthenticated && <GenrePicker genres={genres} />}
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/all" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/all" />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? `/${activeGenrePage}` : "/login"} />}
        />
        <Route
          path="/all"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:genreId"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

export default App;
