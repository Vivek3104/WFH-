'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const isAdmin = pathname.startsWith('/dashboard/admin');
    const isSuperAdmin = pathname.startsWith('/dashboard/superadmin');

    const getMenuTitle = () => {
        if (isSuperAdmin) return 'Super Admin Menu';
        if (isAdmin) return 'Admin Menu';
        return 'Menu';
    };

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        router.push('/');
    };

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
            <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {getMenuTitle()}
                </p>
            </div>

            {isSuperAdmin ? (
                <>
                    <SidebarLink href="/dashboard/superadmin" icon="📊" label="Overview" active={pathname === '/dashboard/superadmin'} />
                    <SidebarLink href="/dashboard/superadmin/admins" icon="🛡️" label="Administrators" active={pathname.startsWith('/dashboard/superadmin/admins')} />
                    <SidebarLink href="/dashboard/superadmin/tasks" icon="📋" label="Global Tasks" active={pathname.startsWith('/dashboard/superadmin/tasks')} />
                    <SidebarLink href="/dashboard/superadmin/submissions" icon="📩" label="All Submissions" active={pathname.startsWith('/dashboard/superadmin/submissions')} />
                    <SidebarLink href="/dashboard/superadmin/users" icon="👥" label="Platform Users" active={pathname.startsWith('/dashboard/superadmin/users')} />
                    <SidebarLink href="/dashboard/superadmin/payouts" icon="💰" label="Platform Payouts" active={pathname.startsWith('/dashboard/superadmin/payouts')} />
                    <SidebarLink href="/dashboard/superadmin/system" icon="⚙️" label="System Settings" active={pathname.startsWith('/dashboard/superadmin/system')} />
                    <SidebarLink href="/dashboard/superadmin/profile" icon="👤" label="My Profile" active={pathname.startsWith('/dashboard/superadmin/profile')} />
                </>
            ) : isAdmin ? (
                <>
                    <SidebarLink href="/dashboard/admin" icon="📊" label="Dashboard" active={pathname === '/dashboard/admin'} />
                    <SidebarLink href="/dashboard/admin/tasks" icon="📋" label="Manage Tasks" active={pathname.startsWith('/dashboard/admin/tasks')} />
                    <SidebarLink href="/dashboard/admin/submissions" icon="📩" label="Submissions" active={pathname.startsWith('/dashboard/admin/submissions')} />
                    <SidebarLink href="/dashboard/admin/users" icon="👥" label="Workers List" active={pathname.startsWith('/dashboard/admin/users')} />
                    <SidebarLink href="/dashboard/admin/payouts" icon="💰" label="Withdrawals" active={pathname.startsWith('/dashboard/admin/payouts')} />
                    <SidebarLink href="/dashboard/admin/reports" icon="📈" label="Daily Reports" active={pathname.startsWith('/dashboard/admin/reports')} />
                    <SidebarLink href="/dashboard/admin/profile" icon="👤" label="Admin Profile" active={pathname.startsWith('/dashboard/admin/profile')} />
                    <SidebarLink href="/dashboard/admin/settings" icon="⚙️" label="Settings" active={pathname.startsWith('/dashboard/admin/settings')} />
                </>
            ) : (
                <>
                    <SidebarLink href="/dashboard/user" icon="🏠" label="Overview" active={pathname === '/dashboard/user'} />
                    <SidebarLink href="/dashboard/user/tasks" icon="📋" label="Available Tasks" active={pathname.startsWith('/dashboard/user/tasks')} />
                    <SidebarLink href="/dashboard/user/history" icon="🕒" label="Work History" active={pathname.startsWith('/dashboard/user/history')} />
                    <SidebarLink href="/dashboard/user/withdrawals" icon="💰" label="Withdrawals" active={pathname.startsWith('/dashboard/user/withdrawals')} />
                </>
            )}

            <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#f43f5e',
                        marginBottom: '1rem',
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        cursor: 'pointer',
                        textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <span>🚪</span>
                    <span>Logout</span>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {isSuperAdmin ? 'SA' : isAdmin ? 'AD' : 'JD'}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin User' : 'John Doe'}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isSuperAdmin ? 'Master Authority' : isAdmin ? 'Administrator' : 'Worker'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const SidebarLink = ({ href, icon, label, active }: { href: string; icon: string; label: string; active?: boolean }) => (
    <Link href={href} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        fontSize: '0.9rem',
        color: active ? 'var(--foreground)' : 'var(--text-muted)',
        backgroundColor: active ? 'var(--surface)' : 'transparent',
    }} onMouseEnter={(e) => {
        if (!active) {
            e.currentTarget.style.backgroundColor = 'var(--surface)';
            e.currentTarget.style.color = 'var(--foreground)';
        }
    }} onMouseLeave={(e) => {
        if (!active) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
        }
    }}>
        <span>{icon}</span>
        <span>{label}</span>
    </Link>
);

export default Sidebar;
