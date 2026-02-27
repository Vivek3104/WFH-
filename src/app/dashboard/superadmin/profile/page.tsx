'use client';
import React from 'react';

const ProfilePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Super Admin <span className="gradient-text">Profile</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your personal and company information.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800 }}>AD</div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Admin User</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Main Administrator</p>
                    </div>
                </section>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormGroup label="Full Name" value="Admin User" />
                            <FormGroup label="Email" value="admin@wfh.com" />
                            <FormGroup label="Phone" value="+91 9876543210" />
                        </div>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Company Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormGroup label="Company Name" value="WFH Platforms Pvt Ltd" />
                            <FormGroup label="Registration ID" value="REG-12345678" />
                            <FormGroup label="GSTIN" value="27AAAAA0000A1Z5" />
                        </div>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Company Documents</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <DocCard name="Registration_Cert.pdf" date="Uploaded Jan 10, 2024" />
                            <DocCard name="GST_Certificate.pdf" date="Uploaded Jan 10, 2024" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const FormGroup = ({ label, value }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</label>
        <input
            type="text"
            defaultValue={value}
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

const DocCard = ({ name, date }: any) => (
    <div style={{
        flex: 1,
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'var(--surface-hover)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{date}</span>
    </div>
);

export default ProfilePage;
