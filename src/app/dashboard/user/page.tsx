'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// Mock Tasks Data
const mockTasks = [
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
        title: 'Dribbble Shot ⚡',
        project: 'Enver Studio',
        tag: 'Team',
        status: 'Completed',
        description: 'I\'ve made a dribbble design with task management theme.',
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

const UserDashboard = () => {
    return (
        <>
            {/* Information KPIs & Category Tasks */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ flex: '1 1 auto' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Information</h2>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {/* Backlog Card */}
                        <div style={{
                            backgroundColor: '#FBA94C',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            flex: 1,
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '140px',
                            boxShadow: '0 10px 25px -5px rgba(251, 169, 76, 0.4)'
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>Backlog</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                <div style={{ width: '2px', height: '36px', backgroundColor: '#fff', opacity: 0.5, marginRight: '0.5rem' }}></div>
                                <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>9</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Task</span>
                            </div>
                        </div>

                        {/* In Progress Card */}
                        <div style={{
                            backgroundColor: '#C084FC',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            flex: 1,
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '140px',
                            boxShadow: '0 10px 25px -5px rgba(192, 132, 252, 0.4)'
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>In Progress</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                <div style={{ width: '2px', height: '36px', backgroundColor: '#fff', opacity: 0.5, marginRight: '0.5rem' }}></div>
                                <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>8</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Task</span>
                            </div>
                        </div>

                        {/* Completed Card */}
                        <div style={{
                            backgroundColor: '#34D399',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            flex: 1,
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '140px',
                            boxShadow: '0 10px 25px -5px rgba(52, 211, 153, 0.4)'
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>Completed</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                <div style={{ width: '2px', height: '36px', backgroundColor: '#fff', opacity: 0.5, marginRight: '0.5rem' }}></div>
                                <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>11</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Task</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Task Component */}
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Category Task</h2>
                        <button style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>See All Category</button>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            padding: '1.2rem',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative'
                        }}>
                            <div style={{ fontSize: '1.5rem' }}>🔥</div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>Personal</h4>
                                    <span style={{ color: '#6B7280' }}>→</span>
                                </div>
                                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>11 Tasks</p>
                            </div>
                        </div>
                        <div style={{
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
                        }}>
                            <div style={{ fontSize: '1.5rem' }}>💼</div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>Business</h4>
                                    <span style={{ color: '#6B7280' }}>→</span>
                                </div>
                                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>9 Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All My Tasks Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        All My Tasks <span>🎯</span>
                    </h1>
                    <p style={{ color: '#6B7280' }}>Managing your tasks is easy with Task Management</p>
                </div>
                <button style={{ color: '#C084FC', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    See All Task <span>→</span>
                </button>
            </div>

            {/* Task Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {/* Backlog Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                        <span style={{ color: '#FBA94C', fontWeight: 600 }}>Backlog</span>
                        <span style={{ backgroundColor: '#FBA94C', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>9</span>
                        <div style={{ flex: 1 }}></div>
                        <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>⋮</button>
                    </div>
                    {mockTasks.filter(t => t.status === 'Backlog').map(task => (
                        <TaskCardComponent key={task.id} task={task} />
                    ))}
                </div>

                {/* In Progress Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                        <span style={{ color: '#C084FC', fontWeight: 600 }}>In Progress</span>
                        <span style={{ backgroundColor: '#C084FC', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>8</span>
                        <div style={{ flex: 1 }}></div>
                        <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>⋮</button>
                    </div>
                    {mockTasks.filter(t => t.status === 'In Progress').map(task => (
                        <TaskCardComponent key={task.id} task={task} />
                    ))}
                </div>

                {/* Completed Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                        <span style={{ color: '#34D399', fontWeight: 600 }}>Completed</span>
                        <span style={{ backgroundColor: '#34D399', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>11</span>
                        <div style={{ flex: 1 }}></div>
                        <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>⋮</button>
                    </div>
                    {mockTasks.filter(t => t.status === 'Completed').map(task => (
                        <TaskCardComponent key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

// Subcomponent for individual task cards in the grid
const TaskCardComponent = ({ task }: { task: any }) => {
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
                cursor: 'pointer'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                        backgroundColor: task.tag === 'Team' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: task.tag === 'Team' ? '#C084FC' : '#9CA3AF',
                        padding: '0.2rem 0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                    }}>
                        {task.tag}
                    </span>
                    <span style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#9CA3AF',
                        padding: '0.2rem 0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                    }}>
                        {task.project}
                    </span>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', lineHeight: 1 }}>•••</button>
            </div>

            <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 500 }}>{task.project}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>{task.title}</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', lineHeight: 1.5 }}>{task.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', color: '#6B7280', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {task.comments}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        {task.attachments}
                    </div>
                </div>

                <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #1F2937' }}>
                    <img src={task.assignee} alt="Assignee" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
