'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DarkLayout from '@/components/DarkLayout';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#60a5fa', borderRadius: '50%', animation: 'spin 0.9s linear infinite', margin: '0 auto 10px' }} />
        <p style={{ color: '#60a5fa', fontSize: 13 }}>Xarita yuklanmoqda...</p>
      </div>
    </div>
  )
});

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
};

export default function MapPage() {
  const router = useRouter();
  const [loc, setLoc] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const handleSelect = useCallback((lat: number, lng: number, name: string) => {
    setLoc({ lat, lng, name });
  }, []);

  const zones = [
    { label: 'Yuqori trafik', color: '#ef4444', count: 12 },
    { label: "O'rta trafik", color: '#f97316', count: 8 },
    { label: 'Past trafik', color: '#22c55e', count: 15 },
  ];

  return (
    <DarkLayout title="Interaktiv Xarita" backRoute="/dashboard">
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Heatmap legend */}
        <div style={{ display: 'flex', gap: 10 }}>
          {zones.map((z, i) => (
            <div key={i} style={{ flex: 1, ...glass, borderRadius: 16, padding: '10px 8px', textAlign: 'center', border: `1px solid ${z.color}30`, background: `${z.color}0d` }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: z.color, margin: '0 auto 6px', boxShadow: `0 0 8px ${z.color}` }} />
              <div style={{ color: z.color, fontSize: 11, fontWeight: 600 }}>{z.label}</div>
              <div style={{ color: '#475569', fontSize: 10, marginTop: 2 }}>{z.count} zona</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ ...glass, borderRadius: 20, overflow: 'hidden', height: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <MapPicker onLocationSelect={handleSelect} selectedLocation={loc} />
        </div>

        {/* Location info */}
        {loc && (
          <div style={{ borderRadius: 20, padding: 16, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 4px 24px rgba(59,130,246,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>📍 {loc.name}</h3>
                <p style={{ color: '#64748b', fontSize: 11 }}>Lat: {loc.lat.toFixed(4)}, Lng: {loc.lng.toFixed(4)}</p>
              </div>
              <button
                onClick={() => router.push('/idea')}
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 12, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(59,130,246,0.35)', whiteSpace: 'nowrap' }}
              >Tahlil →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { icon: '👥', label: 'Aholi', val: '~12,400' },
                { icon: '🏢', label: 'Bizneslar', val: '34 ta' },
                { icon: '🚶', label: 'Trafik', val: 'Yuqori' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 12 }}>{s.val}</div>
                  <div style={{ color: '#475569', fontSize: 10 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby businesses */}
        <div>
          <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>🏪 Atrofdagi Bizneslar</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Korzinka supermarket', type: 'Supermarket', dist: '300m', impact: 'negative', icon: '🛒' },
              { name: 'Metro bekati', type: 'Transport', dist: '200m', impact: 'positive', icon: '🚇' },
              { name: 'Maktab №45', type: "Ta'lim", dist: '400m', impact: 'positive', icon: '🏫' },
              { name: 'Kafe "Bahor"', type: 'Kafe', dist: '150m', impact: 'neutral', icon: '☕' },
            ].map((b, i) => (
              <div key={i} style={{ ...glass, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>{b.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                  <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{b.type} • {b.dist}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.impact === 'positive' ? '#22c55e' : b.impact === 'negative' ? '#ef4444' : '#f59e0b', boxShadow: `0 0 8px ${b.impact === 'positive' ? '#22c55e' : b.impact === 'negative' ? '#ef4444' : '#f59e0b'}` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DarkLayout>
  );
}
