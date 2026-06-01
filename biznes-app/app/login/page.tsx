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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/onboarding'), 900);
    }, 1600);
  };

  const glassCard = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 20,
  } as React.CSSProperties;

  const inputStyle = (focused: boolean) => ({
    width: '100%',
    height: 52,
    background: focused ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 16,
    color: 'white',
    fontSize: 14,
    paddingLeft: 48,
    paddingRight: 16,
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.05)',
    transition: 'all 0.25s ease',
    fontFamily: 'Inter, sans-serif',
  } as React.CSSProperties);

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      {/* Inter font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── MAP HERO SECTION ── */}
        <div style={{ position: 'relative', width: '100%', height: 340, background: '#080f1e', flexShrink: 0, overflow: 'hidden' }}>
          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />

          {/* Subtle ambient glow */}
          <div style={{ position: 'absolute', top: '20%', left: '40%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />
          <div style={{ position: 'absolute', top: '60%', right: '10%', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />

          {/* Roads - horizontal */}
          {[{ top: '33%' }, { top: '56%' }, { top: '74%' }].map((r, i) => (
            <div key={i} style={{ position: 'absolute', top: r.top, left: 0, width: '100%', height: 3, background: 'rgba(148,163,184,0.15)', borderRadius: 2 }} />
          ))}
          {/* Roads - vertical */}
          {[{ left: '20%' }, { left: '48%' }, { left: '73%' }].map((r, i) => (
            <div key={i} style={{ position: 'absolute', left: r.left, top: 0, width: 3, height: '100%', background: 'rgba(148,163,184,0.15)', borderRadius: 2 }} />
          ))}

          {/* Buildings */}
          <div style={{ position: 'absolute', top: '22%', left: '22%', width: 55, height: 36, background: 'rgba(30,64,175,0.25)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 5 }} />
          <div style={{ position: 'absolute', top: '14%', left: '51%', width: 76, height: 28, background: 'rgba(30,64,175,0.2)', border: '1px solid rgba(59,130,246,0.22)', borderRadius: 5 }} />
          <div style={{ position: 'absolute', top: '60%', left: '24%', width: 48, height: 32, background: 'rgba(30,64,175,0.2)', border: '1px solid rgba(59,130,246,0.22)', borderRadius: 5 }} />
          <div style={{ position: 'absolute', top: '60%', left: '51%', width: 68, height: 32, background: 'rgba(55,48,163,0.22)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 5 }} />
          <div style={{ position: 'absolute', top: '16%', left: '77%', width: 38, height: 46, background: 'rgba(5,150,105,0.18)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 5 }} />

          {/* Radius circles */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <circle cx="48%" cy="43%" r="50" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="48%" cy="43%" r="85" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>

          {/* Main pin with rings */}
          <div className="main-pin-wrap" style={{ position: 'absolute', top: '26%', left: '44%' }}>
            <div className="pin-ring-1" />
            <div className="pin-ring-2" />
            <div className="pin-core">
              <svg width="14" height="18" viewBox="0 0 24 30" fill="white">
                <path d="M12 0C7.6 0 4 3.6 4 8c0 6 8 22 8 22s8-16 8-22c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
            </div>
          </div>

          {/* Business pins */}
          <div className="biz-pin-dot" style={{ top: '40%', left: '19%', background: 'rgba(34,197,94,0.85)', boxShadow: '0 4px 14px rgba(34,197,94,0.45)' }}>🏪</div>
          <div className="biz-pin-dot" style={{ top: '36%', left: '64%', background: 'rgba(249,115,22,0.85)', boxShadow: '0 4px 14px rgba(249,115,22,0.45)' }}>🍽️</div>
          <div className="biz-pin-dot" style={{ top: '59%', left: '77%', background: 'rgba(236,72,153,0.85)', boxShadow: '0 4px 14px rgba(236,72,153,0.45)' }}>✂️</div>
          <div className="biz-pin-dot" style={{ top: '67%', left: '36%', background: 'rgba(234,179,8,0.85)', boxShadow: '0 4px 14px rgba(234,179,8,0.45)' }}>☕</div>

          {/* Floating stat bubbles */}
          <div className="stat-float" style={{ top: '8%', left: '3%', animationDelay: '0.4s' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>📈</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#4ade80', lineHeight: 1 }}>+34%</div>
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Daromad</div>
            </div>
          </div>
          <div className="stat-float" style={{ top: '9%', right: '3%', animationDelay: '0.65s' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👥</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#60a5fa', lineHeight: 1 }}>12.4K</div>
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Aholi</div>
            </div>
          </div>
          <div className="stat-float" style={{ bottom: '18%', right: '3%', animationDelay: '0.9s' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>📊</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#a78bfa', lineHeight: 1 }}>Tahlil</div>
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Raqobat</div>
            </div>
          </div>

          {/* Bottom fade */}
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(to top, #020617 0%, rgba(2,6,23,0.7) 60%, transparent 100%)' }} />
        </div>

        {/* ── CONTENT SECTION ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 20px 32px' }}>

          {/* Brand */}
          <div className="anim-up" style={{ textAlign: 'center', marginBottom: 20, animationDelay: '0.1s' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.4)', fontSize: 18 }}>🗺️</div>
              <span style={{ fontSize: 26, fontWeight: 900, background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.5px' }}>BizPlan Map</span>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>Joylashuvga asoslangan biznes tahlili va<br />maslahat platformasi</p>
          </div>

          {/* Feature mini-cards */}
          <div className="anim-up" style={{ display: 'flex', gap: 10, marginBottom: 20, animationDelay: '0.2s' } as React.CSSProperties}>
            {[
              { icon: '📍', title: 'Joy tanlash', desc: 'Xaritadan manzil', color: '#3b82f6' },
              { icon: '📊', title: 'Tahlil', desc: 'Raqobat & demog.', color: '#8b5cf6' },
              { icon: '💡', title: 'Maslahat', desc: 'Foyda-zarar hisobi', color: '#10b981' },
            ].map((f, i) => (
              <div key={i} style={{ ...glassCard, flex: 1, padding: '12px 8px', textAlign: 'center', borderRadius: 16, boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: `${f.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 16 }}>{f.icon}</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 11, marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.3 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Form fields */}
          <div className="anim-up" style={{ marginBottom: 14, animationDelay: '0.3s' } as React.CSSProperties}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, letterSpacing: '0.02em' }}>Telefon yoki Email</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>✉️</span>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle(focusedField === 'email') }}
              />
            </div>
          </div>

          <div className="anim-up" style={{ marginBottom: 12, animationDelay: '0.35s' } as React.CSSProperties}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, letterSpacing: '0.02em' }}>Parol</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔒</span>
              <input
                type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle(focusedField === 'password'), paddingRight: 48 }}
              />
              <button onClick={() => setShowPw(!showPw)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#64748b', padding: 4 }}>
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="anim-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, animationDelay: '0.4s' } as React.CSSProperties}>
            <label onClick={() => setRemember(!remember)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${remember ? '#3b82f6' : 'rgba(255,255,255,0.2)'}`, background: remember ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                {remember && <span style={{ color: 'white', fontSize: 11, fontWeight: 900, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Eslab qolish</span>
            </label>
            <button style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Parolni unutdim?</button>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="anim-up"
            style={{
              width: '100%', height: 56, borderRadius: 18,
              background: success ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: success ? '0 8px 32px rgba(16,185,129,0.4)' : '0 8px 32px rgba(59,130,246,0.4)',
              color: 'white', fontWeight: 800, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginBottom: 16, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              animationDelay: '0.45s',
              fontFamily: 'Inter, sans-serif',
            } as React.CSSProperties}
          >
            {loading ? (
              <span className="dot-loader"><span /><span /><span /></span>
            ) : success ? (
              <><span style={{ fontSize: 18 }}>✓</span><span>Muvaffaqiyatli!</span></>
            ) : (
              <><span style={{ fontSize: 18 }}>🗺️</span><span>Kirish va Tahlil Boshlash</span></>
            )}
          </button>

          {/* OR divider */}
          <div className="anim-up" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, animationDelay: '0.5s' } as React.CSSProperties}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            <span style={{ fontSize: 11, color: '#334155', fontWeight: 500 }}>yoki</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
          </div>

          {/* Social buttons */}
          <div className="anim-up" style={{ display: 'flex', gap: 12, marginBottom: 18, animationDelay: '0.55s' } as React.CSSProperties}>
            {[
              { icon: '🔴', label: 'Google', action: () => router.push('/onboarding') },
              { icon: '⚫', label: 'Apple', action: () => {} },
            ].map((b, i) => (
              <button key={i} onClick={b.action} style={{ flex: 1, height: 48, ...glassCard, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>{b.label}</span>
              </button>
            ))}
          </div>

          {/* Register link */}
          <div className="anim-up" style={{ textAlign: 'center', animationDelay: '0.6s' } as React.CSSProperties}>
            <span style={{ fontSize: 13, color: '#475569' }}>Hisobingiz yo'qmi? </span>
            <button onClick={() => router.push('/onboarding')} style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif' }}>
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #334155; }
        input::-webkit-input-placeholder { color: #334155; }

        /* Main pin */
        .main-pin-wrap { width: 32px; height: 32px; }
        .pin-ring-1 {
          position: absolute; width: 44px; height: 44px; border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.45);
          top: -6px; left: -6px;
          animation: pingRing 2.2s ease-out infinite;
        }
        .pin-ring-2 {
          position: absolute; width: 62px; height: 62px; border-radius: 50%;
          border: 1px solid rgba(59,130,246,0.2);
          top: -15px; left: -15px;
          animation: pingRing 2.2s ease-out 0.8s infinite;
        }
        .pin-core {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 18px rgba(99,102,241,0.55);
          position: relative; z-index: 10;
          animation: pinFloat 3s ease-in-out infinite;
        }
        @keyframes pingRing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes pinFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        /* Business pins */
        .biz-pin-dot {
          position: absolute; width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; border: 1.5px solid rgba(255,255,255,0.35);
        }

        /* Stat bubbles */
        .stat-float {
          position: absolute; display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.07); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.13); border-radius: 13px;
          padding: 8px 12px;
          opacity: 0; animation: fadeSlideIn 0.7s ease forwards;
        }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* Slide up animations */
        .anim-up { opacity: 0; animation: animUp 0.6s ease forwards; }
        @keyframes animUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        /* Loading dots */
        .dot-loader { display: flex; gap: 6px; align-items: center; }
        .dot-loader span { width: 8px; height: 8px; border-radius: 50%; background: white; animation: dotBounce 1.3s ease-in-out infinite; }
        .dot-loader span:nth-child(2) { animation-delay: 0.18s; }
        .dot-loader span:nth-child(3) { animation-delay: 0.36s; }
        @keyframes dotBounce { 0%,80%,100% { transform: scale(0.55); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
