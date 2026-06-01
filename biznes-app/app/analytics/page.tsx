'use client';

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import DarkLayout from '@/components/DarkLayout';

const monthlyData = [
  { month: 'Yan', revenue: 3200, expenses: 2800 },
  { month: 'Fev', revenue: 4100, expenses: 2900 },
  { month: 'Mar', revenue: 5300, expenses: 3100 },
  { month: 'Apr', revenue: 4800, expenses: 3000 },
  { month: 'May', revenue: 6200, expenses: 3200 },
  { month: 'Iyn', revenue: 7100, expenses: 3300 },
  { month: 'Iyl', revenue: 8400, expenses: 3500 },
  { month: 'Avg', revenue: 7900, expenses: 3400 },
  { month: 'Sen', revenue: 9200, expenses: 3600 },
  { month: 'Okt', revenue: 10100, expenses: 3800 },
  { month: 'Noy', revenue: 11200, expenses: 4000 },
  { month: 'Dek', revenue: 12500, expenses: 4200 },
];

const demandData = [
  { label: 'Oziq-ovqat', val: 92, color: '#3b82f6' },
  { label: 'IT & Tech', val: 88, color: '#8b5cf6' },
  { label: "Sog'liq", val: 85, color: '#10b981' },
  { label: "Ta'lim", val: 82, color: '#f59e0b' },
  { label: 'Kiyim', val: 78, color: '#ec4899' },
];

const chartCard: React.CSSProperties = {
  borderRadius: 20,
  padding: 16,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
};

export default function AnalyticsPage() {
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((s, d) => s + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <DarkLayout title="Analitik Dashboard" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { icon: '💰', label: "Yillik daromad", val: `$${(totalRevenue / 1000).toFixed(0)}K`, color: '#10b981' },
            { icon: '💸', label: 'Xarajatlar', val: `$${(totalExpenses / 1000).toFixed(0)}K`, color: '#ef4444' },
            { icon: '✨', label: 'Sof foyda', val: `$${(netProfit / 1000).toFixed(0)}K`, color: '#60a5fa' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0e`, border: `1px solid ${s.color}28`, borderRadius: 18, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 16 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 10, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue vs Expenses */}
        <div style={chartCard}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>📈 12 Oylik Daromad & Xarajat</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, '']}
                />
                <Line dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} name="Daromad" />
                <Line dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Xarajat" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 2, background: '#10b981', borderRadius: 1 }} />
              <span style={{ color: '#94a3b8', fontSize: 11 }}>Daromad</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 0, borderTop: '2px dashed #ef4444' }} />
              <span style={{ color: '#94a3b8', fontSize: 11 }}>Xarajat</span>
            </div>
          </div>
        </div>

        {/* Demand bar chart */}
        <div style={chartCard}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>🎯 Bozor Talab Ko&apos;rsatkichlari</h3>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis dataKey="label" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  formatter={(v) => [`${Number(v)}%`, 'Talab']}
                />
                <Bar dataKey="val" radius={[0, 8, 8, 0]}>
                  {demandData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit growth area chart */}
        <div style={chartCard}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>📊 Foyda O&apos;sish Dinamikasi</h3>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData.map(d => ({ ...d, profit: d.revenue - d.expenses }))}>
                <defs>
                  <linearGradient id="profitG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 9 }} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Foyda']}
                />
                <Area dataKey="profit" stroke="#8b5cf6" strokeWidth={2} fill="url(#profitG)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '⏱️', label: 'Breakeven', val: '8 oy', color: '#60a5fa' },
            { icon: '📊', label: '1 yillik ROI', val: '+124%', color: '#a78bfa' },
            { icon: '💹', label: "O'rtacha foyda", val: '$700/oy', color: '#34d399' },
            { icon: '🎯', label: 'Imkoniyat skori', val: '78/100', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0e`, border: `1px solid ${s.color}22`, borderRadius: 18, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 20 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DarkLayout>
  );
}
