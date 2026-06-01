'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkLayout from '@/components/DarkLayout';

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{ width: 48, height: 26, borderRadius: 13, background: on ? '#3b82f6' : '#1e293b', border: `1px solid ${on ? '#3b82f6' : '#334155'}`, display: 'flex', alignItems: 'center', padding: '2px', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
    >
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', transform: on ? 'translateX(22px)' : 'translateX(0)', transition: 'transform 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode] = useState(true);
  const [language, setLanguage] = useState("O'zbek");

  const sections = [
    {
      title: 'Hisob',
      items: [
        { icon: '👤', label: "Profil ma'lumotlari", right: null, action: () => {} },
        { icon: '🔒', label: 'Xavfsizlik va parol', right: null, action: () => {} },
        { icon: '📧', label: 'Email bildirishnomalar', right: <Toggle on={notifications} onChange={() => setNotifications(!notifications)} />, action: undefined },
      ]
    },
    {
      title: 'Ilova',
      items: [
        { icon: '🌙', label: 'Dark mode', right: <Toggle on={darkMode} onChange={() => {}} />, action: undefined },
        { icon: '🌐', label: 'Til', right: <span style={{ color: '#60a5fa', fontSize: 13, fontWeight: 600 }}>{language}</span>, action: () => setLanguage(language === "O'zbek" ? 'English' : "O'zbek") },
        { icon: '📱', label: 'Ilova versiyasi', right: <span style={{ color: '#334155', fontSize: 13 }}>v1.0.0</span>, action: undefined },
      ]
    },
    {
      title: "Ma'lumot",
      items: [
        { icon: '📋', label: 'Foydalanish shartlari', right: null, action: () => {} },
        { icon: '🛡️', label: 'Maxfiylik siyosati', right: null, action: () => {} },
        { icon: '⭐', label: 'Ilovani baholash', right: null, action: () => {} },
        { icon: '💬', label: "Qo'llab-quvvatlash", right: null, action: () => {} },
      ]
    },
  ];

  return (
    <DarkLayout title="Profil & Sozlamalar" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Avatar card */}
        <div style={{ borderRadius: 24, padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.07))', border: '1px solid rgba(99,102,241,0.18)', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 26, margin: '0 auto 14px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}>
            👨‍💼
          </div>
          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Alisher Yusupov</h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>alisher@example.com</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, background: 'rgba(99,102,241,0.18)', color: '#a78bfa' }}>Pro план</span>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, background: 'rgba(16,185,129,0.14)', color: '#34d399' }}>✓ Tasdiqlangan</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { icon: '📊', label: 'Tahlillar', val: '4', color: '#60a5fa' },
            { icon: '📍', label: 'Joylar', val: '3', color: '#a78bfa' },
            { icon: '🏆', label: 'Eng skor', val: '85', color: '#34d399' },
            { icon: '💰', label: 'Byudjet', val: '$60K', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} style={{ background: `${s.color}0c`, border: `1px solid ${s.color}22`, borderRadius: 16, padding: '10px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 13 }}>{s.val}</div>
              <div style={{ color: '#334155', fontSize: 9, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Menu sections */}
        {sections.map((section, si) => (
          <div key={si}>
            <div style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>{section.title}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, overflow: 'hidden' }}>
              {section.items.map((item, ii) => (
                <button
                  key={ii}
                  onClick={item.action}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'none', border: 'none', cursor: item.action ? 'pointer' : 'default', textAlign: 'left', fontFamily: 'Inter, sans-serif', borderBottom: ii < section.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#e2e8f0' }}>{item.label}</span>
                  {item.right || (item.action && <span style={{ color: '#334155', fontSize: 18 }}>›</span>)}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => router.push('/login')}
          style={{ width: '100%', height: 52, borderRadius: 20, color: '#f87171', fontWeight: 800, fontSize: 14, cursor: 'pointer', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', fontFamily: 'Inter, sans-serif' }}
        >🚪 Chiqish</button>
      </div>
    </DarkLayout>
  );
}
