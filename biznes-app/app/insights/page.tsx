'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const insights = [
  {
    category: 'Boshlash',
    icon: '🚀',
    color: '#3b82f6',
    priority: 'Yuqori',
    title: 'Birinchi qadamlar',
    tips: [
      'IP yoki MCHJ sifatida ro\'yxatdan o\'ting (1-2 hafta)',
      'Davlat soliq inspeksiyasiga murojaat qiling',
      'Bank hisobi oching va POS terminal ulang',
      'Dastlabki kapitalning 20%ini zaxiraga qo\'ying',
    ]
  },
  {
    category: 'Raqobat',
    icon: '🏆',
    color: '#f97316',
    priority: "O'rta",
    title: 'Raqobatdan ustun kelish',
    tips: [
      'Eng yaqin 3 raqobatchi narxlarini o\'rganing',
      'Unique Value Proposition (UVP) aniqlang',
      'Mijozlarga qo\'shimcha qiymat bering (yetkazib berish, chegirma)',
      'Mahalliy brend yarating - ijtimoiy tarmoqlarda faol bo\'ling',
    ]
  },
  {
    category: 'Marketing',
    icon: '📣',
    color: '#8b5cf6',
    priority: 'Yuqori',
    title: 'Marketing strategiyasi',
    tips: [
      'Instagram va Telegram kanalini oching (bepul reklama)',
      'Google Business Profile yarating',
      'Birinchi 100 mijozga 15% chegirma bering',
      'Mahalliy blogerlar bilan hamkorlik qiling',
    ]
  },
  {
    category: 'Moliya',
    icon: '💰',
    color: '#10b981',
    priority: "O'rta",
    title: 'Moliyaviy boshqaruv',
    tips: [
      'Har oylik xarajat va daromadni Excel/Google Sheets da yuritng',
      'Soliq to\'lovlari uchun daromadning 15%ini ajrating',
      'Tovar uchun etkazib beruvchilar bilan 30-60 kun to\'lov muddati keling',
      '6 oylik xarajatni qoplaydigan zaxira fond yarating',
    ]
  },
  {
    category: 'Kengayish',
    icon: '📈',
    color: '#06b6d4',
    priority: 'Past',
    title: '6-12 oy rejasi',
    tips: [
      'Daromad barqarorlashgach online savdoni qo\'shing',
      'Yetkazib berish xizmati orqali zonani kengaytiring',
      'Sodiq mijozlar uchun abonement/club kartasi joriy qiling',
      'Franchise yoki filial ochishni rejalashtiring',
    ]
  },
];

export default function InsightsPage() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const router = useRouter();

  return (
    <DarkLayout title="AI Maslahatlar" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-4">

        {/* Header banner */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))', border: '1px solid rgba(139,92,246,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,92,246,0.3)' }}>🧠</div>
            <div>
              <div className="text-white font-bold">Sun&apos;iy intellekt tahlili</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Toshkent, Chilonzor hududi asosida</div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {[
              { label: 'Imkoniyat', val: '78%', color: '#10b981' },
              { label: 'Risk', val: 'Past', color: '#60a5fa' },
              { label: 'Tavsiya', val: '✓ Boshlang', color: '#a78bfa' },
            ].map((s, i) => (
              <div key={i} className="flex-1 rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="font-bold text-sm" style={{ color: s.color }}>{s.val}</div>
                <div style={{ color: '#64748b', fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight cards */}
        {insights.map((ins, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ins.color}30`, background: 'rgba(255,255,255,0.03)' }}>
            <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                   style={{ background: `${ins.color}20` }}>
                {ins.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{ins.title}</div>
                <div className="text-xs mt-0.5" style={{ color: ins.color }}>{ins.category} • {ins.priority} ustuvorlik</div>
              </div>
              <span style={{ color: '#475569', fontSize: 20, transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
            </button>

            {expanded === i && (
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {ins.tips.map((tip, j) => (
                    <div key={j} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: `${ins.color}08` }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                           style={{ background: `${ins.color}25`, color: ins.color }}>
                        {j + 1}
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Competition */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <h3 className="text-white font-bold mb-3">⚠️ Ehtiyot bo&apos;lish kerak</h3>
          <div className="space-y-2">
            {[
              'Yozgi mavsumda (iyun-avgust) savdo 20-30% kamayishi mumkin',
              'Korzinka va Makro kabi yirik do\'konlar narx raqobatini kuchaytirmoqda',
              'Dollar kursi o\'zgarishi import tovar narxiga ta\'sir qiladi',
            ].map((w, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: '#fca5a5' }}>
                <span className="flex-shrink-0">•</span>{w}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => router.push('/analytics')}
                className="w-full h-12 rounded-2xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          📊 To&apos;liq Tahlilni Ko&apos;rish
        </button>
      </div>
    </DarkLayout>
  );
}
