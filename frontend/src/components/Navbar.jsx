import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User as UserIcon, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar glass-card" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            margin: '1rem',
            position: 'sticky',
            top: '1rem',
            zIndex: 100
        }}>
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                StockMaster
            </div>
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={toggleTheme}
                    className="btn"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '10px',
                        borderRadius: '12px',
                        color: 'var(--text)'
                    }}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserIcon size={20} />
                        <span style={{ fontSize: '0.9rem' }}>{user?.username}</span>
                    </div>
                    <button className="btn btn-primary" onClick={logout} style={{ padding: '8px 16px' }}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
