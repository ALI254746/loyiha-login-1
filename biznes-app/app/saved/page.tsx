'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const saved = [
  { id: 1, name: 'Restoran — Chilonzor', location: 'Toshkent, Chilonzor tumani', budget: '$15,000', score: 78, date: '2024-12-15', icon: '🍽️', color: '#f97316', tag: 'Tahlil tugadi' },
  { id: 2, name: 'IT Kompaniya — Yunusobod', location: 'Toshkent, Yunusobod', budget: '$25,000', score: 85, date: '2024-12-10', icon: '💻', color: '#8b5cf6', tag: 'Eng yaxshi' },
  { id: 3, name: 'Kafe — Mirzo Ulugbek', location: 'Toshkent, Mirzo Ulugbek', budget: '$8,000', score: 65, date: '2024-12-05', icon: '☕', color: '#3b82f6', tag: "O'rta" },
  { id: 4, name: "Do'kon — Samarqand", location: 'Samarqand, Registon yaqini', budget: '$12,000', score: 72, date: '2024-11-28', icon: '🛍️', color: '#10b981', tag: 'Yaxshi' },
];

export default function SavedPage() {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  return (
    <DarkLayout title="Saqlangan Loyihalar" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Jami tahlil', val: '4', icon: '📊', color: '#60a5fa' },
            { label: "O'rtacha skor", val: '75', icon: '🎯', color: '#a78bfa' },
            { label: 'Eng yaxshi', val: '85', icon: '🏆', color: '#34d399' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0e`, border: `1px solid ${s.color}28`, borderRadius: 18, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 18 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 10, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Saved list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {saved.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: 20, border: `1px solid ${item.color}28`,
                background: 'rgba(255,255,255,0.04)',
                opacity: deleting === item.id ? 0.4 : 1,
                transform: deleting === item.id ? 'scale(0.97)' : 'scale(1)',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: `${item.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div>
                        <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>{item.name}</h3>
                        <p style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>📍 {item.location}</p>
                      </div>
                      <button
                        onClick={() => { setDeleting(item.id); setTimeout(() => setDeleting(null), 500); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#475569', marginLeft: 8, padding: 4 }}
                      >🗑️</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                      <span style={{ color: '#64748b', fontSize: 12 }}>💰 {item.budget}</span>
                      <span style={{ color: '#64748b', fontSize: 12 }}>📅 {item.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 80, height: 6, borderRadius: 3, background: '#1e293b' }}>
                          <div style={{ height: '100%', borderRadius: 3, width: `${item.score}%`, background: item.score > 75 ? '#10b981' : item.score > 60 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                        <span style={{ color: item.color, fontWeight: 800, fontSize: 12 }}>{item.score}</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${item.color}18`, color: item.color }}>{item.tag}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/results')}
                  style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 14, fontSize: 13, fontWeight: 700, color: 'white', cursor: 'pointer', background: `${item.color}18`, border: `1px solid ${item.color}35`, fontFamily: 'Inter, sans-serif' }}
                >Ko&apos;rish →</button>
              </div>
            </div>
          ))}
        </div>

        {/* New analysis */}
        <button
          onClick={() => router.push('/dashboard')}
          style={{ width: '100%', height: 56, borderRadius: 20, color: 'white', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 32px rgba(59,130,246,0.3)', fontFamily: 'Inter, sans-serif' }}
        >＋ Yangi Tahlil</button>
      </div>
    </DarkLayout>
  );
}
