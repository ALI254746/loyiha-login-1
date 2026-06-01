# Capacitor JS — Native Funksiyalar Skill

Bu skill Next.js/React ilovangizni Capacitor JS orqali iOS va Android native ilovaga aylantirish va native funksiyalarni (Kamera, GPS, Bildirishnomalar va boshqalar) ulash bo'yicha to'liq qo'llanma.

## O'rnatish

```bash
# 1. Capacitor o'rnatish
npm install @capacitor/core @capacitor/cli

# 2. Capacitor initsializatsiya
npx cap init [AppName] [com.yourcompany.appname] --web-dir=out

# 3. Platform qo'shish
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

# 4. Next.js uchun static export sozlash
# next.config.js da:
# output: 'export'
```

---

## 📷 KAMERA

### O'rnatish
```bash
npm install @capacitor/camera
npx cap sync
```

### Ishlatish
```ts
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// Kameradan rasm olish
const takePhoto = async () => {
  const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera, // yoki CameraSource.Photos (galereyadan)
  });
  console.log(photo.webPath); // rasm URL si
};

// Galereyadan tanlash
const pickFromGallery = async () => {
  const photo = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos,
  });
  const imageData = `data:image/jpeg;base64,${photo.base64String}`;
};
```

### Android ruxsatlar (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

---

## 📍 GPS / GEOLOCATION

### O'rnatish
```bash
npm install @capacitor/geolocation
npx cap sync
```

### Ishlatish
```ts
import { Geolocation } from '@capacitor/geolocation';

// Bir martalik joylashuv
const getLocation = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000,
  });
  const { latitude, longitude } = position.coords;
  console.log(latitude, longitude);
};

// Joylashuvni doimiy kuzatish
const watchId = await Geolocation.watchPosition(
  { enableHighAccuracy: true },
  (position, err) => {
    if (err) return;
    console.log(position?.coords.latitude);
  }
);

// Kuzatishni to'xtatish
await Geolocation.clearWatch({ id: watchId });

// Ruxsat so'rash
const checkPermission = async () => {
  const perm = await Geolocation.checkPermissions();
  if (perm.location !== 'granted') {
    await Geolocation.requestPermissions();
  }
};
```

### Android ruxsatlar
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

---

## 🔔 PUSH BILDIRISHNOMALAR (Local)

### O'rnatish
```bash
npm install @capacitor/local-notifications
npx cap sync
```

### Ishlatish
```ts
import { LocalNotifications } from '@capacitor/local-notifications';

// Ruxsat so'rash
await LocalNotifications.requestPermissions();

// Darhol bildirishnoma yuborish
await LocalNotifications.schedule({
  notifications: [
    {
      title: 'BizPlan Map',
      body: 'Tahlil tayyor!',
      id: 1,
      sound: 'default',
      smallIcon: 'ic_stat_icon_config_sample',
    }
  ]
});

// Vaqtlangan bildirishnoma (5 daqiqadan keyin)
await LocalNotifications.schedule({
  notifications: [
    {
      title: 'Eslatma',
      body: 'Biznes rejangizni ko\'rib chiqing',
      id: 2,
      schedule: { at: new Date(Date.now() + 5 * 60 * 1000) },
    }
  ]
});
```

---

## 🔔 PUSH BILDIRISHNOMALAR (Firebase FCM)

### O'rnatish
```bash
npm install @capacitor/push-notifications
npx cap sync
```

### Ishlatish
```ts
import { PushNotifications } from '@capacitor/push-notifications';

const initPush = async () => {
  // Ruxsat so'rash
  const result = await PushNotifications.requestPermissions();
  if (result.receive === 'granted') {
    await PushNotifications.register();
  }
};

// FCM token olish
PushNotifications.addListener('registration', (token) => {
  console.log('FCM Token:', token.value);
  // Bu tokenni serveringizga yuboring
});

// Xabar kelganda
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Xabar:', notification.title, notification.body);
});

// Foydalanuvchi bildirishnomaga bosdi
PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
  console.log('Bosildi:', action.notification.data);
});
```

---

## 📱 BOSHQA FOYDALI NATIVE PLUGINLAR

### Clipboard (Nusxalash)
```bash
npm install @capacitor/clipboard
```
```ts
import { Clipboard } from '@capacitor/clipboard';
await Clipboard.write({ string: 'Nusxalangan matn' });
const { type, value } = await Clipboard.read();
```

### Share (Ulashish)
```bash
npm install @capacitor/share
```
```ts
import { Share } from '@capacitor/share';
await Share.share({
  title: 'BizPlan Map',
  text: 'Mening biznes tahlilimni ko\'ring!',
  url: 'https://bizplanmap.app',
  dialogTitle: 'Ulashish',
});
```

### Haptics (Tebranish)
```bash
npm install @capacitor/haptics
```
```ts
import { Haptics, ImpactStyle } from '@capacitor/haptics';
await Haptics.impact({ style: ImpactStyle.Medium });
await Haptics.vibrate(); // oddiy tebranish
```

### Device Info
```bash
npm install @capacitor/device
```
```ts
import { Device } from '@capacitor/device';
const info = await Device.getInfo();
console.log(info.platform); // 'ios' | 'android' | 'web'
console.log(info.model);    // 'iPhone 14'
```

### Storage (Ma'lumot saqlash)
```bash
npm install @capacitor/preferences
```
```ts
import { Preferences } from '@capacitor/preferences';
await Preferences.set({ key: 'user', value: JSON.stringify({ name: 'Ali' }) });
const { value } = await Preferences.get({ key: 'user' });
await Preferences.remove({ key: 'user' });
```

### Network (Internet holati)
```bash
npm install @capacitor/network
```
```ts
import { Network } from '@capacitor/network';
const status = await Network.getStatus();
console.log(status.connected); // true/false
console.log(status.connectionType); // 'wifi' | 'cellular' | 'none'

Network.addListener('networkStatusChange', (status) => {
  console.log('Internet holati o\'zgardi:', status.connected);
});
```

---

## ⚡ BUILD VA DEPLOY

```bash
# Web build
next build   # (output: 'export' bo'lishi kerak)

# Capacitor sync
npx cap sync

# Android (Android Studio kerak)
npx cap open android

# iOS (Xcode + Mac kerak)
npx cap open ios

# Live reload (development uchun)
npx cap run android --livereload --external
npx cap run ios --livereload --external
```

## capacitor.config.ts namunasi
```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bizplanmap.app',
  appName: 'BizPlan Map',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
```

---

## Muhim eslatmalar

- Har qanday native plugin qo'shgandan so'ng **`npx cap sync`** ishlatish SHART
- iOS da `Info.plist` ga ruxsat tavsiflarini qo'shing (kamera, GPS uchun)
- Android da `AndroidManifest.xml` ruxsatlarni tekshiring
- Web brauzerda native API ishlamaydi — faqat `Capacitor.isNativePlatform()` true bo'lganda chaqiring

$ARGUMENTS
