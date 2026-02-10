import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOW_TIMINGS } from '../../utils/mockData';
import { storage } from '../../utils/storage';

const ShowSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie, cinema } = location.state || {};

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState('');

    if (!movie || !cinema) {
        return <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>Invalid booking session.</div>;
    }

    const handleBooking = () => {
        if (!selectedTime) {
            alert('Please select a show time');
            return;
        }

        // Create booking directly without seat selection
        const bookingData = {
            id: Date.now(),
            user: storage.getLoggedInUser()?.name,
            movie: movie.title,
            city: movie.city,
            cinema: cinema.name,
            date: selectedDate,
            time: selectedTime,
            timestamp: new Date().toLocaleString()
        };

        storage.saveBooking(bookingData);
        navigate('/booking/success', { state: { booking: bookingData } });
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', padding: '8rem 0 5rem 0' }}>
            <div className="container animate-fade-up">
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    ← Back to Cinemas
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '4rem' }}>
                    <div>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <img src={movie.poster} alt={movie.title} style={{ width: '100%', display: 'block' }} />
                            <div style={{ padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>{movie.title}</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{movie.language} • {movie.year}</p>
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>SELECTED CINEMA</h4>
                                    <p style={{ fontWeight: 600 }}>{cinema.name}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cinema.location}, {movie.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Book Your Tickets</h3>

                        <div style={{ marginBottom: '3rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '1rem' }}>Choose Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={selectedDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ fontSize: '1.1rem', padding: '1rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '4rem' }}>
                            <label style={{ display: 'block', marginBottom: '1.2rem', fontWeight: 600, fontSize: '1rem' }}>Select Time Slot</label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {SHOW_TIMINGS.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        style={{
                                            padding: '1rem 1.5rem',
                                            borderRadius: '10px',
                                            border: '1px solid',
                                            borderColor: selectedTime === time ? 'var(--primary)' : 'var(--glass-border)',
                                            background: selectedTime === time ? 'var(--primary)' : 'var(--glass)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}
                            onClick={handleBooking}
                        >
                            Book Now
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            Your ticket will be confirmed instantly
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowSelection;
