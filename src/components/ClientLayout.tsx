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

    // Routes where we render our own full-page layout (no shared nav/sidebar)
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
    const isHomePage = pathname === '/';
    const isUserDashboard = pathname.startsWith('/dashboard/user');
    const isAdminDashboard = pathname.startsWith('/dashboard/admin');
    const isSuperAdminDashboard = pathname.startsWith('/dashboard/superadmin');

    // Custom-layout dashboards — handle their own chrome
    const isCustomLayout = isUserDashboard || isAdminDashboard || isSuperAdminDashboard;

    // Only show the legacy sidebar for routes that don't have their own layout
    const showLegacySidebar = pathname.startsWith('/dashboard') && !isCustomLayout;

    const noChrome = isAuthPage || isHomePage || isCustomLayout;

    return (
        <div className="layout-container">
            {!noChrome && <Navbar />}

            <div className="main-wrapper">
                {showLegacySidebar && <Sidebar />}

                <main className="content-area" style={{
                    padding: noChrome ? '0' : '2.5rem',
                    maxHeight: noChrome ? 'none' : 'calc(100vh - 70px)',
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
