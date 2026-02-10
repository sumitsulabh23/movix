import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import { cinemas } from "../data/cinemas";

export default function ShowTime() {
  const { movieId, cinemaId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(movieId));
  const cinema = cinemas.find((c) => c.id === Number(cinemaId));

  const today = new Date().toISOString().split("T")[0];
  const timeSlots = ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"];

  const handleBooking = (time) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
      user: user.name,
      movie: movie.title,
      city: movie.city,
      cinema: cinema.name,
      date: today,
      time,
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));
    navigate("/success");
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <h3>{cinema.name}</h3>
      <p>Date: {today}</p>

      <h4>Select Time</h4>

      {timeSlots.map((time) => (
        <button
          key={time}
          onClick={() => handleBooking(time)}
          style={{ margin: 5 }}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
