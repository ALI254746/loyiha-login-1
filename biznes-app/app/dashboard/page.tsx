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
    <div className="w-full h-full min-h-[400px] glass-dark rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-800 border-t-blue-400 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-blue-400 text-sm">Xarita yuklanmoqda...</p>
      </div>
    </div>
  )
});

export default function DashboardPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'results'>('map');

  const handleAnalyze = async (business: string, budget: number) => {
    if (!selectedLocation) return;
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 1800));
    const result = generateAnalysis(business, budget, selectedLocation.lat, selectedLocation.lng, selectedLocation.name);
    setAnalysis(result);
    setIsAnalyzing(false);
    setActiveTab('results');
  };

  return (
    <div className="dark-app-bg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-white/5">
        <div>
          <p className="text-xs" style={{ color: '#64748b' }}>Salom, Tadbirkor! 👋</p>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BizPlan Map
          </h1>
        </div>
        <button onClick={() => router.push('/profile')}
                className="w-10 h-10 rounded-2xl glass-dark flex items-center justify-center text-lg">
          👤
        </button>
      </div>

      {/* Quick stats */}
      <div className="px-4 py-3 flex gap-3 overflow-x-auto">
        {[
          { icon: '📍', label: 'Joy tanlash', route: '/map', color: '#3b82f6' },
          { icon: '💡', label: "G'oya & Byudjet", route: '/idea', color: '#8b5cf6' },
          { icon: '📊', label: 'Natijalar', route: '/results', color: '#10b981' },
          { icon: '🧠', label: 'Maslahatlar', route: '/insights', color: '#f97316' },
          { icon: '📁', label: 'Saqlangan', route: '/saved', color: '#ec4899' },
        ].map((item, i) => (
          <button key={i} onClick={() => router.push(item.route)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 glass-dark rounded-2xl px-4 py-3 active:scale-95 transition-all"
                  style={{ minWidth: 72, border: `1px solid ${item.color}33` }}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: '#94a3b8' }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex px-4 gap-2 mb-3">
        <button onClick={() => setActiveTab('map')}
                className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${activeTab === 'map' ? 'btn-primary text-white' : 'glass-dark text-slate-400'}`}>
          🗺️ Xarita & Tahlil
        </button>
        <button onClick={() => setActiveTab('results')}
                disabled={!analysis}
                className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 ${activeTab === 'results' ? 'btn-primary text-white' : 'glass-dark text-slate-400'}`}>
          📊 Natijalar
        </button>
      </div>

      <div className="flex-1 px-4 pb-6 space-y-4">
        {activeTab === 'map' && (
          <>
            <div className="glass-dark rounded-3xl p-4" style={{ height: 380 }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📍</span>
                <span className="text-white font-semibold text-sm">Joy Tanlang</span>
                {selectedLocation && (
                  <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                       style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    {selectedLocation.name}
                  </div>
                )}
              </div>
              <div style={{ height: 310 }}>
                <MapPicker onLocationSelect={(lat, lng, name) => setSelectedLocation({ lat, lng, name })} selectedLocation={selectedLocation} />
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">💡</span>
                <span className="text-white font-semibold text-sm">Biznes Ma&apos;lumotlari</span>
              </div>
              <BusinessForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} hasLocation={!!selectedLocation} />
            </div>
          </>
        )}

        {activeTab === 'results' && analysis && (
          <AnalysisResults analysis={analysis} />
        )}

        {activeTab === 'results' && !analysis && (
          <div className="glass-dark rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4 animate-bounce">📊</div>
            <p className="text-white font-bold mb-2">Hali tahlil yo&apos;q</p>
            <p className="text-sm" style={{ color: '#64748b' }}>Avval xaritadan joy tanlang va biznes tahlilini bajaring</p>
            <button onClick={() => setActiveTab('map')} className="mt-4 px-6 py-3 rounded-2xl text-white font-semibold btn-primary text-sm">
              Boshlash →
            </button>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-4 py-3 border-t border-white/5 glass-dark" style={{ borderRadius: 0 }}>
        {[
          { icon: '🏠', label: 'Bosh sahifa', route: '/dashboard', active: true },
          { icon: '🗺️', label: 'Xarita', route: '/map' },
          { icon: '📊', label: 'Tahlil', route: '/analytics' },
          { icon: '💡', label: 'Maslahat', route: '/insights' },
          { icon: '👤', label: 'Profil', route: '/profile' },
        ].map((item, i) => (
          <button key={i} onClick={() => router.push(item.route)}
                  className="flex flex-col items-center gap-0.5 px-2 py-1">
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs" style={{ color: item.active ? '#60a5fa' : '#475569' }}>{item.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        .dark-app-bg { background: #020617; color: white; font-family: 'Inter', sans-serif; }
        .glass-dark { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .btn-primary { background: linear-gradient(135deg, #3b82f6, #8b5cf6); box-shadow: 0 4px 15px rgba(59,130,246,0.3); }
      `}</style>
    </div>
  );
}
