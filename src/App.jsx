import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CinemaList from "./pages/CinemaList";
import ShowTime from "./pages/ShowTime";
import BookingSuccess from "./pages/BookingSuccess";

export default function App() {
  const isAuth = !!localStorage.getItem("currentUser");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        <Route path="/cinemas/:movieId" element={<CinemaList />} />
        <Route path="/showtime/:movieId/:cinemaId" element={<ShowTime />} />
        <Route path="/success" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
