import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOVIES } from '../../utils/mockData';
import { storage } from '../../utils/storage';

const MovieGrid = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const user = storage.getLoggedInUser();
    const selectedCity = storage.getSelectedCity();

    const filteredMovies = MOVIES.filter(movie => {
        const matchesCity = movie.city === selectedCity;
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCity && matchesSearch;
    });

    const featuredMovie = filteredMovies[0] || MOVIES.find(m => m.city === selectedCity) || MOVIES[0];

    const handleLogout = () => {
        storage.logout();
        navigate('/login');
    };

    const handleChangeCity = () => {
        navigate('/select-city');
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

            {/* Hero Section */}
            {!searchQuery && featuredMovie && (
                <div style={{
                    height: '70vh',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '3rem',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img
                        src={featuredMovie.poster}
                        alt="Hero"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
                    />
                    <div className="hero-overlay" style={{ zIndex: 1 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '5rem' }}>
                        <span className="animate-fade-up" style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>FEATURED IN {selectedCity.toUpperCase()}</span>
                        <h1 className="animate-fade-up stagger-1" style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1rem' }}>{featuredMovie.title}</h1>
                        <p className="animate-fade-up stagger-2" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Experience the epic saga on the big screen. Rated {featuredMovie.rating}/10. Now available in {featuredMovie.city}.
                        </p>
                        <div className="animate-fade-up stagger-3">
                            <button
                                className="btn-primary"
                                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
                                onClick={() => navigate(`/movie/${featuredMovie.id}`, { state: { movie: featuredMovie } })}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container" style={{ paddingTop: searchQuery ? '7rem' : '1rem' }}>
                {/* Filters */}
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

                {/* Movie Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {filteredMovies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className={`glass-card animate-fade-up stagger-${(index % 3) + 1}`}
                            style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', background: 'var(--bg-card)' }}
                            onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
                        >
                            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    className="movie-poster"
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.6)',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    backdropFilter: 'blur(4px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.85rem'
                                }}>
                                    <span style={{ color: '#fbbf24' }}>★</span> {movie.rating}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{movie.title}</h3>
                                <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    <span>{movie.year}</span>
                                    <span>•</span>
                                    <span>{movie.language}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>📍 {movie.city}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Book Now →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMovies.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎬</div>
                        <h3>No movies found in {selectedCity}</h3>
                        <p style={{ marginTop: '0.5rem' }}>Try searching something else or change your city.</p>
                    </div>
                )}
            </div>

            <style>{`
                .movie-poster:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default MovieGrid;
