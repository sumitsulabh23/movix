import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {};

    useEffect(() => {
        if (booking) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }, [booking]);

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
                <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
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

                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Booking Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        Get ready for an amazing cinematic experience, {booking.user}!
                    </p>

                    <div style={{
                        textAlign: 'left',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '2.5rem',
                        borderRadius: '16px',
                        marginBottom: '3.5rem',
                        border: '1px solid var(--glass-border)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>MOVIE</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.movie}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>CINEMA & CITY</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.cinema}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.city}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DATE & TIME</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.date}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.time}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>SEATS & PRICE</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.seats?.join(', ')}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total: ₹{booking.totalPrice}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>BOOKING ID</p>
                            <p style={{ fontSize: '1rem', opacity: 0.7 }}>MB-{booking.id || Date.now()}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={() => navigate('/')} style={{ padding: '1rem 2.5rem' }}>
                            Book More Tickets
                        </button>
                        <button className="btn-outline" onClick={() => window.print()} style={{ padding: '1rem 2.5rem' }}>
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
