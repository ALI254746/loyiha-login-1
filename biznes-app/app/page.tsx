'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import BusinessForm from '@/components/BusinessForm';
import AnalysisResults from '@/components/AnalysisResults';
import { generateAnalysis } from '@/lib/businessData';
import type { BusinessAnalysis } from '@/lib/businessData';
import { MapPin, TrendingUp, Sparkles, Building2, ChevronDown } from 'lucide-react';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] glass-card rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-indigo-500 text-sm">Xarita yuklanmoqda...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleLocationSelect = useCallback((lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
  }, []);

  const handleAnalyze = async (business: string, budget: number) => {
    if (!selectedLocation) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulate async analysis
    await new Promise(r => setTimeout(r, 1800));

    const result = generateAnalysis(
      business,
      budget,
      selectedLocation.lat,
      selectedLocation.lng,
      selectedLocation.name
    );
    setAnalysis(result);
    setIsAnalyzing(false);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #e8f0fe 0%, #f3e8ff 50%, #e8f4fd 100%)' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 floating"
             style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full opacity-15 floating"
             style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full opacity-10 floating"
             style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animationDelay: '4s' }} />
      </div>

      {/* Hero Header */}
      <header className="relative z-10 pt-10 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">AI orqali Biznes Tahlil</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="gradient-text">Biznesingizni</span>
            <br />
            <span className="text-indigo-900">To'g'ri Joyda Boshlang</span>
          </h1>

          <p className="text-lg text-indigo-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Xaritadan joy tanlang, biznes turingizni va kapitalizingizni kiriting —
            biz sizga to'liq tahlil va boshlash rejasini taqdim etamiz.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: MapPin, text: 'Xarita tahlili' },
              { icon: TrendingUp, text: 'Bozor dinamikasi' },
              { icon: Building2, text: 'Raqobat tahlili' },
              { icon: Sparkles, text: 'Daromad prognozi' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                <f.icon className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">{f.text}</span>
              </div>
            ))}
          </div>

          <ChevronDown className="w-6 h-6 text-indigo-400 mx-auto animate-bounce" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Map + Form side by side on desktop */}
          <div className="grid lg:grid-cols-5 gap-6 mb-8">

            {/* Map - 3/5 width */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-5 h-full" style={{ minHeight: 520 }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                                  flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-indigo-800">Joy Tanlang</h2>
                    <p className="text-xs text-indigo-500">Xaritada bosing</p>
                  </div>
                  {selectedLocation && (
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-emerald-50 border border-emerald-200">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                      <span className="text-xs font-semibold text-emerald-700">{selectedLocation.name}</span>
                    </div>
                  )}
                </div>
                <div style={{ height: 430 }}>
                  <MapPicker
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                  />
                </div>
              </div>
            </div>

            {/* Form - 2/5 width */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-5 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500
                                  flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-indigo-800">Biznes Ma'lumotlari</h2>
                    <p className="text-xs text-indigo-500">Tahlil uchun to'ldiring</p>
                  </div>
                </div>
                <BusinessForm
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  hasLocation={!!selectedLocation}
                />
              </div>
            </div>
          </div>

          {/* Loading state */}
          {isAnalyzing && (
            <div className="glass-card rounded-3xl p-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-indigo-600 border-r-purple-500
                                rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Tahlil qilinmoqda...</h3>
              <p className="text-indigo-500">
                AI sizning biznes imkoniyatlaringizni, bozor ma'lumotlarini va prognozlarni hisoblayapti
              </p>
              <div className="flex justify-center gap-2 mt-6">
                {['Joylashuv tahlili', 'Bozor tadqiqoti', 'Raqobat tahlili', 'Prognoz'].map((s, i) => (
                  <div key={i}
                       className="px-3 py-1.5 rounded-full text-xs font-medium text-indigo-600
                                  bg-indigo-50 border border-indigo-100"
                       style={{ animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {analysis && (
            <div ref={resultsRef}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200" />
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-700">Tahlil Natijalari</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200" />
              </div>
              <AnalysisResults analysis={analysis} />
            </div>
          )}

          {/* Empty state */}
          {!analysis && !isAnalyzing && (
            <div className="glass-card rounded-3xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100
                              flex items-center justify-center floating">
                <Building2 className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-3">Biznes Tahlilini Boshlang</h3>
              <p className="text-indigo-500 max-w-md mx-auto">
                Xaritada joyni belgilang va biznes ma'lumotlaringizni kiriting.
                Biz sizga to'liq tahlil, bozor ma'lumotlari va boshlash rejasini taqdim etamiz.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
                {[
                  { step: '01', title: 'Joy Tanlang', desc: 'Xaritada bosing', icon: '📍' },
                  { step: '02', title: 'Ma\'lumot Kiriting', desc: 'Biznes va kapital', icon: '✍️' },
                  { step: '03', title: 'Tahlil Oling', desc: 'To\'liq hisobot', icon: '📊' },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-2xl p-4 text-center">
                    <p className="text-2xl mb-2">{s.icon}</p>
                    <p className="text-xs font-bold text-indigo-400 mb-1">{s.step}</p>
                    <p className="text-sm font-bold text-indigo-800">{s.title}</p>
                    <p className="text-xs text-indigo-500 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8 px-4">
        <div className="glass inline-flex items-center gap-3 px-6 py-3 rounded-full">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-sm text-indigo-600 font-medium">
            BiznesAI — O'zbekiston uchun aqlli biznes tahlil platformasi
          </span>
        </div>
      </footer>
    </div>
  );
}
