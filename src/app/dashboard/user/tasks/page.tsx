'use client';
import React from 'react';
import TaskCard from '@/components/TaskCard';

const TasksListPage = () => {
    const [tasks, setTasks] = React.useState([
        { id: '1', title: 'Data Entry - CRM Products', category: 'Data Entry', payout: 450, deadline: '2024-12-30' },
        { id: '2', title: 'Content Writing - Tech Blog', category: 'Content', payout: 1200, deadline: '2024-12-28' },
        { id: '3', title: 'Logo Design - Startup', category: 'Design', payout: 3500, deadline: '2024-12-31' },
        { id: '4', title: 'User Testing - Mobile App', category: 'Testing', payout: 800, deadline: '2025-01-05' },
        { id: '5', title: 'Social Media Management', category: 'Marketing', payout: 5000, deadline: '2025-01-10' },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Browse <span className="gradient-text">Work</span></h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Find the perfect task and start earning today.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {tasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>
        </div>
    );
};

export default TasksListPage;
