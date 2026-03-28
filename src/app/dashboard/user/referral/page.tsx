'use client';

import React, { useState } from 'react';

type ReferralNode = {
    id: number;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    tasks: number;
    earnings: number;
    commission: number;
    children: ReferralNode[];
};

type MemberRecord = ReferralNode & {
    level: number;
    sponsorName: string;
};

const initialTree: ReferralNode = {
    id: 1,
    name: 'You',
    email: 'you@example.com',
    phone: '+91 90000 00000',
    joinDate: '2024-01-10',
    tasks: 24,
    earnings: 0,
    commission: 0,
    children: [
        {
            id: 2,
            name: 'User A',
            email: 'usera@example.com',
            phone: '+91 91000 00001',
            joinDate: '2024-02-14',
            tasks: 12,
            earnings: 450,
            commission: 22.5,
            children: [
                {
                    id: 4,
                    name: 'Sub A1',
                    email: 'suba1@example.com',
                    phone: '+91 92000 00002',
                    joinDate: '2024-03-04',
                    tasks: 7,
                    earnings: 250,
                    commission: 12.5,
                    children: [],
                },
                {
                    id: 5,
                    name: 'Sub A2',
                    email: 'suba2@example.com',
                    phone: '+91 93000 00003',
                    joinDate: '2024-03-12',
                    tasks: 5,
                    earnings: 180,
                    commission: 9,
                    children: [],
                },
            ],
        },
        {
            id: 3,
            name: 'User B',
            email: 'userb@example.com',
            phone: '+91 94000 00004',
            joinDate: '2024-02-20',
            tasks: 9,
            earnings: 320,
            commission: 16,
            children: [],
        },
    ],
};

const collectMembers = (node: ReferralNode, level = 1, sponsorName: string): MemberRecord[] => {
    const members: MemberRecord[] = [];

    for (const child of node.children) {
        members.push({
            ...child,
            level,
            sponsorName,
        });
        members.push(...collectMembers(child, level + 1, child.name));
    }

    return members;
};

const collectParentOptions = (node: ReferralNode): Pick<ReferralNode, 'id' | 'name'>[] => {
    const options = [{ id: node.id, name: node.name }];
    for (const child of node.children) {
        options.push(...collectParentOptions(child));
    }
    return options;
};

const addChildNode = (node: ReferralNode, parentId: number, child: ReferralNode): ReferralNode => {
    if (node.id === parentId) {
        return {
            ...node,
            children: [...node.children, child],
        };
    }

    return {
        ...node,
        children: node.children.map((existingChild) => addChildNode(existingChild, parentId, child)),
    };
};

const ReferralPage = () => {
    const [referralId] = useState('WFH-REF-7829');
    const [copySuccess, setCopySuccess] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [tree, setTree] = useState<ReferralNode>(initialTree);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        parentId: String(initialTree.id),
    });

    const allMembers = collectMembers(tree, 1, tree.name);
    const parentOptions = collectParentOptions(tree);
    const directReferrals = tree.children.length;
    const networkSize = allMembers.length;
    const totalCommission = allMembers.reduce((sum, member) => sum + member.commission, 0);
    const bonusInterest = directReferrals >= 5 ? 2.5 : directReferrals >= 3 ? 1 : 0;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`https://wfh-platform.com/register?ref=${referralId}`);
        setCopySuccess(true);
        window.setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleAddSubUser = () => {
        if (!form.name || !form.email || !form.phone || !form.parentId) {
            alert('Please fill all fields.');
            return;
        }

        const newUser: ReferralNode = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            joinDate: new Date().toISOString().split('T')[0],
            tasks: 0,
            earnings: 0,
            commission: 0,
            children: [],
        };

        setTree((currentTree) => addChildNode(currentTree, Number(form.parentId), newUser));
        alert(`Referral user added for ${form.name}.`);
        setForm({
            name: '',
            email: '',
            phone: '',
            parentId: String(initialTree.id),
        });
        setShowAddForm(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-extrabold text-white md:text-[2rem]">Referral Tree</h1>
                    <p className="text-slate-500">
                        Track your downline visually and manage every referral level from one place.
                    </p>
                </div>

                <button
                    onClick={() => setShowAddForm((current) => !current)}
                    className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7C3AED_0%,#4F46E5_100%)] px-6 py-3 font-semibold text-white shadow-[0_4px_15px_rgba(124,58,237,0.3)] transition hover:-translate-y-0.5 md:w-auto"
                >
                    {showAddForm ? 'Close Form' : 'Add Referral User'}
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SummaryCard label="Referral ID">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex-1 rounded-xl border border-white/5 bg-black/20 px-4 py-3 font-mono text-white">
                            {referralId}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 font-bold text-violet-200 transition hover:bg-violet-500/15"
                        >
                            {copySuccess ? 'Copied' : 'Copy Link'}
                        </button>
                    </div>
                </SummaryCard>

                <SummaryCard label="Direct Referrals" value={directReferrals.toString()} note="Level 2 users directly under you" />
                <SummaryCard label="Total Network" value={networkSize.toString()} note="All users inside your referral tree" />
                <SummaryCard
                    label="Commission Earned"
                    value={`Rs. ${totalCommission.toFixed(2)}`}
                    note={`Bonus interest: +${bonusInterest}% APR`}
                    valueClassName="text-emerald-400"
                />
            </div>

            {showAddForm && (
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-white">Add Referral User</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Choose the parent user to place the new member at the correct level in the tree.
                        </p>
                    </div>

                    <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <input
                            type="text"
                            placeholder="Full name"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/[0.08] px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/[0.08] px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={form.phone}
                            onChange={(event) => setForm({ ...form, phone: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/[0.08] px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <select
                            value={form.parentId}
                            onChange={(event) => setForm({ ...form, parentId: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/[0.08] px-5 py-3 text-white outline-none transition focus:border-violet-400"
                        >
                            {parentOptions.map((option) => (
                                <option key={option.id} value={option.id} className="bg-slate-900">
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={handleAddSubUser}
                            className="min-h-12 rounded-xl bg-violet-600 px-4 py-3 font-bold text-white transition hover:bg-violet-500"
                        >
                            Save Referral
                        </button>
                    </form>
                </div>
            )}

            <div className="overflow-hidden rounded-[24px] border border-white/5 bg-white/[0.02] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="border-b border-white/5 px-6 py-6">
                    <h3 className="text-xl font-bold text-white">Referral Members</h3>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-500">
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Name</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Level</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Sponsor</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Email</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Join Date</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Tasks</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Earnings</th>
                                <th className="px-5 py-4 text-[0.82rem] font-bold whitespace-nowrap">Commission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMembers.map((member) => (
                                <tr key={member.id} className="border-b border-white/[0.03]">
                                    <td className="px-5 py-4 text-[0.92rem] font-semibold whitespace-nowrap text-white">{member.name}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">Level {member.level + 1}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">{member.sponsorName}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">{member.email}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">{member.joinDate}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">{member.tasks}</td>
                                    <td className="px-5 py-4 text-[0.92rem] whitespace-nowrap text-slate-400">Rs. {member.earnings}</td>
                                    <td className="px-5 py-4 text-[0.92rem] font-bold whitespace-nowrap text-emerald-400">
                                        Rs. {member.commission.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 p-4 md:hidden">
                    {allMembers.map((member) => (
                        <div key={member.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                            <MobileRow label="Name" value={member.name} strong />
                            <MobileRow label="Level" value={`Level ${member.level + 1}`} />
                            <MobileRow label="Sponsor" value={member.sponsorName} />
                            <MobileRow label="Email" value={member.email} />
                            <MobileRow label="Join Date" value={member.joinDate} />
                            <MobileRow label="Tasks" value={String(member.tasks)} />
                            <MobileRow label="Earnings" value={`Rs. ${member.earnings}`} />
                            <MobileRow label="Commission" value={`Rs. ${member.commission.toFixed(2)}`} valueClassName="text-emerald-400 font-bold" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({
    label,
    value,
    note,
    children,
    valueClassName = '',
}: {
    label: string;
    value?: string;
    note?: string;
    children?: React.ReactNode;
    valueClassName?: string;
}) => (
    <div className="flex flex-col gap-3 rounded-[20px] border border-white/5 bg-white/[0.03] p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <span className="text-sm text-slate-400">{label}</span>
        {children ?? <div className={`text-3xl font-extrabold text-white ${valueClassName}`}>{value}</div>}
        {note ? <p className="text-sm text-slate-500">{note}</p> : null}
    </div>
);

const MobileRow = ({
    label,
    value,
    strong,
    valueClassName = '',
}: {
    label: string;
    value: string;
    strong?: boolean;
    valueClassName?: string;
}) => (
    <div className="flex items-start justify-between gap-4 py-2">
        <span className="text-sm font-semibold text-slate-500">{label}</span>
        <span className={`text-right text-sm ${strong ? 'font-semibold text-white' : 'text-slate-400'} ${valueClassName}`}>
            {value}
        </span>
    </div>
);

export default ReferralPage;
