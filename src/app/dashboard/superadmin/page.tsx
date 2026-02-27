'use client';
import React from 'react';
import Link from 'next/link';

const SuperAdminDashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Master <span className="gradient-text">Statistics</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Global overview of platform growth, revenue, and infrastructure.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary">Download Export</button>
                    <button className="btn-primary">Platform Alert</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <StatCard title="Total Platform Revenue" value="₹45,82,000" trend="+18% this month" highlight />
                <StatCard title="Active Administrators" value="12" trend="3 pending approval" />
                <StatCard title="Total Platform Workers" value="8,402" trend="+1.2k this week" highlight />
                <StatCard title="Active Tasks System-wide" value="1,248" trend="45 posted today" />
                <StatCard title="System Load/Health" value="99.9%" trend="Stable" />
                <StatCard title="Overall Success Rate" value="94.2%" trend="+0.5% from last month" />
            </div>

            <section className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Global Activity Logs</h2>
                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 600 }}>System Logs</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <LogItem role="Super Admin" action="updated system fees to" target="10%" time="2 mins ago" />
                    <LogItem role="Admin (Alice)" action="suspended worker" target="Rahul Sharma" time="15 mins ago" />
                    <LogItem role="Admin (Bob)" action="approved withdrawal for" target="₹25,000" time="1 hour ago" />
                    <LogItem role="System" action="auto-cleared cache for" target="Static Assets" time="3 hours ago" />
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ title, value, trend, highlight = false }: any) => (
    <div className="card" style={{ border: highlight ? '2px solid var(--primary)' : '1px solid var(--border)', background: highlight ? 'rgba(124, 58, 237, 0.05)' : 'var(--surface)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '2.1rem', fontWeight: 800 }}>{value}</h3>
        <p style={{ fontSize: '0.75rem', color: trend.includes('+') ? '#10b981' : trend === 'Stable' ? '#3b82f6' : 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>{trend}</p>
    </div>
);

const LogItem = ({ role, action, target, time }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.1rem',
        borderRadius: '8px',
        backgroundColor: 'var(--surface-hover)',
        border: '1px solid var(--border)'
    }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 700 }}>{role}</span>
            <span style={{ color: 'var(--text-muted)' }}>{action}</span>
            <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{target}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{time}</span>
    </div>
);

export default SuperAdminDashboard;
