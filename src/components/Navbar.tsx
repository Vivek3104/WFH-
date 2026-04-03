'use client';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
    const { user } = useAuthStore();
    const dashboardLink = user?.role ? `/dashboard/${user.role}` : '/dashboard/user';

    return (
        <nav className="sticky top-0 z-50 flex h-[70px] items-center justify-between border-b border-border bg-black/80 px-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl font-extrabold tracking-[-0.06em]">
                    <span className="gradient-text">WFH</span> PLATFORM
                </Link>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <Link href={dashboardLink} className="text-sm font-medium text-muted transition-colors hover:text-foreground">
                    Dashboard
                </Link>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_var(--primary-glow)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_var(--primary-glow)]"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
