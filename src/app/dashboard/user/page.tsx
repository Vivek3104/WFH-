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
                    <div style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-1.5px' }}>
                        Welcome, <span className="gradient-text">John!</span>
                    </h1>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div className="card shadow-lg" style={{ border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PENDING CLEARANCE</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹5,420</h3>
                    <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '0.5rem', fontWeight: 600 }}>Waiting for approval</p>
                </div>
                <div className="card shadow-lg" style={{ border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TOTAL EARNED</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹24,500</h3>
                    <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 600 }}>+₹1,200 this week</p>
                </div>
                <div className="card shadow-lg" style={{ border: '1px solid var(--primary)', background: 'rgba(124, 58, 237, 0.05)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>AVAILABLE WORK</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>45</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>New tasks posted today</p>
                </div>
            </div>

            <section style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)',
                gap: '3rem',
                alignItems: 'start'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Recommended <span style={{ color: 'var(--primary)' }}>Tasks</span></h2>
                        <button className="btn-secondary">View All</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {tasks.map(task => <TaskCard key={task.id} {...task} />)}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div className="card glass">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Score</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>850</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>/ 1000</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '4px' }}></div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '1rem', fontWeight: 700 }}>Excellent Performance Rank</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
