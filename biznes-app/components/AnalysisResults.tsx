'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  DollarSign, Users, Star, MapPin, ChevronDown, ChevronUp,
  Building2, Target, Zap, Shield
} from 'lucide-react';
import type { BusinessAnalysis } from '@/lib/businessData';

interface AnalysisResultsProps {
  analysis: BusinessAnalysis;
}

function ScoreRing({ score }: { score: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += 2;
      setDisplayScore(Math.min(start, score));
      if (start >= score) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const color = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{ color }}>{displayScore}</span>
        <span className="text-xs text-indigo-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}

function CountUp({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / 50;
    const timer = setInterval(() => {
      start += step;
      setVal(Math.min(Math.round(start), end));
      if (start >= end) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'plan' | 'forecast'>('overview');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
  const riskLabels = { low: "Past risk", medium: "O'rta risk", high: "Yuqori risk" };

  const tabs = [
    { id: 'overview', label: 'Umumiy', icon: Target },
    { id: 'market', label: 'Bozor', icon: TrendingUp },
    { id: 'plan', label: 'Reja', icon: Zap },
    { id: 'forecast', label: 'Prognoz', icon: Star },
  ] as const;

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {analysis.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black gradient-text">{analysis.businessType}</h2>
            <div className="flex items-center gap-2 mt-1 text-indigo-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{analysis.location.name}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: riskColors[analysis.riskLevel] }}>
              {riskLabels[analysis.riskLevel]}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <Shield className="w-4 h-4" style={{ color: riskColors[analysis.riskLevel] }} />
              <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: analysis.riskLevel === 'low' ? '30%' : analysis.riskLevel === 'medium' ? '60%' : '90%',
                    backgroundColor: riskColors[analysis.riskLevel]
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Score & Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <p className="text-xs text-indigo-500 font-semibold mb-2 uppercase tracking-wide">Imkoniyat Skor</p>
            <ScoreRing score={analysis.score} />
          </div>

          {[
            {
              label: 'Oylik daromad',
              value: <CountUp end={analysis.monthlyRevenue[1]} prefix="$" />,
              sub: `min $${analysis.monthlyRevenue[0].toLocaleString()}`,
              icon: DollarSign, color: '#10b981'
            },
            {
              label: 'Foyda muddati',
              value: <><CountUp end={analysis.profitability} /> oy</>,
              sub: 'investitsiya qaytishi',
              icon: TrendingUp, color: '#6366f1'
            },
            {
              label: 'Kapital',
              value: <CountUp end={analysis.budget} prefix="$" />,
              sub: 'boshlang\'ich',
              icon: Users, color: '#8b5cf6'
            },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-xl font-black text-indigo-900">{stat.value}</p>
              <p className="text-xs text-indigo-500 mt-1">{stat.sub}</p>
              <p className="text-xs font-semibold text-indigo-700 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100">
          <p className="text-sm text-indigo-800 font-medium leading-relaxed">
            💡 {analysis.recommendation}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="flex border-b border-white/30">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-2 flex items-center justify-center gap-1.5 text-sm font-semibold transition-all cursor-pointer
                ${activeTab === tab.id
                  ? 'text-indigo-700 border-b-2 border-indigo-500 bg-white/30'
                  : 'text-indigo-400 hover:text-indigo-600 hover:bg-white/20'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Pros & Cons */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Afzalliklar
                  </h3>
                  <ul className="space-y-2">
                    {analysis.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-bold text-rose-600 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Kamchiliklar
                  </h3>
                  <ul className="space-y-2">
                    {analysis.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-rose-700">
                        <span className="text-rose-400 mt-0.5 flex-shrink-0">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Startup Costs Pie */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                  Boshlang'ich Xarajatlar Taqsimoti
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div style={{ width: 200, height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analysis.startupCosts}
                          cx="50%" cy="50%"
                          innerRadius={55} outerRadius={90}
                          dataKey="cost" nameKey="item"
                          strokeWidth={2} stroke="rgba(255,255,255,0.8)"
                        >
                          {analysis.startupCosts.map((_, i) => (
                            <Cell key={i} fill={['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#f97316'][i % 6]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    {analysis.startupCosts.map((cost, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-indigo-700 font-medium">{cost.item}</span>
                          <span className="text-indigo-900 font-bold">${cost.cost.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-indigo-50 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${(cost.cost / analysis.budget) * 100}%`,
                              backgroundColor: ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#f97316'][i % 6]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nearby Competitors */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                  Atrofdagi Bizneslar Ta'siri
                </h3>
                <div className="space-y-3">
                  {analysis.competitors.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/30">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        c.impact === 'positive' ? 'bg-emerald-400' :
                        c.impact === 'negative' ? 'bg-rose-400' : 'bg-amber-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-indigo-800 text-sm">{c.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{c.type}</span>
                        </div>
                        <p className="text-xs text-indigo-500 mt-0.5">{c.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-semibold text-indigo-600">{c.distance}m</p>
                        {c.impact === 'positive'
                          ? <TrendingUp className="w-4 h-4 text-emerald-500 ml-auto" />
                          : <TrendingDown className="w-4 h-4 text-rose-500 ml-auto" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MARKET TAB */}
          {activeTab === 'market' && (
            <div className="space-y-6">
              {/* Demand Radar */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4">Bozor Talab Tahlili</h3>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={analysis.marketInsights}>
                      <PolarGrid stroke="rgba(99,102,241,0.2)" />
                      <PolarAngleAxis
                        dataKey="label"
                        tick={{ fill: '#6366f1', fontSize: 12, fontWeight: 600 }}
                      />
                      <Radar
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Population Growth */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4">Aholi O'sish Dinamikasi</h3>
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysis.populationData}>
                      <defs>
                        <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                      <XAxis dataKey="year" tick={{ fill: '#6366f1', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#6366f1', fontSize: 11 }}
                             tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => [Number(v).toLocaleString(), 'Aholi']} />
                      <Area dataKey="population" stroke="#6366f1" strokeWidth={2}
                            fill="url(#popGrad)" dot={{ fill: '#8b5cf6', r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Market demand bars */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4">Soha bo'yicha Talab Indeksi</h3>
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.marketInsights} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6366f1', fontSize: 11 }} />
                      <YAxis dataKey="label" type="category" tick={{ fill: '#6366f1', fontSize: 11 }} width={120} />
                      <Tooltip formatter={(v) => [`${v}%`, 'Talab']} />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {analysis.marketInsights.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* PLAN TAB */}
          {activeTab === 'plan' && (
            <div className="space-y-4">
              <p className="text-indigo-600 text-sm font-medium mb-4">
                🎯 Qadamba-qadam biznes boshlash rejasi
              </p>
              {analysis.steps.map((step) => (
                <div key={step.step} className="glass rounded-2xl overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-colors text-left"
                    onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                                    flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-indigo-800">{step.title}</h4>
                      <span className="text-xs text-indigo-400 font-medium">{step.duration}</span>
                    </div>
                    {expandedStep === step.step
                      ? <ChevronUp className="w-5 h-5 text-indigo-400" />
                      : <ChevronDown className="w-5 h-5 text-indigo-400" />
                    }
                  </button>
                  {expandedStep === step.step && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="ml-14 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                        <p className="text-sm text-indigo-700">{step.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FORECAST TAB */}
          {activeTab === 'forecast' && (
            <div className="space-y-6">
              {/* Revenue Projection */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-indigo-800 mb-4">12 Oylik Daromad Proyeksiyasi</h3>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analysis.revenueProjection}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                      <XAxis dataKey="month" tick={{ fill: '#6366f1', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#6366f1', fontSize: 11 }}
                             tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                      <Line dataKey="revenue" stroke="#10b981" strokeWidth={2.5}
                            dot={{ fill: '#10b981', r: 4 }} name="Daromad" />
                      <Line dataKey="expenses" stroke="#ef4444" strokeWidth={2.5}
                            dot={{ fill: '#ef4444', r: 4 }} name="Xarajat" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 mt-3 justify-center">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-0.5 bg-emerald-500 rounded" />
                    <span className="text-emerald-700 font-medium">Daromad</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 border-t-2 border-dashed border-rose-500" />
                    <span className="text-rose-600 font-medium">Xarajatlar</span>
                  </div>
                </div>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: 'Yillik Daromad (taxm.)',
                    value: `$${(analysis.monthlyRevenue[1] * 12).toLocaleString()}`,
                    color: '#10b981', icon: '💰'
                  },
                  {
                    label: 'Breakeven muddati',
                    value: `${analysis.profitability} oy`,
                    color: '#6366f1', icon: '⏱️'
                  },
                  {
                    label: 'ROI (1 yil)',
                    value: `${Math.round(((analysis.monthlyRevenue[0] * 12 - analysis.budget) / analysis.budget) * 100)}%`,
                    color: '#8b5cf6', icon: '📈'
                  },
                  {
                    label: 'Oylik foyda (taxm.)',
                    value: `$${Math.round(analysis.monthlyRevenue[0] * 0.35).toLocaleString()}`,
                    color: '#06b6d4', icon: '✨'
                  },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-4 text-center">
                    <p className="text-2xl mb-1">{stat.icon}</p>
                    <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-xs text-indigo-500 mt-1 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
