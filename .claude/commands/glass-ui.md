# Glassmorphism & Premium UI Skill

Siz Premium Mobile UI/UX bo'yicha mutaxassisiz. Kod yozganda quyidagi vizual standartlarga amal qiling.

---

## 🪟 1. GLASSMORPHISM QOIDALARI

### Light Mode Glass
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); /* Safari / iOS WebView uchun MAJBURIY */
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}
```

### Dark Mode Glass
```css
.dark .glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### Glass Tugma (Kristall effekt)
```css
.glass-button {
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.2s ease-in-out;
}
.glass-button:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 0.3);
}
```

### Inline Style (React/Next.js uchun)
```tsx
// Glass karta
const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.45)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
  borderRadius: 20,
};

// Dark glass karta
const glassDark: React.CSSProperties = {
  background: 'rgba(15, 23, 42, 0.6)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 20,
};
```

---

## 🎨 2. RANG PALITRASI — 3 PROFESSIONAL STIL

### 🔵 iOS Neon Clean
**Ishlatilishi:** Premium tizimlar, ta'lim, sog'liqni saqlash

| Element | Qiymat |
|---------|--------|
| Primary | `#007AFF` (Apple Blue) |
| Background | `from-gray-50 via-blue-50/30 to-white` |
| Accent | `#34C759` (Apple Green) |
| Text | `#1C1C1E` |

```tsx
// Fon
background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #ffffff 100%)'

// Asosiy tugma
background: 'linear-gradient(135deg, #007AFF, #0055D4)'
boxShadow: '0 8px 24px rgba(0,122,255,0.35)'

// Glass karta
background: 'rgba(255,255,255,0.7)'
backdropFilter: 'blur(20px)'
border: '1px solid rgba(0,122,255,0.12)'
```

---

### 🟣 Cyber / Cyberpunk (Dark)
**Ishlatilishi:** Gaming, xavfsizlik, to'q rejim ilovalari

| Element | Qiymat |
|---------|--------|
| Primary | `#8B5CF6` (Purple) |
| Background | `#020617` → `#0f0a1e` |
| Neon Accent | `#06B6D4` (Cyan) |
| Glow | `rgba(139,92,246,0.4)` |

```tsx
// Fon
background: 'linear-gradient(135deg, #020617 0%, #0d0a1e 50%, #020617 100%)'

// Neon tugma
background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)'
boxShadow: '0 0 20px rgba(139,92,246,0.5), 0 8px 32px rgba(0,0,0,0.4)'

// Glass karta
background: 'rgba(139,92,246,0.08)'
backdropFilter: 'blur(20px)'
border: '1px solid rgba(139,92,246,0.2)'
```

---

### 🟢 Fintech Emerald
**Ishlatilishi:** Moliya, hamyon, biznes ilovalari

| Element | Qiymat |
|---------|--------|
| Primary | `#059669` (Emerald) |
| Background | `from-zinc-50 via-emerald-50/20 to-white` |
| Gold Accent | `#F59E0B` |
| Success | `#10B981` |

```tsx
// Fon
background: 'linear-gradient(135deg, #fafafa 0%, #ecfdf5 40%, #f0fdf4 100%)'

// Asosiy tugma
background: 'linear-gradient(135deg, #059669, #047857)'
boxShadow: '0 8px 24px rgba(5,150,105,0.3)'

// Glass karta
background: 'rgba(5,150,105,0.06)'
backdropFilter: 'blur(16px)'
border: '1px solid rgba(5,150,105,0.15)'
```

---

## ✨ 3. UX SILLIQLIK QOIDALARI

### Bosganda ezilish (Press feedback)
```tsx
// Tailwind
className="active:scale-95 transition-all duration-200"

// Inline (React)
onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.95)')}
onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
```

### Hover effekti
```tsx
// Tailwind
className="hover:scale-[1.02] transition-transform duration-200"

// CSS
transition: 'transform 0.18s ease, box-shadow 0.18s ease'
```

### Soya va chuqurlik (Depth)
```tsx
// Kichik element
boxShadow: '0 2px 8px rgba(0,0,0,0.08)'

// Karta
boxShadow: '0 8px 32px rgba(0,0,0,0.12)'

// Modal / floating
boxShadow: '0 24px 64px rgba(0,0,0,0.2)'

// Neon glow
boxShadow: '0 0 20px rgba(99,102,241,0.4), 0 8px 32px rgba(0,0,0,0.3)'
```

---

## 📐 4. BORDER RADIUS STANDARTLARI

```
Tugma (kichik):  borderRadius: 12
Tugma (katta):   borderRadius: 18
Karta:           borderRadius: 20
Katta karta:     borderRadius: 24
Modal:           borderRadius: 28
Bottom sheet:    borderRadius: '24px 24px 0 0'
Chip/Badge:      borderRadius: 999 (pill)
Avatar:          borderRadius: 16 yoki '50%'
```

---

## 🔠 5. TIPOGRAFIYA STANDARTLARI

```tsx
// Sarlavha (H1)
fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1.1

// Sarlavha (H2)
fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px'

// Karta sarlavha
fontSize: 16, fontWeight: 700

// Body matn
fontSize: 14, fontWeight: 400, lineHeight: 1.6

// Kichik label
fontSize: 11, fontWeight: 600, letterSpacing: '0.02em'

// Gradient sarlavha
background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)'
WebkitBackgroundClip: 'text'
WebkitTextFillColor: 'transparent'
backgroundClip: 'text'
```

---

## 📱 6. MOBIL UI STANDARTLARI

```
Ekran kenglik (max):  430px
Tepa padding:         52px (status bar uchun)
Yon padding:          20px
Bottom nav balandlik: 84px (24px + nav)
Karta oraliq (gap):   12–16px
Tugma balandlik:      52–56px
Input balandlik:      48px
```

---

## 🚀 7. globals.css GA QO'SHISH

```css
/* global.css yoki app/globals.css */

/* iOS Safari uchun shaffoflik optimallashtirish */
.glass-panel {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

.dark .glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.glass-button {
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.2s ease-in-out;
}

.glass-button:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 0.3);
}

/* Scrollbar yashirish */
* { -ms-overflow-style: none; scrollbar-width: none; }
*::-webkit-scrollbar { display: none; }

/* iOS tap highlight o'chirish */
* { -webkit-tap-highlight-color: transparent; }

/* Matn tanlashni o'chirish (ilovalar uchun) */
.no-select { -webkit-user-select: none; user-select: none; }
```

---

## Muhim eslatmalar
- `-webkit-backdrop-filter` **MAJBURIY** — iOS Safari va Capacitor WebView da ishlamaydi
- `active:scale-95` — faqat CSS, React da `onMouseDown/onTouchStart` ishlatiladi
- Gradient orqa fon bo'lmasa glassmorphism ko'rinmaydi
- `overflow: hidden` — glass elementni container ichida saqlaydi

$ARGUMENTS
