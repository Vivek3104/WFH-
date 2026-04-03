'use client';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService, normalizeAuthUser } from '@/services/api';

const UserProfilePage = () => {
    const { user, updateProfile } = useAuthStore();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+91 9123456780');
    const [isActive, setIsActive] = useState(true);

    const [accountHolder, setAccountHolder] = useState(user?.name || '');
    const [bankName, setBankName] = useState('HDFC Bank');
    const [accountNumber, setAccountNumber] = useState('XXXX-XXXX-1234');
    const [ifscCode, setIfscCode] = useState('HDFC0001234');

    const [docType, setDocType] = useState('Aadhaar Card');
    const [docNumber, setDocNumber] = useState('XXXX-XXXX-5678');

    const [isSaving, setIsSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const hasRealBankDetails = () =>
        [accountHolder, bankName, accountNumber, ifscCode].every((value) => value.trim().length > 0) &&
        !accountNumber.includes('XXXX') &&
        !ifscCode.includes('XXXX');

    const hasRealDocumentDetails = () =>
        docType.trim().length > 0 &&
        docNumber.trim().length > 0 &&
        !docNumber.includes('XXXX');

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
                                <img src={previewUrl} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                name.substring(0, 2).toUpperCase()
                            )}
                        </div>

                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#0B0F19] bg-fuchsia-400 text-white shadow-[0_4px_12px_rgba(192,132,252,0.4)] transition hover:scale-110"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </label>
                        <input type="file" id="avatar-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>

                    <div className="text-center">
                        <h2 className="mb-1 text-2xl font-bold text-white">{name}</h2>
                        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-violet-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Active Pro Worker
                        </p>
                        <p className="mt-2 text-xs text-slate-500">Joined February 2024</p>
                    </div>

                    <div className="h-px w-full bg-white/5" />

                    <div className="w-full rounded-2xl border border-white/2 bg-white/3 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-slate-400">Profile Score</span>
                            <span className="text-sm font-semibold text-white">85/100</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full w-[85%] rounded bg-[linear-gradient(90deg,#8B5CF6,#C084FC)]" />
                        </div>
                        <p className="mt-3 text-center text-xs text-emerald-400">Excellent trust rating</p>
                    </div>
                </section>

                <div className="flex-1 space-y-6">
                    <section className="rounded-3xl border border-white/5 bg-white/2 p-6 md:p-10">
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
                                <span className="rounded-lg bg-violet-300/10 p-2 text-violet-300">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                Personal Information
                            </h3>

                            <div className="flex items-center justify-between gap-3 md:justify-normal">
                                <span className="text-sm text-slate-400">Status</span>
                                <button
                                    type="button"
                                    onClick={() => setIsActive(!isActive)}
                                    className={`relative h-6 w-11 rounded-full transition ${isActive ? 'bg-violet-500' : 'bg-white/10'}`}
                                >
                                    <span className={`absolute top-0.75 h-4.5 w-4.5 rounded-full bg-white transition ${isActive ? 'left-5.75' : 'left-0.75'}`} />
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormGroup label="Full Name" value={name} onChange={setName} />
                            <FormGroup label="Email Address" value={email} onChange={setEmail} readOnly />
                            <FormGroup label="Phone Number" value={phone} onChange={setPhone} />
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/5 bg-white/2 p-6 md:p-10">
                        <h3 className="mb-8 flex items-center gap-3 text-xl font-semibold text-white">
                            <span className="rounded-lg bg-emerald-400/10 p-2 text-emerald-400">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </span>
                            Bank Details
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormGroup label="Account Holder Name" value={accountHolder} onChange={setAccountHolder} />
                            <FormGroup label="Bank Name" value={bankName} onChange={setBankName} />
                            <FormGroup label="Account Number" value={accountNumber} onChange={setAccountNumber} type="password" />
                            <FormGroup label="IFSC Code" value={ifscCode} onChange={setIfscCode} />
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/5 bg-white/2 p-6 md:p-10">
                        <h3 className="mb-8 flex items-center gap-3 text-xl font-semibold text-white">
                            <span className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            Government ID Document
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) auto', gap: '1.5rem', alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 500 }}>Document Type</label>
                                <select
                                    value={docType}
                                    onChange={(e) => setDocType(e.target.value)}
                                    className="rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-300"
                                >
                                    <option value="Aadhaar Card" className="bg-slate-900">Aadhaar Card</option>
                                    <option value="PAN Card" className="bg-slate-900">PAN Card</option>
                                    <option value="Passport" className="bg-slate-900">Passport</option>
                                </select>
                            </div>

                            <FormGroup label="Document Number" value={docNumber} onChange={setDocNumber} />

                            <button
                                type="button"
                                className="inline-flex h-12.5 items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-6 text-sm text-white transition hover:bg-white/8"
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload File
                            </button>
                        </div>

                        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Securely encrypted. Max file size: 5MB.
                        </p>
                    </section>

                    {/* Bottom Action Footer */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#8B5CF6,#C084FC)] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.5)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeLinecap="round" className="opacity-25" />
                                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                                    </svg>
                                    Updating Profile...
                                </>
                            ) : (
                                <>
                                    Update Profile
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const FormGroup = ({
    label,
    value,
    onChange,
    readOnly,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    type?: string;
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-400">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            readOnly={readOnly}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${readOnly
                ? 'border-transparent bg-white/1 text-slate-500 opacity-70'
                : 'border-white/10 bg-white/3 text-white focus:border-violet-300 focus:bg-violet-300/5'
                }`}
        />
    </div>
);

export default UserProfilePage;
