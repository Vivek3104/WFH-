'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/api';

const CreateTaskPage = () => {
    const [formData, setFormData] = useState({
        jobId: '',
        title: '',
        description: '',
        payoutAmount: '',
        maxSubmissions: '',
        deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await adminService.createTask({
                ...formData,
                payoutAmount: Number(formData.payoutAmount),
                maxSubmissions: Number(formData.maxSubmissions)
            });
            alert('Task created successfully!');
            router.push('/dashboard/admin');
        } catch (err) {
            console.error(err);
            alert('Failed to create task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Create New <span className="gradient-text">Task</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Fill in the details below to post a new task for workers.</p>
            </header>

            <form onSubmit={handleSubmit} className="card glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Task Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Data Entry - Product Catalog"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Payout (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.payoutAmount}
                            onChange={(e) => setFormData({ ...formData, payoutAmount: e.target.value })}
                            placeholder="500"
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Max Submissions</label>
                        <input
                            type="number"
                            required
                            value={formData.maxSubmissions}
                            onChange={(e) => setFormData({ ...formData, maxSubmissions: e.target.value })}
                            placeholder="10"
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Deadline</label>
                    <input
                        type="date"
                        required
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Job ID (Link to Category)</label>
                    <input
                        type="text"
                        required
                        value={formData.jobId}
                        onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                        placeholder="job_12345"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Description & Instructions</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Provide clear steps for the workers..."
                        style={{ ...inputStyle, minHeight: '150px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'none', color: 'var(--foreground)', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ flex: 2, padding: '1rem' }}
                    >
                        {loading ? 'Creating...' : 'Post Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    padding: '0.9rem 1rem',
    borderRadius: '8px',
    color: 'var(--foreground)',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
};

export default CreateTaskPage;
