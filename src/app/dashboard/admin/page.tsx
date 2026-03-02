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
    transition: 'border-color 0.2s, transform 0.2s',
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
        {/* subtle glow */}
        <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: accent, opacity: 0.08, filter: 'blur(30px)',
            pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
            color: trendUp === true ? '#10B981' : trendUp === false ? '#F43F5E' : '#6B7280',
        }}>
            {trendUp === true ? '↑ ' : trendUp === false ? '↓ ' : ''}{trend}
        </p>
    </div>
);

const ActivityItem = ({ user, action, target, time, badge }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.9rem 1.1rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.2s',
        gap: '1rem',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', minWidth: 0 }}>
            <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem',
            }}>
                {user.substring(0, 2).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span>{user}</span>{' '}
                    <span style={{ color: '#6B7280', fontWeight: 400 }}>{action}</span>{' '}
                    <span style={{ color: '#A78BFA' }}>{target}</span>
                </p>
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            {badge && (
                <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem',
                    borderRadius: '999px', background: 'rgba(124,58,237,0.15)',
                    color: '#A78BFA', border: '1px solid rgba(124,58,237,0.2)',
                }}>{badge}</span>
            )}
            <span style={{ fontSize: '0.78rem', color: '#4B5563', whiteSpace: 'nowrap' }}>{time}</span>
        </div>
    </div>
);

export default function AdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500, marginBottom: '0.25rem' }}>
                        Welcome back, {user?.name || 'Admin'} 👋
                    </p>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1 }}>
                        Admin{' '}
                        <span style={{ background: 'linear-gradient(90deg,#A78BFA,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Console
                        </span>
                    </h1>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                        Manage your workspace, reviews, and payouts.
                    </p>
                </div>
                <Link
                    href="/dashboard/admin/tasks/new"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.7rem 1.4rem', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                        color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                        textDecoration: 'none', border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                        transition: 'opacity 0.2s',
                        flexShrink: 0,
                    }}
                >
                    + Create Task
                </Link>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                <KPICard title="Team Tasks" value="128" trend="+12 this month" trendUp icon="📋" accent="#7C3AED" />
                <KPICard title="Approval Queue" value="156" trend="+12 today" trendUp icon="⏳" accent="#F59E0B" />
                <KPICard title="Active Workers" value="242" trend="+15 this week" trendUp icon="👥" accent="#3B82F6" />
                <KPICard title="Approved Payouts" value="₹1,24,000" trend="+₹15k this week" trendUp icon="💰" accent="#10B981" />
                <KPICard title="Rejection Rate" value="4.2%" trend="-0.5% from last week" trendUp={false} icon="🚫" accent="#EF4444" />
                <KPICard title="Team Performance" value="92%" trend="Stable" icon="📈" accent="#8B5CF6" />
            </div>

            {/* Two-column section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>

                {/* Recent Activity */}
                <div style={{ ...glassCard, padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Activity</h2>
                        <button style={{ color: '#A78BFA', background: 'none', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                            View All →
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <ActivityItem user="Rahul Sharma" action="submitted proof for" target="Data Entry - CRM" time="10:45 AM" badge="Pending" />
                        <ActivityItem user="Priya Patel" action="completed" target="Content Writing Task" time="09:30 AM" badge="Done" />
                        <ActivityItem user="Amit Kumar" action="requested payout of" target="₹8,500" time="Yesterday" badge="Pending" />
                        <ActivityItem user="System" action="auto-processed" target="5 expired tasks" time="Yesterday" />
                        <ActivityItem user="Neha Singh" action="joined workspace" target="Operations Team" time="2 days ago" />
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ ...glassCard, padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {[
                                { label: 'Review Submissions', href: '/dashboard/admin/submissions', icon: '📩' },
                                { label: 'Approve Payouts', href: '/dashboard/admin/payouts', icon: '💸' },
                                { label: 'Manage Workers', href: '/dashboard/admin/users', icon: '👷' },
                                { label: 'Daily Reports', href: '/dashboard/admin/reports', icon: '📊' },
                            ].map(({ label, href, icon }) => (
                                <Link key={href} href={href} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.03)',
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

                    {/* Status pill */}
                    <div style={{ ...glassCard, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: '0.82rem', fontWeight: 600 }}>System Operational</p>
                            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>All services running normally</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
