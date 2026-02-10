import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }
        const users = storage.getUsers();
        if (users.find(u => u.email === formData.email)) {
            setError('User already exists');
            return;
        }
        storage.saveUser(formData);
        navigate('/login');
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
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>Join MOVIX and start booking</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="e.g. Sumit Sulabh"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
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

                    <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Sign Up</button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
