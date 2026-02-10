import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {};

    if (!booking) {
        return (
            <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2>No booking found</h2>
                    <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/')}>Return Home</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
            <div className="container animate-fade-up">
                <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        margin: '0 auto 2rem auto',
                        boxShadow: '0 0 40px rgba(229, 9, 20, 0.4)'
                    }}>
                        ✓
                    </div>

                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Your Ticket is Booked!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
                        Get ready for an amazing experience, {booking.user}!
                    </p>

                    <div style={{
                        textAlign: 'left',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '2.5rem',
                        borderRadius: '16px',
                        marginBottom: '3rem',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>MOVIE</p>
                            <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>{booking.movie}</p>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>CINEMA & CITY</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{booking.cinema}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.city}</p>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DATE & TIME</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{booking.date}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.time}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>BOOKING ID</p>
                            <p style={{ fontSize: '1rem', opacity: 0.7, fontFamily: 'monospace' }}>MB-{booking.id || Date.now()}</p>
                        </div>
                    </div>

                    <button className="btn-primary" onClick={() => navigate('/')} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                        Book More Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
