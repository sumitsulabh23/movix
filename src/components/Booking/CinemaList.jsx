import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CINEMAS } from '../../utils/mockData';

const CinemaList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie } = location.state || {};

    if (!movie) {
        return (
            <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>No movie selected</h2>
                <button className="btn-primary" onClick={() => navigate('/')}>Return to Dashboard</button>
            </div>
        );
    }

    const localCinemas = CINEMAS.filter(c => c.city === movie.city);

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', padding: '8rem 0 5rem 0' }}>
            <div className="container animate-fade-up">
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                    ← Back to Movies
                </button>

                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>{movie.title}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Available Cinema Halls in {movie.city}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    {localCinemas.map((cinema, index) => (
                        <div
                            key={cinema.id}
                            className={`glass-card animate-fade-up stagger-${(index % 3) + 1}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: '2rem'
                            }}
                            onClick={() => navigate(`/booking/time`, { state: { movie, cinema } })}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{cinema.name}</h3>
                                <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--primary)' }}>📍</span> {cinema.location}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Select Hall</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CinemaList;
