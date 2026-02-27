'use client';
import React from 'react';

const UsersPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>User <span className="gradient-text">Management</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Monitor and manage all registered users.</p>
            </header>

            <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>USER</th>
                            <th>EMAIL</th>
                            <th>KYC STATUS</th>
                            <th>WALLET BAL.</th>
                            <th>JOINED</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserRow
                            name="Rahul Sharma"
                            email="rahul@example.com"
                            kyc="Verified"
                            balance="₹1,250"
                            joined="Jan 15, 2024"
                        />
                        <UserRow
                            name="Priya Patel"
                            email="priya@example.com"
                            kyc="Pending"
                            balance="₹450"
                            joined="Feb 02, 2024"
                        />
                        <UserRow
                            name="Amit Kumar"
                            email="amit@example.com"
                            kyc="Rejected"
                            balance="₹0"
                            joined="Dec 20, 2023"
                        />
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const UserRow = ({ name, email, kyc, balance, joined }: any) => {
    const getKycColor = (s: string) => {
        switch (s) {
            case 'Verified': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
            case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
            case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
            default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af' };
        }
    };

    const kycStyle = getKycColor(kyc);

    return (
        <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <td style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        {name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span style={{ fontWeight: 600 }}>{name}</span>
                </div>
            </td>
            <td>{email}</td>
            <td>
                <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    background: kycStyle.bg,
                    color: kycStyle.text,
                    border: `1px solid ${kycStyle.text}33`
                }}>{kyc}</span>
            </td>
            <td style={{ fontWeight: 600 }}>{balance}</td>
            <td style={{ color: 'var(--text-muted)' }}>{joined}</td>
            <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button title="View Profile" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>👤</button>
                    <button title="View Wallet" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>💰</button>
                    <button title="Suspend" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>🚫</button>
                </div>
            </td>
        </tr>
    );
};

export default UsersPage;
