'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuthStore();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('Overview');

    const sidebarItems = [
        { name: 'Overview', path: '/dashboard/user', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Tasks', path: '/dashboard/user/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'History', path: '/dashboard/user/history', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'Profile', path: '/dashboard/user/profile', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Withdrawals', path: '/dashboard/user/withdrawals', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { name: 'Settings', path: '/dashboard/user/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
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
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0B0F19',
            color: '#ffffff',
            overflow: 'hidden',
            fontFamily: 'var(--font-sans)'
        }}>
            {/* Custom Sidebar */}
            <aside style={{
                width: '100px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 0',
                gap: '2rem',
                backgroundColor: '#0B0F19',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
                </div>

                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    marginBottom: '2rem'
                }}>
                    T
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
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
            </aside>

            {/* Main Content Area Wrapper */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Topbar */}
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem 2.5rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="/dashboard/user" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}>Overview</Link>
                        <Link href="/dashboard/user/history" style={{ color: '#6B7280', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>History</Link>
                        <Link href="/dashboard/user/tasks" style={{ color: '#6B7280', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>Tasks</Link>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderRadius: '24px',
                            padding: '0.6rem 1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            width: '300px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
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



                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                            <img src={user?.avatar || "https://i.pravatar.cc/150?u=current"} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
