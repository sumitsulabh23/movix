import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [third, setThird] = useState(0);    
  const [second, setSecond] = useState(0);  

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      movie.city.toLowerCase().includes(city.toLowerCase())
  );

return (
    <div>
        <h2>Movie Dashboard</h2>
        <h3>Welcome to the Movie Dashboard</h3>
        <h3>Search and Filter Movies</h3>
        <h4>Find your favorite movies</h4>
        <h5>Explore movies by title and city</h5>  
        <h6>Search for movies: <input
            placeholder="Search Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        /> <h1>{filteredMovies.length} movies found </h1></h6> 
           drgfttvvgtybb. Lhh hhuujhuj hghgyjguyuuujhiiijh h nhh bbbbjunh hghuhun y hh
        <p>{filteredMovies.length} movies found</p>

        <input
            placeholder="Search Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <input
            placeholder="Filter by City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />

        <div>
            {filteredMovies.map((movie) => (
                <div
                    key={movie.id}
                    style={{ border: "1px solid gray", margin: 10, padding: 10 }}
                >
                    <img src={movie.poster} width="150" alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Language: {movie.language}</p>
                    <p>City: {movie.city}</p>

                    <button onClick={() => navigate(`/cinemas/${movie.id}`)}>
                        View Cinemas
                    </button>
                </div>
            ))}
        </div>
    </div>
);
}
