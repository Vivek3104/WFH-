'use client';

import React from 'react';
import axios from 'axios';
import { authService, extractApiList, normalizeSubmission } from '@/services/api';

const getStatusStyles = (status: string) => {
    const normalized = status.toLowerCase();

    if (normalized === 'approved' || normalized === 'completed') {
        return {
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.2)',
        };
    }

    if (normalized === 'rejected' || normalized === 'failed') {
        return {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
        };
    }

    return {
        background: 'rgba(245, 158, 11, 0.1)',
        color: '#f59e0b',
        border: '1px solid rgba(245, 158, 11, 0.2)',
    };
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const WorkHistoryPage = () => {
    const [submissions, setSubmissions] = React.useState<ReturnType<typeof normalizeSubmission>[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await authService.getWorkHistory();
                setSubmissions(extractApiList(response.data).map(normalizeSubmission));
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 400) {
                    setSubmissions([]);
                    setError('');
                } else {
                    setError('Unable to load your work history right now.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    return (
        <div className="responsive-page">
            <header>
                <h1 className="responsive-title">Work <span className="gradient-text">History</span></h1>
                <p className="responsive-subtitle">Track the status of your submitted tasks and earnings.</p>
            </header>

            <section className="card shadow-lg" style={{ padding: 0, overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading submissions...</div>
                ) : error ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>{error}</div>
                ) : submissions.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No submissions yet.</div>
                ) : (
                    <div className="responsive-table">
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
                                {submissions.map((submission) => {
                                    const statusStyles = getStatusStyles(submission.status);

                                    return (
                                        <tr key={submission.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                            <td style={{ padding: '1.25rem', color: 'var(--primary)', fontWeight: 600 }}>
                                                {submission.id || 'N/A'}
                                            </td>
                                            <td style={{ fontWeight: 600 }}>{submission.task}</td>
                                            <td style={{ fontWeight: 700 }}>{formatCurrency(submission.payout)}</td>
                                            <td>{new Date(submission.date).toLocaleDateString()}</td>
                                            <td>
                                                <span style={{ padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', ...statusStyles }}>
                                                    {submission.status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '1.25rem', color: 'var(--text-muted)' }}>
                                                {submission.details || 'No notes'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default WorkHistoryPage;
