'use client';

import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const competitors = [
  { name: 'Korzinka', type: 'Supermarket', dist: 300, impact: 'neg', threat: 85, color: '#ef4444', icon: '🛒', desc: "Katta raqobatchi - narxlar past, assortiment keng" },
  { name: 'Metro', type: 'Supermarket', dist: 800, impact: 'neg', threat: 70, color: '#f97316', icon: '🏪', desc: "Ulgurji format - chakana mijozlarga kam ta'sir" },
  { name: 'Chilonzor Metro', type: 'Transport', dist: 200, impact: 'pos', threat: 0, color: '#10b981', icon: '🚇', desc: "Kuniga 15,000+ odam - mijozlar bazasi yuqori" },
  { name: 'Maktab №45', type: "Ta'lim", dist: 400, impact: 'pos', threat: 0, color: '#22c55e', icon: '🏫', desc: "1,200 o'quvchi + ota-onalar - tushlik mijozlar" },
  { name: 'Kafe "Bahor"', type: 'Kafe', dist: 150, impact: 'mix', threat: 40, color: '#f59e0b', icon: '☕', desc: "Kichik raqobat, lekin bozorni isitadi" },
  { name: 'Shifo klinikasi', type: 'Klinika', dist: 500, impact: 'pos', threat: 0, color: '#06b6d4', icon: '🏥', desc: "Kuniga 200+ bemor - tugatuvchi mijozlar" },
];

export default function CompetitionPage() {
  const router = useRouter();
  const posCount = competitors.filter(c => c.impact === 'pos').length;
  const negCount = competitors.filter(c => c.impact === 'neg').length;
  const mixCount = competitors.filter(c => c.impact === 'mix').length;

  return (
    <DarkLayout title="Raqobat Tahlili" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Impact summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { icon: '🟢', label: "Ijobiy ta'sir", val: `${posCount} ta`, color: '#10b981' },
            { icon: '🔴', label: "Salbiy ta'sir", val: `${negCount} ta`, color: '#ef4444' },
            { icon: '🟡', label: 'Aralash', val: `${mixCount} ta`, color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0e`, border: `1px solid ${s.color}28`, borderRadius: 18, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 18 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 10, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Visual map */}
        <div style={{ borderRadius: 20, padding: 16, background: '#0b1120', border: '1px solid rgba(59,130,246,0.12)', height: 200, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Center pin */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 10, boxShadow: '0 0 24px rgba(99,102,241,0.6)' }}>📍</div>
          {/* Radius rings */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 88, height: 88, borderRadius: '50%', border: '1px dashed rgba(59,130,246,0.22)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 150, height: 150, borderRadius: '50%', border: '1px dashed rgba(139,92,246,0.14)' }} />
          {/* Competitor dots */}
          {[
            { x: '24%', y: '55%', icon: '🛒', color: '#ef4444' },
            { x: '68%', y: '34%', icon: '🏪', color: '#f97316' },
            { x: '52%', y: '73%', icon: '🚇', color: '#10b981' },
            { x: '37%', y: '27%', icon: '🏫', color: '#22c55e' },
            { x: '61%', y: '58%', icon: '☕', color: '#f59e0b' },
            { x: '20%', y: '30%', icon: '🏥', color: '#06b6d4' },
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', background: `${p.color}28`, border: `1px solid ${p.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              {p.icon}
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: 8, right: 12, color: '#334155', fontSize: 10 }}>500m radius</div>
        </div>

        {/* Competitor list */}
        <div>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>📋 Batafsil Tahlil</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {competitors.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}22`, borderRadius: 18, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 14, background: `${c.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                      <span style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8', fontSize: 10, padding: '2px 8px', borderRadius: 20 }}>{c.type}</span>
                      <span style={{ color: '#475569', fontSize: 11 }}>{c.dist}m</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
                    {c.threat > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                        <span style={{ color: '#64748b', fontSize: 11, whiteSpace: 'nowrap' }}>Tahdid darajasi:</span>
                        <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#1e293b', maxWidth: 110 }}>
                          <div style={{ height: '100%', borderRadius: 3, width: `${c.threat}%`, background: c.color }} />
                        </div>
                        <span style={{ color: c.color, fontWeight: 800, fontSize: 12 }}>{c.threat}%</span>
                      </div>
                    )}
                    {c.impact === 'pos' && (
                      <div style={{ marginTop: 8, color: '#10b981', fontSize: 12 }}>✓ Ijobiy ta&apos;sir - mijozlar ko&apos;paytiradi</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push('/insights')}
          style={{ width: '100%', height: 52, borderRadius: 20, color: 'white', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 32px rgba(59,130,246,0.3)', fontFamily: 'Inter, sans-serif' }}
        >💡 Tavsiyalar ko&apos;rish</button>
      </div>
    </DarkLayout>
  );
}
