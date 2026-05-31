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
      <div className="px-4 py-4 space-y-4">

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Jami tahlil', val: '4', icon: '📊' },
            { label: "O'rtacha skor", val: '75', icon: '🎯' },
            { label: 'Eng yaxshi', val: '85', icon: '🏆' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-white font-black text-lg">{s.val}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {saved.map((item, i) => (
            <div key={item.id} className={`rounded-2xl overflow-hidden transition-all ${deleting === item.id ? 'opacity-50 scale-95' : ''}`}
                 style={{ border: `1px solid ${item.color}30`, background: 'rgba(255,255,255,0.04)' }}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${item.color}15` }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-bold text-sm">{item.name}</h3>
                        <p style={{ color: '#64748b', fontSize: 11 }}>📍 {item.location}</p>
                      </div>
                      <button onClick={() => { setDeleting(item.id); setTimeout(() => setDeleting(null), 500); }}
                              className="text-slate-600 hover:text-red-400 transition-colors ml-2">
                        🗑️
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span style={{ color: '#94a3b8', fontSize: 12 }}>💰 {item.budget}</span>
                      <span style={{ color: '#94a3b8', fontSize: 12 }}>📅 {item.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full w-24" style={{ background: '#1e293b' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${item.score}%`, background: item.score > 75 ? '#10b981' : item.score > 60 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: item.color }}>Skor: {item.score}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${item.color}20`, color: item.color }}>{item.tag}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => router.push('/results')}
                        className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                  Ko&apos;rish →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* New analysis button */}
        <button onClick={() => router.push('/dashboard')}
                className="w-full h-14 rounded-2xl text-white font-bold text-base"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 32px rgba(59,130,246,0.25)' }}>
          ＋ Yangi Tahlil
        </button>
      </div>
    </DarkLayout>
  );
}
