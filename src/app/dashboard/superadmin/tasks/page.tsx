'use client';
import React from 'react';
import Link from 'next/link';

const TasksPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Manage <span className="gradient-text">Tasks</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create, edit, and track all platform tasks.</p>
                </div>
                <Link href="/dashboard/superadmin/tasks/new" className="btn-primary">+ Create Task</Link>
            </header>

            <div className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'white'
                    }}
                />
                <select style={{
                    padding: '0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'white',
                    width: '150px'
                }}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Paused</option>
                    <option>Completed</option>
                </select>
            </div>

            <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.25rem' }}>TASK ID</th>
                            <th>TITLE</th>
                            <th>PAYOUT</th>
                            <th>DEADLINE</th>
                            <th>MAX USERS</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TaskRow
                            id="T-1001"
                            title="Data Entry - CRM Update"
                            payout="₹50"
                            deadline="2024-03-01"
                            maxUsers="100"
                            status="Active"
                        />
                        <TaskRow
                            id="T-1002"
                            title="Product Review Writing"
                            payout="₹120"
                            deadline="2024-03-05"
                            maxUsers="50"
                            status="Draft"
                        />
                        <TaskRow
                            id="T-1003"
                            title="App Testing - Android"
                            payout="₹200"
                            deadline="2024-02-28"
                            maxUsers="20"
                            status="Paused"
                        />
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const TaskRow = ({ id, title, payout, deadline, maxUsers, status }: any) => {
    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Active': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
            case 'Draft': return { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af' };
            case 'Paused': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
            default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af' };
        }
    };

    const statusStyle = getStatusColor(status);

    return (
        <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <td style={{ padding: '1.25rem' }}>{id}</td>
            <td style={{ fontWeight: 600 }}>{title}</td>
            <td>{payout}</td>
            <td>{deadline}</td>
            <td>{maxUsers}</td>
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
                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>👁️</button>
                    <button style={{ color: 'var(--secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>✏️</button>
                    <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>🗑️</button>
                </div>
            </td>
        </tr>
    );
};

export default TasksPage;
