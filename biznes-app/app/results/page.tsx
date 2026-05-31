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

  return (
    <DarkLayout title="Tahlil Natijalari" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-5">

        {/* Score card */}
        <div className="rounded-3xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}>
          <div className="relative w-28 h-28 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="10"/>
              <circle cx="56" cy="56" r="48" fill="none"
                      stroke="#10b981" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 48 * score / 100} ${2 * Math.PI * 48}`}
                      strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-green-400">{score}</span>
              <span style={{ color: '#64748b', fontSize: 11 }}>/ 100</span>
            </div>
          </div>
          <h2 className="text-xl font-black text-white mb-1">Toshkent, Chilonzor</h2>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Restoran biznesiga mos joy</p>
          <div className="flex gap-2 mt-3 justify-center">
            {['Oziq-ovqat', 'Xizmat', 'Yuqori talab'].map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '💰', label: 'Oylik daromad', val: '$8,000–$12,000', color: '#10b981' },
            { icon: '⏱️', label: 'Breakeven', val: '8–10 oy', color: '#60a5fa' },
            { icon: '👥', label: 'Aholi (radius 500m)', val: '12,400 kishi', color: '#a78bfa' },
            { icon: '🏢', label: 'Raqobatchi', val: '4 ta (mos)', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-black text-base" style={{ color: s.color }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Radar chart */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold mb-3">🎯 Hudud Ko&apos;rsatkichlari</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* What is lacking */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <h3 className="text-white font-bold mb-3">✅ Hududda nima yetishmaydi?</h3>
          <div className="space-y-2">
            {[
              { icon: '🍽️', text: 'Tez ovqat/fast food xizmati kam', level: 'Yuqori talab' },
              { icon: '☕', text: 'Sifatli kafe yetarli emas', level: 'Yuqori talab' },
              { icon: '🥗', text: 'Sog\'lom ovqatlanish varianti yo\'q', level: "O'rta talab" },
              { icon: '🚚', text: 'Yetkazib berish xizmati kuchsiz', level: 'Imkoniyat' },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-xl">{n.icon}</span>
                <div className="flex-1">
                  <div style={{ color: '#e2e8f0', fontSize: 13 }}>{n.text}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>{n.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.push('/insights')}
                  className="flex-1 h-12 rounded-2xl text-white font-bold text-sm"
                  style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}>
            💡 Maslahatlar
          </button>
          <button onClick={() => router.push('/competition')}
                  className="flex-1 h-12 rounded-2xl text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            🏆 Raqobat
          </button>
        </div>
      </div>
    </DarkLayout>
  );
}
