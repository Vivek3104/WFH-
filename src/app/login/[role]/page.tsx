'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { authService } from '@/services/api';
import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
    const { role } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Dummy logic for superadmin only
            if (role === 'superadmin') {
                if (email === 'admin@wfh.com' && password === 'admin123') {
                    const mockUser = {
                        id: 'sa_1',
                        name: 'System Admin',
                        role: 'superadmin' as const,
                        email: 'admin@wfh.com'
                    };
                    setAuth(mockUser, 'dummy_token_superadmin');
                    router.push('/dashboard/superadmin');
                    return;
                } else {
                    setError('Invalid superadmin credentials.');
                    setLoading(false);
                    return;
                }
            }

            const response = await authService.login({ email, password, role });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push(`/dashboard/${user.role}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Login as {role}</h2>
                {error && <div style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'white' }} />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'white' }} />
                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    New here? <Link href={`/register/${role}`} style={{ color: 'var(--primary)' }}>Register as {role}</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
