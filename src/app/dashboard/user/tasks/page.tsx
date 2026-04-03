'use client';

import React from 'react';
import TaskCard from '@/components/TaskCard';
import { extractApiList, normalizeTask, taskService } from '@/services/api';

const statusMap: Record<'backlog' | 'in-progress' | 'completed', 'pending' | 'active' | 'completed'> = {
    backlog: 'pending',
    'in-progress': 'active',
    completed: 'completed',
};

const TasksListPage = () => {
    const [tasks, setTasks] = React.useState<ReturnType<typeof normalizeTask>[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const loadTasks = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await taskService.getTasks();
                setTasks(extractApiList(response.data).map(normalizeTask).filter((task) => task.id));
            } catch (err) {
                console.error(err);
                setError('Unable to load tasks right now.');
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    return (
        <div className="responsive-page">
            <header>
                <h1 className="responsive-title">Browse <span className="gradient-text">Work</span></h1>
                <p className="responsive-subtitle">Find the perfect task and start earning today.</p>
            </header>

            {loading ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Loading tasks...
                </div>
            ) : error ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>
                    {error}
                </div>
            ) : tasks.length === 0 ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No tasks are available yet.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            category={task.category}
                            payout={task.payout}
                            deadline={task.deadline}
                            status={statusMap[task.status]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TasksListPage;
