import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus } from 'lucide-react';

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ product: '', vendor: '', quantity: '' });

    const fetchData = async () => {
        const [pRes, vRes, purRes] = await Promise.all([
            api.get('/api/products'),
            api.get('/api/vendors'),
            api.get('/api/purchases')
        ]);
        setProducts(pRes.data);
        setVendors(vRes.data);
        setPurchases(purRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/api/purchases', formData);
        setShowModal(false);
        setFormData({ product: '', vendor: '', quantity: '' });
        fetchData();
    };

    return (
        <div className="purchases">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Purchase Management</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> New Purchase Order
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
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
                        {purchases.map((purchase) => (
                            <tr key={purchase._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px' }}>{new Date(purchase.date).toLocaleDateString()}</td>
                                <td style={{ padding: '12px' }}>{purchase.vendor?.name}</td>
                                <td style={{ padding: '12px' }}>{purchase.product?.name}</td>
                                <td style={{ padding: '12px' }}>{purchase.quantity}</td>
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
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>Create Purchase Order</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select Vendor</label>
                                <select
                                    className="input-field"
                                    value={formData.vendor}
                                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                                    required
                                >
                                    <option value="">-- Choose a Vendor --</option>
                                    {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select Product</label>
                                <select
                                    className="input-field"
                                    value={formData.product}
                                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                    required
                                >
                                    <option value="">-- Choose a Product --</option>
                                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Order Quantity</label>
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
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>Confirm Order</button>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '14px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
        select option { background: #1e293b; color: white; }
      `}</style>
        </div>
    );
};

export default Purchases;
