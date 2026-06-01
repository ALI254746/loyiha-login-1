# PWA — Telefoniga O'rnatiladigan Ilova Skill

Bu skill Next.js ilovangizni Progressive Web App (PWA) ga aylantirish — telefon ekraniga o'rnatish, offline ishlash va native ilova ko'rinishini berish bo'yicha to'liq qo'llanma.

## O'rnatish (Next.js uchun)
```bash
npm install next-pwa
# yoki
npm install @ducanh2912/next-pwa
```

---

## ⚡ TEZKOR SOZLASH

### 1. next.config.js
```js
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // sizning sozlamalaringiz
};

module.exports = withPWA(nextConfig);
```

### 2. public/manifest.json
```json
{
  "name": "BizPlan Map",
  "short_name": "BizPlan",
  "description": "Biznes joylashuvini tahlil qiling",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#3b82f6",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["business", "finance"],
  "screenshots": [
    {
      "src": "/screenshots/mobile.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### 3. app/layout.tsx — head teglar
```tsx
export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BizPlan Map',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        {/* iOS uchun */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BizPlan Map" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Splash screen iOS */}
        <link rel="apple-touch-startup-image" href="/splash.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎨 IKONKALAR YARATISH

### Avtomatik ikonka generatsiya
```bash
# Bitta 512x512 rasm bo'lsa, qolganlarini generatsiya qiladi
npx pwa-asset-generator logo.png public/icons \
  --background "#020617" \
  --padding "15%" \
  --manifest public/manifest.json \
  --index app/layout.tsx
```

### Yoki online tool
- **realfavicongenerator.net** — barcha o'lchamdagi ikonkalarni yaratadi
- **maskable.app** — maskable icon tekshirish va yaratish

---

## 📱 O'RNATISH PROMPTI (Install Banner)

```tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowBanner(false);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed', bottom: 90, left: 20, right: 20, zIndex: 100,
            background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20,
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <div style={{ fontSize: 36 }}>📱</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Ilovani o'rnating</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Telefon ekraniga qo'shing</div>
          </div>
          <button
            onClick={handleInstall}
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
          >O'rnatish</button>
          <button
            onClick={() => setShowBanner(false)}
            style={{ background: 'none', border: 'none', color: '#475569', fontSize: 20, cursor: 'pointer', padding: 4 }}
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 🔌 OFFLINE SAHIFA

### public/offline.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Offline — BizPlan Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { background: #020617; color: white; font-family: Inter, sans-serif;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; text-align: center; padding: 20px; }
    h1 { font-size: 24px; margin-bottom: 12px; }
    p { color: #64748b; font-size: 14px; }
    .icon { font-size: 64px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div>
    <div class="icon">📡</div>
    <h1>Internet aloqasi yo'q</h1>
    <p>Internetga ulaning va qayta urinib ko'ring</p>
  </div>
</body>
</html>
```

---

## ✅ PWA TEKSHIRISH

```bash
# Production build
next build && next start

# Chrome DevTools:
# → Application tab → Manifest (xatolarni tekshiring)
# → Application tab → Service Workers
# → Lighthouse → Progressive Web App audit
```

### Lighthouse PWA cheklistи
- [ ] manifest.json mavjud
- [ ] 192x192 va 512x512 ikonkalar bor
- [ ] HTTPS (yoki localhost)
- [ ] Service worker ishlayapti
- [ ] Offline sahifa bor
- [ ] theme-color set qilingan
- [ ] start_url mavjud

---

## 📋 CACHE STRATEGIYASI

```js
// next.config.js workboxOptions ichida
workboxOptions: {
  runtimeCaching: [
    // Rasm kesh
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 kun
      },
    },
    // API kesh
    {
      urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 }, // 1 soat
      },
    },
  ],
}
```

---

## Muhim eslatmalar
- PWA faqat **HTTPS** da ishlaydi (yoki localhost da)
- `display: "standalone"` — status bar ko'rinmaydi, native ilova kabi
- iOS Safari da `beforeinstallprompt` event yo'q — qo'lda ko'rsatish kerak
- `maskable` ikonka — Android da dumaloq yoki kvadrat shaklda to'g'ri ko'rinadi

$ARGUMENTS
