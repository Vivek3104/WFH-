'use client';
import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Admin <span className="gradient-text">Console</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your workspace, reviews, and payouts.</p>
                </div>
                <Link href="/dashboard/admin/tasks/new" className="btn-primary">+ Create New Task</Link>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <StatCard title="Team Tasks" value="128" trend="+12 this month" />
                <StatCard title="Approval Queue" value="156" trend="+12 today" highlight />
                <StatCard title="Active Workers" value="242" trend="+15 this week" />
                <StatCard title="Approved Payouts" value="₹1,24,000" trend="+₹15k this week" />
                <StatCard title="Rejection Rate" value="4.2%" trend="-0.5% from last week" />
                <StatCard title="Team Performance" value="92%" trend="Stable" />
            </div>

            <section className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recent Activity</h2>
                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 600 }}>View All</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ActivityItem
                        user="Rahul Sharma"
                        action="submitted proof for"
                        target="Data Entry - CRM"
                        time="10:45 AM"
                    />
                    <ActivityItem
                        user="Priya Patel"
                        action="completed"
                        target="Content Writing Task"
                        time="09:30 AM"
                    />
                    <ActivityItem
                        user="System"
                        action="payout processed for"
                        target="Amit Kumar"
                        time="Yesterday"
                    />
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ title, value, trend, highlight = false }: any) => (
    <div className="card" style={{ border: highlight ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{value}</h3>
        <p style={{ fontSize: '0.75rem', color: trend.startsWith('+') ? '#10b981' : 'var(--text-muted)', marginTop: '0.5rem' }}>{trend}</p>
    </div>
);

const ActivityItem = ({ user, action, target, time }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: 'var(--surface-hover)',
        border: '1px solid var(--border)'
    }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 600 }}>{user}</span>
            <span style={{ color: 'var(--text-muted)' }}>{action}</span>
            <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{target}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{time}</span>
    </div>
);

export default AdminDashboard;
