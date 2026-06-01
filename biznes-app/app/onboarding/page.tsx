'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    badge: '1-Qadam', badgeColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,0.18)', icon: '🗺️',
    title: 'Xaritadan joy', titleGrad: 'tanlang',
    desc: 'Biznesingizni ochmoqchi bo\'lgan manzilni xaritada belgilang. Tizim shu joydagi aholi, yo\'l va infratuzilmani tahlil qiladi.',
    cards: [
      { icon: '👆', title: 'Xaritaga bosing', desc: 'Istalgan manzilni bir marta bosib belgilang', color: '#3b82f6' },
      { icon: '🔍', title: 'Qidiruv orqali toping', desc: 'Ko\'cha nomi yoki hudud bo\'yicha izlang', color: '#8b5cf6' },
      { icon: 'ℹ️', title: 'Tahlil zonasi', desc: '500m radius ichidagi ma\'lumotlar yig\'iladi', color: '#10b981' },
    ],
  },
  {
    badge: '2-Qadam', badgeColor: '#a78bfa',
    iconBg: 'rgba(139,92,246,0.18)', icon: '💡',
    title: 'G\'oya va byudjet', titleGrad: 'kiriting',
    desc: 'Biznes turini tanlang, g\'oyangizni qisqacha yozing va boshlang\'ich byudjetingizni belgilang.',
    cards: [
      { icon: '📋', title: 'Biznes turini tanlang', desc: 'Kafe, do\'kon, xizmat va boshqalar', color: '#3b82f6' },
      { icon: '✏️', title: 'G\'oyani tasvirlab bering', desc: 'Qisqacha biznes konsepsiyangizni yozing', color: '#8b5cf6' },
      { icon: '💰', title: 'Byudjet miqdorini kiriting', desc: 'Boshlang\'ich kapital hajmini belgilang', color: '#10b981' },
    ],
  },
  {
    badge: '3-Qadam', badgeColor: '#34d399',
    iconBg: 'rgba(16,185,129,0.18)', icon: '📊',
    title: 'Tahlil va', titleGrad: 'maslahatlar',
    desc: 'Tizim demografiya, raqobat va bozor tahlilini avtomatik bajarib, foyda-zarar hisob-kitobini beradi.',
    cards: [
      { icon: '👥', title: 'Demografik tahlil', desc: 'Aholi zichligi va yosh tarkibi', color: '#3b82f6', percent: 78 },
      { icon: '🏆', title: 'Raqobat tahlili', desc: 'Atrofdagi o\'xshash bizneslar soni', color: '#f97316', percent: 45 },
      { icon: '⚖️', title: 'Foyda-zarar hisobi', desc: 'Boshlash bo\'yicha maslahatlar', color: '#10b981', percent: 85 },
    ],
  },
  {
    badge: '4-Qadam', badgeColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,0.18)', icon: '🧠',
    title: 'Aholi, ehtiyoj va', titleGrad: 'foyda-zarar tahlili',
    desc: 'Tizim tanlangan joydagi aholi soni, bozor ehtiyojlari, raqobat darajasi va kutilayotgan foyda-zarar ko\'rsatkichlarini avtomatik hisoblaydi.',
    cards: [
      { icon: '👥', title: 'Aholi soni tahlili', desc: 'Zichlik, yosh tarkibi va daromad darajasi', color: '#3b82f6', percent: 78, val: '12.4K' },
      { icon: '🛒', title: 'Bozor ehtiyojlari', desc: 'Mahsulot va xizmatlarga talab darajasi', color: '#8b5cf6', percent: 85, val: 'Yuqori' },
      { icon: '🏆', title: 'Raqobat darajasi', desc: 'Atrofdagi o\'xshash bizneslar soni', color: '#f97316', percent: 45, val: 'O\'rta' },
      { icon: '⚖️', title: 'Foyda-zarar hisobi', desc: 'Boshlash bo\'yicha maslahatlar va prognoz', color: '#10b981', percent: 72, val: '+34%' },
    ],
  },
];

const glassDark: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.12)',
};

// ── Step 0: Map visual ──
function VisualStep0() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#08111f', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg,rgba(59,130,246,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      {/* Roads */}
      {[{top:'33%'},{top:'56%'},{top:'76%'}].map((r,i)=>(
        <div key={i} style={{ position:'absolute', top:r.top, left:0, width:'100%', height:3, background:'rgba(148,163,184,0.15)', borderRadius:2 }} />
      ))}
      {[{left:'20%'},{left:'48%'},{left:'73%'}].map((r,i)=>(
        <div key={i} style={{ position:'absolute', left:r.left, top:0, width:3, height:'100%', background:'rgba(148,163,184,0.15)', borderRadius:2 }} />
      ))}
      {/* Buildings */}
      <div style={{ position:'absolute', top:'16%', left:'52%', width:72, height:28, background:'rgba(30,64,175,0.22)', border:'1px solid rgba(59,130,246,0.25)', borderRadius:5 }} />
      <div style={{ position:'absolute', top:'38%', left:'24%', width:52, height:34, background:'rgba(30,64,175,0.2)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:5 }} />
      <div style={{ position:'absolute', top:'60%', left:'50%', width:66, height:30, background:'rgba(55,48,163,0.2)', border:'1px solid rgba(139,92,246,0.22)', borderRadius:5 }} />
      {/* Radius circles */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        <circle cx="50%" cy="46%" r="52" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" strokeDasharray="6 4"/>
        <circle cx="50%" cy="46%" r="88" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" strokeDasharray="4 6"/>
      </svg>
      {/* Main pin */}
      <div style={{ position:'absolute', top:'32%', left:'46%' }}>
        <div className="pin-ring-1" /><div className="pin-ring-2" />
        <div className="pin-core"><span>📍</span></div>
      </div>
      {/* Biz pins */}
      <div className="biz-dot" style={{ top:'46%', left:'18%', background:'rgba(249,115,22,0.85)', boxShadow:'0 4px 14px rgba(249,115,22,0.4)' }}>🏪</div>
      <div className="biz-dot" style={{ top:'40%', left:'67%', background:'rgba(236,72,153,0.85)', boxShadow:'0 4px 14px rgba(236,72,153,0.4)' }}>🍽️</div>
      <div className="biz-dot" style={{ top:'64%', left:'32%', background:'rgba(234,179,8,0.85)', boxShadow:'0 4px 14px rgba(234,179,8,0.4)' }}>☕</div>
      {/* Badges */}
      <div className="map-badge" style={{ top:'6%', left:'3%', animationDelay:'0.3s' }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(59,130,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>🎯</div>
        <div><div style={{ fontSize:11, fontWeight:800, color:'#60a5fa', lineHeight:1 }}>Tanlash</div><div style={{ fontSize:9, color:'#64748b' }}>Xaritadan</div></div>
      </div>
      <div className="map-badge" style={{ top:'6%', right:'3%', animationDelay:'0.5s' }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(34,197,94,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>📌</div>
        <div><div style={{ fontSize:11, fontWeight:800, color:'#4ade80', lineHeight:1 }}>Manzil</div><div style={{ fontSize:9, color:'#64748b' }}>Belgilash</div></div>
      </div>
      <div style={{ position:'absolute', inset:'auto 0 0 0', height:80, background:'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );
}

// ── Step 1: Cards visual ──
function VisualStep1() {
  return (
    <div style={{ position:'absolute', inset:0, background:'#08111f', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg,rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize:'30px 30px', opacity:0.7 }} />
      {/* Center card */}
      <div style={{ position:'absolute', top:'12%', left:'50%', transform:'translateX(-50%)', zIndex:10 }}>
        <div className="card-pop" style={{ ...glassDark, borderRadius:16, padding:'12px 16px', minWidth:200, boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:30, height:30, borderRadius:10, background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🏪</div>
            <span style={{ color:'white', fontWeight:700, fontSize:13 }}>Kafe / Restoran</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:6, borderRadius:3, background:'#1e293b', overflow:'hidden' }}>
              <div style={{ height:'100%', width:'70%', borderRadius:3, background:'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:'#60a5fa' }}>70%</span>
          </div>
        </div>
      </div>
      {/* Left card */}
      <div style={{ position:'absolute', top:'46%', left:'4%' }}>
        <div className="card-left" style={{ ...glassDark, borderRadius:14, padding:10, boxShadow:'0 8px 24px rgba(0,0,0,0.35)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:10, background:'rgba(34,197,94,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>💰</div>
            <div><div style={{ color:'#4ade80', fontWeight:800, fontSize:10 }}>Byudjet</div><div style={{ color:'white', fontWeight:700, fontSize:12 }}>$5,000</div></div>
          </div>
        </div>
      </div>
      {/* Right card */}
      <div style={{ position:'absolute', top:'46%', right:'4%' }}>
        <div className="card-right" style={{ ...glassDark, borderRadius:14, padding:10, boxShadow:'0 8px 24px rgba(0,0,0,0.35)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:10, background:'rgba(139,92,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>💡</div>
            <div><div style={{ color:'#a78bfa', fontWeight:800, fontSize:10 }}>G'oya</div><div style={{ color:'white', fontWeight:700, fontSize:12 }}>Kiritish</div></div>
          </div>
        </div>
      </div>
      {/* Bottom mini cards */}
      <div style={{ position:'absolute', bottom:'12%', left:'50%', transform:'translateX(-50%)' }}>
        <div className="card-fade" style={{ display:'flex', gap:10 }}>
          {[{icon:'🏢',label:'Tur'},{icon:'👛',label:'Kapital'},{icon:'✏️',label:'Tavsif'}].map((x,i)=>(
            <div key={i} style={{ ...glassDark, borderRadius:12, padding:'10px 14px', textAlign:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{x.icon}</div>
              <div style={{ fontSize:9, color:'#64748b' }}>{x.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* SVG lines */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.35 }}>
        <line x1="50%" y1="28%" x2="20%" y2="52%" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
        <line x1="50%" y1="28%" x2="80%" y2="52%" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
        <line x1="50%" y1="28%" x2="50%" y2="74%" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
      </svg>
      <div style={{ position:'absolute', inset:'auto 0 0 0', height:80, background:'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );
}

// ── Step 2: Bar chart visual ──
function VisualStep2() {
  const bars = [
    { h: '56%', grad: 'linear-gradient(to top, #1d4ed8, #60a5fa)', label: 'Aholi', delay: '0.1s' },
    { h: '76%', grad: 'linear-gradient(to top, #065f46, #34d399)', label: 'Talab', delay: '0.2s' },
    { h: '44%', grad: 'linear-gradient(to top, #9a3412, #fb923c)', label: 'Raqobat', delay: '0.3s' },
    { h: '86%', grad: 'linear-gradient(to top, #5b21b6, #a78bfa)', label: 'Foyda', delay: '0.4s' },
  ];
  return (
    <div style={{ position:'absolute', inset:0, background:'#08111f', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize:'30px 30px', opacity:0.6 }} />
      {/* Y-axis lines */}
      {[25,50,75].map((p,i)=>(
        <div key={i} style={{ position:'absolute', top:`${p}%`, left:'8%', right:'8%', height:1, background:'rgba(255,255,255,0.05)' }} />
      ))}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'8px 20px 36px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:12, height:'100%' }}>
          {bars.map((b,i)=>(
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', gap:6 }}>
              <div className="bar-grow" style={{ width:'100%', borderRadius:'10px 10px 4px 4px', background:b.grad, height:b.h, animationDelay:b.delay, boxShadow:'0 4px 16px rgba(0,0,0,0.4)' }} />
              <div style={{ color:'#64748b', fontSize:9, textAlign:'center', lineHeight:1.2 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="map-badge" style={{ top:'7%', left:'3%', animationDelay:'0.2s' }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(34,197,94,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>📈</div>
        <div><div style={{ fontSize:11, fontWeight:800, color:'#4ade80', lineHeight:1 }}>+34%</div><div style={{ fontSize:9, color:'#64748b' }}>Daromad</div></div>
      </div>
      <div className="map-badge" style={{ top:'7%', right:'3%', animationDelay:'0.4s' }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(59,130,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>👥</div>
        <div><div style={{ fontSize:11, fontWeight:800, color:'#60a5fa', lineHeight:1 }}>12.4K</div><div style={{ fontSize:9, color:'#64748b' }}>Aholi</div></div>
      </div>
      <div style={{ position:'absolute', inset:'auto 0 0 0', height:70, background:'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );
}

// ── Step 3: Radar visual ──
function VisualStep3() {
  const nodes = [
    { label:'12.4K', sub:'Aholi', color:'#60a5fa', bg:'rgba(59,130,246,0.2)', icon:'👥', pos:{ top:'6%', left:'4%' } },
    { label:'Yuqori', sub:'Ehtiyoj', color:'#a78bfa', bg:'rgba(139,92,246,0.2)', icon:'🛒', pos:{ top:'6%', right:'4%' } },
    { label:'45%', sub:'Raqobat', color:'#fb923c', bg:'rgba(249,115,22,0.2)', icon:'🏆', pos:{ bottom:'20%', left:'2%' } },
    { label:'+34%', sub:'Foyda', color:'#34d399', bg:'rgba(16,185,129,0.2)', icon:'📈', pos:{ bottom:'20%', right:'2%' } },
  ];
  return (
    <div style={{ position:'absolute', inset:0, background:'#08111f', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg,rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize:'30px 30px', opacity:0.5 }} />
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', paddingTop:8 }}>
        <div style={{ position:'relative', width:260, height:230 }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 260 230">
            <circle cx="130" cy="115" r="44" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5"/>
            <circle cx="130" cy="115" r="74" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="130" cy="115" r="104" fill="none" stroke="rgba(16,185,129,0.07)" strokeWidth="1" strokeDasharray="2 6"/>
            <line x1="130" y1="115" x2="62" y2="50" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
            <line x1="130" y1="115" x2="198" y2="55" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
            <line x1="130" y1="115" x2="50" y2="160" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
            <line x1="130" y1="115" x2="208" y2="162" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="conn-draw"/>
            <g style={{ transformOrigin:'130px 115px', animation:'radarSpin 3.5s linear infinite' }}>
              <path d="M130,115 L130,41 A74,74 0 0,1 194,87 Z" fill="rgba(59,130,246,0.08)"/>
            </g>
          </svg>
          {/* Center orb */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, animation:'orbPulse 2.5s ease-in-out infinite', boxShadow:'0 0 24px rgba(59,130,246,0.5)' }}>📊</div>
          </div>
          {/* Corner nodes */}
          {nodes.map((n,i)=>(
            <div key={i} className="node-pop" style={{ ...glassDark, position:'absolute', ...n.pos, padding:'6px 10px', borderRadius:13, animationDelay:`${0.2+i*0.25}s`, boxShadow:'0 4px 16px rgba(0,0,0,0.4)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:8, background:n.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>{n.icon}</div>
                <div>
                  <div style={{ fontSize:11, fontWeight:800, color:n.color, lineHeight:1 }}>{n.label}</div>
                  <div style={{ fontSize:8.5, color:'#64748b', marginTop:1 }}>{n.sub}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom badge */}
          <div className="node-pop" style={{ ...glassDark, position:'absolute', bottom:'-2%', left:'50%', transform:'translateX(-50%)', padding:'6px 14px', borderRadius:12, whiteSpace:'nowrap', animationDelay:'1.2s', boxShadow:'0 4px 16px rgba(0,0,0,0.35)', display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:11 }}>⚖️</span>
            <span style={{ fontSize:10, fontWeight:700, color:'#2dd4bf' }}>Foyda-Zarar</span>
            <span style={{ color:'#4ade80', fontSize:10 }}>✓</span>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', inset:'auto 0 0 0', height:70, background:'linear-gradient(to top, #020617, transparent)' }} />
    </div>
  );
}

const visuals = [VisualStep0, VisualStep1, VisualStep2, VisualStep3];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [done, setDone] = useState(false);
  const current = steps[step];
  const Visual = visuals[step];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setFinishing(true);
      setTimeout(() => { setDone(true); setTimeout(() => router.push('/dashboard'), 900); }, 1300);
    }
  };

  const btnGrad = done || step === steps.length - 1
    ? 'linear-gradient(135deg, #10b981, #059669)'
    : 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
  const btnShadow = done || step === steps.length - 1
    ? '0 8px 32px rgba(16,185,129,0.38)'
    : '0 8px 32px rgba(59,130,246,0.38)';

  return (
    <div style={{ background:'#020617', minHeight:'100vh', color:'white', fontFamily:'Inter, sans-serif', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={{ width:'100%', maxWidth:430, minHeight:'100vh', display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 12px', position:'relative', zIndex:20 }}>
          <button
            onClick={() => step > 0 ? setStep(s=>s-1) : router.back()}
            style={{ ...glassDark, width:40, height:40, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(255,255,255,0.12)', fontSize:16, opacity: step===0 ? 0.35 : 1, transition:'opacity 0.2s', fontFamily:'Inter, sans-serif' }}
          >←</button>

          {/* Progress dots */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {steps.map((_,i)=>(
              <div key={i} style={{ height:8, borderRadius:4, transition:'all 0.35s ease', width: i===step ? 28 : 8, background: i<=step ? '#3b82f6' : '#1e293b' }} />
            ))}
          </div>

          <button
            onClick={()=>setStep(steps.length-1)}
            style={{ ...glassDark, height:36, padding:'0 14px', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(255,255,255,0.1)', fontSize:13, color:'#94a3b8', opacity: step===steps.length-1 ? 0 : 1, pointerEvents: step===steps.length-1 ? 'none' : 'auto', fontFamily:'Inter, sans-serif', transition:'opacity 0.2s' }}
          >O'tkazish</button>
        </div>

        {/* Visual section */}
        <div style={{ position:'relative', width:'100%', height:280, flexShrink:0 }}>
          <Visual />
        </div>

        {/* Content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'8px 20px 24px' }}>
          <div key={step} style={{ marginBottom:14 }}>
            {/* Badge */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:32, height:32, borderRadius:12, background:current.iconBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{current.icon}</div>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:current.badgeColor }}>{current.badge}</span>
            </div>
            {/* Title */}
            <h1 style={{ fontSize:24, fontWeight:900, color:'white', lineHeight:1.25, marginBottom:8, letterSpacing:'-0.3px' }}>
              {current.title}<br />
              <span style={{ background:'linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{current.titleGrad}</span>
            </h1>
            <p style={{ fontSize:13, color:'#94a3b8', lineHeight:1.6 }}>{current.desc}</p>
          </div>

          {/* Cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, flex:1, marginBottom:14 }}>
            {current.cards.map((card: { icon: string; title: string; desc: string; color: string; percent?: number; val?: string }, i) => (
              <div key={`${step}-${i}`} className="card-slide" style={{ ...glassDark, borderRadius:18, padding:'12px 14px', display:'flex', alignItems:'center', gap:12, animationDelay:`${0.08+i*0.12}s`, boxShadow:'0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                <div style={{ width:42, height:42, borderRadius:14, background:`${card.color}1a`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{card.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: card.percent ? 5 : 2 }}>
                    <span style={{ color:'white', fontWeight:700, fontSize:13 }}>{card.title}</span>
                    {card.val && <span style={{ fontSize:10.5, fontWeight:800, color:card.color, background:`${card.color}1a`, padding:'2px 8px', borderRadius:8 }}>{card.val}</span>}
                  </div>
                  {card.percent != null && (
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <div style={{ flex:1, height:5, borderRadius:3, background:'#1e293b', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${card.percent}%`, borderRadius:3, background:card.color, transition:'width 1s ease' }} />
                      </div>
                      <span style={{ fontSize:10, fontWeight:700, color:card.color, minWidth:30 }}>{card.percent}%</span>
                    </div>
                  )}
                  <div style={{ fontSize:11, color:'#64748b', lineHeight:1.4 }}>{card.desc}</div>
                </div>
                {!card.percent && (
                  <div style={{ width:24, height:24, borderRadius:'50%', background:`${card.color}1a`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:card.color, fontSize:12, fontWeight:700 }}>›</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={next}
            style={{ width:'100%', height:56, borderRadius:18, background:btnGrad, boxShadow:btnShadow, color:'white', fontWeight:800, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:10, border:'none', cursor:'pointer', fontFamily:'Inter, sans-serif', transition:'all 0.3s ease', marginTop:'auto' }}
          >
            {finishing ? (
              <span className="dot-loader"><span /><span /><span /></span>
            ) : done ? (
              <><span style={{ fontSize:18 }}>✓</span><span>Tayyor!</span></>
            ) : step === steps.length - 1 ? (
              <><span>Boshlash</span><span style={{ fontSize:18 }}>🚀</span></>
            ) : (
              <><span>Davom etish</span><span style={{ fontSize:16 }}>→</span></>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        /* Pin animations */
        .pin-ring-1 { position:absolute; width:44px; height:44px; border-radius:50%; border:2px solid rgba(59,130,246,0.45); top:-6px; left:-6px; animation:pingRing 2.2s ease-out infinite; }
        .pin-ring-2 { position:absolute; width:62px; height:62px; border-radius:50%; border:1px solid rgba(59,130,246,0.2); top:-15px; left:-15px; animation:pingRing 2.2s ease-out 0.8s infinite; }
        .pin-core { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#3b82f6,#8b5cf6); display:flex; align-items:center; justify-content:center; font-size:14px; position:relative; z-index:10; box-shadow:0 4px 18px rgba(99,102,241,0.55); animation:pinFloat 3s ease-in-out infinite; }
        @keyframes pingRing { 0% { transform:scale(1); opacity:0.8; } 100% { transform:scale(2.4); opacity:0; } }
        @keyframes pinFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }

        .biz-dot { position:absolute; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; border:1.5px solid rgba(255,255,255,0.3); }

        .map-badge { position:absolute; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.07); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.12); border-radius:13px; padding:8px 12px; opacity:0; animation:fadeUp 0.7s ease forwards; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

        /* Step 1 cards */
        .card-pop { animation:popIn 0.5s ease forwards; opacity:0; }
        .card-left { animation:slideFromLeft 0.5s ease 0.3s forwards; opacity:0; }
        .card-right { animation:slideFromRight 0.5s ease 0.3s forwards; opacity:0; }
        .card-fade { animation:fadeUp 0.7s ease 0.5s forwards; opacity:0; }
        @keyframes popIn { 0% { transform:scale(0.7) translateX(-50%); opacity:0; } 70% { transform:scale(1.05) translateX(-50%); opacity:1; } 100% { transform:scale(1) translateX(-50%); opacity:1; } }
        @keyframes slideFromLeft { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideFromRight { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }

        /* SVG line draw */
        .conn-draw { stroke-dasharray:220; stroke-dashoffset:220; animation:drawLine 1.2s ease 0.4s forwards; }
        @keyframes drawLine { to { stroke-dashoffset:0; } }

        /* Bar grow */
        .bar-grow { animation:barUp 0.7s ease forwards; height:0 !important; }
        @keyframes barUp { from { height:0 !important; opacity:0; } to { opacity:1; } }
        /* Override: bars use inline height, so we animate opacity+transform */
        .bar-grow { opacity:0; transform:scaleY(0); transform-origin:bottom; animation:barGrow 0.6s ease forwards; }
        @keyframes barGrow { from { opacity:0; transform:scaleY(0); } to { opacity:1; transform:scaleY(1); } }

        /* Radar */
        @keyframes radarSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes orbPulse { 0%,100% { box-shadow:0 0 24px rgba(59,130,246,0.5); } 50% { box-shadow:0 0 44px rgba(139,92,246,0.7); } }
        .node-pop { animation:nodeAppear 0.5s ease forwards; opacity:0; }
        @keyframes nodeAppear { from { opacity:0; transform:scale(0.6); } to { opacity:1; transform:scale(1); } }

        /* Content cards */
        .card-slide { animation:cardSlide 0.45s ease forwards; opacity:0; }
        @keyframes cardSlide { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }

        /* Dots loader */
        .dot-loader { display:flex; gap:6px; align-items:center; }
        .dot-loader span { width:8px; height:8px; border-radius:50%; background:white; animation:dotB 1.3s ease-in-out infinite; }
        .dot-loader span:nth-child(2) { animation-delay:0.18s; }
        .dot-loader span:nth-child(3) { animation-delay:0.36s; }
        @keyframes dotB { 0%,80%,100% { transform:scale(0.55); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
      `}</style>
    </div>
  );
}
