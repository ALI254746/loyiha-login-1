# Framer Motion — iPhone-dek Silliq Animatsiyalar Skill

Bu skill React/Next.js ilovangizga iPhone ilovalaridek silliq, professional animatsiyalar qo'shish uchun to'liq qo'llanma.

## O'rnatish
```bash
npm install framer-motion
```

---

## ⚡ ASOSIY TUSHUNCHALAR

### motion komponent
```tsx
import { motion } from 'framer-motion';

// Oddiy div o'rniga motion.div
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  Salom!
</motion.div>
```

### Asosiy proplar
| Prop | Ma'no |
|------|-------|
| `initial` | Boshlang'ich holat |
| `animate` | Animatsiya holati |
| `exit` | Chiqish holati |
| `transition` | Vaqt va easing |
| `whileHover` | Hover paytida |
| `whileTap` | Bosilganda (mobile touch) |
| `whileInView` | Ko'rinishga kirganda |

---

## 📱 IPHONE-DEK ANIMATSIYALAR

### 1. Sahifa kirish animatsiyasi (page transition)
```tsx
const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function Page() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* sahifa kontenti */}
    </motion.div>
  );
}
```

### 2. Kartalar ro'yxat animatsiyasi (stagger)
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300 } }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      {/* karta */}
    </motion.div>
  ))}
</motion.div>
```

### 3. Tugma press effekti (iPhone tap feel)
```tsx
<motion.button
  whileTap={{ scale: 0.94 }}
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Bosing
</motion.button>
```

### 4. Bottom sheet (iOS style)
```tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0f172a', borderRadius: '24px 24px 0 0', padding: 24 }}
    >
      {/* bottom sheet kontenti */}
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Fade + scale modal
```tsx
<AnimatePresence>
  {showModal && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)' }}
        onClick={() => setShowModal(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#1e293b', borderRadius: 24, padding: 24 }}
      >
        {/* modal kontenti */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 🎯 SPRING ANIMATSIYALAR (Natural harakat)

```tsx
// Spring — iPhone kabi elastik
transition={{ type: 'spring', stiffness: 300, damping: 20 }}

// Tez spring
transition={{ type: 'spring', stiffness: 500, damping: 30 }}

// Sekin va silliq
transition={{ type: 'spring', stiffness: 150, damping: 25 }}

// Easing curve — iOS default
transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}

// Bounce
transition={{ type: 'spring', stiffness: 400, damping: 10 }}
```

---

## 🔢 COUNTER ANIMATSIYA
```tsx
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

function CountUp({ from = 0, to }: { from?: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, v => Math.round(v));

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: 'easeOut' });
    return controls.stop;
  }, [to]);

  return <motion.span>{rounded}</motion.span>;
}

// Ishlatish
<CountUp to={78} />  // 0 dan 78 gacha animatsiya
```

---

## 📊 PROGRESS BAR ANIMATSIYA
```tsx
<div style={{ width: '100%', height: 8, background: '#1e293b', borderRadius: 4 }}>
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${score}%` }}
    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
    style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 4 }}
  />
</div>
```

---

## 🃏 DRAG & SWIPE (Karta suring)
```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    if (info.offset.x < -80) {
      // chapga surgan — o'chirish
    } else if (info.offset.x > 80) {
      // o'ngga surgan — saqlash
    }
  }}
>
  Suring →
</motion.div>
```

---

## 🌊 LAYOUT ANIMATSIYA
```tsx
// Element o'lchami o'zgarganda silliq animatsiya
<motion.div layout>
  {isExpanded && <p>Qo'shimcha matn</p>}
</motion.div>

// Ro'yxat o'zgarganda
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {item.name}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## 🎨 SCROLL ANIMATSIYALAR
```tsx
// Ko'rinishga kirganda animatsiya
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Scroll qiling
</motion.div>

// Scroll progress
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
```

---

## 💡 PROFESSIONAL EASING QIYMATLARI

```ts
// iOS Spring
[0.25, 0.46, 0.45, 0.94]

// Material Design
[0.4, 0.0, 0.2, 1]

// Snap (tez kirish, sekin chiqish)
[0.16, 1, 0.3, 1]

// Bounce
[0.34, 1.56, 0.64, 1]
```

## Muhim eslatmalar
- `AnimatePresence` — exit animatsiyasi ishlashi uchun shart
- `layout` prop — o'lcham/joy o'zgarishlarini silliq qiladi
- `type: 'spring'` — eng natural harakat beradi
- Server component ichida ishlamaydi — `'use client'` kerak

$ARGUMENTS
