'use client';
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
    const { user, isAuthenticated } = useAuthStore();
    const dashboardLink = user?.role ? `/dashboard/${user.role}` : '/dashboard/user';

    return (
        <nav style={{
            height: '70px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
                    <span className="gradient-text">WFH</span> PLATFORM
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href={dashboardLink} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Dashboard</Link>
                <Link href="/login" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
