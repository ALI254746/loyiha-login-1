'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    badge: '1-Qadam',
    badgeColor: '#60a5fa',
    icon: '🗺️',
    iconBg: 'rgba(59,130,246,0.15)',
    title: 'Xaritadan joy',
    titleGrad: 'tanlang',
    desc: 'Biznesingizni ochmoqchi bo\'lgan manzilni xaritada belgilang. Tizim shu joydagi aholi, yo\'l va infratuzilmani tahlil qiladi.',
    cards: [
      { icon: '👆', title: 'Xaritaga bosing', desc: 'Istalgan manzilni bir marta bosib belgilang', color: '#3b82f6' },
      { icon: '🔍', title: 'Qidiruv orqali toping', desc: 'Ko\'cha nomi yoki hudud bo\'yicha izlang', color: '#8b5cf6' },
      { icon: 'ℹ️', title: 'Tahlil zonasi', desc: '500m radius ichidagi ma\'lumotlar yig\'iladi', color: '#10b981' },
    ],
  },
  {
    badge: '2-Qadam',
    badgeColor: '#a78bfa',
    icon: '💡',
    iconBg: 'rgba(139,92,246,0.15)',
    title: 'G\'oya va byudjet',
    titleGrad: 'kiriting',
    desc: 'Biznes turini tanlang, g\'oyangizni qisqacha yozing va boshlang\'ich byudjetingizni belgilang.',
    cards: [
      { icon: '📋', title: 'Biznes turini tanlang', desc: 'Kafe, do\'kon, xizmat va boshqalar', color: '#3b82f6' },
      { icon: '✏️', title: 'G\'oyani tasvirlab bering', desc: 'Qisqacha biznes konsepsiyangizni yozing', color: '#8b5cf6' },
      { icon: '💰', title: 'Byudjet miqdorini kiriting', desc: 'Boshlang\'ich kapital hajmini belgilang', color: '#10b981' },
    ],
  },
  {
    badge: '3-Qadam',
    badgeColor: '#34d399',
    icon: '📊',
    iconBg: 'rgba(16,185,129,0.15)',
    title: 'Tahlil va',
    titleGrad: 'maslahatlar',
    desc: 'Tizim demografiya, raqobat va bozor tahlilini avtomatik bajarib, foyda-zarar hisob-kitobini beradi.',
    cards: [
      { icon: '👥', title: 'Demografik tahlil', desc: 'Aholi zichligi va yosh tarkibi', color: '#3b82f6', percent: 78 },
      { icon: '🏆', title: 'Raqobat tahlili', desc: 'Atrofdagi o\'xshash bizneslar soni', color: '#f97316', percent: 45 },
      { icon: '⚖️', title: 'Foyda-zarar hisobi', desc: 'Boshlash bo\'yicha maslahatlar', color: '#10b981', percent: 85 },
    ],
  },
  {
    badge: '4-Qadam',
    badgeColor: '#60a5fa',
    icon: '🧠',
    iconBg: 'rgba(59,130,246,0.15)',
    title: 'Aholi, ehtiyoj va',
    titleGrad: 'foyda-zarar tahlili',
    desc: 'Tizim tanlangan joydagi aholi soni, bozor ehtiyojlari, raqobat darajasi va kutilayotgan foyda-zarar ko\'rsatkichlarini avtomatik hisoblaydi.',
    cards: [
      { icon: '👥', title: 'Aholi soni tahlili', desc: 'Zichlik, yosh tarkibi va daromad darajasi', color: '#3b82f6', percent: 78, val: '12.4K' },
      { icon: '🛒', title: 'Bozor ehtiyojlari', desc: 'Mahsulot va xizmatlarga talab darajasi', color: '#8b5cf6', percent: 85, val: 'Yuqori' },
      { icon: '🏆', title: 'Raqobat darajasi', desc: 'Atrofdagi o\'xshash bizneslar soni', color: '#f97316', percent: 45, val: 'O\'rta' },
      { icon: '⚖️', title: 'Foyda-zarar hisobi', desc: 'Boshlash bo\'yicha maslahatlar va prognoz', color: '#10b981', percent: 72, val: '+34%' },
    ],
    tip: { icon: '💡', color: '#2dd4bf', title: 'Aqlli maslahat', desc: 'Xaritadagi animatsiyali grafiklar orqali atrofdagi bizneslar ta\'sirini ko\'ring' },
  },
];

function MapVisual({ step }: { step: number }) {
  if (step === 0) return (
    <div className="absolute inset-0" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 map-grid" />
      {/* Roads */}
      <div className="map-road-h" style={{ top: '35%', width: '100%', left: 0 }} />
      <div className="map-road-h" style={{ top: '58%', width: '100%', left: 0 }} />
      <div className="map-road-h" style={{ top: '78%', width: '100%', left: 0 }} />
      <div className="map-road-v" style={{ left: '22%', height: '100%', top: 0 }} />
      <div className="map-road-v" style={{ left: '50%', height: '100%', top: 0 }} />
      <div className="map-road-v" style={{ left: '75%', height: '100%', top: 0 }} />
      {/* Buildings */}
      <div className="map-building" style={{ top: '20%', left: '55%', width: 70, height: 30 }} />
      <div className="map-building" style={{ top: '40%', left: '26%', width: 50, height: 35 }} />
      <div className="map-building" style={{ top: '62%', left: '52%', width: 65, height: 30, borderColor: 'rgba(139,92,246,0.25)', background: 'rgba(55,48,163,0.2)' }} />
      {/* Circles */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <circle cx="50%" cy="44%" r="48" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="6 4"/>
        <circle cx="50%" cy="44%" r="80" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="1" strokeDasharray="4 6"/>
      </svg>
      {/* Main pin */}
      <div style={{ position: 'absolute', top: '32%', left: '46%' }}>
        <div style={{ position: 'relative' }}>
          <div className="pin-ring ping" style={{ width: 40, height: 40, top: -4, left: -4 }} />
          <div className="pin-ring pulse-r" style={{ width: 56, height: 56, top: -12, left: -12 }} />
          <div className="pin-dot"><span>📍</span></div>
        </div>
      </div>
      {/* Biz pins */}
      <div className="biz-pin" style={{ top: '48%', left: '20%', background: 'rgba(249,115,22,0.8)' }}>🏪</div>
      <div className="biz-pin" style={{ top: '42%', left: '68%', background: 'rgba(236,72,153,0.8)' }}>🍽️</div>
      <div className="biz-pin" style={{ top: '66%', left: '34%', background: 'rgba(234,179,8,0.8)' }}>☕</div>
      {/* Badges */}
      <div className="map-badge" style={{ top: '8%', left: '4%', animationDelay: '0.5s' }}>
        <div className="badge-icon" style={{ background: 'rgba(59,130,246,0.2)' }}>🎯</div>
        <div><div className="badge-val text-blue-400">Tanlash</div><div className="badge-sub">Xaritadan</div></div>
      </div>
      <div className="map-badge" style={{ top: '8%', right: '4%', animationDelay: '0.7s' }}>
        <div className="badge-icon" style={{ background: 'rgba(34,197,94,0.2)' }}>📌</div>
        <div><div className="badge-val text-green-400">Manzil</div><div className="badge-sub">Belgilash</div></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );

  if (step === 1) return (
    <div className="absolute inset-0" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 map-grid opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Center card */}
          <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="glass-dark p-3 text-center anim-pop" style={{ animationDelay: '0.2s', minWidth: 200, borderRadius: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>🏪</div>
                <span className="text-white font-semibold text-sm">Kafe / Restoran</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-1.5 rounded-full" style={{ background: '#1e293b' }}>
                  <div className="h-full rounded-full" style={{ width: '70%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
                </div>
                <span className="text-xs font-medium text-blue-400">70%</span>
              </div>
            </div>
          </div>
          {/* Side cards */}
          <div style={{ position: 'absolute', top: '42%', left: '5%' }}>
            <div className="glass-dark p-3 anim-slide-left" style={{ animationDelay: '0.4s', borderRadius: 14 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)' }}>💰</div>
                <div><div className="text-green-400 font-bold text-xs">Byudjet</div><div className="text-white font-semibold text-sm">$5,000</div></div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '42%', right: '5%' }}>
            <div className="glass-dark p-3 anim-slide-right" style={{ animationDelay: '0.4s', borderRadius: 14 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>💡</div>
                <div><div className="text-purple-400 font-bold text-xs">G&apos;oya</div><div className="text-white font-semibold text-sm">Kiritish</div></div>
              </div>
            </div>
          </div>
          {/* Bottom icons */}
          <div style={{ position: 'absolute', bottom: '14%', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="flex items-center gap-3 anim-fade" style={{ animationDelay: '0.6s' }}>
              {[{icon:'🏢',label:'Tur'},{icon:'👛',label:'Kapital'},{icon:'✏️',label:'Tavsif'}].map((x,i) => (
                <div key={i} className="glass-dark p-2.5 text-center" style={{ borderRadius: 12 }}>
                  <div className="text-base mb-1">{x.icon}</div>
                  <div className="text-xs" style={{ color: '#64748b', fontSize: 9 }}>{x.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', opacity: 0.3 }}>
            <line x1="50%" y1="30%" x2="20%" y2="50%" stroke="rgba(99,102,241,0.5)" strokeWidth="1" strokeDasharray="4 3" className="conn-line"/>
            <line x1="50%" y1="30%" x2="80%" y2="50%" stroke="rgba(99,102,241,0.5)" strokeWidth="1" strokeDasharray="4 3" className="conn-line"/>
            <line x1="50%" y1="30%" x2="50%" y2="72%" stroke="rgba(99,102,241,0.5)" strokeWidth="1" strokeDasharray="4 3" className="conn-line"/>
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );

  if (step === 2) return (
    <div className="absolute inset-0" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="absolute inset-0 px-5 pt-4 pb-6 flex">
        <div className="flex gap-2 w-full items-end pb-6">
          {[
            { h: '55%', color: 'from-blue-600 to-blue-400', label: 'Aholi', delay: '0.1s' },
            { h: '75%', color: 'from-green-600 to-green-400', label: 'Talab', delay: '0.2s' },
            { h: '45%', color: 'from-orange-600 to-orange-400', label: 'Raqobat', delay: '0.3s' },
            { h: '85%', color: 'from-purple-600 to-purple-400', label: 'Foyda', delay: '0.4s' },
          ].map((b, i) => (
            <div key={i} className="flex flex-col justify-end gap-1 flex-1">
              <div className={`w-full rounded-t-xl bg-gradient-to-t ${b.color} chart-bar`}
                   style={{ height: b.h, animationDelay: b.delay }} />
              <div className="text-center" style={{ color: '#64748b', fontSize: 8 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="map-badge" style={{ top: '8%', left: '4%', animationDelay: '0.3s' }}>
        <div className="badge-icon" style={{ background: 'rgba(34,197,94,0.2)' }}>📈</div>
        <div><div className="badge-val text-green-400">+34%</div><div className="badge-sub">Daromad</div></div>
      </div>
      <div className="map-badge" style={{ top: '8%', right: '4%', animationDelay: '0.5s' }}>
        <div className="badge-icon" style={{ background: 'rgba(59,130,246,0.2)' }}>👥</div>
        <div><div className="badge-val text-blue-400">12.4K</div><div className="badge-sub">Aholi</div></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );

  // Step 3 - Radar/orbit visualization
  return (
    <div className="absolute inset-0" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 10 }}>
        <div style={{ position: 'relative', width: 260, height: 240 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 240" style={{ pointerEvents: 'none' }}>
            <circle cx="130" cy="120" r="50" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1"/>
            <circle cx="130" cy="120" r="80" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="130" cy="120" r="108" fill="none" stroke="rgba(16,185,129,0.06)" strokeWidth="1" strokeDasharray="2 6"/>
            <line x1="130" y1="120" x2="65" y2="55" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-line"/>
            <line x1="130" y1="120" x2="200" y2="60" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-line"/>
            <line x1="130" y1="120" x2="55" y2="158" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-line"/>
            <line x1="130" y1="120" x2="205" y2="162" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-line"/>
            <g style={{ transformOrigin: '130px 120px', animation: 'radarSweep 3s linear infinite' }}>
              <path d="M130,120 L130,40 A80,80 0 0,1 194,88 Z" fill="rgba(59,130,246,0.1)"/>
            </g>
          </svg>
          {/* Center */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="center-orb"><span>📊</span></div>
          </div>
          {/* Corner nodes */}
          {[
            { label: '12.4K', sub: 'Aholi', color: '#60a5fa', bg: 'rgba(59,130,246,0.2)', icon: '👥', pos: { top: '4%', left: '4%' } },
            { label: 'Yuqori', sub: 'Ehtiyoj', color: '#a78bfa', bg: 'rgba(139,92,246,0.2)', icon: '🛒', pos: { top: '4%', right: '4%' } },
            { label: '45%', sub: 'Raqobat', color: '#fb923c', bg: 'rgba(249,115,22,0.2)', icon: '🏆', pos: { bottom: '20%', left: '2%' } },
            { label: '+34%', sub: 'Foyda', color: '#34d399', bg: 'rgba(16,185,129,0.2)', icon: '📈', pos: { bottom: '20%', right: '2%' } },
          ].map((n, i) => (
            <div key={i} className="glass-dark p-2 node-pop" style={{ ...n.pos, position: 'absolute', animationDelay: `${0.2 + i * 0.3}s`, borderRadius: 14 }}>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center text-xs" style={{ background: n.bg }}>{n.icon}</div>
                <div><div className="font-bold" style={{ fontSize: 10, color: n.color }}>{n.label}</div><div style={{ fontSize: 8, color: '#64748b' }}>{n.sub}</div></div>
              </div>
            </div>
          ))}
          {/* Bottom badge */}
          <div className="glass-dark flex items-center gap-1.5 node-pop" style={{ position: 'absolute', bottom: '0%', left: '50%', transform: 'translateX(-50%)', animationDelay: '1.4s', padding: '6px 12px', borderRadius: 12, whiteSpace: 'nowrap' }}>
            <span style={{ color: '#2dd4bf', fontSize: 9 }}>⚖️</span>
            <span className="font-bold" style={{ fontSize: 9, color: '#2dd4bf' }}>Foyda-Zarar</span>
            <span style={{ color: 'white', fontSize: 9 }}>✓</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [done, setDone] = useState(false);
  const current = steps[step];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setFinishing(true);
      setTimeout(() => { setDone(true); setTimeout(() => router.push('/dashboard'), 800); }, 1200);
    }
  };

  return (
    <div className="dark-app-bg min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-sm mx-auto relative flex flex-col overflow-hidden" style={{ minHeight: '100vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-3 z-20 relative">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : router.back()}
                  className="glass-dark w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
                  style={{ opacity: step === 0 ? 0.4 : 1 }}>
            ←
          </button>
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <div key={i} className="h-2 rounded-full transition-all duration-400"
                   style={{ width: i === step ? 24 : 8, background: i <= step ? '#3b82f6' : '#334155' }} />
            ))}
          </div>
          <button onClick={() => { setStep(steps.length - 1); }}
                  className="glass-dark h-10 px-4 rounded-2xl flex items-center justify-center text-sm active:scale-95"
                  style={{ color: '#94a3b8', opacity: step === steps.length - 1 ? 0 : 1, pointerEvents: step === steps.length - 1 ? 'none' : 'auto' }}>
            Skip
          </button>
        </div>

        {/* Visual */}
        <div className="relative flex-shrink-0" style={{ height: 280, width: '100%' }}>
          <MapVisual step={step} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-5 pt-2 pb-6">
          <div className="mb-4" key={step}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: current.iconBg }}>
                {current.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: current.badgeColor }}>
                {current.badge}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mb-2 leading-tight">
              {current.title}<br />
              <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {current.titleGrad}
              </span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{current.desc}</p>
          </div>

          <div className="space-y-2.5 mb-4 flex-1">
            {current.cards.map((card, i) => (
              <div key={i} className="glass-dark rounded-2xl p-3.5 flex items-center gap-3 anim-slide-right"
                   style={{ animationDelay: `${0.1 + i * 0.15}s` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                     style={{ background: `${card.color}22` }}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="text-white font-semibold text-sm">{card.title}</div>
                    {('val' in card) && <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ color: card.color, background: `${card.color}22` }}>{(card as { val: string }).val}</span>}
                  </div>
                  {'percent' in card && (
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#1e293b' }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                             style={{ width: `${(card as { percent: number }).percent}%`, background: card.color }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: card.color }}>{(card as { percent: number }).percent}%</span>
                    </div>
                  )}
                  <div className="text-xs" style={{ color: '#64748b' }}>{card.desc}</div>
                </div>
                {!('percent' in card) && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${card.color}22` }}>
                    <span style={{ color: card.color, fontSize: 9 }}>›</span>
                  </div>
                )}
              </div>
            ))}

            {current.tip && (
              <div className="glass-dark rounded-2xl p-3.5 flex items-center gap-3" style={{ borderColor: `${current.tip.color}33` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ background: `${current.tip.color}22` }}>
                  {current.tip.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: current.tip.color }}>{current.tip.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>{current.tip.desc}</div>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          <button onClick={next}
                  className="w-full h-14 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all active:scale-95 mt-auto"
                  style={{
                    background: done ? 'linear-gradient(135deg, #10b981, #059669)' : step === steps.length - 1 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
                  }}>
            {finishing ? (
              <><span className="loading-dots"><span/><span/><span/></span></>
            ) : done ? (
              <><span>✓</span><span>Tayyor!</span></>
            ) : step === steps.length - 1 ? (
              <><span>Boshlash</span><span>🚀</span></>
            ) : (
              <><span>Davom etish</span><span>→</span></>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .dark-app-bg { background: #020617; color: white; font-family: 'Inter', sans-serif; }
        .map-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .map-road-h { position: absolute; height: 3px; background: rgba(148,163,184,0.2); border-radius: 2px; }
        .map-road-v { position: absolute; width: 3px; background: rgba(148,163,184,0.2); border-radius: 2px; }
        .map-building { position: absolute; background: rgba(30,64,175,0.2); border: 1px solid rgba(59,130,246,0.25); border-radius: 4px; }
        .glass-dark {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pin-ring { position: absolute; border-radius: 50%; border: 2px solid rgba(59,130,246,0.4); }
        .ping { animation: pingAnim 2s ease-out infinite; }
        .pulse-r { animation: pingAnim 2s ease-out 0.7s infinite; border-width: 1px; border-color: rgba(59,130,246,0.2); }
        @keyframes pingAnim { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
        .pin-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex; align-items: center; justify-content: center; font-size: 14px;
          position: relative; z-index: 10; box-shadow: 0 4px 15px rgba(99,102,241,0.5);
          animation: floatPin 3s ease-in-out infinite;
        }
        @keyframes floatPin { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .biz-pin { position: absolute; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; border: 1px solid rgba(255,255,255,0.3); }
        .map-badge { position: absolute; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 8px 12px; animation: fadeIn 0.8s ease forwards; opacity: 0; }
        .badge-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        .badge-val { font-size: 11px; font-weight: 700; line-height: 1; }
        .badge-sub { font-size: 9px; color: #64748b; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-pop { animation: popIn 0.5s ease forwards; opacity: 0; }
        @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .anim-slide-right { animation: slideRight 0.5s ease forwards; opacity: 0; }
        @keyframes slideRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .anim-slide-left { animation: slideLeft 0.6s ease forwards; opacity: 0; }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .anim-fade { animation: fadeIn 0.8s ease forwards; opacity: 0; }
        .conn-line { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawLine 1.5s ease forwards 0.5s; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        .chart-bar { animation: slideUp 0.6s ease forwards; opacity: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .center-orb {
          width: 52px; height: 52px; border-radius: 50%; font-size: 22px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.4); } 50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); } }
        @keyframes radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .node-pop { animation: popIn 0.5s ease forwards; opacity: 0; }
        .loading-dots { display: flex; gap: 6px; }
        .loading-dots span { width: 8px; height: 8px; border-radius: 50%; background: white; animation: dotBounce 1.4s ease-in-out infinite; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBounce { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
