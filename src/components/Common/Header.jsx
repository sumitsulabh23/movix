import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

const Header = () => {
    const navigate = useNavigate();
    const user = storage.getLoggedInUser();
    const city = storage.getSelectedCity();

    const handleLogout = () => {
        storage.logout();
        navigate('/login');
    };

    return (
        <header className="nav-header">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <span style={{ color: 'white' }}>MOVIE</span>BOOK
                </Link>

                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/" className="nav-link">Movies</Link>
                            <Link to="/select-city" className="nav-link">{city || 'Select City'}</Link>
                            <div className="user-badge">
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'var(--primary)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        fontWeight: 700
                                    }}
                                >
                                    LOGOUT
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
