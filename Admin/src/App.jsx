import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "./store/selectors";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, AddGenre, AddAdmin, GetUsers, Login } from "./pages";
import Sidebar from "./components/Sidebar";
import { setLoading, setUser } from "./features/userSlice";

const App = () => {
  const { user, isLoggedIn, isLoading } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setLoading(true));
      try {
        dispatch(
          setUser({
            user,
            token,
            isLoggedIn: true,
          })
        );
        navigate("/");
      } catch (error) {
        console.error("Error restoring user session:", error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
      navigate("/login");
    }
  }, [dispatch]);

  const PrivateRoutes = () => {
    return isLoggedIn ? (
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/add-genre"
          element={<AddGenre />}
        />
        <Route
          path="/add-admin"
          element={<AddAdmin />}
        />
        <Route
          path="/get-users"
          element={<GetUsers />}
        />
      </Routes>
    ) : (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    );
  };

  return (
    <div className="flex flex-col max-h-screen h-screen w-screen bg-gray-100">
      <div className="flex">
        {isLoggedIn && <Sidebar user={user} />}
        {isLoggedIn && !isLoading ? (
          <PrivateRoutes />
        ) : (
          <div className="absolute top-0 bottom-0 w-full h-screen bg-white flex font-bold items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-[10px] p-2 aspect-square w-[10px] border-4 border-l-blue-500 border-gray-600"></span>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
