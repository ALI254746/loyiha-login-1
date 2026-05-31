'use client';

import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const competitors = [
  { name: 'Korzinka', type: 'Supermarket', dist: 300, impact: 'neg', threat: 85, color: '#ef4444', icon: '🛒', desc: 'Katta raqobatchi - narxlar past, assortiment keng' },
  { name: 'Metro', type: 'Supermarket', dist: 800, impact: 'neg', threat: 70, color: '#f97316', icon: '🏪', desc: 'Ulgurji format - chakana mijozlarga kam ta\'sir' },
  { name: 'Chilonzor Metro', type: 'Transport', dist: 200, impact: 'pos', threat: 0, color: '#10b981', icon: '🚇', desc: 'Kuniga 15,000+ odam - mijozlar bazasi yuqori' },
  { name: 'Maktab №45', type: "Ta'lim", dist: 400, impact: 'pos', threat: 0, color: '#22c55e', icon: '🏫', desc: '1,200 o\'quvchi + ota-onalar - tushlik mijozlar' },
  { name: 'Kafe "Bahor"', type: 'Kafe', dist: 150, impact: 'mix', threat: 40, color: '#f59e0b', icon: '☕', desc: 'Kichik raqobat, lekin bozorni isitadi' },
  { name: 'Shifo klinikasi', type: 'Klinika', dist: 500, impact: 'pos', threat: 0, color: '#06b6d4', icon: '🏥', desc: 'Kuniga 200+ bemor - tugatuvchi mijozlar' },
];

export default function CompetitionPage() {
  const router = useRouter();

  return (
    <DarkLayout title="Raqobat Tahlili" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-4">

        {/* Impact summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: '🟢', label: 'Ijobiy ta\'sir', val: `${competitors.filter(c=>c.impact==='pos').length} ta`, color: '#10b981' },
            { icon: '🔴', label: 'Salbiy ta\'sir', val: `${competitors.filter(c=>c.impact==='neg').length} ta`, color: '#ef4444' },
            { icon: '🟡', label: 'Aralash', val: `${competitors.filter(c=>c.impact==='mix').length} ta`, color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-black text-lg" style={{ color: s.color }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Visual map representation */}
        <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.15)', height: 200 }}>
          {/* Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Center pin */}
          <div className="absolute w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', zIndex: 10, boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}>📍</div>
          {/* Radius circles */}
          <div className="absolute rounded-full border border-dashed" style={{ width: 80, height: 80, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderColor: 'rgba(59,130,246,0.2)' }} />
          <div className="absolute rounded-full border border-dashed" style={{ width: 140, height: 140, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderColor: 'rgba(139,92,246,0.15)' }} />
          {/* Competitor pins */}
          {[
            { x: '25%', y: '55%', icon: '🛒', color: '#ef4444' },
            { x: '68%', y: '35%', icon: '🏪', color: '#f97316' },
            { x: '52%', y: '72%', icon: '🚇', color: '#10b981' },
            { x: '38%', y: '28%', icon: '🏫', color: '#22c55e' },
            { x: '60%', y: '58%', icon: '☕', color: '#f59e0b' },
            { x: '20%', y: '30%', icon: '🏥', color: '#06b6d4' },
          ].map((p, i) => (
            <div key={i} className="absolute w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ left: p.x, top: p.y, transform: 'translate(-50%,-50%)', background: `${p.color}30`, border: `1px solid ${p.color}60`, fontSize: 12 }}>
              {p.icon}
            </div>
          ))}
          {/* Legend */}
          <div className="absolute bottom-2 right-2 text-right">
            <div style={{ color: '#475569', fontSize: 9 }}>500m radius</div>
          </div>
        </div>

        {/* Competitor list */}
        <div>
          <h3 className="text-white font-bold mb-3">📋 Batafsil Tahlil</h3>
          <div className="space-y-3">
            {competitors.map((c, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}25` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${c.color}15` }}>
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">{c.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>{c.type}</span>
                      <span className="text-xs" style={{ color: '#64748b' }}>{c.dist}m</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.4 }}>{c.desc}</p>
                    {c.threat > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span style={{ color: '#64748b', fontSize: 11 }}>Tahdid darajasi:</span>
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: '#1e293b', maxWidth: 120 }}>
                          <div className="h-full rounded-full" style={{ width: `${c.threat}%`, background: c.color }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: c.color }}>{c.threat}%</span>
                      </div>
                    )}
                    {c.impact === 'pos' && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-xs" style={{ color: '#10b981' }}>✓ Ijobiy ta&apos;sir - mijozlar ko&apos;paytiradi</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => router.push('/insights')}
                className="w-full h-12 rounded-2xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          💡 Tavsiyalar ko&apos;rish
        </button>
      </div>
    </DarkLayout>
  );
}
