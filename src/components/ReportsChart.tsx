'use client';

import React, { useMemo, useState } from 'react';

type ChartPoint = {
  label: string;
  revenue: number;
  users: number;
};

type ReportsChartProps = {
  title: string;
  subtitle: string;
  data: ChartPoint[];
};

type HoverPoint = {
  point: ChartPoint;
  x: number;
  revenueY: number;
};

const chartWidth = 760;
const chartHeight = 260;
const padding = { top: 24, right: 24, bottom: 40, left: 20 };

const ReportsChart = ({ title, subtitle, data }: ReportsChartProps) => {
  const [hovered, setHovered] = useState<HoverPoint | null>(null);

  const chart = useMemo(() => {
    const maxRevenue = Math.max(...data.map((item) => item.revenue));
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const stepX = innerWidth / Math.max(data.length - 1, 1);

    const points = data.map((point, index) => {
      const x = padding.left + stepX * index;
      const revenueY = padding.top + innerHeight - (point.revenue / maxRevenue) * innerHeight;
      return { point, x, revenueY };
    });

    const line = points.map(({ x, revenueY }) => `${x},${revenueY}`).join(' ');
    const area = `${padding.left},${chartHeight - padding.bottom} ${line} ${padding.left + innerWidth},${chartHeight - padding.bottom}`;

    return { points, line, area, innerHeight };
  }, [data]);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const completion = 93.1;
  const targets = 243;
  const ranking = [
    { name: 'John Jonas', score: 987, accent: '#f59e0b' },
    { name: 'Hiro Snow', score: 932, accent: '#ef4444' },
    { name: 'Celia Hart', score: 904, accent: '#8b5cf6' },
    { name: 'Tharley Wells', score: 876, accent: '#14b8a6' },
    { name: 'Roselyn James', score: 853, accent: '#22c55e' },
    { name: 'Aaron Morgan', score: 811, accent: '#3b82f6' },
  ];
  const trafficSegments = [
    { label: 'Digital marketing', value: 42, color: '#f59e0b' },
    { label: 'Referral', value: 26, color: '#3b82f6' },
    { label: 'Content', value: 18, color: '#22c55e' },
    { label: 'Product design', value: 14, color: '#ef4444' },
  ];
  const active = hovered ?? chart.points[chart.points.length - 1];

  return (
    <section
      style={{
        borderRadius: '28px',
        padding: '1.15rem',
        background:
          'linear-gradient(145deg, rgba(9,12,18,0.98) 0%, rgba(14,18,26,0.98) 55%, rgba(17,22,31,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 40px 90px rgba(0,0,0,0.38)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: '1rem',
        }}
      >
        <div
          style={{
            borderRadius: '22px',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(17,20,29,0.95), rgba(10,13,20,0.95))',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#f8fafc',
                  background: 'rgba(245,158,11,0.14)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                }}
              >
                X
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{title}</h3>
                <p style={{ color: '#77839a', fontSize: '0.8rem', marginTop: '0.15rem' }}>{subtitle}</p>
              </div>
            </div>

            <button
              style={{
                border: 'none',
                borderRadius: '999px',
                padding: '0.5rem 0.9rem',
                background: 'linear-gradient(135deg, #facc15, #f59e0b)',
                color: '#111827',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              Create
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '0.85rem',
              marginTop: '1.1rem',
            }}
          >
            <TopStat label="Tasks" value="4" />
            <TopStat label="Points" value="23" />
            <ProgressStat label="Completion" value={`${completion}%`} progress={completion} />
            <TopStat label="Targets" value={String(targets)} />
            <TopStat label="Users" value={totalUsers.toLocaleString()} />
          </div>

          <div
            style={{
              marginTop: '1rem',
              borderRadius: '22px',
              padding: '1rem',
              background: 'linear-gradient(180deg, rgba(11,15,24,0.94), rgba(8,10,18,0.98))',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 800, fontSize: '0.92rem' }}>Learning Curve</h4>
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.35rem', color: '#7c8aa5', fontSize: '0.75rem' }}>
                  <LegendDot label="Revenue" color="#3b82f6" />
                  <LegendDot label="Users" color="#93c5fd" />
                </div>
              </div>

              <div style={{ color: '#7c8aa5', fontSize: '0.76rem', fontWeight: 700 }}>
                {active.point.label}: Rs. {active.point.revenue.toLocaleString()}
              </div>
            </div>

            <div style={{ position: 'relative', marginTop: '0.8rem', overflowX: 'auto' }}>
              <div style={{ minWidth: `${chartWidth}px`, position: 'relative' }}>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  width="100%"
                  height="100%"
                  onMouseLeave={() => setHovered(null)}
                >
                  <defs>
                    <linearGradient id="curve-area-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59,130,246,0.32)" />
                      <stop offset="100%" stopColor="rgba(59,130,246,0.01)" />
                    </linearGradient>
                  </defs>

                  {[0, 1, 2, 3, 4].map((tick) => {
                    const y = padding.top + (chart.innerHeight / 4) * tick;
                    return (
                      <line
                        key={tick}
                        x1={padding.left}
                        x2={chartWidth - padding.right}
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="4 10"
                      />
                    );
                  })}

                  <polygon points={chart.area} fill="url(#curve-area-fill)" />
                  <polyline
                    points={chart.line}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {chart.points.map(({ point, x, revenueY }) => {
                    const isActive = active.point.label === point.label;

                    return (
                      <g
                        key={point.label}
                        onMouseEnter={() => setHovered({ point, x, revenueY })}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x={x - 32}
                          y={padding.top}
                          width="64"
                          height={chartHeight - padding.top - padding.bottom}
                          fill="transparent"
                        />
                        {isActive && (
                          <>
                            <line
                              x1={x}
                              x2={x}
                              y1={padding.top}
                              y2={chartHeight - padding.bottom}
                              stroke="rgba(147,197,253,0.28)"
                              strokeDasharray="5 8"
                            />
                            <circle cx={x} cy={revenueY} r="18" fill="rgba(59,130,246,0.13)" />
                          </>
                        )}
                        <circle
                          cx={x}
                          cy={revenueY}
                          r={isActive ? 6 : 4}
                          fill="#dbeafe"
                          stroke="#3b82f6"
                          strokeWidth={isActive ? 3 : 2}
                        />
                        <text
                          x={x}
                          y={chartHeight - 12}
                          fill={isActive ? '#fff' : '#667085'}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                        >
                          {point.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    left: `${Math.min(Math.max(active.x - 68, 10), chartWidth - 150)}px`,
                    top: `${Math.max(active.revenueY - 64, 10)}px`,
                    pointerEvents: 'none',
                    borderRadius: '14px',
                    padding: '0.75rem 0.8rem',
                    background: 'rgba(5,10,18,0.92)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
                    minWidth: '138px',
                  }}
                >
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.8rem' }}>{active.point.label}</div>
                  <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.78rem', marginTop: '0.35rem' }}>
                    Revenue: Rs. {active.point.revenue.toLocaleString()}
                  </div>
                  <div style={{ color: '#9aa7bd', fontWeight: 600, fontSize: '0.74rem', marginTop: '0.2rem' }}>
                    Users: {active.point.users.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <PanelCard title="Battles Participation">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <DonutChart segments={trafficSegments} />
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {trafficSegments.map((segment) => (
                    <div key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8c99b2', fontSize: '0.76rem' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '999px', background: segment.color }} />
                      <span>{segment.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PanelCard>

            <PanelCard title="Gaming Time">
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.7rem', height: '120px', paddingTop: '0.5rem' }}>
                {data.map((item) => {
                  const height = Math.max(20, (item.users / Math.max(...data.map((entry) => entry.users))) * 100);
                  return (
                    <div key={item.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '24px',
                          height: `${height}px`,
                          borderRadius: '10px 10px 4px 4px',
                          background: 'linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%)',
                          boxShadow: '0 10px 20px rgba(59,130,246,0.22)',
                        }}
                      />
                      <span style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 700 }}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </PanelCard>
          </div>
        </div>

        <aside
          style={{
            borderRadius: '22px',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(17,20,29,0.95), rgba(10,13,20,0.95))',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.95rem' }}>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 800, fontSize: '0.92rem' }}>Ranking</h4>
              <p style={{ color: '#677489', fontSize: '0.72rem', marginTop: '0.22rem' }}>Progress score</p>
            </div>
            <span
              style={{
                borderRadius: '999px',
                padding: '0.28rem 0.6rem',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.22)',
                color: '#fbbf24',
                fontSize: '0.72rem',
                fontWeight: 800,
              }}
            >
              Top Team
            </span>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem', flex: 1 }}>
            {ranking.map((person, index) => (
              <div
                key={person.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      color: '#fff',
                      background: `linear-gradient(135deg, ${person.accent}, rgba(255,255,255,0.2))`,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>{person.name}</div>
                    <div style={{ color: '#6f7c93', fontSize: '0.7rem', marginTop: '0.12rem' }}>Performance lead</div>
                  </div>
                </div>
                <div style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.75rem' }}>{person.score}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '0.9rem',
              borderRadius: '16px',
              padding: '0.85rem',
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.18)',
              color: '#f6d37c',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            Ranking updates every 24h
          </div>
        </aside>
      </div>
    </section>
  );
};

const TopStat = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      borderRadius: '18px',
      padding: '0.85rem 0.95rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div style={{ color: '#718096', fontSize: '0.74rem', fontWeight: 700 }}>{label}</div>
    <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, marginTop: '0.35rem' }}>{value}</div>
  </div>
);

const ProgressStat = ({ label, value, progress }: { label: string; value: string; progress: number }) => (
  <div
    style={{
      borderRadius: '18px',
      padding: '0.8rem 0.95rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}
  >
    <div
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: `conic-gradient(#d1fae5 ${progress}%, rgba(255,255,255,0.08) 0)`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#10151e',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontSize: '0.55rem',
          fontWeight: 800,
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
    <div>
      <div style={{ color: '#718096', fontSize: '0.72rem', fontWeight: 700 }}>{label}</div>
      <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginTop: '0.22rem' }}>{value}</div>
    </div>
  </div>
);

const LegendDot = ({ label, color }: { label: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
    <span>{label}</span>
  </div>
);

const PanelCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: '20px',
      padding: '0.95rem',
      background: 'linear-gradient(180deg, rgba(11,15,24,0.94), rgba(8,10,18,0.98))',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.75rem' }}>{title}</div>
    {children}
  </div>
);

const DonutChart = ({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let cumulative = 0;

  return (
    <svg viewBox="0 0 120 120" width="108" height="108">
      <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
      {segments.map((segment) => {
        const start = (cumulative / total) * 360;
        cumulative += segment.value;
        const end = (cumulative / total) * 360;
        return <DonutArc key={segment.label} startAngle={start} endAngle={end} color={segment.color} />;
      })}
      <circle cx="60" cy="60" r="24" fill="#0a0f18" />
      <text x="60" y="57" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">
        {total}%
      </text>
      <text x="60" y="70" textAnchor="middle" fill="#667085" fontSize="8" fontWeight="700">
        Traffic
      </text>
    </svg>
  );
};

const DonutArc = ({
  startAngle,
  endAngle,
  color,
}: {
  startAngle: number;
  endAngle: number;
  color: string;
}) => {
  const radius = 36;
  const center = 60;
  const start = polar(center, center, radius, endAngle - 90);
  const end = polar(center, center, radius, startAngle - 90);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const path = [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
  ].join(' ');

  return <path d={path} fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" />;
};

const polar = (cx: number, cy: number, radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
};

export default ReportsChart;
