'use client';
import React from 'react';
import Link from 'next/link';

const RegisterSelectionPage = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: '350px', padding: '2.5rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>REGISTER AS</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/register/user" className="btn-primary" style={{ padding: '1rem' }}>USER</Link>
                    <Link href="/register/admin" className="btn-primary" style={{ padding: '1rem' }}>ADMIN</Link>
                    <Link href="/register/superadmin" className="btn-primary" style={{ padding: '1rem' }}>SUPERADMIN</Link>
                </div>

                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterSelectionPage;
