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
        <div className="flex min-h-screen flex-col bg-[#0B0F19] text-white md:flex-row">
            <aside className="flex w-full items-center gap-3 overflow-x-auto border-b border-white/5 bg-[#0B0F19] px-4 py-4 md:w-20 md:flex-col md:border-b-0 md:border-r md:px-0 md:py-5">
                <div className="flex shrink-0 items-center gap-3 md:mb-5 md:flex-col">
                    <div className="flex gap-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
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
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-[22px] w-[22px]">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex flex-col gap-4 border-b border-white/5 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <nav className="flex gap-4 overflow-x-auto pb-1 text-base md:gap-8 md:text-lg">
                        <Link href="/dashboard/user" className={`${pathname === '/dashboard/user' ? 'text-white' : 'text-slate-500'} font-semibold transition hover:text-white`}>
                            Overview
                        </Link>
                        <Link href="/dashboard/user/history" className={`${pathname.startsWith('/dashboard/user/history') ? 'text-white' : 'text-slate-500'} font-medium transition hover:text-white`}>
                            History
                        </Link>
                        <Link href="/dashboard/user/tasks" className={`${pathname.startsWith('/dashboard/user/tasks') ? 'text-white' : 'text-slate-500'} font-medium transition hover:text-white`}>
                            Tasks
                        </Link>
                    </nav>

                    <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:flex-nowrap lg:gap-6">
                        <div className="flex w-full items-center rounded-full border border-white/5 bg-white/5 px-4 py-2.5 lg:w-[300px]">
                            <svg className="mr-3 h-[18px] w-[18px] text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <svg className="h-[22px] w-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-[#0B0F19] bg-red-500" />
                        </button>

                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/10">
                            <img src={user?.avatar || 'https://i.pravatar.cc/150?u=current'} alt="Profile" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </header>

                <main className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4 md:px-6 lg:px-10 lg:py-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
