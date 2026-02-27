'use client';
import React from 'react';

const SystemSettingsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>System <span className="gradient-text">Control</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Global platform configurations and maintenance tools.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                <section className="card shadow-lg">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>💰</span> Financial Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <SettingField label="Platform Service Fee (%)" value="10" description="Fee deducted from worker payouts." />
                        <SettingField label="Minimum Withdrawal (₹)" value="500" description="Minimum amount a worker can withdraw." />
                        <SettingField label="Admin Commission Rate (%)" value="5" description="Percentage of task value allocated to administrators." />
                        <button className="btn-primary" style={{ width: 'fit-content' }}>Save Financials</button>
                    </div>
                </section>

                <section className="card shadow-lg">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🛠️</span> Platform Maintenance
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ToggleSetting label="Maintenance Mode" description="Disable platform access for all users except Super Admins." checked={false} />
                        <ToggleSetting label="Registration Open" description="Allow new user and admin registrations." checked={true} />
                        <ToggleSetting label="Auto-Approve Withdrawals" description="Enable automated processing for small withdrawal amounts." checked={false} />
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>Danger Zone</p>
                            <button style={{ marginTop: '0.5rem', background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                Clear System Cache
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const SettingField = ({ label, value, description }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</label>
        <input
            type="text"
            defaultValue={value}
            className="input-glass"
            style={{ padding: '0.75rem', fontSize: '0.9rem' }}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{description}</p>
    </div>
);

const ToggleSetting = ({ label, description, checked }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{description}</p>
        </div>
        <input
            type="checkbox"
            defaultChecked={checked}
            style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
    </div>
);

export default SystemSettingsPage;
