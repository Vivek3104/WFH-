'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function UserDashboardLayout({
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
        { name: 'Overview', path: '/dashboard/user', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Tasks', path: '/dashboard/user/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'History', path: '/dashboard/user/history', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'Profile', path: '/dashboard/user/profile', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { name: 'Referral', path: '/dashboard/user/referral', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { name: 'Withdrawals', path: '/dashboard/user/withdrawals', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { name: 'Settings', path: '/dashboard/user/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
    ];

    const topNavLinks = [
        { label: 'Overview', href: '/dashboard/user' },
        { label: 'History', href: '/dashboard/user/history' },
        { label: 'Tasks', href: '/dashboard/user/tasks' },
        { label: 'Profile', href: '/dashboard/user/profile' },
    ];

    useEffect(() => {
        // Find the active tab based on pathname
        const currentItem = sidebarItems.find(item => {
            if (item.path === '/dashboard/user' && pathname === '/dashboard/user') return true;
            if (item.path !== '/dashboard/user' && pathname.startsWith(item.path)) return true;
            return false;
        });
        if (currentItem) setActiveTab(currentItem.name);
    }, [pathname]);

    return (
        <div className="dashboard-shell">
            {/* Custom Sidebar */}
            <aside className="dashboard-sidebar">
                {/* Top: traffic dots + avatar grouped */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    </div>
                    <div
                        onClick={() => router.push('/dashboard/user/profile')}
                        title="Profile"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#F59E0B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '2px solid rgba(255,255,255,0.1)',
                            flexShrink: 0,
                        }}
                    >
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            user?.name ? user.name.substring(0, 1).toUpperCase() : 'T'
                        )}
                    </div>
                </div>

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
                                backgroundColor: activeTab === item.name ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                                position: 'relative',
                                textDecoration: 'none'
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {activeTab === item.name && (
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '4px',
                                    height: '24px',
                                    backgroundColor: '#A78BFA',
                                    borderRadius: '0 4px 4px 0',
                                    boxShadow: '0 0 10px #A78BFA'
                                }}></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button at bottom */}
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
                            width: '48px',
                            height: '48px',
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

            {/* Main Content Area Wrapper */}
            <div className="dashboard-main">
                {/* Topbar */}
                <header className="dashboard-header">
                    <nav className="dashboard-topnav">
                        {topNavLinks.map((link) => {
                            const isActive = link.href === '/dashboard/user'
                                ? pathname === '/dashboard/user'
                                : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}  
                                    style={{
                                        color: isActive ? '#fff' : '#6B7280',
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '1.1rem',
                                        textDecoration: 'none',
                                        borderBottom: isActive ? '2px solid #A78BFA' : '2px solid transparent',
                                        paddingBottom: '2px',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="dashboard-actions">
                        <div className="dashboard-search">
                            <svg style={{ width: '18px', height: '18px', color: '#6B7280', marginRight: '0.8rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search project, name..."
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    width: '100%',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>

                        <button
                            onClick={() => alert('No new notifications!')}
                            style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', position: 'relative' }}>
                            <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid #0B0F19' }}></div>
                        </button>
                        <div
                            onClick={() => router.push('/dashboard/user/profile')}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', flexShrink: 0 }}
                        >
                            <img src={user?.avatar || "https://i.pravatar.cc/150?u=current"} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </header>

                <main className="dashboard-main-content custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
