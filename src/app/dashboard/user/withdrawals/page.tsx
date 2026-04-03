'use client';

import React from 'react';
import axios from 'axios';
import { authService, extractApiList, normalizeSubmission, normalizeWithdrawal } from '@/services/api';

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const WithdrawalsPage = () => {
    const [amount, setAmount] = React.useState('');
    const [history, setHistory] = React.useState<ReturnType<typeof normalizeWithdrawal>[]>([]);
    const [availableBalance, setAvailableBalance] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const loadWithdrawalData = React.useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const [withdrawalsResponse, historyResult] = await Promise.allSettled([
                authService.getWithdrawals(),
                authService.getWorkHistory(),
            ]);

            if (withdrawalsResponse.status !== 'fulfilled') {
                throw withdrawalsResponse.reason;
            }

            const withdrawals = extractApiList(withdrawalsResponse.value.data).map(normalizeWithdrawal);
            const submissions =
                historyResult.status === 'fulfilled'
                    ? extractApiList(historyResult.value.data).map(normalizeSubmission)
                    : axios.isAxiosError(historyResult.reason) && historyResult.reason.response?.status === 400
                        ? []
                        : (() => {
                            throw historyResult.reason;
                        })();

            const approvedEarnings = submissions
                .filter((submission) => ['approved', 'completed'].includes(submission.status.toLowerCase()))
                .reduce((total, submission) => total + submission.payout, 0);

            const requestedAmount = withdrawals
                .filter((withdrawal) => withdrawal.status.toLowerCase() !== 'rejected')
                .reduce((total, withdrawal) => total + withdrawal.amount, 0);

            setHistory(withdrawals);
            setAvailableBalance(Math.max(0, approvedEarnings - requestedAmount));
        } catch (err) {
            setError('Unable to load withdrawal details right now.');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        loadWithdrawalData();
    }, [loadWithdrawalData]);

    const handleRequestWithdrawal = async () => {
        const requestedAmount = Number(amount);

        if (!Number.isFinite(requestedAmount) || requestedAmount <= 0) {
            setMessage('Enter a valid withdrawal amount.');
            return;
        }

        try {
            setSubmitting(true);
            setMessage('');
            await authService.requestWithdrawal({ amount: requestedAmount });
            setAmount('');
            setMessage('Withdrawal request submitted successfully.');
            await loadWithdrawalData();
        } catch (err) {
            setMessage('Failed to submit withdrawal request.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="responsive-page">
            <header className="responsive-header">
                <div>
                    <h1 className="responsive-title">My <span className="gradient-text">Earnings</span></h1>
                    <p className="responsive-subtitle">Request withdrawals and view your payment history.</p>
                </div>
                <div className="mobile-full-width" style={{ padding: '1rem 2rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--primary)', textAlign: 'center', maxWidth: '280px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Balance</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>{formatCurrency(availableBalance)}</p>
                </div>
            </header>

            <div className="user-balance-layout">
                <section className="card shadow-lg" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Withdrawal History</h3>
                    </div>

                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading withdrawals...</div>
                    ) : error ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>{error}</div>
                    ) : history.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No withdrawal requests yet.</div>
                    ) : (
                        <div className="responsive-table">
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
                                    {history.map((item) => {
                                        const isPaid = item.status.toLowerCase() === 'paid' || item.status.toLowerCase() === 'approved';

                                        return (
                                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                                <td style={{ padding: '1.25rem', color: 'var(--primary)' }}>{item.id || 'N/A'}</td>
                                                <td style={{ fontWeight: 700 }}>{formatCurrency(item.amount)}</td>
                                                <td>{item.method}</td>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td>
                                                    <span
                                                        style={{
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '4px',
                                                            fontSize: '0.75rem',
                                                            background: isPaid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                            color: isPaid ? '#10b981' : '#f59e0b',
                                                        }}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="card shadow-lg" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Withdraw Funds</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Amount (₹)</label>
                            <input
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                placeholder="Enter amount"
                                className="input-glass"
                                style={{ width: '100%', padding: '0.75rem' }}
                            />
                        </div>
                        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={handleRequestWithdrawal} disabled={submitting || loading}>
                            {submitting ? 'Requesting...' : 'Request Payout'}
                        </button>
                        {message ? (
                            <p style={{ fontSize: '0.8rem', color: message.includes('successfully') ? '#10b981' : '#f59e0b', textAlign: 'center' }}>
                                {message}
                            </p>
                        ) : null}
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
