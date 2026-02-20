import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, ShoppingCart, Box } from 'lucide-react';

const Reports = () => {
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('sales');

    const fetchData = async () => {
        const [sRes, pRes, prRes] = await Promise.all([
            axios.get('http://localhost:5000/api/sales'),
            axios.get('http://localhost:5000/api/purchases'),
            axios.get('http://localhost:5000/api/products')
        ]);
        setSales(sRes.data);
        setPurchases(pRes.data);
        setProducts(prRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalSalesAmount = sales.reduce((sum, s) => sum + s.total_amount, 0);
    const totalPurchaseCount = purchases.length;

    return (
        <div className="reports">
            <h2 style={{ marginBottom: '2rem' }}>Simple Reporting</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className={`btn ${activeTab === 'sales' ? 'btn-primary' : ''}`}
                    onClick={() => setActiveTab('sales')}
                    style={{ background: activeTab !== 'sales' ? 'rgba(255,255,255,0.05)' : undefined }}
                >
                    <TrendingUp size={18} /> Sales Report
                </button>
                <button
                    className={`btn ${activeTab === 'purchases' ? 'btn-primary' : ''}`}
                    onClick={() => setActiveTab('purchases')}
                    style={{ background: activeTab !== 'purchases' ? 'rgba(255,255,255,0.05)' : undefined }}
                >
                    <ShoppingCart size={18} /> Purchase Report
                </button>
                <button
                    className={`btn ${activeTab === 'stock' ? 'btn-primary' : ''}`}
                    onClick={() => setActiveTab('stock')}
                    style={{ background: activeTab !== 'stock' ? 'rgba(255,255,255,0.05)' : undefined }}
                >
                    <Box size={18} /> Current Stock Report
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                {activeTab === 'sales' && (
                    <div>
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <h4 style={{ color: '#10b981' }}>Total Sales: ₹{totalSalesAmount}</h4>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px' }}>Product</th>
                                    <th style={{ padding: '12px' }}>Quantity</th>
                                    <th style={{ padding: '12px' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map(s => (
                                    <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '12px' }}>{new Date(s.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px' }}>{s.product?.name}</td>
                                        <td style={{ padding: '12px' }}>{s.quantity}</td>
                                        <td style={{ padding: '12px' }}>₹{s.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'purchases' && (
                    <div>
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                            <h4 style={{ color: '#f59e0b' }}>Total Purchase Orders: {totalPurchaseCount}</h4>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px' }}>Vendor</th>
                                    <th style={{ padding: '12px' }}>Product</th>
                                    <th style={{ padding: '12px' }}>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '12px' }}>{new Date(p.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px' }}>{p.vendor?.name}</td>
                                        <td style={{ padding: '12px' }}>{p.product?.name}</td>
                                        <td style={{ padding: '12px' }}>{p.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'stock' && (
                    <div>
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <h4 style={{ color: 'var(--primary)' }}>Total Unique Products: {products.length}</h4>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '12px' }}>Product Name</th>
                                    <th style={{ padding: '12px' }}>Current Quantity</th>
                                    <th style={{ padding: '12px' }}>Price</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '12px' }}>{p.name}</td>
                                        <td style={{ padding: '12px' }}>{p.quantity}</td>
                                        <td style={{ padding: '12px' }}>₹{p.price}</td>
                                        <td style={{ padding: '12px' }}>
                                            {p.quantity < 10 ? (
                                                <span style={{ color: '#ef4444' }}>Low Stock</span>
                                            ) : (
                                                <span style={{ color: '#10b981' }}>In Stock</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
