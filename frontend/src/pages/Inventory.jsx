import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

    const fetchProducts = async () => {
        const { data } = await api.get('/api/products');
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            await api.put(`/api/products/${editingProduct._id}`, formData);
        } else {
            await api.post('/api/products', formData);
        }
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: '', price: '', quantity: '' });
        fetchProducts();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ name: product.name, price: product.price, quantity: product.quantity });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/api/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div className="inventory">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Inventory Management</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px' }}>Name</th>
                            <th style={{ padding: '12px' }}>Price</th>
                            <th style={{ padding: '12px' }}>Quantity</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px' }}>{product.name}</td>
                                <td style={{ padding: '12px' }}>₹{product.price}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ color: product.quantity < 10 ? '#ef4444' : 'inherit' }}>
                                        {product.quantity}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(product)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(product._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
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
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>
                            {editingProduct ? 'Update Product' : 'Add New Product'}
                        </h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Product Name</label>
                                <input
                                    className="input-field"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Unit Price (₹)</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Inventory Quantity</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                                    {editingProduct ? 'Update' : 'Save Product'}
                                </button>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '14px' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
