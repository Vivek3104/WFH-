'use client';
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
        assignee: 'https://i.pravatar.cc/150?u=1',
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
        assignee: 'https://i.pravatar.cc/150?u=2',
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
        assignee: 'https://i.pravatar.cc/150?u=3',
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
        assignee: 'https://i.pravatar.cc/150?u=4',
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
        assignee: 'https://i.pravatar.cc/150?u=5',
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
        assignee: 'https://i.pravatar.cc/150?u=6',
    },
];

const UserDashboard = () => {
    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-8 xl:flex-row">
                <div className="flex-1">
                    <h2 className="mb-6 text-xl font-semibold text-white">Information</h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <SummaryCard title="Backlog" count="9" color="bg-amber-400" shadow="shadow-[0_10px_25px_-5px_rgba(251,169,76,0.4)]" />
                        <SummaryCard title="In Progress" count="8" color="bg-fuchsia-400" shadow="shadow-[0_10px_25px_-5px_rgba(192,132,252,0.4)]" />
                        <SummaryCard title="Completed" count="11" color="bg-emerald-400" shadow="shadow-[0_10px_25px_-5px_rgba(52,211,153,0.4)]" />
                    </div>
                </div>

                <div className="w-full xl:w-[300px]">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-white">Category Task</h2>
                        <button className="text-left text-sm text-fuchsia-300 transition hover:text-fuchsia-200 sm:text-right">
                            See All Category
                        </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <CategoryCard icon="FI" title="Personal" count="11 Tasks" />
                        <CategoryCard icon="BC" title="Business" count="9 Tasks" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="mb-2 flex flex-wrap items-center gap-2 text-3xl font-extrabold text-white md:text-4xl">
                        All My Tasks <span className="text-fuchsia-300">Target</span>
                    </h1>
                    <p className="text-slate-500">Managing your tasks is easy with Task Management</p>
                </div>
                <button className="flex items-center gap-2 text-sm text-fuchsia-300 transition hover:text-fuchsia-200">
                    See All Task <span>Right</span>
                </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <TaskColumn title="Backlog" color="text-amber-400" badgeColor="bg-amber-400" tasks={mockTasks.filter((task) => task.status === 'Backlog')} />
                <TaskColumn title="In Progress" color="text-fuchsia-400" badgeColor="bg-fuchsia-400" tasks={mockTasks.filter((task) => task.status === 'In Progress')} />
                <TaskColumn title="Completed" color="text-emerald-400" badgeColor="bg-emerald-400" tasks={mockTasks.filter((task) => task.status === 'Completed')} />
            </div>
        </div>
    );
};

const SummaryCard = ({
    title,
    count,
    color,
    shadow,
}: {
    title: string;
    count: string;
    color: string;
    shadow: string;
}) => (
    <div className={`${color} ${shadow} flex min-h-[140px] flex-col justify-between rounded-[20px] p-6 text-white`}>
        <h3 className="text-base font-semibold opacity-90">{title}</h3>
        <div className="flex items-baseline gap-1">
            <div className="mr-2 h-9 w-0.5 bg-white/50" />
            <span className="text-[2.5rem] font-bold leading-none">{count}</span>
            <span className="text-sm opacity-80">Task</span>
        </div>
    </div>
);

const CategoryCard = ({
    icon,
    title,
    count,
}: {
    icon: string;
    title: string;
    count: string;
}) => (
    <div className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:bg-white/[0.07]">
        <div className="text-lg font-bold text-white">{icon}</div>
        <div>
            <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <span className="text-sm text-slate-500">Go</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{count}</p>
        </div>
    </div>
);

const TaskColumn = ({
    title,
    color,
    badgeColor,
    tasks,
}: {
    title: Task['status'];
    color: string;
    badgeColor: string;
    tasks: Task[];
}) => (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 px-2">
            <span className={`font-semibold ${color}`}>{title}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${badgeColor}`}>
                {tasks.length}
            </span>
            <div className="flex-1" />
            <button className="text-sm text-slate-500 transition hover:text-white">Menu</button>
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
            onClick={() => router.push(`/dashboard/user/tasks/${task.id}`)}
            className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:border-white/10 hover:bg-white/[0.05]"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${task.tag === 'Team' ? 'bg-fuchsia-400/20 text-fuchsia-300' : 'bg-white/5 text-slate-400'}`}>
                        {task.tag}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">
                        {task.project}
                    </span>
                </div>
                <button className="text-sm text-slate-500 transition hover:text-white">More</button>
            </div>

            <div>
                <p className="mb-1 text-xs font-medium text-slate-500">{task.project}</p>
                <h3 className="mb-2 text-lg font-bold leading-snug text-white">{task.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{task.description}</p>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {task.comments}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {task.attachments}
                    </div>
                </div>

                <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-slate-800">
                    <img src={task.assignee} alt="Assignee" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
