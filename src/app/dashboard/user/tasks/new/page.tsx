'use client';
import React from 'react';

export default function NewTaskPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>Create New <span style={{ color: '#A78BFA' }}>Task</span></h1>

            <div style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Task Title</label>
                    <input
                        type="text"
                        placeholder="E.g., Design new landing page"
                        style={{
                            padding: '0.8rem 1rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Description</label>
                    <textarea
                        rows={4}
                        placeholder="Describe the task details..."
                        style={{
                            padding: '0.8rem 1rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            outline: 'none',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Category</label>
                        <select style={{
                            padding: '0.8rem 1rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            outline: 'none'
                        }}>
                            <option value="design" style={{ background: '#1F2937' }}>Design</option>
                            <option value="development" style={{ background: '#1F2937' }}>Development</option>
                            <option value="research" style={{ background: '#1F2937' }}>Research</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Priority</label>
                        <select style={{
                            padding: '0.8rem 1rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            outline: 'none'
                        }}>
                            <option value="low" style={{ background: '#1F2937' }}>Low</option>
                            <option value="medium" style={{ background: '#1F2937' }}>Medium</option>
                            <option value="high" style={{ background: '#1F2937' }}>High</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button style={{
                        padding: '0.8rem 2rem',
                        backgroundColor: '#C084FC',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px 0 rgba(192, 132, 252, 0.3)'
                    }} onClick={() => alert("Task created!")}>
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
}
