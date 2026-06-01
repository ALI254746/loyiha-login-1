'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

const insights = [
  {
    category: 'Boshlash', icon: '🚀', color: '#3b82f6', priority: 'Yuqori',
    title: 'Birinchi qadamlar',
    tips: [
      "IP yoki MCHJ sifatida ro'yxatdan o'ting (1-2 hafta)",
      "Davlat soliq inspeksiyasiga murojaat qiling",
      "Bank hisobi oching va POS terminal ulang",
      "Dastlabki kapitalning 20%ini zaxiraga qo'ying",
    ]
  },
  {
    category: 'Raqobat', icon: '🏆', color: '#f97316', priority: "O'rta",
    title: 'Raqobatdan ustun kelish',
    tips: [
      "Eng yaqin 3 raqobatchi narxlarini o'rganing",
      "Unique Value Proposition (UVP) aniqlang",
      "Mijozlarga qo'shimcha qiymat bering (yetkazib berish, chegirma)",
      "Mahalliy brend yarating - ijtimoiy tarmoqlarda faol bo'ling",
    ]
  },
  {
    category: 'Marketing', icon: '📣', color: '#8b5cf6', priority: 'Yuqori',
    title: 'Marketing strategiyasi',
    tips: [
      "Instagram va Telegram kanalini oching (bepul reklama)",
      "Google Business Profile yarating",
      "Birinchi 100 mijozga 15% chegirma bering",
      "Mahalliy blogerlar bilan hamkorlik qiling",
    ]
  },
  {
    category: 'Moliya', icon: '💰', color: '#10b981', priority: "O'rta",
    title: 'Moliyaviy boshqaruv',
    tips: [
      "Har oylik xarajat va daromadni Excel/Google Sheets da yuritng",
      "Soliq to'lovlari uchun daromadning 15%ini ajrating",
      "Tovar uchun etkazib beruvchilar bilan 30-60 kun to'lov muddati keling",
      "6 oylik xarajatni qoplaydigan zaxira fond yarating",
    ]
  },
  {
    category: 'Kengayish', icon: '📈', color: '#06b6d4', priority: 'Past',
    title: '6-12 oy rejasi',
    tips: [
      "Daromad barqarorlashgach online savdoni qo'shing",
      "Yetkazib berish xizmati orqali zonani kengaytiring",
      "Sodiq mijozlar uchun abonement/club kartasi joriy qiling",
      "Franchise yoki filial ochishni rejalashtiring",
    ]
  },
];

export default function InsightsPage() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const router = useRouter();

  return (
    <DarkLayout title="AI Maslahatlar" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Header banner */}
        <div style={{ borderRadius: 20, padding: 16, background: 'linear-gradient(135deg, rgba(99,102,241,0.14), rgba(139,92,246,0.1))', border: '1px solid rgba(139,92,246,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧠</div>
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: 15 }}>Sun&apos;iy intellekt tahlili</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Toshkent, Chilonzor hududi asosida</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Imkoniyat', val: '78%', color: '#10b981' },
              { label: 'Risk', val: 'Past', color: '#60a5fa' },
              { label: 'Tavsiya', val: '✓ Boshlang', color: '#a78bfa' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ color: s.color, fontWeight: 800, fontSize: 13 }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: 10, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight accordion cards */}
        {insights.map((ins, i) => (
          <div key={i} style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${ins.color}28`, background: 'rgba(255,255,255,0.03)' }}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 14, background: `${ins.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {ins.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{ins.title}</div>
                <div style={{ color: ins.color, fontSize: 11, marginTop: 3, fontWeight: 600 }}>{ins.category} • {ins.priority} ustuvorlik</div>
              </div>
              <span style={{ color: '#475569', fontSize: 18, transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>⌄</span>
            </button>

            {expanded === i && (
              <div style={{ padding: '0 16px 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {ins.tips.map((tip, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 14, background: `${ins.color}08` }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${ins.color}22`, color: ins.color, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {j + 1}
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Warning card */}
        <div style={{ borderRadius: 20, padding: 16, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 14, marginBottom: 12 }}>⚠️ Ehtiyot bo&apos;lish kerak</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              "Yozgi mavsumda (iyun-avgust) savdo 20-30% kamayishi mumkin",
              "Korzinka va Makro kabi yirik do'konlar narx raqobatini kuchaytirmoqda",
              "Dollar kursi o'zgarishi import tovar narxiga ta'sir qiladi",
            ].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#fca5a5' }}>
                <span style={{ flexShrink: 0 }}>•</span>{w}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push('/analytics')}
          style={{ width: '100%', height: 52, borderRadius: 20, color: 'white', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 32px rgba(59,130,246,0.3)', fontFamily: 'Inter, sans-serif' }}
        >📊 To&apos;liq Tahlilni Ko&apos;rish</button>
      </div>
    </DarkLayout>
  );
}
