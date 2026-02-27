'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function PremiumLoginPage() {
  const [role, setRole] = useState('user'); // user, admin, superadmin
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create mock user based on role
    const mockUser: any = {
      id: role === 'superadmin' ? 'sa_1' : role === 'admin' ? 'ad_1' : 'us_1',
      name: role === 'superadmin' ? 'Master Admin' : role === 'admin' ? 'Operation Admin' : 'John Doe',
      email: email || 'user@example.com',
      role: role
    };

    // Set auth state and cookies
    setAuth(mockUser, `dummy_token_${role}`);

    // Tiny delay for cookie propagation
    await new Promise(resolve => setTimeout(resolve, 100));

    // Navigate to dashboard
    router.push(`/dashboard/${role}`);
    setLoading(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
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
        minHeight: '650px',
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
              WFH <span style={{ color: 'var(--primary)' }}>PLATFORM</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '350px' }}>
              Experience the next generation of remote work management with premium tools.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
              <div style={{ width: '40px', height: '4px', background: 'white', borderRadius: '10px' }} />
              <div style={{ width: '12px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }} />
              <div style={{ width: '12px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }} />
            </div>
          </div>
        </div>

        {/* Right Panel - Form Content */}
        <div style={{
          flex: '1',
          padding: '3.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: '#1a1a20',
          color: '#ffffff'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              {isLogin ? 'Login' : 'Create an account'}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

          <form onSubmit={handleAuth} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {!isLogin && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input type="text" placeholder="First Name" required style={{ width: '100%', background: '#25252b', border: '1px solid #35353b', padding: '0.75rem 1rem', borderRadius: '8px', color: 'white' }} />
                <input type="text" placeholder="Last Name" required style={{ width: '100%', background: '#25252b', border: '1px solid #35353b', padding: '0.75rem 1rem', borderRadius: '8px', color: 'white' }} />
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              style={{ width: '100%', background: '#25252b', border: '1px solid #35353b', padding: '0.75rem 1rem', borderRadius: '8px', color: 'white' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                style={{ width: '100%', background: '#25252b', border: '1px solid #35353b', padding: '0.75rem 1rem', borderRadius: '8px', color: 'white' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.5 }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🔒' : '👁️'}
              </span>
            </div>

            {!isLogin && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginTop: '0.25rem' }}>
                <input type="checkbox" style={{ accentColor: '#7c3aed' }} required />
                I agree to the <span style={{ color: '#7c3aed' }}>terms & conditions</span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.85rem',
                fontSize: '0.95rem',
                borderRadius: '8px',
                background: '#7c3aed',
                marginTop: '0.5rem',
                fontWeight: 600,
                color: 'white',
                border: 'none',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#6d28d9')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#7c3aed')}
            >
              {loading ? 'PROCESSING...' : isLogin ? 'Login' : 'Create account'}
            </button>
          </form>
          <div style={{ marginTop: 'auto' }}>
            {/* Social Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0 1rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{isLogin ? 'Or login with:' : 'Or register with:'}</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button type="button" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: 'transparent', border: '1px solid #35353b', color: 'rgba(255,255,255,0.7)',
                padding: '0.65rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button type="button" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: 'transparent', border: '1px solid #35353b', color: 'rgba(255,255,255,0.7)',
                padding: '0.65rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.356.987 3.964.951 1.637-.026 2.67-1.474 3.674-2.951 1.153-1.687 1.635-3.313 1.662-3.396-.035-.015-3.181-1.22-3.212-4.814-.029-2.993 2.454-4.428 2.566-4.492-1.399-2.05-3.56-2.284-4.321-2.333-1.88-.154-3.535 1.054-4.502 1.054zm3.378-2.671c0.843-1.013 1.407-2.428 1.252-3.84-1.207 0.052-2.668 0.803-3.532 1.822-0.77 0.893-1.442 2.338-1.262 3.716 1.341 0.107 2.7-0.685 3.542-1.698z" />
                </svg>
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

