'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

type SidebarItem = {
    name: string;
    path: string;
    icon: string;
};

const sidebarItems: SidebarItem[] = [
    { name: 'Overview', path: '/dashboard/user', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Tasks', path: '/dashboard/user/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'History', path: '/dashboard/user/history', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Profile', path: '/dashboard/user/profile', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Referral', path: '/dashboard/user/referral', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Withdrawals', path: '/dashboard/user/withdrawals', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Settings', path: '/dashboard/user/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        const currentItem = sidebarItems.find((item) => {
            if (item.path === '/dashboard/user' && pathname === '/dashboard/user') return true;
            if (item.path !== '/dashboard/user' && pathname.startsWith(item.path)) return true;
            return false;
        });
        if (currentItem) setActiveTab(currentItem.name);
    }, [pathname]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

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
                width: '80px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.25rem 0',
                backgroundColor: '#0B0F19',
                zIndex: 10
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
                        background: '#F59E0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#fff',
                    }}>
                        {user?.name ? user.name.substring(0, 1).toUpperCase() : 'T'}
                    </div>
                </div>

                <nav className="flex flex-1 items-center gap-1 overflow-x-auto md:flex-col md:items-center md:justify-start">
                    {sidebarItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                title={item.name}
                                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${isActive
                                    ? 'bg-primary/10 text-violet-300'
                                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-r bg-violet-400 shadow-[0_0_10px_#A78BFA] md:block" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="ml-auto shrink-0 md:ml-0 md:mt-auto">
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-500"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-5.5 w-5.5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
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
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                            />
                        </div>

                        <button
                            onClick={() => alert('No new notifications!')}
                            className="relative rounded-full p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                        >
                            <svg className="h-5.5 w-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-[#0B0F19] bg-red-500" />
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
