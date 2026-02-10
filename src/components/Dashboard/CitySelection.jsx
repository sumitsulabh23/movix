import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES } from '../../utils/mockData';
import { storage } from '../../utils/storage';

const CitySelection = () => {
    const navigate = useNavigate();
    const user = storage.getLoggedInUser();

    const handleCitySelect = (city) => {
        storage.setSelectedCity(city);
        navigate('/', { state: { selectedCity: city } });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #1f1f1f 0%, #000000 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="container animate-fade-up" style={{
                textAlign: 'center',
                maxWidth: '1000px',
                width: '100%'
            }}>
                {/* Header Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{
                        color: 'var(--primary)',
                        fontSize: '3.5rem',
                        fontWeight: 900,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        MOVIX
                    </h1>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        fontWeight: 600
                    }}>
                        Welcome, {user?.name}
                    </h2>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.1rem',
                        marginTop: '0.75rem'
                    }}>
                        Select your city to discover movies
                    </p>
                </div>

                {/* City Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {CITIES.map((city, index) => (
                        <div
                            key={city}
                            className={`glass-card animate-fade-up stagger-${(index % 3) + 1}`}
                            style={{
                                padding: '2rem 1.5rem',
                                cursor: 'pointer',
                                textAlign: 'center',
                                border: '1px solid var(--glass-border)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '140px'
                            }}
                            onClick={() => handleCitySelect(city)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            }}
                        >
                            <div style={{
                                fontSize: '2.5rem',
                                marginBottom: '0.75rem',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                            }}>
                                📍
                            </div>
                            <h3 style={{
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                margin: 0,
                                lineHeight: 1.2
                            }}>
                                {city}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitySelection;
