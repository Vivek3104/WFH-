'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Middleware handles the redirect, but as a client-side fallback
    // redirect to /login if somehow the middleware redirect doesn't fire
    router.replace('/login');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#050505',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid rgba(124,58,237,0.2)',
        borderTopColor: '#7c3aed',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Redirecting...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
