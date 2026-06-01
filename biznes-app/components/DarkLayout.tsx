'use client';

import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { icon: '🏠', label: 'Bosh', route: '/dashboard' },
  { icon: '🗺️', label: 'Xarita', route: '/map' },
  { icon: '📊', label: 'Tahlil', route: '/analytics' },
  { icon: '💡', label: 'Maslahat', route: '/insights' },
  { icon: '👤', label: 'Profil', route: '/profile' },
];

export default function DarkLayout({ children, title, backRoute }: {
  children: React.ReactNode;
  title?: string;
  backRoute?: string;
}) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div style={{ background: '#020617', color: 'white', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 430, margin: '0 auto' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '20%', width: 160, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <button
            onClick={() => router.push(backRoute || '/dashboard')}
            style={{ width: 40, height: 40, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}
          >←</button>
          <h1 style={{ fontSize: 17, fontWeight: 800, color: 'white', letterSpacing: '-0.3px' }}>{title}</h1>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>{children}</div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'rgba(2,6,23,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 0 24px', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        {navItems.map(item => {
          const active = path === item.route;
          return (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(0.4) opacity(0.55)' }}>{item.icon}</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: active ? '#60a5fa' : '#334155', transition: 'color 0.2s' }}>{item.label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6', marginTop: 1 }} />}
            </button>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
