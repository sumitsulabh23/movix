import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

const SeatSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie, cinema, date, time } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState([]);
    const seatPrice = 250; // Standard price

    if (!movie || !cinema || !date || !time) {
        return <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>Invalid session.</div>;
    }

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        const bookingData = {
            id: Date.now(),
            user: storage.getLoggedInUser()?.name,
            movie: movie.title,
            city: movie.city,
            cinema: cinema.name,
            date,
            time,
            seats: selectedSeats,
            totalPrice: selectedSeats.length * seatPrice,
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
                    ← Back to Showtimes
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }}>
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div className="screen"></div>

                        <div className="seat-grid">
                            {rows.map(row => (
                                cols.map(col => {
                                    const seatId = `${row}${col}`;
                                    const isOccupied = Math.random() < 0.2; // Mock occupied seats
                                    const isSelected = selectedSeats.includes(seatId);

                                    return (
                                        <div
                                            key={seatId}
                                            className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                                            onClick={() => !isOccupied && toggleSeat(seatId)}
                                        >
                                            {row}{col}
                                        </div>
                                    );
                                })
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="seat" style={{ cursor: 'default' }}></div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="seat selected" style={{ cursor: 'default' }}></div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selected</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="seat occupied" style={{ cursor: 'default' }}></div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Booked</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Booking Summary</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>MOVIE</p>
                            <p style={{ fontWeight: 600 }}>{movie.title}</p>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>CINEMA</p>
                            <p style={{ fontWeight: 600 }}>{cinema.name}</p>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>DATE & TIME</p>
                            <p style={{ fontWeight: 600 }}>{date} at {time}</p>
                        </div>

                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Seats ({selectedSeats.length})</span>
                                <span style={{ fontWeight: 600 }}>{selectedSeats.join(', ') || 'None'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                                <span>Total Price</span>
                                <span style={{ color: 'var(--primary)' }}>₹{selectedSeats.length * seatPrice}</span>
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '2.5rem', padding: '1.2rem' }}
                            onClick={handleConfirm}
                            disabled={selectedSeats.length === 0}
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
