import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const [formData, setFormData] = useState({ name: '', contact: '', address: '' });

    const fetchVendors = async () => {
        const { data } = await axios.get('http://localhost:5000/api/vendors');
        setVendors(data);
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingVendor) {
            await axios.put(`http://localhost:5000/api/vendors/${editingVendor._id}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/vendors', formData);
        }
        setShowModal(false);
        setEditingVendor(null);
        setFormData({ name: '', contact: '', address: '' });
        fetchVendors();
    };

    const handleEdit = (vendor) => {
        setEditingVendor(vendor);
        setFormData({ name: vendor.name, contact: vendor.contact, address: vendor.address });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            await axios.delete(`http://localhost:5000/api/vendors/${id}`);
            fetchVendors();
        }
    };

    return (
        <div className="vendors">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Vendor Management</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Add Vendor
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px' }}>Name</th>
                            <th style={{ padding: '12px' }}>Contact</th>
                            <th style={{ padding: '12px' }}>Address</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor) => (
                            <tr key={vendor._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px' }}>{vendor.name}</td>
                                <td style={{ padding: '12px' }}>{vendor.contact}</td>
                                <td style={{ padding: '12px' }}>{vendor.address}</td>
                                <td style={{ padding: '12px', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(vendor)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(vendor._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
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
                            {editingVendor ? 'Update Vendor' : 'Add New Vendor'}
                        </h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Vendor Name</label>
                                <input
                                    className="input-field"
                                    placeholder="Enter company name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Contact Details</label>
                                <input
                                    className="input-field"
                                    placeholder="Phone or Email"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Mailing Address</label>
                                <textarea
                                    className="input-field"
                                    placeholder="Full address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    style={{ minHeight: '100px', resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                                    {editingVendor ? 'Update' : 'Save Vendor'}
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

export default Vendors;
