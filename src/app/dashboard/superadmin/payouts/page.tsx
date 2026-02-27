'use client';
import React from 'react';

const PayoutsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Platform <span className="gradient-text">Payouts</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage withdrawal requests and payment status.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div className="card">
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Payouts</p>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>₹45,000</h3>
                </div>
                <div className="card">
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Approved (Unpaid)</p>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>₹12,400</h3>
                </div>
                <div className="card">
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Paid</p>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>₹8,92,000</h3>
                </div>
            </div>

            <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>USER</th>
                            <th>AMOUNT</th>
                            <th>METHOD</th>
                            <th>REQUEST DATE</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PayoutRow
                            user="Rahul Sharma"
                            amount="₹1,250"
                            method="UPI (rahul@upi)"
                            date="Feb 25, 2024"
                            status="Pending"
                        />
                        <PayoutRow
                            user="Priya Patel"
                            amount="₹2,000"
                            method="Bank Transfer"
                            date="Feb 24, 2024"
                            status="Approved"
                        />
                        <PayoutRow
                            user="Amit Kumar"
                            amount="₹500"
                            method="UPI (amit@upi)"
                            date="Feb 20, 2024"
                            status="Paid"
                        />
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const PayoutRow = ({ user, amount, method, date, status }: any) => {
    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Paid': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
            case 'Approved': return { bg: 'rgba(6, 182, 212, 0.1)', text: '#06b6d4' };
            case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
            default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af' };
        }
    };

    const statusStyle = getStatusColor(status);

    return (
        <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <td style={{ padding: '1.25rem', fontWeight: 600 }}>{user}</td>
            <td style={{ fontWeight: 700 }}>{amount}</td>
            <td>{method}</td>
            <td>{date}</td>
            <td>
                <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    background: statusStyle.bg,
                    color: statusStyle.text,
                    border: `1px solid ${statusStyle.text}33`
                }}>{status}</span>
            </td>
            <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {status === 'Pending' && (
                        <button style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid #06b6d4',
                            color: '#06b6d4',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}>Approve</button>
                    )}
                    {status === 'Approved' && (
                        <button style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid #10b981',
                            color: '#10b981',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}>Mark Paid</button>
                    )}
                    {status === 'Pending' && (
                        <button style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}>Reject</button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default PayoutsPage;
