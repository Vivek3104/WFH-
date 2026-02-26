'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { taskService } from '@/services/api';

const TaskDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [submissionData, setSubmissionData] = React.useState('');
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('taskId', id as string);
            formData.append('submissionData', submissionData);
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }
            }
            await taskService.submitWork(formData);
            setSuccess(true);
            setTimeout(() => router.push('/dashboard/user/history'), 2000);
        } catch (err) {
            console.error(err);
            alert('Failed to submit work.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => router.back()}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '1rem', fontWeight: 600 }}
            >
                ← Back to Tasks
            </button>

            <div className="card glass" style={{ padding: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Task Details: {id}</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please read the instructions carefully before submitting your work.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Payout</h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹450.00</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Deadline</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Dec 30, 2024</p>
                    </div>
                </div>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Instructions</h2>
                    <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <p>1. Open the provided CSV file.</p>
                        <p>2. Enter the corresponding product descriptions from the website.</p>
                        <p>3. Save as PDF and upload here.</p>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' }} />

                {success ? (
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                        <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 700 }}>Submission Successful! 🎉</p>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to your work history...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Submit Your Work</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Work Description</label>
                            <textarea
                                required
                                value={submissionData}
                                onChange={(e) => setSubmissionData(e.target.value)}
                                placeholder="Briefly describe what you've completed..."
                                style={{
                                    background: 'var(--background)',
                                    border: '1px solid var(--border)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    color: 'var(--foreground)',
                                    minHeight: '120px',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Upload Files (Images/PDFs)</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px dashed var(--border)',
                                    padding: '2rem',
                                    borderRadius: '12px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}
                        >
                            {loading ? 'Submitting...' : 'Submit Work'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TaskDetailsPage;
