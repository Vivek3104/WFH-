'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authService, extractApiList, normalizeSubmission, normalizeTask, taskService } from '@/services/api';

type NormalizedTask = ReturnType<typeof normalizeTask>;

const STATUS_LABELS: Record<NormalizedTask['status'], string> = {
    backlog: 'Backlog',
    'in-progress': 'In Progress',
    completed: 'Completed',
};

const STATUS_COLORS: Record<NormalizedTask['status'], string> = {
    backlog: '#FBA94C',
    'in-progress': '#C084FC',
    completed: '#34D399',
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const UserDashboard = () => {
    const router = useRouter();
    const { user } = useAuthStore();
    const [tasks, setTasks] = React.useState<NormalizedTask[]>([]);
    const [approvedEarnings, setApprovedEarnings] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError('');
                const [tasksResult, historyResult] = await Promise.allSettled([
                    taskService.getTasks(),
                    authService.getWorkHistory(),
                ]);

                if (tasksResult.status !== 'fulfilled') {
                    throw tasksResult.reason;
                }

                const normalizedTasks = extractApiList(tasksResult.value.data).map(normalizeTask).filter((task) => task.id);
                const submissions =
                    historyResult.status === 'fulfilled'
                        ? extractApiList(historyResult.value.data).map(normalizeSubmission)
                        : axios.isAxiosError(historyResult.reason) && historyResult.reason.response?.status === 400
                            ? []
                            : (() => {
                                throw historyResult.reason;
                            })();
                const earnings = submissions
                    .filter((submission) => ['approved', 'completed'].includes(submission.status.toLowerCase()))
                    .reduce((total, submission) => total + submission.payout, 0);

                setTasks(normalizedTasks);
                setApprovedEarnings(earnings);
            } catch (err) {
                setError('Unable to load your dashboard right now.');
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const groupedTasks = {
        backlog: tasks.filter((task) => task.status === 'backlog'),
        'in-progress': tasks.filter((task) => task.status === 'in-progress'),
        completed: tasks.filter((task) => task.status === 'completed'),
    };

    const topCategories = Object.entries(
        tasks.reduce<Record<string, number>>((accumulator, task) => {
            accumulator[task.category] = (accumulator[task.category] ?? 0) + 1;
            return accumulator;
        }, {})
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

    return (
        <div className="responsive-page">
            <div className="user-overview-top">
                <div style={{ flex: '1 1 auto' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Information</h2>
                    <div className="user-kpi-grid">
                        {(['backlog', 'in-progress', 'completed'] as const).map((statusKey) => (
                            <div
                                key={statusKey}
                                style={{
                                    backgroundColor: STATUS_COLORS[statusKey],
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    flex: 1,
                                    color: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '140px',
                                    boxShadow: `0 10px 25px -5px ${STATUS_COLORS[statusKey]}66`,
                                }}
                            >
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>{STATUS_LABELS[statusKey]}</h3>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                    <div style={{ width: '2px', height: '36px', backgroundColor: '#fff', opacity: 0.5, marginRight: '0.5rem' }}></div>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{groupedTasks[statusKey].length}</span>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Task</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mobile-full-width" style={{ width: '100%', maxWidth: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Top Categories</h2>
                        <button onClick={() => router.push('/dashboard/user/tasks')} style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
                            View Tasks
                        </button>
                    </div>
                    <div className="user-categories-grid">
                        {(topCategories.length ? topCategories : [['No categories yet', 0]]).map(([category, count], index) => (
                            <div
                                key={category}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '16px',
                                    padding: '1.2rem',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <div style={{ fontSize: '1.5rem' }}>{index === 0 ? '🔥' : '💼'}</div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{category}</h4>
                                        <span style={{ color: '#6B7280' }}>→</span>
                                    </div>
                                    <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>{count} Tasks</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem' }}>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.4rem' }}>Approved Earnings</p>
                        <p style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatCurrency(approvedEarnings)}</p>
                        <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '0.35rem' }}>{user?.name ? `Nice work, ${user.name}.` : 'Your completed work shows up here.'}</p>
                    </div>
                </div>
            </div>

            <div className="responsive-header">
                <div>
                    <h1 className="responsive-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        All My Tasks <span>🎯</span>
                    </h1>
                    <p style={{ color: '#6B7280' }}>
                        {loading ? 'Loading your live task board...' : error || 'Your dashboard is now synced with backend task data.'}
                    </p>
                </div>
                <button onClick={() => router.push('/dashboard/user/tasks')} style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    See All Task <span>→</span>
                </button>
            </div>

            {loading ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading dashboard...</div>
            ) : error ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>{error}</div>
            ) : tasks.length === 0 ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No tasks available yet.</div>
            ) : (
                <div className="user-task-board">
                    {(['backlog', 'in-progress', 'completed'] as const).map((statusKey) => (
                        <div key={statusKey} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                                <span style={{ color: STATUS_COLORS[statusKey], fontWeight: 600 }}>{STATUS_LABELS[statusKey]}</span>
                                <span style={{ backgroundColor: STATUS_COLORS[statusKey], color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                                    {groupedTasks[statusKey].length}
                                </span>
                                <div style={{ flex: 1 }}></div>
                            </div>
                            {groupedTasks[statusKey].length > 0 ? (
                                groupedTasks[statusKey].map((task) => <TaskCardComponent key={task.id} task={task} />)
                            ) : (
                                <div style={{ padding: '1.25rem', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#6B7280' }}>
                                    No {STATUS_LABELS[statusKey].toLowerCase()} tasks.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TaskCardComponent = ({ task }: { task: NormalizedTask }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/dashboard/user/tasks/${task.id}`)}
            style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span
                        style={{
                            backgroundColor: 'rgba(192, 132, 252, 0.2)',
                            color: '#C084FC',
                            padding: '0.2rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}
                    >
                        {task.category}
                    </span>
                    <span
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#9CA3AF',
                            padding: '0.2rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}
                    >
                        {STATUS_LABELS[task.status]}
                    </span>
                </div>
            </div>

            <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 500 }}>{task.category}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>{task.title}</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', lineHeight: 1.5 }}>{task.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Payout</p>
                    <p style={{ fontWeight: 700 }}>{formatCurrency(task.payout)}</p>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Deadline</p>
                    <p style={{ fontWeight: 600 }}>{new Date(task.deadline).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
