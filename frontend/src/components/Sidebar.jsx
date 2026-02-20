import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, Users, ShoppingCart, TrendingUp, BarChart3 } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <Box size={20} />, label: 'Inventory', path: '/inventory' },
        { icon: <Users size={20} />, label: 'Vendors', path: '/vendors' },
        { icon: <ShoppingCart size={20} />, label: 'Purchases', path: '/purchases' },
        { icon: <TrendingUp size={20} />, label: 'Sales Orders', path: '/sales' },
        { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
    ];

    return (
        <aside className="sidebar glass-card" style={{
            width: '260px',
            height: 'calc(100vh - 2rem)',
            margin: '1rem',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'fixed'
        }}>
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'var(--text-muted)',
                        transition: 'var(--transition)',
                    }}
                >
                    {item.icon}
                    <span style={{ fontWeight: '500' }}>{item.label}</span>
                </NavLink>
            ))}
            <style>{`
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }
        .sidebar-link.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
