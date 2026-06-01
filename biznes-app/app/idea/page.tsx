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

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
};

export default function IdeaPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [budget, setBudget] = useState(10000);
  const [idea, setIdea] = useState('');

  const selectedType = bizTypes.find(b => b.label === selected);

  return (
    <DarkLayout title="G'oya & Byudjet" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Business type grid */}
        <div>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>🏢 Biznes turini tanlang</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {bizTypes.map((b, i) => {
              const active = selected === b.label;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(b.label)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '12px 6px', borderRadius: 18, cursor: 'pointer',
                    background: active ? `${b.color}18` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? b.color : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: active ? `0 4px 16px ${b.color}25` : 'none',
                    transform: active ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.18s ease',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
                  onMouseUp={e => (e.currentTarget.style.transform = active ? 'scale(1.04)' : 'scale(1)')}
                >
                  <span style={{ fontSize: 24 }}>{b.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? b.color : '#64748b', textAlign: 'center', lineHeight: 1.2 }}>{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Idea description */}
        <div>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>✏️ G&apos;oyangizni tasvirlab bering</h3>
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Biznes g'oyangizni qisqacha yozing..."
            rows={3}
            style={{
              width: '100%', borderRadius: 18, padding: '14px 16px', fontSize: 13,
              resize: 'none', outline: 'none', fontFamily: 'Inter, sans-serif',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', lineHeight: 1.6,
            }}
          />
        </div>

        {/* Budget slider */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15 }}>💰 Boshlang&apos;ich kapital</h3>
            <span style={{ fontSize: 22, fontWeight: 900, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${budget.toLocaleString()}</span>
          </div>
          <input
            type="range" min={1000} max={500000} step={1000} value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#3b82f6', marginBottom: 8, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginBottom: 12 }}>
            <span>$1,000</span><span>$500,000</span>
          </div>

          {/* Presets */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[5000, 10000, 25000, 50000].map(v => {
              const active = budget === v;
              return (
                <button
                  key={v}
                  onClick={() => setBudget(v)}
                  style={{
                    flex: 1, padding: '9px 4px', borderRadius: 14, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    background: active ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? '#3b82f6' : 'rgba(255,255,255,0.07)'}`,
                    color: active ? '#60a5fa' : '#64748b',
                  }}
                >${(v / 1000).toFixed(0)}K</button>
              );
            })}
          </div>
        </div>

        {/* ROI preview */}
        <div style={{ borderRadius: 20, padding: 16, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📈</div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Taxminiy ko&apos;rsatkichlar</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Oylik daromad', val: `$${Math.round(budget * 0.12).toLocaleString()}+`, color: '#10b981' },
              { label: 'Breakeven', val: `${Math.ceil(budget / (budget * 0.12))} oy`, color: '#60a5fa' },
              { label: 'Yillik ROI', val: `${Math.round(((budget * 0.12 * 12) / budget - 1) * 100)}%`, color: '#a78bfa' },
              { label: 'Risk darajasi', val: budget > 50000 ? 'Past' : "O'rta", color: '#fb923c' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ color: s.color, fontWeight: 900, fontSize: 15 }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: 11, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!selected}
          onClick={() => router.push('/analytics')}
          style={{
            width: '100%', height: 56, borderRadius: 20, color: 'white', fontWeight: 800,
            fontSize: 15, border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            boxShadow: selected ? '0 8px 32px rgba(59,130,246,0.35)' : 'none',
            opacity: selected ? 1 : 0.4, fontFamily: 'Inter, sans-serif',
          }}
        >Tahlilni Boshlash 🚀</button>
      </div>
    </DarkLayout>
  );
}
