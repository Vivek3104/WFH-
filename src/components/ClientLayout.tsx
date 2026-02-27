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

    // Dashboard routes usually need the sidebar
    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <div className="layout-container">
            {/* Hide Navbar on Login/Register/Home */}
            {!isAuthPage && !isHomePage && <Navbar />}

            <div className="main-wrapper">
                {/* Only show Sidebar on Dashboard pages */}
                {isDashboard && <Sidebar />}

                <main className="content-area" style={{
                    // If it's an auth page or home page, remove sidebar padding
                    padding: (isAuthPage || isHomePage) ? '0' : '2.5rem',
                    maxHeight: (isAuthPage || isHomePage) ? 'none' : 'calc(100vh - 70px)',
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
