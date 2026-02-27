'use client';
import React from 'react';
import Link from 'next/link';

interface TaskCardProps {
    title: string;
    category: string;
    payout: number;
    deadline: string;
    status?: 'pending' | 'active' | 'completed';
}

const TaskCard = ({ title, category, payout, deadline, status = 'active' }: TaskCardProps) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: status === 'active' ? '#10b981' : '#f59e0b',
                border: `1px solid ${status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
            }}>
                {status}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{category}</div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' }}>{title}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payout</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)' }}>₹{payout}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deadline</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                        {mounted ? new Date(deadline).toLocaleDateString() : 'Loading...'}
                    </p>
                </div>
            </div>

            <Link
                href={`/dashboard/user/tasks/${title.toLowerCase().replace(/ /g, '-')}`}
                className="btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '0.6rem', textAlign: 'center', display: 'block' }}
            >
                View Details
            </Link>
        </div>
    );
};

export default TaskCard;
