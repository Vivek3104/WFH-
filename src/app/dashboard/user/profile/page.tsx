'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const UserProfilePage = () => {
    const { user, updateProfile } = useAuthStore();

    // Form State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+91 9123456780');
    const [isActive, setIsActive] = useState(true);

    // Bank Details State
    const [accountHolder, setAccountHolder] = useState(user?.name || '');
    const [bankName, setBankName] = useState('HDFC Bank');
    const [accountNumber, setAccountNumber] = useState('XXXX-XXXX-1234');
    const [ifscCode, setIfscCode] = useState('HDFC0001234');

    // Document State
    const [docType, setDocType] = useState('Aadhaar Card');
    const [docNumber, setDocNumber] = useState('XXXX-XXXX-5678');

    const [isSaving, setIsSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAccountHolder(user.name);
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
        updateProfile({ name, email, avatar: previewUrl });
        setIsSaving(false);
        alert('Profile updated successfully!');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>Profile <span style={{ color: '#A78BFA' }}>Settings</span></h1>
                <p style={{ color: '#9CA3AF', marginTop: '0.5rem' }}>Manage your account details, payout methods, and documents.</p>
            </header>

            <form onSubmit={handleSave} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                {/* LEFT PROFILE CARD */}
                <section style={{
                    width: '320px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    position: 'sticky',
                    top: '20px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            background: '#1F2937',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3.5rem',
                            fontWeight: 800,
                            overflow: 'hidden',
                            border: '4px solid rgba(167, 139, 250, 0.2)',
                            color: '#fff'
                        }}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                name.substring(0, 2).toUpperCase()
                            )}
                        </div>

                        <label htmlFor="avatar-upload" style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            backgroundColor: '#C084FC',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '4px solid #0B0F19',
                            color: '#fff',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 12px rgba(192, 132, 252, 0.4)'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </label>
                        <input type="file" id="avatar-upload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>{name}</h2>
                        <p style={{ color: '#A78BFA', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span> Active Pro Worker
                        </p>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.5rem' }}>Joined February 2024</p>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }}></div>

                    {/* Profile Score Widget */}
                    <div style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                            <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Profile Score</span>
                            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>85/100</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #C084FC)', borderRadius: '4px' }}></div>
                        </div>
                        <p style={{ color: '#10B981', fontSize: '0.75rem', marginTop: '0.8rem', textAlign: 'center' }}>Excellent trust rating</p>
                    </div>
                </section>

                {/* RIGHT CARDS */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* #1: Personal Info Card */}
                    <section style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '2.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <span style={{ padding: '0.5rem', backgroundColor: 'rgba(167, 139, 250, 0.1)', borderRadius: '8px', color: '#A78BFA' }}><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
                                Personal Information
                            </h3>

                            {/* Active Toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Status</span>
                                <div
                                    onClick={() => setIsActive(!isActive)}
                                    style={{
                                        width: '44px',
                                        height: '24px',
                                        backgroundColor: isActive ? '#8B5CF6' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '18px',
                                        height: '18px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '3px',
                                        left: isActive ? '23px' : '3px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}></div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormGroup label="Full Name" value={name} onChange={setName} />
                            <FormGroup label="Email Address" value={email} onChange={setEmail} readOnly />
                            <FormGroup label="Phone Number" value={phone} onChange={setPhone} />
                        </div>
                    </section>

                    {/* #2: Bank Details Card */}
                    <section style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '2.5rem'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                            <span style={{ padding: '0.5rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', color: '#34D399' }}><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></span>
                            Bank Details
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormGroup label="Account Holder Name" value={accountHolder} onChange={setAccountHolder} />
                            <FormGroup label="Bank Name" value={bankName} onChange={setBankName} />
                            <FormGroup label="Account Number" value={accountNumber} onChange={setAccountNumber} type="password" />
                            <FormGroup label="IFSC Code" value={ifscCode} onChange={setIfscCode} />
                        </div>
                    </section>

                    {/* #3: Government Document Card */}
                    <section style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '2.5rem'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                            <span style={{ padding: '0.5rem', backgroundColor: 'rgba(251, 169, 76, 0.1)', borderRadius: '8px', color: '#FBA94C' }}><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></span>
                            Government ID Document
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) auto', gap: '1.5rem', alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 500 }}>Document Type</label>
                                <select
                                    value={docType}
                                    onChange={(e) => setDocType(e.target.value)}
                                    style={{
                                        padding: '0.8rem 1rem',
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        appearance: 'none',
                                        backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 1rem top 50%',
                                        backgroundSize: '0.65em auto'
                                    }}
                                >
                                    <option value="Aadhaar Card" style={{ background: '#1F2937' }}>Aadhaar Card</option>
                                    <option value="PAN Card" style={{ background: '#1F2937' }}>PAN Card</option>
                                    <option value="Passport" style={{ background: '#1F2937' }}>Passport</option>
                                </select>
                            </div>

                            <FormGroup label="Document Number" value={docNumber} onChange={setDocNumber} />

                            <button
                                type="button"
                                style={{
                                    height: '50px',
                                    padding: '0 1.5rem',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px dashed rgba(255,255,255,0.2)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                Upload File
                            </button>
                        </div>
                        <p style={{ color: '#6B7280', fontSize: '0.75rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            Securely encrypted. Max file size: 5MB.
                        </p>
                    </section>

                    {/* Bottom Action Footer */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '1rem 2.5rem',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #8B5CF6, #C084FC)',
                                color: '#fff',
                                border: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                opacity: isSaving ? 0.7 : 1,
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px -6px rgba(139, 92, 246, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSaving) e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isSaving) e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeLinecap="round" style={{ opacity: 0.25 }}></circle>
                                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"></path>
                                    </svg>
                                    Updating Profile...
                                </>
                            ) : (
                                <>
                                    Update Profile
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const FormGroup = ({ label, value, onChange, readOnly, type = "text" }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 500 }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            readOnly={readOnly}
            placeholder={`Enter ${label.toLowerCase()}`}
            style={{
                padding: '0.8rem 1rem',
                backgroundColor: readOnly ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                border: '1px solid',
                borderColor: readOnly ? 'transparent' : 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: readOnly ? '#6B7280' : '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                opacity: readOnly ? 0.7 : 1,
                transition: 'all 0.2s ease',
                width: '100%'
            }}
            onFocus={(e) => {
                if (!readOnly) {
                    e.currentTarget.style.borderColor = '#A78BFA';
                    e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.05)';
                }
            }}
            onBlur={(e) => {
                if (!readOnly) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                }
            }}
        />
    </div>
);

export default UserProfilePage;
