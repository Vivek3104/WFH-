'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

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

    const handleProfileClick = () => {
        if (isSuperAdmin) router.push('/dashboard/superadmin/profile');
        else if (isAdmin) router.push('/dashboard/admin/profile');
        else router.push('/dashboard/user/profile');
    };

    const superAdminLinks = [
        { href: '/dashboard/superadmin', label: 'Overview', icon: 'OV' },
        { href: '/dashboard/superadmin/admins', label: 'Administrators', icon: 'AD' },
        { href: '/dashboard/superadmin/tasks', label: 'Global Tasks', icon: 'TS' },
        { href: '/dashboard/superadmin/submissions', label: 'All Submissions', icon: 'SB' },
        { href: '/dashboard/superadmin/users', label: 'Platform Users', icon: 'US' },
        { href: '/dashboard/superadmin/payouts', label: 'Platform Payouts', icon: 'PY' },
        { href: '/dashboard/superadmin/system', label: 'System Settings', icon: 'ST' },
        { href: '/dashboard/superadmin/profile', label: 'My Profile', icon: 'PR' },
    ];

    const adminLinks = [
        { href: '/dashboard/admin', label: 'Dashboard', icon: 'DB' },
        { href: '/dashboard/admin/tasks', label: 'Manage Tasks', icon: 'TS' },
        { href: '/dashboard/admin/submissions', label: 'Submissions', icon: 'SB' },
        { href: '/dashboard/admin/users', label: 'Workers List', icon: 'WK' },
        { href: '/dashboard/admin/payouts', label: 'Withdrawals', icon: 'WD' },
        { href: '/dashboard/admin/reports', label: 'Daily Reports', icon: 'RP' },
        { href: '/dashboard/admin/profile', label: 'Admin Profile', icon: 'PR' },
        { href: '/dashboard/admin/settings', label: 'Settings', icon: 'ST' },
    ];

    const userLinks = [
        { href: '/dashboard/user', label: 'Overview', icon: 'OV' },
        { href: '/dashboard/user/tasks', label: 'Available Tasks', icon: 'TS' },
        { href: '/dashboard/user/history', label: 'Work History', icon: 'HS' },
        { href: '/dashboard/user/withdrawals', label: 'Withdrawals', icon: 'WD' },
        { href: '/dashboard/user/profile', label: 'My Profile', icon: 'PR' },
    ];

    const links = isSuperAdmin ? superAdminLinks : isAdmin ? adminLinks : userLinks;

    return (
        <aside className="flex w-full shrink-0 flex-col border-b border-border bg-background px-4 py-6 lg:w-[260px] lg:border-b-0 lg:border-r lg:px-4">
            <div className="mb-4 px-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {getMenuTitle()}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                {links.map((link) => (
                    <SidebarLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                        label={link.label}
                        active={link.href === '/dashboard/user' || link.href === '/dashboard/admin' || link.href === '/dashboard/superadmin'
                            ? pathname === link.href
                            : pathname.startsWith(link.href)}
                    />
                ))}
            </div>

            <div className="mt-6 border-t border-border p-4 lg:mt-auto">
                <button
                    onClick={handleLogout}
                    className="mb-4 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-rose-500 transition hover:bg-rose-500/5"
                >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-[11px] font-bold">
                        LO
                    </span>
                    <span>Logout</span>
                </button>

                <div
                    onClick={handleProfileClick}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-surface"
                >
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary font-bold text-white">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                            user?.name ? user.name.substring(0, 2).toUpperCase() : '??'
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {user?.name || 'Loading...'}
                        </p>
                        <p className="text-xs text-muted">
                            {user?.role === 'superadmin' ? 'Master Admin' : user?.role === 'admin' ? 'Administrator' : 'Worker'}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const SidebarLink = ({
    href,
    icon,
    label,
    active,
}: {
    href: string;
    icon: string;
    label: string;
    active?: boolean;
}) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${active
            ? 'bg-surface text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
    >
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold ${active ? 'bg-primary/15 text-primary' : 'bg-white/5 text-muted'
            }`}>
            {icon}
        </span>
        <span>{label}</span>
    </Link>
);

export default Sidebar;
