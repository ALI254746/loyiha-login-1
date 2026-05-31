'use client';

import { useState } from 'react';
import { Building2, DollarSign, Sparkles, MapPin, ChevronRight } from 'lucide-react';

interface BusinessFormProps {
  onAnalyze: (business: string, budget: number) => void;
  isAnalyzing: boolean;
  hasLocation: boolean;
}

const businessSuggestions = [
  { icon: '🍽️', label: 'Restoran', value: 'Restoran' },
  { icon: '☕', label: 'Kafe', value: 'Kafe' },
  { icon: '🛍️', label: "Do'kon", value: "Do'kon" },
  { icon: '💻', label: 'IT Xizmatlari', value: 'IT Xizmatlari' },
  { icon: '🏥', label: 'Klinika', value: 'Klinika' },
  { icon: '📚', label: "O'quv markaz", value: "O'quv markaz" },
  { icon: '💇', label: 'Go\'zallik salon', value: "Go'zallik salon" },
  { icon: '🏗️', label: 'Qurilish', value: 'Qurilish kompaniya' },
];

const budgetOptions = [
  { label: '5,000$', value: 5000 },
  { label: '10,000$', value: 10000 },
  { label: '25,000$', value: 25000 },
  { label: '50,000$', value: 50000 },
  { label: '100,000$', value: 100000 },
];

export default function BusinessForm({ onAnalyze, isAnalyzing, hasLocation }: BusinessFormProps) {
  const [business, setBusiness] = useState('');
  const [budget, setBudget] = useState<number>(10000);
  const [customBudget, setCustomBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business || !budget) return;
    onAnalyze(business, budget);
  };

  const activeBudget = customBudget ? parseInt(customBudget.replace(/,/g, '')) : budget;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business type */}
      <div>
        <label className="block text-sm font-semibold text-indigo-800 mb-2 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Qanday biznes boshlashni xohlaysiz?
        </label>
        <input
          type="text"
          value={business}
          onChange={e => setBusiness(e.target.value)}
          placeholder="Masalan: Restoran, Kafe, IT kompaniya..."
          className="w-full px-4 py-3 rounded-xl border border-white/50 bg-white/40 backdrop-blur-sm
                     text-indigo-900 placeholder-indigo-300 outline-none
                     focus:border-indigo-400 focus:bg-white/60 focus:ring-2 focus:ring-indigo-200
                     transition-all duration-200"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {businessSuggestions.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setBusiness(s.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
                ${business === s.value
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white/40 text-indigo-700 border border-white/50 hover:bg-white/60'
                }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-indigo-800 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Sizda qancha kapital bor?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {budgetOptions.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setBudget(opt.value); setCustomBudget(''); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                ${budget === opt.value && !customBudget
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white/40 text-indigo-700 border border-white/50 hover:bg-white/60'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">$</span>
          <input
            type="number"
            value={customBudget}
            onChange={e => {
              setCustomBudget(e.target.value);
              if (e.target.value) setBudget(parseInt(e.target.value));
            }}
            placeholder="Yoki o'z miqdoringizni kiriting"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/50 bg-white/40 backdrop-blur-sm
                       text-indigo-900 placeholder-indigo-300 outline-none
                       focus:border-indigo-400 focus:bg-white/60 focus:ring-2 focus:ring-indigo-200
                       transition-all duration-200"
          />
        </div>

        {/* Budget slider */}
        <input
          type="range"
          min={1000}
          max={500000}
          step={1000}
          value={activeBudget || 10000}
          onChange={e => {
            const val = parseInt(e.target.value);
            setBudget(val);
            setCustomBudget(String(val));
          }}
          className="w-full mt-3 accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-indigo-400 mt-1">
          <span>$1,000</span>
          <span className="font-semibold text-indigo-600">
            ${activeBudget?.toLocaleString() || '10,000'}
          </span>
          <span>$500,000</span>
        </div>
      </div>

      {/* Location warning */}
      {!hasLocation && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
          <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-amber-700 text-sm">Tahlil uchun xaritadan joy tanlang</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!business || !activeBudget || !hasLocation || isAnalyzing}
        className="w-full py-4 px-6 btn-primary rounded-2xl text-white font-bold text-lg
                   flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
                   cursor-pointer"
      >
        {isAnalyzing ? (
          <>
            <div className="w-5 h-5 border-3 border-white/40 border-t-white rounded-full animate-spin" />
            Tahlil qilinmoqda...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Biznes Tahlil Qiling
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
