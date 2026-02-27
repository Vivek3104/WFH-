'use client';
import React, { useState } from 'react';

const ManageAdminsPage = () => {
    const [admins, setAdmins] = useState([
        { id: 'AD-01', name: 'Alice Johnson', email: 'alice@wfh.com', status: 'Active', tasks: 12 },
        { id: 'AD-02', name: 'Bob Smith', email: 'bob@wfh.com', status: 'Active', tasks: 8 },
        { id: 'AD-03', name: 'Charlie Brown', email: 'charlie@wfh.com', status: 'Suspended', tasks: 0 },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Manage <span className="gradient-text">Administrators</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Oversee administrative accounts and their permissions.</p>
                </div>
                <button className="btn-primary">+ Add New Admin</button>
            </header>

            <section className="card shadow-lg" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>ADMIN ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>MANAGED TASKS</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                <td style={{ padding: '1.25rem', color: 'var(--primary)', fontWeight: 600 }}>{admin.id}</td>
                                <td style={{ fontWeight: 600 }}>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.tasks}</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        background: admin.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: admin.status === 'Active' ? '#10b981' : '#ef4444',
                                        border: admin.status === 'Active' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                                    }}>
                                        {admin.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button title="Edit Permissions" style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>⚙️</button>
                                        <button title={admin.status === 'Active' ? 'Suspend' : 'Activate'} style={{ color: '#f59e0b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>⏸️</button>
                                        <button title="Delete Account" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ManageAdminsPage;
