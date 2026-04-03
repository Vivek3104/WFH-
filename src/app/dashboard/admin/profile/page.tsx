'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { adminService, normalizeAuthUser } from '@/services/api';

const AdminProfilePage = () => {
    const { user, updateProfile } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+91 9876543210');
    const [company, setCompany] = useState('WFH Platforms Pvt Ltd');
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
    const [isSaving, setIsSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
            setAvatarFile(file);
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
        try {
            const profileData = new FormData();
            profileData.append('name', name);
            profileData.append('email', email);
            profileData.append('phone', phone);
            if (avatarFile) {
                profileData.append('profilePic', avatarFile);
            }

            const updatedAdminResponse = await adminService.updateProfile(profileData);
            updateProfile(normalizeAuthUser(updatedAdminResponse.data));

            await adminService.updateCompanyDetails({
                companyName: company,
            });

            alert('Admin profile updated!');
        } catch (error: any) {
            alert(error?.response?.data?.error || error?.message || 'Failed to update admin profile.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="responsive-page">
            <header>
                <h1 className="responsive-title">Admin <span className="gradient-text">Profile</span></h1>
                <p className="responsive-subtitle">Manage your personal and company information.</p>
            </header>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Details</h3>
                        <div className="responsive-form-grid-2">
                            <FormGroup label="Full Name" value={name} onChange={setName} />
                            <FormGroup label="Email" value={email} onChange={setEmail} />
                            <FormGroup label="Phone" value={phone} onChange={setPhone} />
                        </div>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Company Details</h3>
                        <div className="responsive-form-grid-2">
                            <FormGroup label="Company Name" value={company} onChange={setCompany} />
                            <FormGroup label="Registration ID" value="REG-12345678" readOnly />
                            <FormGroup label="GSTIN" value="27AAAAA0000A1Z5" readOnly />
                        </div>
                    </section>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
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
