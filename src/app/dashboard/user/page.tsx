'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Task = {
    id: string;
    title: string;
    project: string;
    tag: string;
    status: 'Backlog' | 'In Progress' | 'Completed';
    description: string;
    comments: number;
    attachments: number;
    assignee: string;
};

const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Photo Profile Instagram',
        project: 'Instagram',
        tag: 'Design',
        status: 'Backlog',
        description: 'I want to make a cool profile photo for Instagram...',
        comments: 12,
        attachments: 4,
        assignee: 'https://i.pravatar.cc/150?u=1'
    },
    {
        id: '2',
        title: 'Create Material for Sharing Section',
        project: 'Enver Studio',
        tag: 'Team',
        status: 'In Progress',
        description: 'Create material for sharing about basic webflow',
        comments: 8,
        attachments: 2,
        assignee: 'https://i.pravatar.cc/150?u=2'
    },
    {
        id: '3',
        title: 'Dribbble Shot',
        project: 'Enver Studio',
        tag: 'Team',
        status: 'Completed',
        description: "I've made a dribbble design with task management theme.",
        comments: 24,
        attachments: 8,
        assignee: 'https://i.pravatar.cc/150?u=3'
    },
    {
        id: '4',
        title: 'User Research & Interview',
        project: 'Fintech App',
        tag: 'Research',
        status: 'Backlog',
        description: 'Interview 5 potential users for the new wallet feature.',
        comments: 5,
        attachments: 1,
        assignee: 'https://i.pravatar.cc/150?u=4'
    },
    {
        id: '5',
        title: 'Design System Update',
        project: 'Internal',
        tag: 'Design',
        status: 'In Progress',
        description: 'Update color tokens and typography in Figma.',
        comments: 15,
        attachments: 6,
        assignee: 'https://i.pravatar.cc/150?u=5'
    },
    {
        id: '6',
        title: 'Fix Navigation Bug',
        project: 'Web Platform',
        tag: 'Development',
        status: 'Completed',
        description: 'Resolve the mobile menu toggle issue on Safari.',
        comments: 3,
        attachments: 0,
        assignee: 'https://i.pravatar.cc/150?u=6'
    }
];

const statusCounts: Record<Task['status'], number> = {
    Backlog: 9,
    'In Progress': 8,
    Completed: 11
};

const UserDashboard = () => {
    return (
        <div className="user-overview-page">
            <div className="user-overview-top" style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ flex: '1 1 auto' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Information</h2>
                    <div className="user-overview-kpis" style={{ display: 'flex', gap: '1.5rem' }}>
                        <SummaryCard title="Backlog" count="9" color="#FBA94C" shadow="rgba(251, 169, 76, 0.4)" />
                        <SummaryCard title="In Progress" count="8" color="#C084FC" shadow="rgba(192, 132, 252, 0.4)" />
                        <SummaryCard title="Completed" count="11" color="#34D399" shadow="rgba(52, 211, 153, 0.4)" />
                    </div>
                </div>

                <div className="user-overview-category-panel" style={{ width: '300px' }}>
                    <div className="user-overview-section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Category Task</h2>
                        <button style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>See All Category</button>
                    </div>
                    <div className="user-overview-categories" style={{ display: 'flex', gap: '1rem' }}>
                        <CategoryCard icon="Fire" title="Personal" count="11 Tasks" />
                        <CategoryCard icon="Briefcase" title="Business" count="9 Tasks" />
                    </div>
                </div>
            </div>

            <div className="user-overview-tasks-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', gap: '1rem' }}>
                <div>
                    <h1 className="user-overview-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        All My Tasks <span>Target</span>
                    </h1>
                    <p style={{ color: '#6B7280' }}>Managing your tasks is easy with Task Management</p>
                </div>
                <button style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    See All Task <span>Right</span>
                </button>
            </div>

            <div className="user-overview-task-columns" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <TaskColumn title="Backlog" color="#FBA94C" count={statusCounts.Backlog} tasks={mockTasks.filter((task) => task.status === 'Backlog')} />
                <TaskColumn title="In Progress" color="#C084FC" count={statusCounts['In Progress']} tasks={mockTasks.filter((task) => task.status === 'In Progress')} />
                <TaskColumn title="Completed" color="#34D399" count={statusCounts.Completed} tasks={mockTasks.filter((task) => task.status === 'Completed')} />
            </div>

            <style jsx>{`
                @media (max-width: 1100px) {
                    .user-overview-top {
                        flex-direction: column !important;
                    }

                    .user-overview-category-panel {
                        width: 100% !important;
                    }
                }

                @media (max-width: 768px) {
                    .user-overview-top {
                        gap: 1.5rem !important;
                        margin-bottom: 2rem !important;
                    }

                    .user-overview-kpis {
                        flex-direction: column !important;
                    }

                    .user-overview-section-head,
                    .user-overview-tasks-head {
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }

                    .user-overview-categories {
                        flex-direction: column !important;
                    }

                    .user-overview-title {
                        font-size: 1.85rem !important;
                    }

                    .user-overview-task-columns {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 480px) {
                    .user-overview-title {
                        font-size: 1.55rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

const SummaryCard = ({
    title,
    count,
    color,
    shadow
}: {
    title: string;
    count: string;
    color: string;
    shadow: string;
}) => (
    <div
        className="user-overview-kpi-card"
        style={{
            backgroundColor: color,
            borderRadius: '20px',
            padding: '1.5rem',
            flex: 1,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '140px',
            boxShadow: `0 10px 25px -5px ${shadow}`
        }}
    >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
            <div style={{ width: '2px', height: '36px', backgroundColor: '#fff', opacity: 0.5, marginRight: '0.5rem' }}></div>
            <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{count}</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Task</span>
        </div>
    </div>
);

const CategoryCard = ({
    icon,
    title,
    count
}: {
    icon: string;
    title: string;
    count: string;
}) => (
    <div
        className="user-overview-category-card"
        style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.2rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
    >
        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>{icon}</div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{title}</h4>
                <span style={{ color: '#6B7280' }}>Go</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>{count}</p>
        </div>
    </div>
);

const TaskColumn = ({
    title,
    color,
    count,
    tasks
}: {
    title: Task['status'];
    color: string;
    count: number;
    tasks: Task[];
}) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
            <span style={{ color, fontWeight: 600 }}>{title}</span>
            <span style={{ backgroundColor: color, color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                {count}
            </span>
            <div style={{ flex: 1 }}></div>
            <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>Menu</button>
        </div>
        {tasks.map((task) => (
            <TaskCardComponent key={task.id} task={task} />
        ))}
    </div>
);

const TaskCardComponent = ({ task }: { task: Task }) => {
    const router = useRouter();

    return (
        <div
            className="task-card"
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
                cursor: 'pointer'
            }}
        >
            <div className="task-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div className="task-card-tags" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span
                        style={{
                            backgroundColor: task.tag === 'Team' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: task.tag === 'Team' ? '#C084FC' : '#9CA3AF',
                            padding: '0.2rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}
                    >
                        {task.tag}
                    </span>
                    <span
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#9CA3AF',
                            padding: '0.2rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}
                    >
                        {task.project}
                    </span>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', lineHeight: 1 }}>More</button>
            </div>

            <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 500 }}>{task.project}</p>
                <h3 className="task-card-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {task.title}
                </h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', lineHeight: 1.5 }}>{task.description}</p>
            </div>

            <div className="task-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', gap: '0.75rem' }}>
                <div className="task-card-meta" style={{ display: 'flex', gap: '1rem', color: '#6B7280', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {task.comments}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        {task.attachments}
                    </div>
                </div>

                <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #1F2937', flexShrink: 0 }}>
                    <img src={task.assignee} alt="Assignee" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .task-card {
                        padding: 1.1rem !important;
                    }

                    .task-card-title {
                        font-size: 1.05rem !important;
                    }

                    .task-card-footer {
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserDashboard;
