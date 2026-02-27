'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const UserProfilePage = () => {
    const { user, updateProfile } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+91 9123456780');
    const [bio, setBio] = useState('Professional worker dedicated to high-quality task submissions.');
    const [isSaving, setIsSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');

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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        updateProfile({
            name,
            email,
            avatar: previewUrl
        });

        setIsSaving(false);
        alert('Profile updated successfully!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>My <span className="gradient-text">Profile</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and profile picture.</p>
            </header>

            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem', height: 'fit-content' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'var(--surface-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontWeight: 800,
                        overflow: 'hidden',
                        border: '4px solid var(--border)',
                        position: 'relative'
                    }}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            name.substring(0, 2).toUpperCase()
                        )}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor="avatar-upload"
                            style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                        >
                            Change Photo
                        </label>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{name}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Worker • Joined Feb 2024</p>
                    </div>
                </section>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormGroup label="Full Name" value={name} onChange={setName} />
                            <FormGroup label="Email ID" value={email} onChange={setEmail} />
                            <FormGroup label="Phone Number" value={phone} onChange={setPhone} />
                            <FormGroup label="Location" value="BENGALURU, INDIA" readOnly />
                        </div>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>About Me</h3>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '0.75rem',
                                background: 'var(--background)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'white',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                resize: 'vertical'
                            }}
                        />
                    </section>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                fontWeight: 600,
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                opacity: isSaving ? 0.7 : 1,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isSaving ? 'Saving Changes...' : 'Update Profile'}
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
                background: readOnly ? 'var(--surface)' : 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: readOnly ? 'var(--text-muted)' : 'white',
                fontSize: '0.9rem',
                outline: 'none',
                opacity: readOnly ? 0.7 : 1
            }}
        />
    </div>
);

export default UserProfilePage;
