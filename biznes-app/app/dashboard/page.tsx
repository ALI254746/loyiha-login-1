'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import BusinessForm from '@/components/BusinessForm';
import AnalysisResults from '@/components/AnalysisResults';
import { generateAnalysis } from '@/lib/businessData';
import type { BusinessAnalysis } from '@/lib/businessData';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid rgba(59,130,246,0.25)', borderTopColor:'#60a5fa', borderRadius:'50%', animation:'spin 0.9s linear infinite', margin:'0 auto 12px' }} />
        <p style={{ color:'#60a5fa', fontSize:13 }}>Xarita yuklanmoqda...</p>
      </div>
    </div>
  ),
});

const glassDark: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.12)',
};

export default function DashboardPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'results'>('map');
  const [activeNav, setActiveNav] = useState(0);

  const handleAnalyze = async (business: string, budget: number) => {
    if (!selectedLocation) return;
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 1800));
    const result = generateAnalysis(business, budget, selectedLocation.lat, selectedLocation.lng, selectedLocation.name);
    setAnalysis(result);
    setIsAnalyzing(false);
    setActiveTab('results');
  };

  const quickActions = [
    { icon: '📍', label: 'Joy tanlash', route: '/map', color: '#3b82f6' },
    { icon: '💡', label: "G'oya & Byudjet", route: '/idea', color: '#8b5cf6' },
    { icon: '📊', label: 'Natijalar', route: '/results', color: '#10b981' },
    { icon: '🧠', label: 'Maslahatlar', route: '/insights', color: '#f97316' },
    { icon: '📁', label: 'Saqlangan', route: '/saved', color: '#ec4899' },
  ];

  const navItems = [
    { icon: '🏠', label: 'Bosh sahifa', route: '/dashboard' },
    { icon: '🗺️', label: 'Xarita', route: '/map' },
    { icon: '📊', label: 'Tahlil', route: '/analytics' },
    { icon: '💡', label: 'Maslahat', route: '/insights' },
    { icon: '👤', label: 'Profil', route: '/profile' },
  ];

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

        {/* ── HEADER ── */}
        <div style={{ padding: '52px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          {/* Subtle gradient orb behind header */}
          <div style={{ position: 'absolute', top: 0, left: '30%', width: 200, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 12, color: '#475569', marginBottom: 3, fontWeight: 500 }}>Salom, Tadbirkor! 👋</p>
              <h1 style={{ fontSize: 22, fontWeight: 900, background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.5px', lineHeight: 1.1 }}>BizPlan Map</h1>
            </div>
            <button
              onClick={() => router.push('/profile')}
              style={{ ...glassDark, width: 44, height: 44, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)' }}
            >👤</button>
          </div>
        </div>

        {/* ── QUICK ACTION CHIPS ── */}
        <div style={{ padding: '12px 0 12px 20px', display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {quickActions.map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.route)}
              style={{ ...glassDark, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0, padding: '12px 14px', borderRadius: 18, cursor: 'pointer', minWidth: 70, border: `1px solid ${item.color}2a`, boxShadow: `0 4px 16px rgba(0,0,0,0.2), 0 0 0 0 ${item.color}`, transition: 'transform 0.15s ease', fontFamily: 'Inter, sans-serif' }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap' }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* ── TABS ── */}
        <div style={{ display: 'flex', padding: '0 20px', gap: 10, marginBottom: 14 }}>
          {[
            { key: 'map', label: '🗺️ Xarita & Tahlil' },
            { key: 'results', label: '📊 Natijalar', disabled: !analysis },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => !tab.disabled && setActiveTab(tab.key as 'map' | 'results')}
              disabled={!!tab.disabled}
              style={{
                flex: 1, height: 42, borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: tab.disabled ? 'not-allowed' : 'pointer',
                background: activeTab === tab.key ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                border: activeTab === tab.key ? 'none' : '1px solid rgba(255,255,255,0.1)',
                color: activeTab === tab.key ? 'white' : '#64748b',
                boxShadow: activeTab === tab.key ? '0 4px 16px rgba(59,130,246,0.35)' : 'none',
                opacity: tab.disabled ? 0.4 : 1,
                transition: 'all 0.25s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, padding: '0 20px 100px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {activeTab === 'map' && (
            <>
              {/* Map card */}
              <div style={{ ...glassDark, borderRadius: 24, padding: 16, height: 380, boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(59,130,246,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📍</div>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Joy Tanlang</span>
                  {selectedLocation && (
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '4px 10px' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                      <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedLocation.name}</span>
                    </div>
                  )}
                </div>
                <div style={{ height: 308, borderRadius: 14, overflow: 'hidden' }}>
                  <MapPicker
                    onLocationSelect={(lat, lng, name) => setSelectedLocation({ lat, lng, name })}
                    selectedLocation={selectedLocation}
                  />
                </div>
              </div>

              {/* Business form card */}
              <div style={{ ...glassDark, borderRadius: 24, padding: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(139,92,246,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💡</div>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Biznes Ma&apos;lumotlari</span>
                </div>
                <BusinessForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} hasLocation={!!selectedLocation} />
              </div>
            </>
          )}

          {activeTab === 'results' && analysis && (
            <AnalysisResults analysis={analysis} />
          )}

          {activeTab === 'results' && !analysis && (
            <div style={{ ...glassDark, borderRadius: 24, padding: '48px 20px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <div style={{ fontSize: 52, marginBottom: 16, animation: 'bounce 1s ease-in-out infinite' }}>📊</div>
              <p style={{ color: 'white', fontWeight: 800, fontSize: 17, marginBottom: 8 }}>Hali tahlil yo&apos;q</p>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 20 }}>Avval xaritadan joy tanlang va biznes tahlilini bajaring</p>
              <button
                onClick={() => setActiveTab('map')}
                style={{ padding: '12px 28px', borderRadius: 16, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(59,130,246,0.35)', fontFamily: 'Inter, sans-serif' }}
              >Boshlash →</button>
            </div>
          )}
        </div>

        {/* ── BOTTOM NAV ── */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 0 24px', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => { setActiveNav(i); router.push(item.route); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 10px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              <span style={{ fontSize: 22, filter: activeNav===i ? 'none' : 'grayscale(0.5) opacity(0.6)' }}>{item.icon}</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: activeNav===i ? '#60a5fa' : '#334155', transition: 'color 0.2s' }}>{item.label}</span>
              {activeNav===i && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6', marginTop: 1 }} />}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
