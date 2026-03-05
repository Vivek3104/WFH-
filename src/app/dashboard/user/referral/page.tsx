'use client';
import React, { useState } from 'react';

const ReferralPage = () => {
    const [referralId] = useState('WFH-REF-7829');
    const [copySuccess, setCopySuccess] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [subUsers, setSubUsers] = useState([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', joinDate: '2024-03-01', tasks: 12, earnings: 450, commission: 22.5 },
        { id: 2, name: 'Priya Patel', email: 'priya@example.com', joinDate: '2024-02-28', tasks: 8, earnings: 300, commission: 15.0 },
        { id: 3, name: 'Amit Kumar', email: 'amit@example.com', joinDate: '2024-02-25', tasks: 15, earnings: 600, commission: 30.0 },
    ]);

    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://wfh-platform.com/register?ref=${referralId}`);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleAddSubUser = () => {
        if (!form.name || !form.email || !form.phone) {
            alert('Please fill all fields');
            return;
        }

        const newUser = {
            id: subUsers.length + 1,
            name: form.name,
            email: form.email,
            joinDate: new Date().toISOString().split('T')[0],
            tasks: 0,
            earnings: 0,
            commission: 0
        };

        setSubUsers([newUser, ...subUsers]);
        alert(`Success! Credentials generated and sent to ${form.email}\n\nTemp Password: ${form.name.split(' ')[0]}@123`);
        setForm({ name: '', email: '', phone: '' });
        setShowAddForm(false);
    };

    const totalSubUsers = subUsers.length;
    const totalCommission = subUsers.reduce((acc, user) => acc + user.commission, 0);
    const bonusInterest = totalSubUsers >= 5 ? 2.5 : totalSubUsers >= 3 ? 1.0 : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Referral & Sub-Users</h1>
                    <p style={{ color: '#6B7280', fontSize: '1rem' }}>Manage your network and track your passive earnings.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                        color: '#fff',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                    }}>
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Sub-User
                </button>
            </div>

            {/* Referral Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* ID & Link Card */}
                <div className="premium-glass" style={{
                    padding: '1.5rem',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA' }}>
                            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span style={{ fontWeight: 600, color: '#A78BFA' }}>Your Referral ID</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(0,0,0,0.2)',
                            padding: '0.8rem 1rem',
                            borderRadius: '10px',
                            fontFamily: 'monospace',
                            color: '#fff',
                            fontSize: '1.1rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {referralId}
                        </div>
                        <button
                            onClick={handleCopy}
                            style={{
                                padding: '0.8rem',
                                background: 'rgba(124,58,237,0.1)',
                                color: '#A78BFA',
                                borderRadius: '10px',
                                border: '1px solid rgba(124,58,237,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                            {copySuccess ? 'Copied!' : (
                                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Status Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="premium-glass" style={{
                        padding: '1.5rem',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Sub-Users</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>{totalSubUsers}</div>
                    </div>
                    <div className="premium-glass" style={{
                        padding: '1.5rem',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Commission (5%)</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10B981' }}>₹{totalCommission.toFixed(2)}</div>
                    </div>
                </div>

                {/* Bonus Card */}
                <div className="premium-glass" style={{
                    padding: '1.5rem',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(79,70,229,0.1) 100%)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA' }}>
                        <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <span style={{ color: '#A78BFA', fontSize: '0.9rem', fontWeight: 600 }}>Bonus Interest</span>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>+{bonusInterest}% APR</div>
                        <p style={{ color: '#6B7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>{totalSubUsers < 5 ? `Add ${5 - totalSubUsers} more for next tier` : 'Top tier unlocked!'}</p>
                    </div>
                </div>
            </div>

            {/* Add Sub-User Form (Conditional) */}
            {showAddForm && (
                <div className="premium-glass" style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Register New Sub-User</h3>
                        <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                            </svg>
                        </button>
                    </div>
                    <form style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ color: '#6B7280', fontSize: '0.85rem' }}>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ color: '#6B7280', fontSize: '0.85rem' }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ color: '#6B7280', fontSize: '0.85rem' }}>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 00000 00000"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button
                                type="button"
                                onClick={handleAddSubUser}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', background: '#7C3AED', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                            >
                                Generate Credentials
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Sub-Users Table */}
            <div className="premium-glass" style={{
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Network Members</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: '#6B7280', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem' }}>NAME</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem' }}>EMAIL</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem' }}>JOIN DATE</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem', textAlign: 'center' }}>TASKS</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem' }}>EARNINGS</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.85rem' }}>COMMISSION (5%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#fff', fontWeight: 500 }}>{user.name}</td>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#6B7280', fontSize: '0.9rem' }}>{user.email}</td>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#6B7280', fontSize: '0.9rem' }}>{user.joinDate}</td>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#fff', textAlign: 'center' }}>
                                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(167,139,250,0.1)', color: '#A78BFA', fontSize: '0.8rem' }}>{user.tasks} completed</span>
                                    </td>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#fff', fontWeight: 600 }}>₹{user.earnings}</td>
                                    <td style={{ padding: '1.2rem 1.5rem', color: '#10B981', fontWeight: 600 }}>₹{user.commission.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ReferralPage;
