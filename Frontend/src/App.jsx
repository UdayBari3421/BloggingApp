import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, CreateBlog } from "./Pages";
import { Navbar } from "./Components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Store/UserSlice";

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route
          path="/"
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
        <Route />
        <Route
          path="/createblog"
          element={<CreateBlog />}
        />
        <Route />
      </Routes>
    </div>
  );
};

export default App;
