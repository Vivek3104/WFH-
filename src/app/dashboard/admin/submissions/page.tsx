'use client';
import React from 'react';

const SubmissionsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>User <span className="gradient-text">Submissions</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Review and process work submitted by users.</p>
            </header>

            <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>TASK NAME</th>
                            <th>USER NAME</th>
                            <th>SUBMISSION PROOF</th>
                            <th>SUBMITTED DATE</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <SubmissionRow
                            taskName="Data Entry - CRM"
                            userName="Rahul Sharma"
                            proof="https://example.com/proof1"
                            date="2024-02-26, 10:45 AM"
                            status="Pending"
                        />
                        <SubmissionRow
                            taskName="Content Writing"
                            userName="Priya Patel"
                            proof="https://example.com/proof2"
                            date="2024-02-26, 09:30 AM"
                            status="Approved"
                        />
                        <SubmissionRow
                            taskName="Image Tagging"
                            userName="Amit Kumar"
                            proof="https://example.com/proof3"
                            date="2024-02-25, 04:20 PM"
                            status="Rejected"
                        />
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const SubmissionRow = ({ taskName, userName, proof, date, status }: any) => {
    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Approved': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
            case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
            case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
            default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af' };
        }
    };

    const statusStyle = getStatusColor(status);

    return (
        <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <td style={{ padding: '1.25rem', fontWeight: 600 }}>{taskName}</td>
            <td>{userName}</td>
            <td>
                <a href={proof} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    View Proof
                </a>
            </td>
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
                        <>
                            <button style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '6px',
                                border: '1px solid #10b981',
                                color: '#10b981',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}>Approve</button>
                            <button style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '6px',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}>Reject</button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default SubmissionsPage;
