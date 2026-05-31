'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DarkLayout from '@/components/DarkLayout';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ height: 400, background: 'rgba(255,255,255,0.04)', borderRadius: 16 }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-800 border-t-blue-400 rounded-full animate-spin mx-auto mb-2" />
        <p style={{ color: '#60a5fa', fontSize: 14 }}>Xarita yuklanmoqda...</p>
      </div>
    </div>
  )
});

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
      <div className="px-4 py-4 space-y-4">
        {/* Heatmap legend */}
        <div className="flex gap-3">
          {zones.map((z, i) => (
            <div key={i} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: `${z.color}15`, border: `1px solid ${z.color}33` }}>
              <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ background: z.color }} />
              <div className="text-xs font-medium" style={{ color: z.color }}>{z.label}</div>
              <div className="text-xs" style={{ color: '#64748b' }}>{z.count} zona</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden" style={{ height: 420, border: '1px solid rgba(255,255,255,0.08)' }}>
          <MapPicker onLocationSelect={handleSelect} selectedLocation={loc} />
        </div>

        {/* Location info */}
        {loc && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold mb-1">📍 {loc.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: 12 }}>Lat: {loc.lat.toFixed(4)}, Lng: {loc.lng.toFixed(4)}</p>
              </div>
              <button onClick={() => router.push('/idea')}
                      className="text-white font-semibold text-sm px-4 py-2 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                Tahlil →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { icon: '👥', label: 'Aholi', val: '~12,400' },
                { icon: '🏢', label: 'Bizneslar', val: '34 ta' },
                { icon: '🚶', label: 'Trafik', val: 'Yuqori' },
              ].map((s, i) => (
                <div key={i} className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div className="text-white font-bold text-xs">{s.val}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby businesses */}
        <div>
          <h3 className="text-white font-bold mb-3">🏪 Atrofdagi Bizneslar</h3>
          <div className="space-y-2">
            {[
              { name: 'Korzinka supermarket', type: 'Supermarket', dist: '300m', impact: 'negative', icon: '🛒' },
              { name: 'Metro bekati', type: 'Transport', dist: '200m', impact: 'positive', icon: '🚇' },
              { name: 'Maktab №45', type: "Ta'lim", dist: '400m', impact: 'positive', icon: '🏫' },
              { name: 'Kafe "Bahor"', type: 'Kafe', dist: '150m', impact: 'neutral', icon: '☕' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl">{b.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{b.name}</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>{b.type} • {b.dist}</div>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: b.impact === 'positive' ? '#22c55e' : b.impact === 'negative' ? '#ef4444' : '#f59e0b' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DarkLayout>
  );
}
