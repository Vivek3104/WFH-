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

const summaryCardStyle: React.CSSProperties = {
    borderRadius: '20px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
};

const summaryLabelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#9CA3AF',
    fontWeight: 500,
};

const summaryValueStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1,
};

const summaryNoteStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: '#6B7280',
};

const codeStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '0.95rem',
    color: '#C084FC',
    fontWeight: 700,
    letterSpacing: '0.05em',
};

const copyButtonStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    padding: '0.3rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid rgba(192,132,252,0.4)',
    background: 'rgba(192,132,252,0.1)',
    color: '#C084FC',
    cursor: 'pointer',
    fontWeight: 600,
};

const tableHeadStyle: React.CSSProperties = {
    padding: '0.75rem 1.25rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
};

const tableCellStyle: React.CSSProperties = {
    padding: '1rem 1.25rem',
    fontSize: '0.9rem',
    color: '#9CA3AF',
};

const tableCellStrongStyle: React.CSSProperties = {
    padding: '1rem 1.25rem',
    fontSize: '0.9rem',
    color: '#fff',
    fontWeight: 600,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Referral Tree</h1>
          <p style={{ color: '#6B7280', fontSize: '1rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="premium-glass" style={summaryCardStyle}>
          <span style={summaryLabelStyle}>Referral ID</span>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={codeStyle}>{referralId}</div>
            <button onClick={handleCopy} style={copyButtonStyle}>
              {copySuccess ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        <div className="premium-glass" style={summaryCardStyle}>
          <span style={summaryLabelStyle}>Direct Referrals</span>
          <div style={summaryValueStyle}>{directReferrals}</div>
          <p style={summaryNoteStyle}>Level 2 users directly under you</p>
        </div>

        <div className="premium-glass" style={summaryCardStyle}>
          <span style={summaryLabelStyle}>Total Network</span>
          <div style={summaryValueStyle}>{networkSize}</div>
          <p style={summaryNoteStyle}>All users inside your referral tree</p>
        </div>

        <div className="premium-glass" style={summaryCardStyle}>
          <span style={summaryLabelStyle}>Commission Earned</span>
          <div style={{ ...summaryValueStyle, color: '#10B981' }}>Rs. {totalCommission.toFixed(2)}</div>
          <p style={summaryNoteStyle}>Bonus interest: +{bonusInterest}% APR</p>
        </div>
      </div>

            {showAddForm && (
                <div className="rounded-[20px] border border-white/10 bg-white/3 p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
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
                            className="rounded-xl border border-white/10 bg-white/8 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/8 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={form.phone}
                            onChange={(event) => setForm({ ...form, phone: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/8 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400"
                        />
                        <select
                            value={form.parentId}
                            onChange={(event) => setForm({ ...form, parentId: event.target.value })}
                            className="rounded-xl border border-white/10 bg-white/8 px-5 py-3 text-white outline-none transition focus:border-violet-400"
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

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="border-b border-white/5 px-6 py-6">
                    <h3 className="text-xl font-bold text-white">Referral Members</h3>
                </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#6B7280', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={tableHeadStyle}>Name</th>
                <th style={tableHeadStyle}>Level</th>
                <th style={tableHeadStyle}>Sponsor</th>
                <th style={tableHeadStyle}>Email</th>
                <th style={tableHeadStyle}>Join Date</th>
                <th style={tableHeadStyle}>Tasks</th>
                <th style={tableHeadStyle}>Earnings</th>
                <th style={tableHeadStyle}>Commission</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((member) => (
                <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={tableCellStrongStyle}>{member.name}</td>
                  <td style={tableCellStyle}>Level {member.level + 1}</td>
                  <td style={tableCellStyle}>{member.sponsorName}</td>
                  <td style={tableCellStyle}>{member.email}</td>
                  <td style={tableCellStyle}>{member.joinDate}</td>
                  <td style={tableCellStyle}>{member.tasks}</td>
                  <td style={tableCellStyle}>Rs. {member.earnings}</td>
                  <td style={{ ...tableCellStyle, color: '#10B981', fontWeight: 700 }}>
                    Rs. {member.commission.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <div className="flex flex-col gap-3 rounded-[20px] border border-white/5 bg-white/3 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
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
