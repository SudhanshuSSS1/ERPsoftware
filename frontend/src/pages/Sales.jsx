import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, TrendingUp } from 'lucide-react';

const Sales = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ product: '', quantity: '' });
    const [error, setError] = useState('');

    const fetchData = async () => {
        const [pRes, oRes] = await Promise.all([
            api.get('/api/products'),
            api.get('/api/sales')
        ]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/api/sales', formData);
            setShowModal(false);
            setFormData({ product: '', quantity: '' });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating sales order');
        }
    };

    return (
        <div className="sales">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Sales Order Processing</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> New Sales Order
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px' }}>Date</th>
                            <th style={{ padding: '12px' }}>Product</th>
                            <th style={{ padding: '12px' }}>Quantity</th>
                            <th style={{ padding: '12px' }}>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px' }}>{new Date(order.date).toLocaleDateString()}</td>
                                <td style={{ padding: '12px' }}>{order.product?.name}</td>
                                <td style={{ padding: '12px' }}>{order.quantity}</td>
                                <td style={{ padding: '12px' }}>₹{order.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass-card" style={{ padding: '2.5rem', width: '90%', maxWidth: '420px' }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>Create Sales Order</h3>
                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)',
                                padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select Product</label>
                                <select
                                    className="input-field"
                                    value={formData.product}
                                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                    required
                                >
                                    <option value="">-- Choose a Product --</option>
                                    {products.map(p => (
                                        <option key={p._id} value={p._id} disabled={p.quantity <= 0}>
                                            {p.name} ({p.quantity} in stock) - ₹{p.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Quantity</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    min="1"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{
                                padding: '1.25rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '12px',
                                border: '1px dashed rgba(99, 102, 241, 0.3)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimated Total</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                    ₹{(products.find(p => p._id === formData.product)?.price || 0) * (formData.quantity || 0)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>Create Order</button>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '14px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
        select option { background: #1e293b; color: white; }
        select option:disabled { color: #475569; }
      `}</style>
        </div>
    );
};

export default Sales;
