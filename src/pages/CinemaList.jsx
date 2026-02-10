import { useParams, useNavigate } from "react-router-dom";
import { cinemas } from "../data/cinemas";

export default function CinemaList() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movieCinemas = cinemas.filter(
    (cinema) => cinema.movieId === Number(movieId)
  );

  return (
    <div>
      <h2>Select Cinema Hall</h2>

      {movieCinemas.map((cinema) => (
        <div
          key={cinema.id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <h3>{cinema.name}</h3>
          <p>Location: {cinema.location}</p>

          <button
            onClick={() =>
              navigate(`/showtime/${movieId}/${cinema.id}`)
            }
          >
            Select Show
          </button>
        </div>
      ))}
    </div>
  );
}
