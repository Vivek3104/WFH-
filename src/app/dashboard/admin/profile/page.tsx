'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const AdminProfilePage = () => {
    const { user, updateProfile } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+91 9876543210');
    const [company, setCompany] = useState('WFH Platforms Pvt Ltd');
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) setPreviewUrl(user.avatar);
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        updateProfile({ name, email, avatar: previewUrl });
        setIsSaving(false);
        alert('Admin profile updated!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Admin <span className="gradient-text">Profile</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your personal and company information.</p>
            </header>

            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontWeight: 800,
                        overflow: 'hidden',
                        border: '3px solid var(--border)'
                    }}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            name.substring(0, 2).toUpperCase()
                        )}
                    </div>

                    <input type="file" id="admin-avatar" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    <label htmlFor="admin-avatar" style={{ fontSize: '0.85rem', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>Change Photo</label>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{name}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Main Administrator</p>
                    </div>
                </section>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormGroup label="Full Name" value={name} onChange={setName} />
                            <FormGroup label="Email" value={email} onChange={setEmail} />
                            <FormGroup label="Phone" value={phone} onChange={setPhone} />
                        </div>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Company Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormGroup label="Company Name" value={company} onChange={setCompany} />
                            <FormGroup label="Registration ID" value="REG-12345678" readOnly />
                            <FormGroup label="GSTIN" value="27AAAAA0000A1Z5" readOnly />
                        </div>
                    </section>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '0.75rem 2.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {isSaving ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const FormGroup = ({ label, value, onChange, readOnly }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            readOnly={readOnly}
            style={{
                padding: '0.75rem',
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: readOnly ? 'var(--text-muted)' : 'white'
            }}
        />
    </div>
);

export default AdminProfilePage;
