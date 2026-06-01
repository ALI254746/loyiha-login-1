'use client';

import { useRouter } from 'next/navigation';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import DarkLayout from '@/components/DarkLayout';

const radarData = [
  { subject: 'Aholi', value: 78 },
  { subject: 'Talab', value: 85 },
  { subject: 'Transport', value: 90 },
  { subject: 'Raqobat', value: 55 },
  { subject: 'Infratuzilma', value: 72 },
  { subject: 'Daromad', value: 68 },
];

export default function ResultsPage() {
  const router = useRouter();
  const score = 78;
  const circumference = 2 * Math.PI * 48;

  return (
    <DarkLayout title="Tahlil Natijalari" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Score card */}
        <div style={{ borderRadius: 24, padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.22)', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 112, height: 112, margin: '0 auto 14px' }}>
            <svg width="112" height="112" viewBox="0 0 112 112" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="10" />
              <circle
                cx="56" cy="56" r="48" fill="none"
                stroke="#10b981" strokeWidth="10"
                strokeDasharray={`${circumference * score / 100} ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#4ade80' }}>{score}</span>
              <span style={{ color: '#475569', fontSize: 11 }}>/ 100</span>
            </div>
          </div>
          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 20, marginBottom: 6 }}>Toshkent, Chilonzor</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>Restoran biznesiga mos joy</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {['Oziq-ovqat', 'Xizmat', 'Yuqori talab'].map((t, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: 'rgba(99,102,241,0.18)', color: '#a78bfa' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '💰', label: 'Oylik daromad', val: '$8,000–$12,000', color: '#10b981' },
            { icon: '⏱️', label: 'Breakeven', val: '8–10 oy', color: '#60a5fa' },
            { icon: '👥', label: 'Aholi (500m)', val: '12,400 kishi', color: '#a78bfa' },
            { icon: '🏢', label: 'Raqobatchi', val: '4 ta (mos)', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0e`, border: `1px solid ${s.color}25`, borderRadius: 18, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 14, marginBottom: 4 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Radar chart */}
        <div style={{ borderRadius: 20, padding: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 12 }}>🎯 Hudud Ko&apos;rsatkichlari</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gaps */}
        <div style={{ borderRadius: 20, padding: 16, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 12 }}>✅ Hududda nima yetishmaydi?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🍽️', text: 'Tez ovqat/fast food xizmati kam', level: 'Yuqori talab' },
              { icon: '☕', text: 'Sifatli kafe yetarli emas', level: 'Yuqori talab' },
              { icon: '🥗', text: "Sog'lom ovqatlanish varianti yo'q", level: "O'rta talab" },
              { icon: '🚚', text: 'Yetkazib berish xizmati kuchsiz', level: 'Imkoniyat' },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                <span style={{ flex: 1, color: '#e2e8f0', fontSize: 13 }}>{n.text}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.18)', color: '#34d399', whiteSpace: 'nowrap' }}>{n.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => router.push('/insights')}
            style={{ flex: 1, height: 50, borderRadius: 18, color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.28)', fontFamily: 'Inter, sans-serif' }}
          >💡 Maslahatlar</button>
          <button
            onClick={() => router.push('/competition')}
            style={{ flex: 1, height: 50, borderRadius: 18, color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
          >🏆 Raqobat</button>
        </div>
      </div>
    </DarkLayout>
  );
}
