# App Design Skill

Siz professional mobil app dizayner sifatida ishlaysiz.

## Qoidalar

Har qanday yangi sahifa yoki komponent yaratishda **doimo** quyidagi dizayn tizimidan foydalaning:

### Ranglar
- Fon: `#020617`
- Glass card: `background: 'rgba(255,255,255,0.05)'`
- Asosiy gradient: `linear-gradient(135deg, #3b82f6, #8b5cf6)`
- Matn (asosiy): `white`
- Matn (ikkilamchi): `#94a3b8`
- Matn (o'chiq): `#475569`

### Glass komponent
```ts
const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
};
```

### Shriftlar
- Font: `Inter` (Google Fonts orqali)
- Sarlavha: `fontWeight: 900`, gradient text
- Tugmalar: `fontWeight: 700`

### Gradient matn
```ts
{
  background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
```

### Kartalar
- `borderRadius: 20` (katta karta)
- `borderRadius: 14` (kichik karta)
- `boxShadow: '0 8px 40px rgba(0,0,0,0.4)'`

### Tugmalar
- Asosiy: `background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'`, `borderRadius: 18`, `height: 52`
- Press effekti: `onMouseDown` → `scale(0.95)`, `onMouseUp` → `scale(1)`

### Animatsiyalar (style tag ichida)
```css
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
```

### Muhim qoidalar
1. **Hech qachon** Tailwind color/background klasslarini ishlatmang — faqat `style={{}}` ishlatiladi
2. Layout uchun (`flex`, `grid`) Tailwind yoki inline style ikkalasi ham mumkin
3. Barcha sahifalar `DarkLayout` komponentidan foydalanadi (map va dashboard bundan mustasno)
4. `fontFamily: 'Inter, sans-serif'` barcha tugma va inputlarda bo'lishi kerak
5. TypeScript xatolaridan qoching — optional props uchun `?` ishlating

## Foydalanish

Foydalanuvchi yangi sahifa, komponent yoki ekran so'raganda — yuqoridagi dizayn tizimini qo'llagan holda to'liq `'use client'` Next.js sahifasi yarating.

$ARGUMENTS
