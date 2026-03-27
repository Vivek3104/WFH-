'use client';

import React from 'react';
import ReportsChart from '@/components/ReportsChart';

const reportData = [
  { label: 'Jan', revenue: 320000, users: 180 },
  { label: 'Feb', revenue: 410000, users: 230 },
  { label: 'Mar', revenue: 385000, users: 210 },
  { label: 'Apr', revenue: 470000, users: 280 },
  { label: 'May', revenue: 520000, users: 340 },
  { label: 'Jun', revenue: 610000, users: 390 },
];

const ReportsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Platform <span className="gradient-text">Reports</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze performance and growth metrics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <ReportStat title="Total Revenue" value="Rs. 12.5L" growth="+15%" />
        <ReportStat title="Avg. Payout" value="Rs. 450" growth="-2%" />
        <ReportStat title="New Users" value="1,240" growth="+24%" />
        <ReportStat title="Task Success Rate" value="98.2%" growth="+0.5%" />
      </div>

      <ReportsChart
        title="Revenue And User Growth"
        subtitle="A live visual snapshot of monthly platform revenue against new user acquisition."
        data={reportData}
      />
    </div>
  );
};

const ReportStat = ({ title, value, growth }: { title: string; value: string; growth: string }) => (
  <div className="card">
    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{title}</p>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</h3>
    <span
      style={{
        fontSize: '0.75rem',
        color: growth.startsWith('+') ? '#10b981' : '#f43f5e',
        fontWeight: 600,
      }}
    >
      {growth}
    </span>
  </div>
);

export default ReportsPage;
