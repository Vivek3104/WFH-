'use client';
import React from 'react';

const WorkHistoryPage = () => {
    const submissions = [
        { id: 'SUB-101', task: 'Data Entry - CRM', payout: '₹450', date: '2024-12-25', status: 'Approved' },
        { id: 'SUB-102', task: 'Article Writing', payout: '₹1,200', date: '2024-12-26', status: 'Pending' },
        { id: 'SUB-103', task: 'Image Tagging', payout: '₹150', date: '2024-12-24', status: 'Rejected', reason: 'Low accuracy' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Work <span className="gradient-text">History</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Track the status of your submitted tasks and earnings.</p>
            </header>

            <section className="card shadow-lg" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>SUBMISSION ID</th>
                            <th>TASK NAME</th>
                            <th>PAYOUT</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                <td style={{ padding: '1.25rem', color: 'var(--primary)', fontWeight: 600 }}>{sub.id}</td>
                                <td style={{ fontWeight: 600 }}>{sub.task}</td>
                                <td style={{ fontWeight: 700 }}>{sub.payout}</td>
                                <td>{sub.date}</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        background: sub.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : sub.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: sub.status === 'Approved' ? '#10b981' : sub.status === 'Pending' ? '#f59e0b' : '#ef4444',
                                        border: sub.status === 'Approved' ? '1px solid rgba(16, 185, 129, 0.2)' : sub.status === 'Pending' ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                                    }}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>👁️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default WorkHistoryPage;
