'use client';
import React from 'react';

const WithdrawalsPage = () => {
    const balance = 5420;
    const history = [
        { id: 'W-001', amount: '₹2,500', method: 'Bank Transfer', date: '2024-12-20', status: 'Paid' },
        { id: 'W-002', amount: '₹1,000', method: 'UPI', date: '2024-12-26', status: 'Pending' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>My <span className="gradient-text">Earnings</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Request withdrawals and view your payment history.</p>
                </div>
                <div style={{ padding: '1rem 2rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Balance</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{balance}</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', alignItems: 'start' }}>
                <section className="card shadow-lg" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Withdrawal History</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                <th style={{ padding: '1.25rem' }}>ID</th>
                                <th>AMOUNT</th>
                                <th>METHOD</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h) => (
                                <tr key={h.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                    <td style={{ padding: '1.25rem', color: 'var(--primary)' }}>{h.id}</td>
                                    <td style={{ fontWeight: 700 }}>{h.amount}</td>
                                    <td>{h.method}</td>
                                    <td>{h.date}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            background: h.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: h.status === 'Paid' ? '#10b981' : '#f59e0b'
                                        }}>{h.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="card shadow-lg" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Withdraw Funds</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Amount (₹)</label>
                            <input type="number" placeholder="Enter amount" className="input-glass" style={{ width: '100%', padding: '0.75rem' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Payment Method</label>
                            <select className="input-glass" style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a' }}>
                                <option>UPI (PhonePe/GPay)</option>
                                <option>Bank Transfer</option>
                                <option>Paytm Wallet</option>
                            </select>
                        </div>
                        <button className="btn-primary" style={{ marginTop: '1rem' }}>Request Payout</button>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            Processing time: 24-48 hours
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WithdrawalsPage;
