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

const statusStyles: Record<NonNullable<TaskCardProps['status']>, string> = {
    active: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    pending: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
    completed: 'border-sky-500/20 bg-sky-500/10 text-sky-400',
};

const TaskCard = ({ title, category, payout, deadline, status = 'active' }: TaskCardProps) => {
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

            <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs text-muted">Payout</p>
                    <p className="text-2xl font-extrabold text-foreground">Rs {payout}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted">Deadline</p>
                    <p className="text-sm font-semibold text-foreground">
                        {mounted ? new Date(deadline).toLocaleDateString() : 'Loading...'}
                    </p>
                </div>
            </div>

            <Link
                href={`/dashboard/user/tasks/${title.toLowerCase().replace(/ /g, '-')}`}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_0_var(--primary-glow)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_var(--primary-glow)]"
            >
                View Details
            </Link>
        </div>
    );
};

export default TaskCard;
