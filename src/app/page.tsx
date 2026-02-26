'use client';
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      gap: '2rem'
    }}>
      <div className="glass" style={{
        padding: '1rem 2rem',
        borderRadius: '50px',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--primary)',
        marginBottom: '-1rem'
      }}>
        ✨ The Future of Remote Work is Here
      </div>

      <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, maxWidth: '800px' }}>
        Manage Your <span className="gradient-text">Remote Workforce</span> with Ease
      </h1>

      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
        A premium platform for delegating tasks, tracking progress, and managing withdrawals for your WFH team.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
        <Link href="/register" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          Get Started Free
        </Link>
        <Link href="/login" style={{
          fontSize: '1.1rem',
          padding: '1rem 2.5rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          fontWeight: 600,
          transition: 'all 0.2s ease'
        }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
          View Demo
        </Link>
      </div>

      <div style={{
        marginTop: '5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <FeatureCard title="Task Management" desc="Create and assign tasks with deadlines and payout amounts effortlessly." icon="📋" />
        <FeatureCard title="Automated Payouts" desc="Secure withdrawal system for workers with real-time tracking." icon="💰" />
        <FeatureCard title="Performance Analytics" desc="Monitor team efficiency with detailed work history and scoring." icon="📈" />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <div className="card" style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
  </div>
);

export default HomePage;
