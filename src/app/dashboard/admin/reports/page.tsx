'use client';
import React from 'react';

const ReportsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Platform <span className="gradient-text">Reports</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Analyze performance and growth metrics.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <ReportStat title="Total Revenue" value="₹12.5L" growth="+15%" />
                <ReportStat title="Avg. Payout" value="₹450" growth="-2%" />
                <ReportStat title="New Users" value="1,240" growth="+24%" />
                <ReportStat title="Task Success Rate" value="98.2%" growth="+0.5%" />
            </div>

            <section className="card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>📊</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Analytics Visualization</h3>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px' }}>
                    Visual analytics and detailed reporting charts will be displayed here as the platform scales.
                </p>
            </section>
        </div>
    );
};

const ReportStat = ({ title, value, growth }: any) => (
    <div className="card">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</h3>
        <span style={{ fontSize: '0.75rem', color: growth.startsWith('+') ? '#10b981' : '#f43f5e', fontWeight: 600 }}>{growth}</span>
    </div>
);

export default ReportsPage;
