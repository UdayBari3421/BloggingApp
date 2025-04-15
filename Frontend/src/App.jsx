import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Signup, CreateBlog } from "./Pages";
import { GenrePickerBar, Navbar } from "./Components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Store/UserSlice";
import { userSelector } from "./Store/Selectors";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = userSelector().isAuthenticated;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        dispatch(
          setUser({
            user: JSON.parse(user),
            token,
            isAuthenticated: true,
          })
        );
      } catch (error) {
        console.error("Error restoring user session:", error);
      }
    }
  }, [dispatch]);

  if (isLoggedIn) {
    return (
      <div className="w-full">
        <Routes>
          <Route
            path="/genre/:genreId"
            element={<Home />}
          />
          <Route
            path="/createblog"
            element={<CreateBlog />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <GenrePickerBar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/genre/"} />}
        />
        <Route
          path="/genre/:genreId"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </div>
  );
};

export default App;
