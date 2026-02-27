import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'superadmin';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setAuth: (user, token) => {
                // Set cookies for middleware
                document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
                document.cookie = `role=${user.role}; path=/; max-age=86400; SameSite=Lax`;
                set({ user, token, isAuthenticated: true });
            },
            logout: () => {
                // Clear cookies
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
