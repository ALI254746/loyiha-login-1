'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const bizTypes = [
  { icon: '🍽️', label: 'Restoran', color: '#f97316' },
  { icon: '☕', label: 'Kafe', color: '#8b5cf6' },
  { icon: '🛍️', label: "Do'kon", color: '#3b82f6' },
  { icon: '💻', label: 'IT', color: '#06b6d4' },
  { icon: '🏥', label: 'Klinika', color: '#10b981' },
  { icon: '📚', label: "O'quv markaz", color: '#f59e0b' },
  { icon: '💇', label: "Go'zallik", color: '#ec4899' },
  { icon: '🏗️', label: 'Qurilish', color: '#64748b' },
];

export default function IdeaPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [budget, setBudget] = useState(10000);
  const [idea, setIdea] = useState('');

  return (
    <DarkLayout title="G'oya & Byudjet" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-6">

        {/* Business type */}
        <div>
          <h3 className="text-white font-bold mb-3">🏢 Biznes turini tanlang</h3>
          <div className="grid grid-cols-4 gap-2">
            {bizTypes.map((b, i) => (
              <button key={i} onClick={() => setSelected(b.label)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-95"
                      style={{
                        background: selected === b.label ? `${b.color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${selected === b.label ? b.color : 'rgba(255,255,255,0.06)'}`,
                      }}>
                <span className="text-2xl">{b.icon}</span>
                <span className="text-xs font-medium text-center leading-tight" style={{ color: selected === b.label ? b.color : '#94a3b8' }}>{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Idea description */}
        <div>
          <h3 className="text-white font-bold mb-3">✏️ G&apos;oyangizni tasvirlab bering</h3>
          <textarea
            value={idea} onChange={e => setIdea(e.target.value)}
            placeholder="Biznes g'oyangizni qisqacha yozing..."
            rows={4}
            className="w-full rounded-2xl px-4 py-3 text-sm resize-none outline-none"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          />
        </div>

        {/* Budget */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">💰 Boshlang&apos;ich kapital</h3>
            <span className="font-black text-xl" style={{ color: '#60a5fa' }}>${budget.toLocaleString()}</span>
          </div>
          <input type="range" min={1000} max={500000} step={1000} value={budget}
                 onChange={e => setBudget(Number(e.target.value))}
                 className="w-full accent-blue-500 mb-3" />
          <div className="flex justify-between text-xs" style={{ color: '#475569' }}>
            <span>$1,000</span><span>$500,000</span>
          </div>

          {/* Budget presets */}
          <div className="flex gap-2 mt-3">
            {[5000, 10000, 25000, 50000].map(v => (
              <button key={v} onClick={() => setBudget(v)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: budget === v ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${budget === v ? '#3b82f6' : 'rgba(255,255,255,0.06)'}`,
                        color: budget === v ? '#60a5fa' : '#94a3b8',
                      }}>
                ${(v/1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>

        {/* ROI preview */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span>📈</span>
            <span className="text-white font-bold text-sm">Taxminiy ko&apos;rsatkichlar</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Oylik daromad', val: `$${Math.round(budget * 0.12).toLocaleString()}+` },
              { label: 'Breakeven', val: `${Math.ceil(budget / (budget * 0.12))} oy` },
              { label: 'Yillik ROI', val: `${Math.round(((budget * 0.12 * 12) / budget - 1) * 100)}%` },
              { label: 'Risk darajasi', val: budget > 50000 ? 'Past' : 'O\'rta' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-white font-black text-base">{s.val}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          disabled={!selected}
          onClick={() => router.push('/analytics')}
          className="w-full h-14 rounded-2xl text-white font-bold text-base disabled:opacity-40 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}>
          Tahlilni Boshlash 🚀
        </button>
      </div>
    </DarkLayout>
  );
}
