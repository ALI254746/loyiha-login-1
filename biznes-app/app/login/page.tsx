'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/onboarding'), 800);
    }, 1500);
  };

  return (
    <div className="dark-app-bg min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-sm mx-auto min-h-screen relative flex flex-col overflow-hidden">

        {/* Animated Map Hero */}
        <div className="relative w-full flex-shrink-0 map-hero">
          {/* Grid */}
          <div className="absolute inset-0 map-grid" />
          {/* Roads */}
          <div className="map-road-h" style={{ top: '35%', left: 0, width: '100%' }} />
          <div className="map-road-h" style={{ top: '58%', left: 0, width: '100%' }} />
          <div className="map-road-h" style={{ top: '75%', left: 0, width: '100%' }} />
          <div className="map-road-v" style={{ left: '22%', top: 0, height: '100%' }} />
          <div className="map-road-v" style={{ left: '50%', top: 0, height: '100%' }} />
          <div className="map-road-v" style={{ left: '75%', top: 0, height: '100%' }} />
          {/* Buildings */}
          <div className="map-building" style={{ top: '28%', left: '18%', width: 60, height: 40, borderColor: 'rgba(59,130,246,0.3)' }} />
          <div className="map-building" style={{ top: '20%', left: '52%', width: 80, height: 30, borderColor: 'rgba(59,130,246,0.25)' }} />
          <div className="map-building" style={{ top: '62%', left: '26%', width: 50, height: 35, borderColor: 'rgba(59,130,246,0.25)' }} />
          <div className="map-building" style={{ top: '62%', left: '52%', width: 70, height: 35, borderColor: 'rgba(139,92,246,0.25)', background: 'rgba(55,48,163,0.2)' }} />
          <div className="map-building" style={{ top: '20%', left: '78%', width: 40, height: 50, borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(5,150,105,0.15)' }} />

          {/* Main pin */}
          <div className="main-pin" style={{ top: '28%', left: '47%' }}>
            <div className="pin-ring ring-1" />
            <div className="pin-ring ring-2" />
            <div className="pin-dot">
              <svg width="16" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
          </div>

          {/* Business pins */}
          <div className="biz-pin" style={{ top: '42%', left: '22%', background: 'rgba(34,197,94,0.8)', boxShadow: '0 4px 12px rgba(34,197,94,0.4)' }}>🏪</div>
          <div className="biz-pin" style={{ top: '38%', left: '65%', background: 'rgba(249,115,22,0.8)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>🍽️</div>
          <div className="biz-pin" style={{ top: '60%', left: '78%', background: 'rgba(236,72,153,0.8)', boxShadow: '0 4px 12px rgba(236,72,153,0.4)' }}>✂️</div>
          <div className="biz-pin" style={{ top: '68%', left: '38%', background: 'rgba(234,179,8,0.8)', boxShadow: '0 4px 12px rgba(234,179,8,0.4)' }}>☕</div>

          {/* Stat bubbles */}
          <div className="stat-bubble" style={{ top: '10%', left: '4%', animationDelay: '0.8s' }}>
            <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.2)' }}>📈</div>
            <div><div className="stat-val text-green-400">+34%</div><div className="stat-label">Daromad</div></div>
          </div>
          <div className="stat-bubble" style={{ top: '12%', right: '4%', animationDelay: '1s' }}>
            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.2)' }}>👥</div>
            <div><div className="stat-val text-blue-400">12.4K</div><div className="stat-label">Aholi</div></div>
          </div>
          <div className="stat-bubble" style={{ bottom: '16%', right: '4%', animationDelay: '1.2s' }}>
            <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.2)' }}>📊</div>
            <div><div className="stat-val text-purple-400">Tahlil</div><div className="stat-label">Raqobat</div></div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-5 pt-2 pb-8">
          {/* Brand */}
          <div className="text-center mb-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 20px rgba(59,130,246,0.35)' }}>
                🗺️
              </div>
              <span className="text-2xl font-black" style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                BizPlan Map
              </span>
            </div>
            <p className="text-sm" style={{ color: '#94a3b8' }}>Joylashuvga asoslangan biznes tahlili va<br />maslahat platformasi</p>
          </div>

          {/* Feature cards */}
          <div className="flex gap-3 mb-6">
            {[
              { icon: '📍', title: 'Joy tanlash', desc: 'Xaritadan manzil belgilang', delay: '0.1s', color: '#3b82f6' },
              { icon: '📊', title: 'Tahlil', desc: 'Raqobat va demografiya', delay: '0.25s', color: '#8b5cf6' },
              { icon: '💡', title: 'Maslahat', desc: 'Foyda-zarar hisobi', delay: '0.4s', color: '#10b981' },
            ].map((f, i) => (
              <div key={i} className="flex-1 glass-dark rounded-2xl p-3 text-center animate-slideUp" style={{ animationDelay: f.delay }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 text-lg"
                     style={{ background: `${f.color}22` }}>
                  {f.icon}
                </div>
                <div className="text-white font-semibold text-xs mb-1">{f.title}</div>
                <div className="text-xs leading-tight" style={{ color: '#64748b' }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-3 mb-4 animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Telefon yoki Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">✉️</span>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="dark-input w-full h-12 rounded-2xl pl-11 pr-4 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Parol</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="dark-input w-full h-12 rounded-2xl pl-11 pr-12 text-sm"
                />
                <button onClick={() => setShowPw(!showPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 animate-slideUp" style={{ animationDelay: '0.55s' }}>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember(!remember)}>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
                ${remember ? 'bg-blue-600 border-blue-500' : 'border-slate-600'}`}>
                {remember && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-xs" style={{ color: '#94a3b8' }}>Eslab qolish</span>
            </label>
            <button className="text-xs font-medium" style={{ color: '#60a5fa' }}>Parolni unutdim?</button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 mb-4 transition-all active:scale-95"
            style={{
              background: success ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
            }}>
            {loading ? (
              <><span className="loading-dots"><span/><span/><span/></span></>
            ) : success ? (
              <><span>✓</span><span>Muvaffaqiyatli!</span></>
            ) : (
              <><span>🗺️</span><span>Kirish va Tahlil Boshlash</span></>
            )}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
            <span className="text-xs" style={{ color: '#475569' }}>yoki</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
          </div>

          <div className="flex gap-3 mb-5">
            <button onClick={() => router.push('/onboarding')}
                    className="flex-1 glass-dark h-12 rounded-2xl flex items-center justify-center gap-2 hover:border-slate-500 transition-all">
              <span>🔴</span><span className="text-sm font-medium text-slate-300">Google</span>
            </button>
            <button className="flex-1 glass-dark h-12 rounded-2xl flex items-center justify-center gap-2 hover:border-slate-500 transition-all">
              <span>🍎</span><span className="text-sm font-medium text-slate-300">Apple</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm" style={{ color: '#475569' }}>Hisobingiz yo'qmi? </span>
            <button onClick={() => router.push('/onboarding')} className="text-sm font-semibold" style={{ color: '#60a5fa' }}>
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .dark-app-bg { background: #020617; color: white; font-family: 'Inter', sans-serif; }
        .map-hero { height: 340px; background: #0f172a; position: relative; overflow: hidden; }
        .map-grid {
          background-image: linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .map-road-h { position: absolute; height: 3px; background: rgba(148,163,184,0.2); border-radius: 2px; }
        .map-road-v { position: absolute; width: 3px; background: rgba(148,163,184,0.2); border-radius: 2px; }
        .map-building { position: absolute; background: rgba(30,64,175,0.2); border: 1px solid; border-radius: 4px; }
        .glass-dark {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
        }
        .dark-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          outline: none;
          transition: all 0.3s;
        }
        .dark-input:focus { background: rgba(255,255,255,0.1); border-color: rgba(99,102,241,0.6); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .dark-input::placeholder { color: #334155; }

        .main-pin { position: absolute; }
        .pin-ring { position: absolute; border-radius: 50%; border: 2px solid rgba(59,130,246,0.4); }
        .ring-1 { width: 40px; height: 40px; top: -4px; left: -4px; animation: ping 2s ease-out infinite; }
        .ring-2 { width: 56px; height: 56px; top: -12px; left: -12px; border: 1px solid rgba(59,130,246,0.2); animation: ping 2s ease-out infinite 0.7s; }
        .pin-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px rgba(99,102,241,0.5);
          position: relative; z-index: 10;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }

        .biz-pin {
          position: absolute; width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; border: 1px solid rgba(255,255,255,0.3);
        }
        .stat-bubble {
          position: absolute; display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 8px 12px;
          animation: fadeIn 0.8s ease forwards; opacity: 0;
        }
        .stat-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        .stat-val { font-size: 12px; font-weight: 700; line-height: 1; }
        .stat-label { font-size: 9px; color: #64748b; line-height: 1; margin-top: 1px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .animate-slideUp { animation: slideUp 0.7s ease forwards; opacity: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .loading-dots { display: flex; gap: 6px; }
        .loading-dots span { width: 8px; height: 8px; border-radius: 50%; background: white; animation: dotBounce 1.4s ease-in-out infinite; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBounce { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
