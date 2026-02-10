import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = storage.getUsers();
        const user = users.find(u => u.email === formData.email && u.password === formData.password);

        if (user) {
            storage.setLoggedInUser(user);
            navigate('/select-city');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'radial-gradient(circle at center, #1f1f1f 0%, #000000 100%)',
            padding: '2rem'
        }}>
            <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '440px', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ color: 'var(--primary)', fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>MOVIX</h1>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome Back</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

                    <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Log In</button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    New to Movix? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
