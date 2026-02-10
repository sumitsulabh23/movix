import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <footer style={{
                padding: '4rem 0',
                textAlign: 'center',
                borderTop: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} MovieBook. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
