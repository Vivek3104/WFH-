'use client';
import React from 'react';
import Link from 'next/link';

interface TaskCardProps {
    id: string;
    title: string;
    category: string;
    payout: number;
    deadline: string;
    status?: 'pending' | 'active' | 'completed';
}

const statusStyles: Record<NonNullable<TaskCardProps['status']>, string> = {
    active: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    pending: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
    completed: 'border-sky-500/20 bg-sky-500/10 text-sky-400',
};

const TaskCard = ({ id, title, category, payout, deadline, status = 'active' }: TaskCardProps) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary">
            <div
                className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${statusStyles[status]}`}
            >
                {status}
            </div>

            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {category}
            </div>

            <h3 className="pr-20 text-xl font-bold text-foreground">{title}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <div>
                    <p className="text-xs text-muted">Payout</p>
                    <p className="text-2xl font-extrabold text-foreground">Rs {payout}</p>
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
