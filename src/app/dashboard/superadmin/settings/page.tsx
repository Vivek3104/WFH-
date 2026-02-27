'use client';
import React from 'react';

const SettingsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Super Admin <span className="gradient-text">Settings</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Configure platform preferences and security.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <section className="card">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Security</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
                        <FormGroup label="Current Password" type="password" />
                        <FormGroup label="New Password" type="password" />
                        <FormGroup label="Confirm New Password" type="password" />
                        <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Update Password</button>
                    </div>
                </section>

                <section className="card">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <ToggleGroup label="Email Notifications" description="Receive updates about task submissions and payouts via email." defaultChecked />
                        <ToggleGroup label="System Alerts" description="Get notified about platform-wide events and user reports." defaultChecked />
                    </div>
                </section>

                <section className="card">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>API Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin API Key</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    readOnly
                                    value="wfh_superadmin_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: 'var(--background)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-muted)',
                                        fontFamily: 'monospace'
                                    }}
                                />
                                <button style={{ padding: '0 1.5rem', borderRadius: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'none', fontWeight: 600 }}>Copy</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const FormGroup = ({ label, type = "text" }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</label>
        <input
            type={type}
            style={{
                padding: '0.75rem',
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'white'
            }}
        />
    </div>
);

const ToggleGroup = ({ label, description, defaultChecked }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <div>
            <p style={{ fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{description}</p>
        </div>
        <input type="checkbox" defaultChecked={defaultChecked} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
    </div>
);

export default SettingsPage;
