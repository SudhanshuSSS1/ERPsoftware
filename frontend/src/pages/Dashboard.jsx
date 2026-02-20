import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            const { data } = await axios.get('http://localhost:5000/api/reports/summary');
            setSummary(data);
        };
        fetchSummary();
    }, []);

    const stats = [
        { label: 'Total Products', value: summary?.totalProducts || 0, icon: <Box size={24} />, color: '#6366f1' },
        { label: 'Total Sales', value: `₹${summary?.totalSales || 0}`, icon: <TrendingUp size={24} />, color: '#10b981' },
        { label: 'Purchases', value: summary?.totalPurchases || 0, icon: <ShoppingCart size={24} />, color: '#f59e0b' },
        { label: 'Low Stock Alerts', value: summary?.lowStockCount || 0, icon: <AlertTriangle size={24} />, color: '#ef4444' },
    ];

    return (
        <div className="dashboard">
            <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: `${stat.color}20`, color: stat.color, padding: '12px', borderRadius: '12px' }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={20} color="#ef4444" />
                    Low Stock Alerts
                </h3>
                {summary?.lowStockItems.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '12px' }}>Product</th>
                                <th style={{ padding: '12px' }}>Quantity</th>
                                <th style={{ padding: '12px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.lowStockItems.map((item) => (
                                <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}>{item.name}</td>
                                    <td style={{ padding: '12px' }}>{item.quantity}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                            Low Stock
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>All stocks are within healthy levels.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
