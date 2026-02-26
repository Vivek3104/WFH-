'use client';
import React from 'react';
import TaskCard from '@/components/TaskCard';
import WalletCard from '@/components/WalletCard';

const UserDashboard = () => {
    // Mock data for demonstration
    const tasks = [
        { id: '1', title: 'Data Entry - E-commerce Products', category: 'Data Entry', payout: 450, deadline: '2024-12-30' },
        { id: '2', title: 'Article Writing - Tech Blog', category: 'Content Writing', payout: 1200, deadline: '2024-12-28' },
        { id: '3', title: 'Image Tagging for AI Training', category: 'Micro-task', payout: 150, deadline: '2024-12-31' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Optimized Header */}
            <header style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '4px',
                        height: '40px',
                        background: 'var(--primary)',
                        borderRadius: '2px'
                    }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-1.5px' }}>
                        Welcome back, <span className="gradient-text">John!</span>
                    </h1>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginLeft: '1.25rem' }}>
                    You have <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>3 recommended tasks</span> waiting for you.
                </p>
            </header>

            <section style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)',
                gap: '3rem',
                alignItems: 'start'
            }}>
                {/* Main Task List Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Available <span style={{ color: 'var(--primary)' }}>Work</span></h2>
                        <button style={{
                            color: 'var(--primary)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: 'rgba(124, 58, 237, 0.1)',
                            border: '1px solid rgba(124, 58, 237, 0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>View All Tasks</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {tasks.map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))}
                    </div>
                </div>

                {/* Sidebar Column (Wallet & Score) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'sticky', top: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Financial Overview</h2>
                        <WalletCard balance={5420} pendingWithdrawals={1200} totalEarned={24500} />
                    </div>

                    <div className="card glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Performance</h3>
                            <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>Excellent</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>850</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>/ 1000</span>
                        </div>

                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                width: '85%',
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                borderRadius: '4px'
                            }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
