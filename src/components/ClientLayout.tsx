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
        <div className="flex min-h-screen flex-col">
            {!noChrome && <Navbar />}

            <div className="flex flex-1 flex-col lg:flex-row">
                {showLegacySidebar && <Sidebar />}

                <main
                    className={`flex-1 overflow-y-auto bg-background ${noChrome ? 'p-0 max-h-none' : 'p-6 lg:p-10 lg:max-h-[calc(100vh-70px)]'
                        }`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
