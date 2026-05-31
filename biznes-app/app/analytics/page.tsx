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

export default function AnalyticsPage() {
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((s, d) => s + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <DarkLayout title="Analitik Dashboard" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-6">

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: '💰', label: "Yillik daromad", val: `$${(totalRevenue/1000).toFixed(0)}K`, color: '#10b981' },
            { icon: '💸', label: 'Xarajatlar', val: `$${(totalExpenses/1000).toFixed(0)}K`, color: '#ef4444' },
            { icon: '✨', label: 'Sof foyda', val: `$${(netProfit/1000).toFixed(0)}K`, color: '#60a5fa' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-3 text-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-black text-base" style={{ color: s.color }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold mb-4">📈 12 Oylik Daromad & Xarajat</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                         formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                <Line dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} name="Daromad"/>
                <Line dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Xarajat"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <div className="flex items-center gap-2 text-xs"><div className="w-6 h-0.5 bg-green-500 rounded"/><span style={{ color: '#94a3b8' }}>Daromad</span></div>
            <div className="flex items-center gap-2 text-xs"><div className="w-6 border-t border-dashed border-red-500"/><span style={{ color: '#94a3b8' }}>Xarajat</span></div>
          </div>
        </div>

        {/* Score ring */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold mb-4">🎯 Bozor Talab Ko&apos;rsatkichlari</h3>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis dataKey="label" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                         formatter={(v) => [`${Number(v)}%`, 'Talab']} />
                <Bar dataKey="val" radius={[0, 8, 8, 0]}>
                  {demandData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart - growth */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold mb-4">📊 Foyda O&apos;sish Dinamikasi</h3>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData.map(d => ({ ...d, profit: d.revenue - d.expenses }))}>
                <defs>
                  <linearGradient id="profitG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 9 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                         formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Foyda']} />
                <Area dataKey="profit" stroke="#8b5cf6" strokeWidth={2} fill="url(#profitG)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '⏱️', label: 'Breakeven', val: '8 oy', color: '#60a5fa' },
            { icon: '📊', label: '1 yillik ROI', val: '+124%', color: '#a78bfa' },
            { icon: '💹', label: "O'rtacha foyda", val: '$700/oy', color: '#34d399' },
            { icon: '🎯', label: 'Imkoniyat skori', val: '78/100', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4 text-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-black text-xl" style={{ color: s.color }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DarkLayout>
  );
}
