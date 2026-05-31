'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

export default function ProfilePage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode] = useState(true);
  const [language, setLanguage] = useState("O'zbek");

  const stats = [
    { icon: '📊', label: 'Tahlillar', val: '4' },
    { icon: '📍', label: 'Joylar', val: '3' },
    { icon: '🏆', label: 'Eng yaxshi skor', val: '85' },
    { icon: '💰', label: "Umumiy byudjet", val: '$60K' },
  ];

  const menuItems = [
    {
      section: 'Hisob',
      items: [
        { icon: '👤', label: 'Profil ma\'lumotlari', action: () => {} },
        { icon: '🔒', label: 'Xavfsizlik va parol', action: () => {} },
        { icon: '📧', label: 'Email bildirishnomalar', right: <Toggle on={notifications} onChange={() => setNotifications(!notifications)} /> },
      ]
    },
    {
      section: 'Ilova',
      items: [
        { icon: '🌙', label: 'Dark mode', right: <Toggle on={darkMode} onChange={() => {}} /> },
        { icon: '🌐', label: 'Til', right: <span className="text-sm text-blue-400">{language}</span>, action: () => setLanguage(language === "O'zbek" ? 'English' : "O'zbek") },
        { icon: '📱', label: 'Ilova versiyasi', right: <span className="text-sm" style={{ color: '#64748b' }}>v1.0.0</span> },
      ]
    },
    {
      section: 'Ma\'lumot',
      items: [
        { icon: '📋', label: 'Foydalanish shartlari', action: () => {} },
        { icon: '🛡️', label: 'Maxfiylik siyosati', action: () => {} },
        { icon: '⭐', label: 'Ilovani baholash', action: () => {} },
        { icon: '💬', label: 'Qo\'llab-quvvatlash', action: () => {} },
      ]
    },
  ];

  return (
    <DarkLayout title="Profil & Sozlamalar" backRoute="/dashboard">
      <div className="px-4 py-4 space-y-5">

        {/* Avatar card */}
        <div className="rounded-3xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="w-20 h-20 rounded-3xl mx-auto mb-3 flex items-center justify-center text-4xl"
               style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            👨‍💼
          </div>
          <h2 className="text-white font-black text-xl">Alisher Yusupov</h2>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>alisher@example.com</p>
          <div className="flex gap-2 mt-2 justify-center">
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa' }}>Pro план</span>
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>✓ Tasdiqlangan</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="text-white font-black text-sm">{s.val}</div>
              <div style={{ color: '#475569', fontSize: 9 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Menu sections */}
        {menuItems.map((section, si) => (
          <div key={si}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>{section.section}</h3>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              {section.items.map((item, ii) => (
                <button key={ii} onClick={item.action}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                        style={{ borderBottom: ii < section.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium" style={{ color: '#e2e8f0' }}>{item.label}</span>
                  {'right' in item && item.right ? item.right : <span style={{ color: '#475569' }}>›</span>}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button onClick={() => router.push('/login')}
                className="w-full h-12 rounded-2xl text-red-400 font-bold text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          🚪 Chiqish
        </button>
      </div>
    </DarkLayout>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
            className="w-12 h-6 rounded-full transition-all flex items-center px-0.5"
            style={{ background: on ? '#3b82f6' : '#334155' }}>
      <div className="w-5 h-5 rounded-full bg-white transition-all"
           style={{ transform: on ? 'translateX(24px)' : 'translateX(0)' }} />
    </button>
  );
}
