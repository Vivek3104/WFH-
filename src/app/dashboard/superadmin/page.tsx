'use client';
import React from 'react';

const SuperAdminDashboard = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Superadmin <span className="gradient-text">Dashboard</span></h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Manage system settings, franchise accounts, and global analytics.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                <div className="card glass">
                    <h3>Franchise Management</h3>
                    <p>Manage all registered franchises.</p>
                </div>
                <div className="card glass">
                    <h3>System Logs</h3>
                    <p>View global system activity.</p>
                </div>
                <div className="card glass">
                    <h3>Global Settings</h3>
                    <p>Configure platform-wide parameters.</p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
