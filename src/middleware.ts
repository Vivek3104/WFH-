import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    // 1. Handle Login/Register selection pages (Always accessible)
    if (pathname === '/login' || pathname === '/register') {
        if (token && role) {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
        }
        return NextResponse.next();
    }

    // 2. Handle Role-specific auth pages (/login/[role], /register/[role])
    if (pathname.startsWith('/login/') || pathname.startsWith('/register/')) {
        if (token && role) {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
        }
        return NextResponse.next();
    }

    // 3. Handle Protected Dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!token || !role) {
            // If trying to access /dashboard/admin, redirect to /login/admin
            const segments = pathname.split('/');
            const targetRole = segments[2];
            const redirectPath = targetRole ? `/login/${targetRole}` : '/login';
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }

        // Strict role-based protection
        const segments = pathname.split('/');
        const targetRole = segments[2]; // /dashboard/[role]

        // If at root /dashboard, redirect to specific role dashboard
        if (!targetRole) {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
        }

        // Check if role matches
        if (role !== targetRole) {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login/:path*', '/register/:path*'],
};
