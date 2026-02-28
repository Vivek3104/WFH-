'use client';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define routes where elements should be hidden
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
    const isHomePage = pathname === '/';

    // Dashboard routes usually need the sidebar, except the specific custom user dashboard
    const isDashboard = pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/user');
    const isUserDashboard = pathname.startsWith('/dashboard/user');

    return (
        <div className="layout-container">
            {/* Hide Navbar on Login/Register/Home, and custom User Dashboard */}
            {!isAuthPage && !isHomePage && !isUserDashboard && <Navbar />}

            <div className="main-wrapper">
                {/* Only show Sidebar on Dashboard pages, except User Dashboard */}
                {isDashboard && <Sidebar />}

                <main className="content-area" style={{
                    // If it's an auth page, home page, or user dashboard, remove padding
                    padding: (isAuthPage || isHomePage || isUserDashboard) ? '0' : '2.5rem',
                    maxHeight: (isAuthPage || isHomePage || isUserDashboard) ? 'none' : 'calc(100vh - 70px)',
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
