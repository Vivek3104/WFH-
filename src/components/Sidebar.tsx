'use client';
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside style={{
            width: '260px',
            borderRight: '1px solid var(--border)',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: 'var(--background)'
        }}>
            <div style={{ padding: '0 1rem', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</p>
            </div>

            <SidebarLink href="/dashboard/user" icon="🏠" label="Overview" />
            <SidebarLink href="/dashboard/user/tasks" icon="📋" label="Available Tasks" />
            <SidebarLink href="/dashboard/user/history" icon="🕒" label="Work History" />
            <SidebarLink href="/dashboard/user/withdrawals" icon="💰" label="Withdrawals" />

            <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>
                    <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>John Doe</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Worker</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const SidebarLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
    <Link href={href} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
    }} onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface)';
        e.currentTarget.style.color = 'var(--foreground)';
    }} onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--text-muted)';
    }}>
        <span>{icon}</span>
        <span>{label}</span>
    </Link>
);

export default Sidebar;
