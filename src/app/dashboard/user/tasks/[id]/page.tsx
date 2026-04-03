'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { normalizeTask, taskService } from '@/services/api';

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const TaskDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [task, setTask] = React.useState<ReturnType<typeof normalizeTask> | null>(null);
    const [loadingTask, setLoadingTask] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [submissionData, setSubmissionData] = React.useState('');
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const loadTask = async () => {
            try {
                setLoadingTask(true);
                setError('');
                const response = await taskService.getTaskById(String(id));
                setTask(normalizeTask(response.data?.data ?? response.data));
            } catch (err) {
                console.error(err);
                setError('Unable to load this task right now.');
            } finally {
                setLoadingTask(false);
            }
        };

        if (id) {
            loadTask();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('taskId', String(id));
            formData.append('submissionData', submissionData);

            if (files) {
                for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
                    formData.append('files', files[fileIndex]);
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
        <div className="responsive-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => router.back()}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '1rem', fontWeight: 600 }}
            >
                ← Back to Tasks
            </button>

            <div className="card glass" style={{ padding: '2.5rem' }}>
                {loadingTask ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading task details...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', color: '#f87171' }}>{error}</div>
                ) : !task?.id ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Task not found.</div>
                ) : (
                    <>
                        <h1 className="responsive-title" style={{ marginBottom: '0.5rem' }}>{task.title}</h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{task.description}</p>

                        <div className="responsive-form-grid-2" style={{ marginBottom: '2.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Payout</h3>
                                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatCurrency(task.payout)}</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Deadline</h3>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{new Date(task.deadline).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Instructions</h2>
                            <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                <p>{task.description}</p>
                            </div>
                        </section>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' }} />

                        {success ? (
                            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 700 }}>Submission Successful!</p>
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
                                        onChange={(event) => setSubmissionData(event.target.value)}
                                        placeholder="Briefly describe what you've completed..."
                                        style={{
                                            background: 'var(--background)',
                                            border: '1px solid var(--border)',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            color: 'var(--foreground)',
                                            minHeight: '120px',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Upload Files (Images/PDFs)</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(event) => setFiles(event.target.files)}
                                        style={{
                                            background: 'var(--surface)',
                                            border: '1px dashed var(--border)',
                                            padding: '2rem',
                                            borderRadius: '12px',
                                            color: 'var(--text-muted)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
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
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskDetailsPage;
