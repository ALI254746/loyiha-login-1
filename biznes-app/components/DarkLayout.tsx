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
      {/* Header */}
      {title && (
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-white/5">
          <button onClick={() => router.push(backRoute || '/dashboard')}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            ←
          </button>
          <h1 className="text-lg font-bold text-white">{title}</h1>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-2 py-3 border-t border-white/5"
           style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>
        {navItems.map(item => (
          <button key={item.route} onClick={() => router.push(item.route)}
                  className="flex flex-col items-center gap-0.5 px-3 py-1">
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs" style={{ color: path === item.route ? '#60a5fa' : '#475569' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
