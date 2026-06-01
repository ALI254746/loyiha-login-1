# Shadcn/UI — Professional Komponentlar Skill

Bu skill Shadcn/UI komponentlarini Next.js (App Router) loyihangizga qo'shish va dark glassmorphism dizayn tizimiga moslashtirish bo'yicha to'liq qo'llanma.

## O'rnatish
```bash
# Shadcn UI initsializatsiya
npx shadcn@latest init

# Sozlamalar:
# ✔ Style: Default
# ✔ Base color: Slate
# ✔ CSS variables: Yes
```

---

## ⚡ KOMPONENTLAR QO'SHISH

```bash
# Bitta komponent
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input

# Bir nechta bir vaqtda
npx shadcn@latest add button card dialog input sheet tabs

# Barcha komponentlar
npx shadcn@latest add --all
```

---

## 🎨 DARK GLASSMORPHISM UCHUN SOZLASH

### globals.css (dark theme CSS variables)
```css
@layer base {
  :root {
    --background: 222 47% 4%;
    --foreground: 210 40% 98%;
    --card: 222 47% 6%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 6%;
    --popover-foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 222 47% 4%;
    --secondary: 217 32% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 32% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 217 32% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62% 30%;
    --destructive-foreground: 210 40% 98%;
    --border: 217 32% 14%;
    --input: 217 32% 14%;
    --ring: 224 76% 48%;
    --radius: 0.75rem;
  }
}
```

---

## 📦 ASOSIY KOMPONENTLAR

### Button
```tsx
import { Button } from "@/components/ui/button"

// Variantlar
<Button>Default</Button>
<Button variant="destructive">O'chirish</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// O'lchamlar
<Button size="sm">Kichik</Button>
<Button size="lg">Katta</Button>
<Button size="icon"><Icon /></Button>

// Loading holat
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Yuklanmoqda...
</Button>
```

### Card
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card className="bg-white/5 border-white/10 backdrop-blur-xl">
  <CardHeader>
    <CardTitle className="text-white">Sarlavha</CardTitle>
    <CardDescription className="text-slate-400">Tavsif</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-white">Kontent</p>
  </CardContent>
  <CardFooter>
    <Button>Tasdiqlash</Button>
  </CardFooter>
</Card>
```

### Dialog (Modal)
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Ochish</Button>
  </DialogTrigger>
  <DialogContent className="bg-slate-900 border-white/10 text-white">
    <DialogHeader>
      <DialogTitle>Modal sarlavha</DialogTitle>
      <DialogDescription className="text-slate-400">Tavsif matni</DialogDescription>
    </DialogHeader>
    <p>Kontent</p>
  </DialogContent>
</Dialog>
```

### Sheet (Bottom Sheet — iOS style)
```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button>Ochish</Button>
  </SheetTrigger>
  <SheetContent
    side="bottom"  // 'top' | 'left' | 'right' | 'bottom'
    className="bg-slate-900 border-white/10"
  >
    <SheetHeader>
      <SheetTitle className="text-white">Sarlavha</SheetTitle>
      <SheetDescription className="text-slate-400">Tavsif</SheetDescription>
    </SheetHeader>
    {/* Kontent */}
  </SheetContent>
</Sheet>
```

### Input
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email" className="text-slate-300">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="email@example.com"
    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
  />
</div>
```

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="map">
  <TabsList className="bg-white/5 border border-white/10">
    <TabsTrigger value="map" className="data-[state=active]:bg-blue-600 text-slate-400 data-[state=active]:text-white">
      🗺️ Xarita
    </TabsTrigger>
    <TabsTrigger value="results" className="data-[state=active]:bg-blue-600 text-slate-400 data-[state=active]:text-white">
      📊 Natijalar
    </TabsTrigger>
  </TabsList>
  <TabsContent value="map">Xarita kontent</TabsContent>
  <TabsContent value="results">Natijalar kontent</TabsContent>
</Tabs>
```

### Select (Dropdown)
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select onValueChange={(val) => console.log(val)}>
  <SelectTrigger className="bg-white/5 border-white/10 text-white">
    <SelectValue placeholder="Tanlang..." />
  </SelectTrigger>
  <SelectContent className="bg-slate-900 border-white/10">
    <SelectItem value="restoran" className="text-white focus:bg-blue-600/20">🍽️ Restoran</SelectItem>
    <SelectItem value="cafe" className="text-white focus:bg-blue-600/20">☕ Kafe</SelectItem>
    <SelectItem value="dokon" className="text-white focus:bg-blue-600/20">🛍️ Do'kon</SelectItem>
  </SelectContent>
</Select>
```

### Toast (Bildirishnoma)
```bash
npx shadcn@latest add sonner
```
```tsx
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

// layout.tsx da:
<Toaster theme="dark" richColors />

// Ishlatish:
toast.success("Tahlil tugadi! ✅")
toast.error("Xatolik yuz berdi")
toast.info("Yangi ma'lumot mavjud")
toast.loading("Yuklanmoqda...")
toast.promise(fetchData(), {
  loading: 'Yuklanmoqda...',
  success: 'Muvaffaqiyatli!',
  error: 'Xatolik',
})
```

### Slider
```tsx
import { Slider } from "@/components/ui/slider"

<Slider
  defaultValue={[10000]}
  min={1000}
  max={500000}
  step={1000}
  onValueChange={([val]) => setBudget(val)}
  className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400"
/>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Danger</Badge>
<Badge variant="outline">Outline</Badge>

// Custom rang
<Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Yuqori talab</Badge>
<Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ Tayyor</Badge>
```

### Progress
```tsx
import { Progress } from "@/components/ui/progress"

<Progress
  value={78}
  className="bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500"
/>
```

### Avatar
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Ali" />
  <AvatarFallback className="bg-blue-600 text-white">AY</AvatarFallback>
</Avatar>
```

### Switch (Toggle)
```tsx
import { Switch } from "@/components/ui/switch"

<div className="flex items-center gap-3">
  <Label htmlFor="notifications" className="text-white">Bildirishnomalar</Label>
  <Switch
    id="notifications"
    checked={enabled}
    onCheckedChange={setEnabled}
    className="data-[state=checked]:bg-blue-500"
  />
</div>
```

---

## 🎨 DARK GLASSMORPHISM CLASS KOMBINATSIYALARI

```tsx
// Glass karta
className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl"

// Asosiy tugma
className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"

// Ghost tugma
className="bg-white/5 border border-white/10 text-white hover:bg-white/10"

// Input
className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"

// Gradient matn
className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
```

---

## Muhim eslatmalar
- `cn()` utility — className birlashtirish uchun (`@/lib/utils` da)
- `asChild` prop — tugma boshqa element bo'lishi uchun
- `className` orqali istalgan komponentni qayta uslublash mumkin
- Server component ichida ham ishlaydi (state yo'q komponentlar)

$ARGUMENTS
