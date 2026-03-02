'use client';
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

// ─── Shared card styles ───────────────────────────────────────────────────────
const glassCard: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
};

const KPICard = ({
    title, value, trend, trendUp, icon, accent,
}: {
    title: string; value: string; trend: string; trendUp?: boolean; icon: string; accent: string;
}) => (
    <div style={{
        ...glassCard,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
    }}>
        {/* Glow blob */}
        <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: accent, opacity: 0.09, filter: 'blur(30px)',
            pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {title}
            </p>
            <span style={{
                fontSize: '1.1rem', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px', background: `${accent}18`,
            }}>{icon}</span>
        </div>

        <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</p>

        <p style={{
            fontSize: '0.78rem', fontWeight: 500,
            color: trendUp === true ? '#10B981' : trendUp === false ? '#F43F5E' : '#3B82F6',
        }}>
            {trendUp === true ? '↑ ' : trendUp === false ? '↓ ' : ''}{trend}
        </p>
    </div>
);

const LogItem = ({ actor, action, target, time, badge }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.9rem 1.1rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        gap: '1rem',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', minWidth: 0 }}>
            <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem',
            }}>
                {actor.substring(0, 2).toUpperCase()}
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: 0 }}>
                <span style={{ fontWeight: 700 }}>{actor} </span>
                <span style={{ color: '#6B7280' }}>{action} </span>
                <span style={{ color: '#A78BFA' }}>{target}</span>
            </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            {badge && (
                <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem',
                    borderRadius: '999px', background: 'rgba(245,158,11,0.12)',
                    color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)',
                }}>{badge}</span>
            )}
            <span style={{ fontSize: '0.78rem', color: '#4B5563', whiteSpace: 'nowrap' }}>{time}</span>
        </div>
    </div>
);

export default function SuperAdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500, marginBottom: '0.25rem' }}>
                        Welcome back, {user?.name || 'Superadmin'} 👑
                    </p>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1 }}>
                        Master{' '}
                        <span style={{ background: 'linear-gradient(90deg,#F59E0B,#EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Statistics
                        </span>
                    </h1>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                        Global overview of platform growth, revenue, and infrastructure.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                    <button style={{
                        padding: '0.65rem 1.25rem', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#D1D5DB', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    }}>
                        ↓ Export
                    </button>
                    <button style={{
                        padding: '0.65rem 1.25rem', borderRadius: '12px',
                        background: 'linear-gradient(135deg,#F59E0B,#EF4444)',
                        border: 'none', color: '#fff',
                        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                    }}>
                        🚨 Platform Alert
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
                <KPICard title="Platform Revenue" value="₹45.8L" trend="+18% this month" trendUp icon="💹" accent="#10B981" />
                <KPICard title="Active Admins" value="12" trend="3 pending approval" icon="🛡️" accent="#7C3AED" />
                <KPICard title="Platform Workers" value="8,402" trend="+1.2k this week" trendUp icon="👥" accent="#3B82F6" />
                <KPICard title="Active Tasks" value="1,248" trend="45 posted today" trendUp icon="📋" accent="#F59E0B" />
                <KPICard title="System Health" value="99.9%" trend="All services healthy" icon="💚" accent="#10B981" />
                <KPICard title="Success Rate" value="94.2%" trend="+0.5% from last month" trendUp icon="📈" accent="#8B5CF6" />
            </div>

            {/* Two-column section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>

                {/* Global Activity Logs */}
                <div style={{ ...glassCard, padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Global Activity Logs</h2>
                        <button style={{ color: '#A78BFA', background: 'none', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                            System Logs →
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <LogItem actor="Super Admin" action="updated system fees to" target="10%" time="2 mins ago" badge="Config" />
                        <LogItem actor="Admin Alice" action="suspended worker" target="Rahul Sharma" time="15 mins ago" badge="Action" />
                        <LogItem actor="Admin Bob" action="approved withdrawal for" target="₹25,000" time="1 hour ago" badge="Payout" />
                        <LogItem actor="System" action="auto-cleared cache for" target="Static Assets" time="3 hours ago" />
                        <LogItem actor="Admin Carol" action="created new task batch of" target="50 tasks" time="5 hours ago" badge="Tasks" />
                    </div>
                </div>

                {/* Sidebar Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Quick Actions */}
                    <div style={{ ...glassCard, padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Platform Controls</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {[
                                { label: 'Manage Admins', href: '/dashboard/superadmin/admins', icon: '🛡️' },
                                { label: 'All Submissions', href: '/dashboard/superadmin/submissions', icon: '📩' },
                                { label: 'Platform Payouts', href: '/dashboard/superadmin/payouts', icon: '💸' },
                                { label: 'System Settings', href: '/dashboard/superadmin/system', icon: '⚙️' },
                            ].map(({ label, href, icon }) => (
                                <Link key={href} href={href} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.75rem 1rem', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    color: '#D1D5DB', fontSize: '0.875rem', fontWeight: 500,
                                    textDecoration: 'none', transition: 'all 0.2s',
                                }}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                    <span style={{ marginLeft: 'auto', color: '#6B7280' }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Health */}
                    <div style={{ ...glassCard, padding: '1.25rem' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Platform Health</h3>
                        {[
                            { label: 'API Gateway', status: 'Operational', ok: true },
                            { label: 'Database', status: 'Operational', ok: true },
                            { label: 'Auth Service', status: 'Operational', ok: true },
                            { label: 'File Storage', status: 'Degraded', ok: false },
                        ].map(({ label, status, ok }) => (
                            <div key={label} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.45rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}>
                                <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{label}</span>
                                <span style={{
                                    fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.5rem',
                                    borderRadius: '999px',
                                    background: ok ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                                    color: ok ? '#10B981' : '#F59E0B',
                                }}>{status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
