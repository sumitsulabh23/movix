import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { omdbService } from "../services/omdbService";
import { storage } from "../utils/storage";

export default function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const user = storage.getLoggedInUser();
    const selectedCity = storage.getSelectedCity();

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const cityMovies = await omdbService.getMoviesByCity(selectedCity);
                setMovies(cityMovies);
            } catch (err) {
                setError("Failed to load movies. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCity) {
            loadMovies();
        }
    }, [selectedCity]);

    const filteredMovies = movies.filter((movie) => {
        const matchesSearch = movie.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const handleLogout = () => {
        storage.logout();
        navigate("/login");
    };

    const handleChangeCity = () => {
        navigate("/select-city");
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '5rem' }}>
            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '1rem 0'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => navigate('/')}>MOVIX</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleChangeCity}>
                            <span style={{ fontSize: '1.2rem' }}>📍</span>
                            <span style={{ color: 'white', fontWeight: 600 }}>{selectedCity}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Change</span>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome, <strong style={{ color: 'white' }}>{user?.name}</strong></span>
                        <button className="btn-outline" onClick={handleLogout} style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>Logout</button>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ paddingTop: '7rem' }}>
                <section style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '3.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Movies in {selectedCity}</h2>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Search by movie name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </section>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                        <div className="loader" style={{ marginBottom: '1rem' }}></div>
                        <p>Finding the best movies in {selectedCity}...</p>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--primary)' }}>
                        <p>{error}</p>
                        <button className="btn-outline" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>Retry</button>
                    </div>
                ) : filteredMovies.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                        <p>No movies found matching "{searchQuery}" in {selectedCity}.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {filteredMovies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className={`glass-card animate-fade-up`}
                                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', background: 'var(--bg-card)' }}
                                onClick={async () => {
                                    // Fetch full details before navigating
                                    const fullMovie = await omdbService.getMovieDetails(movie.id);
                                    navigate(`/movie/${movie.id}`, { state: { movie: { ...fullMovie, city: selectedCity } } });
                                }}
                            >
                                <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{movie.title}</h3>
                                    <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        <span>{movie.year}</span>
                                        <span>•</span>
                                        <span>{movie.type?.toUpperCase() || 'MOVIE'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>📍 {movie.city}</span>
                                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Book Now →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
