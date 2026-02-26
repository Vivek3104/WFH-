'use client';
import React from 'react';

interface WalletCardProps {
    balance: number;
    pendingWithdrawals: number;
    totalEarned: number;
}

const WalletCard = ({ balance, pendingWithdrawals, totalEarned }: WalletCardProps) => {
    return (
        <div className="card glass" style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, #1a1a1a 100%)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            border: '1px solid rgba(124, 58, 237, 0.2)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Available Balance</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>
                        <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>₹</span>
                        {balance.toLocaleString()}
                    </h2>
                </div>
                <div style={{
                    background: 'var(--primary-glow)',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    color: 'var(--primary)'
                }}>
                    💰
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px'
            }}>
                <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Total Earned</p>
                    <p style={{ fontWeight: 700 }}>₹{totalEarned.toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Pending</p>
                    <p style={{ fontWeight: 700, color: '#f59e0b' }}>₹{pendingWithdrawals.toLocaleString()}</p>
                </div>
            </div>

            <button className="btn-primary" style={{
                width: '100%',
                background: 'linear-gradient(90deg, var(--primary), #9333ea)',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
            }}>
                Withdraw Funds
            </button>
        </div>
    );
};

export default WalletCard;
