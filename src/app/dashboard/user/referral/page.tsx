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

const collectMembers = (
  node: ReferralNode,
  level = 1,
  sponsorName: string
): MemberRecord[] => {
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
    <div className="referral-page" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        className="referral-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}
      >
        <div>
          <h1 className="referral-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>
            Referral Tree
          </h1>
          <p className="referral-subtitle" style={{ color: '#6B7280', fontSize: '1rem' }}>
            Track your downline visually and manage every referral level from one place.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm((current) => !current)}
          style={{
            padding: '0.85rem 1.4rem',
            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
            color: '#fff',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
          }}
        >
          {showAddForm ? 'Close Form' : 'Add Referral User'}
        </button>
      </div>

      <div
        className="referral-summary-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}
      >
        <div className="premium-glass" style={summaryCardStyle}>
          <span style={summaryLabelStyle}>Referral ID</span>
          <div className="referral-code-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
        <div
          className="premium-glass"
          style={{
            padding: '1.75rem',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Add Referral User</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Choose the parent user to place the new member at the correct level in the tree.
              </p>
            </div>
          </div>

          <form
            className="referral-form-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}
          >
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="input-glass"
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="input-glass"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="input-glass"
            />
            <select
              value={form.parentId}
              onChange={(event) => setForm({ ...form, parentId: event.target.value })}
              className="input-glass"
            >
              {parentOptions.map((option) => (
                <option key={option.id} value={option.id} style={{ background: '#111' }}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddSubUser}
              style={{
                borderRadius: '12px',
                border: 'none',
                background: '#7C3AED',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                minHeight: '48px',
              }}
            >
              Save Referral
            </button>
          </form>
        </div>
      )}

      <div
        className="premium-glass"
        style={{
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Referral Members</h3>
        </div>

        <div className="referral-table-wrap" style={{ overflowX: 'auto' }}>
          <table className="referral-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead className="referral-table-head">
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
            <tbody className="referral-table-body">
              {allMembers.map((member) => (
                <tr key={member.id} className="referral-table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td data-label="Name" style={tableCellStrongStyle}>{member.name}</td>
                  <td data-label="Level" style={tableCellStyle}>Level {member.level + 1}</td>
                  <td data-label="Sponsor" style={tableCellStyle}>{member.sponsorName}</td>
                  <td data-label="Email" style={tableCellStyle}>{member.email}</td>
                  <td data-label="Join Date" style={tableCellStyle}>{member.joinDate}</td>
                  <td data-label="Tasks" style={tableCellStyle}>{member.tasks}</td>
                  <td data-label="Earnings" style={tableCellStyle}>Rs. {member.earnings}</td>
                  <td data-label="Commission" style={{ ...tableCellStyle, color: '#10B981', fontWeight: 700 }}>
                    Rs. {member.commission.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .referral-page {
            gap: 1.5rem !important;
          }

          .referral-header {
            align-items: stretch !important;
          }

          .referral-header button {
            width: 100%;
          }

          .referral-title {
            font-size: 1.6rem !important;
          }

          .referral-subtitle {
            font-size: 0.95rem !important;
          }

          .referral-summary-grid {
            grid-template-columns: 1fr !important;
          }

          .referral-code-row {
            flex-direction: column;
            align-items: stretch !important;
          }

          .referral-code-row button {
            width: 100%;
          }

          .referral-form-grid {
            grid-template-columns: 1fr !important;
          }

          .referral-table-wrap {
            overflow-x: visible !important;
          }

          .referral-table,
          .referral-table-head,
          .referral-table-body,
          .referral-table-row,
          .referral-table th,
          .referral-table td {
            display: block;
            width: 100%;
          }

          .referral-table-head {
            display: none;
          }

          .referral-table-row {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }

          .referral-table td {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.7rem 0 !important;
            white-space: normal !important;
            text-align: right;
          }

          .referral-table td::before {
            content: attr(data-label);
            color: #6b7280;
            font-weight: 600;
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .referral-page {
            gap: 1.25rem !important;
          }

          .referral-title {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const summaryCardStyle: React.CSSProperties = {
  padding: '1.4rem',
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

const summaryLabelStyle: React.CSSProperties = {
  color: '#9CA3AF',
  fontSize: '0.9rem',
};

const summaryValueStyle: React.CSSProperties = {
  fontSize: '1.85rem',
  fontWeight: 800,
  color: '#fff',
};

const summaryNoteStyle: React.CSSProperties = {
  color: '#6B7280',
  fontSize: '0.85rem',
};

const codeStyle: React.CSSProperties = {
  flex: 1,
  background: 'rgba(0,0,0,0.2)',
  padding: '0.85rem 1rem',
  borderRadius: '12px',
  fontFamily: 'monospace',
  color: '#fff',
  fontSize: '1rem',
  border: '1px solid rgba(255,255,255,0.05)',
};

const copyButtonStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  background: 'rgba(124,58,237,0.12)',
  color: '#C4B5FD',
  borderRadius: '12px',
  border: '1px solid rgba(124,58,237,0.22)',
  cursor: 'pointer',
  fontWeight: 700,
};

const tableHeadStyle: React.CSSProperties = {
  padding: '1rem 1.25rem',
  fontWeight: 700,
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
};

const tableCellStyle: React.CSSProperties = {
  padding: '1rem 1.25rem',
  color: '#9CA3AF',
  fontSize: '0.92rem',
  whiteSpace: 'nowrap',
};

const tableCellStrongStyle: React.CSSProperties = {
  ...tableCellStyle,
  color: '#fff',
  fontWeight: 600,
};

export default ReferralPage;
