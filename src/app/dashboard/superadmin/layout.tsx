'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function SuperadminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const sidebarItems = [
        { name: 'Overview', path: '/dashboard/superadmin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Admins', path: '/dashboard/superadmin/admins', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { name: 'Tasks', path: '/dashboard/superadmin/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'Submissions', path: '/dashboard/superadmin/submissions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { name: 'Users', path: '/dashboard/superadmin/users', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
        { name: 'Payouts', path: '/dashboard/superadmin/payouts', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { name: 'System', path: '/dashboard/superadmin/system', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
        { name: 'Profile', path: '/dashboard/superadmin/profile', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    ];

    const topNavLinks = [
        { label: 'Overview', href: '/dashboard/superadmin' },
        { label: 'Admins', href: '/dashboard/superadmin/admins' },
        { label: 'Users', href: '/dashboard/superadmin/users' },
        { label: 'System', href: '/dashboard/superadmin/system' },
    ];

    useEffect(() => {
        const currentItem = sidebarItems.find(item => {
            if (item.path === '/dashboard/superadmin' && pathname === '/dashboard/superadmin') return true;
            if (item.path !== '/dashboard/superadmin' && pathname.startsWith(item.path)) return true;
            return false;
        });
        if (currentItem) setActiveTab(currentItem.name);
    }, [pathname]);

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0B0F19',
            color: '#ffffff',
            overflow: 'hidden',
            fontFamily: 'var(--font-sans)'
        }}>
            {/* Icon Sidebar */}
            <aside style={{
                width: '80px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.25rem 0',
                backgroundColor: '#0B0F19',
                zIndex: 10,
                flexShrink: 0,
            }}>
                {/* Top: traffic dots + avatar grouped */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        border: '2px solid rgba(245,158,11,0.4)',
                        flexShrink: 0,
                    }}>
                        {user?.name ? user.name.substring(0, 1).toUpperCase() : 'S'}
                    </div>
                </div>

                {/* Nav icons */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%', alignItems: 'center' }}>
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            title={item.name}
                            style={{
                                color: activeTab === item.name ? '#A78BFA' : '#6B7280',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: activeTab === item.name ? 'rgba(124,58,237,0.12)' : 'transparent',
                                position: 'relative',
                                textDecoration: 'none',
                            }}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {activeTab === item.name && (
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '3px',
                                    height: '22px',
                                    backgroundColor: '#A78BFA',
                                    borderRadius: '0 4px 4px 0',
                                    boxShadow: '0 0 8px #A78BFA',
                                }} />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6B7280',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            width: '44px',
                            height: '44px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)';
                            e.currentTarget.style.color = '#EF4444';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#6B7280';
                        }}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Topbar */}
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 2.5rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    flexShrink: 0,
                }}>
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        {topNavLinks.map((link) => {
                            const isActive = link.href === '/dashboard/superadmin'
                                ? pathname === '/dashboard/superadmin'
                                : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        color: isActive ? '#fff' : '#6B7280',
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '1rem',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        borderBottom: isActive ? '2px solid #A78BFA' : '2px solid transparent',
                                        paddingBottom: '2px',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {/* Search */}
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderRadius: '24px',
                            padding: '0.55rem 1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            width: '260px',
                            border: '1px solid rgba(255,255,255,0.07)',
                            gap: '0.6rem',
                        }}>
                            <svg style={{ width: '16px', height: '16px', color: '#6B7280', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search admins, platform..."
                                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.875rem' }}
                            />
                        </div>

                        {/* Notification */}
                        <button
                            onClick={() => alert('No new notifications!')}
                            style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', position: 'relative', padding: '0.25rem' }}
                        >
                            <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid #0B0F19' }} />
                        </button>

                        {/* Avatar */}
                        <div
                            onClick={() => router.push('/dashboard/superadmin/profile')}
                            style={{
                                width: '38px', height: '38px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                                border: '2px solid rgba(245,158,11,0.35)',
                                flexShrink: 0,
                            }}
                        >
                            {user?.name ? user.name.substring(0, 1).toUpperCase() : 'S'}
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }} className="custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
