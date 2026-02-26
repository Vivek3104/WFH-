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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatCard title="Active Tasks" value="24" trend="+3 this week" />
                <StatCard title="Pending Reviews" value="156" trend="+12 today" highlight />
                <StatCard title="Total Payouts" value="₹1,24,000" trend="+₹15k this month" />
                <StatCard title="Total Users" value="1,240" trend="+45 new users" />
            </div>

            <section className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recent Submissions</h2>
                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 600 }}>Review All</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1rem 0' }}>USER</th>
                            <th>TASK</th>
                            <th>SUBMISSION DATE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow user="Rahul Sharma" task="Data Entry - CRM" date="Today, 10:45 AM" status="Pending" />
                        <TableRow user="Priya Patel" task="Content Writing" date="Today, 09:30 AM" status="Pending" />
                        <TableRow user="Amit Kumar" task="Image Tagging" date="Yesterday, 04:20 PM" status="Pending" />
                    </tbody>
                </table>
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

const TableRow = ({ user, task, date, status }: any) => (
    <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
        <td style={{ padding: '1.25rem 0' }}>{user}</td>
        <td>{task}</td>
        <td>{date}</td>
        <td>
            <span style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>{status}</span>
        </td>
        <td>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Review</button>
        </td>
    </tr>
);

export default AdminDashboard;
