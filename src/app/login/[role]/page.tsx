'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { authService, adminService } from '@/services/api';
import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
    const { role } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 50;
        const y = (clientY - innerHeight / 2) / 50;
        setMousePos({ x, y });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Mock credentials for superadmin
            if (role === 'superadmin') {
                if (email === 'superadmin@wfh.com' && password === 'superadmin123') {
                    const mockUser = {
                        id: 'sa_1',
                        name: 'System Admin',
                        role: 'superadmin' as const,
                        email: 'superadmin@wfh.com'
                    };
                    setAuth(mockUser, 'dummy_token_superadmin');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    router.push('/dashboard/superadmin');
                    return;
                } else {
                    setError('Invalid superadmin credentials. Use superadmin@wfh.com / superadmin123');
                    setLoading(false);
                    return;
                }
            }

            // Mock credentials for user
            if (role === 'user') {
                if (email === 'user@wfh.com' && password === 'user123') {
                    const mockUser = {
                        id: 'u_1',
                        name: 'Test User',
                        role: 'user' as const,
                        email: 'user@wfh.com'
                    };
                    setAuth(mockUser, 'dummy_token_user');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    router.push('/dashboard/user');
                    return;
                }
            }

            // Mock credentials for admin
            if (role === 'admin') {
                if (email === 'admin@wfh.com' && password === 'admin123') {
                    const mockUser = {
                        id: 'ad_1',
                        name: 'Operation Admin',
                        role: 'admin' as const,
                        email: 'admin@wfh.com'
                    };
                    setAuth(mockUser, 'dummy_token_admin');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    router.push('/dashboard/admin');
                    return;
                } else {
                    // Try real backend for admin
                    try {
                        const response = await adminService.login({ email, password });
                        const { user, token } = response.data;
                        setAuth(user, token);
                        router.push(`/dashboard/admin`);
                        return;
                    } catch {
                        setError('Invalid admin credentials. Use admin@wfh.com / admin123');
                        setLoading(false);
                        return;
                    }
                }
            }

            // User login via real API
            const response = await authService.login({ email, password, role });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push(`/dashboard/${user.role}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#050505',
                padding: '2rem 1rem',
                overflow: 'hidden'
            }}>
            {/* Container Card */}
            <div className="premium-glass" style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '1000px',
                minHeight: '640px',
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                margin: 'auto',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
                transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotateX(${-mousePos.y / 2}deg) rotateY(${mousePos.x / 2}deg)`,
                transition: 'transform 0.1s ease-out'
            }}>
                {/* Left Panel - Visual Branding */}
                <div style={{
                    flex: '1.2',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '3rem',
                    background: 'url("/images/auth-bg.png") center center / cover no-repeat',
                }} className="hide-on-mobile">
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.1) 100%)',
                        zIndex: 1
                    }} />
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
                            WFH <span style={{ color: 'var(--primary)' }}>{String(role).toUpperCase()}</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '350px' }}>
                            Secure access to your specialized dashboard and management tools.
                        </p>
                    </div>
                </div>

                {/* Right Panel - Form Content */}
                <div style={{
                    flex: '1',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#1a1a20',
                    color: '#ffffff'
                }}>
                    {/* Role Switcher */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textAlign: 'center' }}>LOGIN AS</h2>
                        <div style={{
                            display: 'flex',
                            gap: '0.4rem',
                            background: 'rgba(255,255,255,0.03)',
                            padding: '0.35rem',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            {['user', 'admin', 'superadmin'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => router.push(`/login/${r}`)}
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 0.4rem',
                                        borderRadius: '10px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        background: role === r ? 'var(--primary)' : 'transparent',
                                        color: role === r ? 'white' : 'rgba(255,255,255,0.4)',
                                        boxShadow: role === r ? '0 6px 16px -4px rgba(124, 58, 237, 0.4)' : 'none'
                                    }}
                                >
                                    {r.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Welcome Back</h1>
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            background: 'rgba(244, 63, 94, 0.1)',
                            border: '1px solid rgba(244, 63, 94, 0.2)',
                            borderRadius: '12px',
                            color: '#fb7185',
                            fontSize: '0.85rem',
                            marginBottom: '1.5rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {(role === 'admin' || role === 'superadmin' || role === 'user') && !error && (
                        <div style={{
                            fontSize: '0.78rem',
                            marginBottom: '1.5rem',
                            padding: '0.75rem 1rem',
                            background: 'rgba(124,58,237,0.1)',
                            borderRadius: '10px',
                            color: 'rgba(180,160,255,0.8)',
                            border: '1px solid rgba(124,58,237,0.2)'
                        }}>
                            🔑 Demo: <strong>{
                                role === 'superadmin' ? 'superadmin@wfh.com' :
                                    role === 'admin' ? 'admin@wfh.com' : 'user@wfh.com'
                            }</strong> / <strong>{
                                role === 'superadmin' ? 'superadmin123' :
                                    role === 'admin' ? 'admin123' : 'user123'
                            }</strong>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: '#25252b',
                                    border: '1px solid #35353b',
                                    padding: '0.85rem 1rem',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: '#25252b',
                                    border: '1px solid #35353b',
                                    padding: '0.85rem 1rem',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <span
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.5 }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🔒' : '👁️'}
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                padding: '0.9rem',
                                marginTop: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '10px'
                            }}
                        >
                            {loading ? 'LOGGING IN...' : 'Login'}
                        </button>
                    </form>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                            Don't have an account? <Link href={`/register/${role}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
