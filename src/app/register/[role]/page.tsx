'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { authService } from '@/services/api';

const RegisterPage = () => {
    const { role } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (role === 'superadmin') {
                // Mock registration delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push(`/login/${role}`);
                return;
            }

            await authService.register({ name, email, password, role });
            router.push(`/login/${role}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Register as {role}</h2>
                {error && <div style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'white' }} />
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'white' }} />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'white' }} />
                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href={`/login/${role}`} style={{ color: 'var(--primary)' }}>Login as {role}</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
