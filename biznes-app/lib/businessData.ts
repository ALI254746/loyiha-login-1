export interface LocationData {
  name: string;
  population: number;
  populationGrowth: number; // % per year
  avgIncome: number; // monthly USD
  topBusinesses: string[];
  demandTrends: { category: string; score: number }[];
  competitorDensity: number; // 1-10
  footTraffic: number; // 1-10
  nearbyBusinesses: NearbyBusiness[];
  infrastructure: string[];
  risks: string[];
  opportunities: string[];
}

export interface NearbyBusiness {
  name: string;
  type: string;
  impact: 'positive' | 'negative' | 'neutral';
  distance: number; // meters
  description: string;
}

export interface BusinessAnalysis {
  businessType: string;
  budget: number;
  location: { lat: number; lng: number; name: string };
  score: number; // 0-100
  profitability: number; // months to break even
  monthlyRevenue: [number, number]; // min-max
  startupCosts: { item: string; cost: number }[];
  pros: string[];
  cons: string[];
  steps: { step: number; title: string; description: string; duration: string }[];
  marketInsights: { label: string; value: number; color: string }[];
  populationData: { year: string; population: number }[];
  revenueProjection: { month: string; revenue: number; expenses: number }[];
  competitors: NearbyBusiness[];
  recommendation: string;
  riskLevel: 'low' | 'medium' | 'high';
  tags: string[];
}

const uzbekistanLocations: Record<string, LocationData> = {
  tashkent: {
    name: "Toshkent",
    population: 3000000,
    populationGrowth: 2.8,
    avgIncome: 450,
    topBusinesses: ["Restoran", "IT xizmatlari", "Kiyim do'koni", "Farmatsevtika", "Qurilish"],
    demandTrends: [
      { category: "Oziq-ovqat", score: 92 },
      { category: "IT & Tech", score: 88 },
      { category: "Sog'liqni saqlash", score: 85 },
      { category: "Ta'lim", score: 82 },
      { category: "Kiyim-kechak", score: 78 },
    ],
    competitorDensity: 8,
    footTraffic: 9,
    nearbyBusinesses: [
      { name: "Korzinka supermarket", type: "Supermarket", impact: "negative", distance: 300, description: "Katta raqobatchi - narxlar past" },
      { name: "Макro", type: "Supermarket", impact: "negative", distance: 800, description: "Yirik savdo markazi" },
      { name: "Chilonzor Metro", type: "Transport", impact: "positive", distance: 200, description: "Kuniga 15,000+ odam o'tadi" },
      { name: "Maktab №45", type: "Ta'lim", impact: "positive", distance: 400, description: "1,200 o'quvchi - potensial mijozlar" },
    ],
    infrastructure: ["Metro", "Keng yo'llar", "Internet tezligi yuqori", "Bank xizmatlari"],
    risks: ["Yuqori ijara narxi", "Kuchli raqobat", "Soliq nazorati"],
    opportunities: ["Ko'p aholi", "Yosh auditoriya", "Online savdo o'sishi"]
  },
  samarkand: {
    name: "Samarqand",
    population: 600000,
    populationGrowth: 3.2,
    avgIncome: 320,
    topBusinesses: ["Turizm", "Restoran", "Suvenir", "Mehmonxona", "Transport"],
    demandTrends: [
      { category: "Turizm", score: 95 },
      { category: "Oziq-ovqat", score: 88 },
      { category: "Suvenir", score: 85 },
      { category: "Mehmonxona", score: 82 },
      { category: "Transport", score: 75 },
    ],
    competitorDensity: 6,
    footTraffic: 8,
    nearbyBusinesses: [
      { name: "Registon maydoni", type: "Turistik joy", impact: "positive", distance: 500, description: "Yiliga 2M+ turist keladi" },
      { name: "Afrosiyob muzey", type: "Muzey", impact: "positive", distance: 800, description: "Ko'p turistlar keladi" },
    ],
    infrastructure: ["Tezyurar poyezd", "Xalqaro aeroport", "Turizm infratuzilmasi"],
    risks: ["Mavsum bog'liq daromad", "Ko'p raqobatchilar turistik zonada"],
    opportunities: ["Turizm o'sishi", "Xalqaro mehmonlar", "Premium xizmatlar talabi"]
  },
  fergana: {
    name: "Farg'ona",
    population: 380000,
    populationGrowth: 2.5,
    avgIncome: 280,
    topBusinesses: ["Ipak mahsulotlari", "Qishloq xo'jaligi", "Tikuvchilik", "Oziq-ovqat", "Qurilish"],
    demandTrends: [
      { category: "Kiyim ishlab chiqarish", score: 90 },
      { category: "Oziq-ovqat", score: 85 },
      { category: "Qishloq xo'jaligi", score: 88 },
      { category: "Eksport", score: 72 },
      { category: "Ta'lim", score: 70 },
    ],
    competitorDensity: 5,
    footTraffic: 7,
    nearbyBusinesses: [
      { name: "Farg'ona to'qimachilik", type: "Zavod", impact: "positive", distance: 1200, description: "Ishchilar auditoriyasi" },
      { name: "Bozor", type: "Bozor", impact: "negative", distance: 300, description: "Arzon narxli raqobat" },
    ],
    infrastructure: ["Sanoat zonalari", "Yaxshi yo'llar", "Eksport imkoniyatlari"],
    risks: ["Past daromad darajasi", "Cheklangan investitsiya"],
    opportunities: ["Arzon ishchi kuchi", "Ipak yo'li lokatsiya", "Ishlab chiqarish imkoniyati"]
  }
};

const businessTemplates: Record<string, Partial<BusinessAnalysis>> = {
  restoran: {
    businessType: "Restoran",
    pros: [
      "Oziq-ovqat har doim talab yuqori",
      "Tez daromad olish imkoniyati",
      "Brendni rivojlantirish mumkin",
      "Yetkazib berish xizmati qo'shish mumkin",
      "Mahalliy mahsulotlardan foydalanish"
    ],
    cons: [
      "Yuqori ishchi kuchi xarajatlari",
      "Mahsulot tez buzilishi",
      "Sanitariya nazorati qat'iy",
      "Raqobat juda ko'p",
      "Ish vaqti uzun"
    ],
    steps: [
      { step: 1, title: "Ruxsatnomalar olish", description: "SES, soliq organlari, munitsipalitet ruxsatlari", duration: "2-4 hafta" },
      { step: 2, title: "Joyni ta'mirlash", description: "Oshxona, zal, sanitariya jihozlari o'rnatish", duration: "4-8 hafta" },
      { step: 3, title: "Jihozlar xaridi", description: "Restoran uskuna, mebel, idish-tovoq", duration: "2-3 hafta" },
      { step: 4, title: "Xodimlarni yollash", description: "Oshpaz, ofitsiant, menejer topish", duration: "2-3 hafta" },
      { step: 5, title: "Marketing", description: "Instagram, Telegram, menyuni tayyorlash", duration: "1-2 hafta" },
      { step: 6, title: "Ochilish", description: "Soft opening, mijozlar fikri, menyu sozlash", duration: "Doimiy" },
    ],
    tags: ["Oziq-ovqat", "Xizmat ko'rsatish", "Ko'p daromad", "Ijtimoiy"]
  },
  cafe: {
    businessType: "Kafe",
    pros: [
      "Boshlash uchun kam kapital",
      "Yoshlar sevimli joy",
      "Ijtimoiy tarmoqlarda reklama oson",
      "Menyu o'zgartirish oson",
      "Kichik joy yetarli"
    ],
    cons: [
      "Kechqurun kam daromad",
      "Qahva apparati qimmat",
      "Yaxshi barista kerak",
      "Raqobat ko'p",
      "Tovar muddati qisqa"
    ],
    steps: [
      { step: 1, title: "Joy tanlash", description: "Ko'p odam yuradigan joy - metro, universitet yaqini", duration: "1-2 hafta" },
      { step: 2, title: "Litsenziya va ruxsatlar", description: "Soliq ro'yxatidan o'tish, SES ruxsati", duration: "2-3 hafta" },
      { step: 3, title: "Jihozlar", description: "Espresso mashinasi, blender, muzlatgich, mebel", duration: "2-4 hafta" },
      { step: 4, title: "Brend yaratish", description: "Logo, dizayn, menyu, ijtimoiy tarmoqlar", duration: "1-2 hafta" },
      { step: 5, title: "Ochilish", description: "Aktsiyalar, chegirmalar bilan boshlash", duration: "1 hafta" },
    ],
    tags: ["Kafe", "Yoshlar", "Ijtimoiy media", "Qulay"]
  },
  dokon: {
    businessType: "Do'kon",
    pros: [
      "Barqaror daromad",
      "Turli tovarlar sotish mumkin",
      "Minimal xodim kerak",
      "Online savdoga o'tish oson",
      "Ombor sifatida ham ishlatish"
    ],
    cons: [
      "Inventar boshqarish murakkab",
      "Tovar chiqimi xavfi",
      "Ijara qimmat bo'lishi mumkin",
      "Supermarketlar raqobati",
      "Solishtirish bahosi kerak"
    ],
    steps: [
      { step: 1, title: "Niche tanlash", description: "Qaysi tovar turi - oziq-ovqat, kiyim, elektronika", duration: "1 hafta" },
      { step: 2, title: "Yetkazib beruvchilar", description: "Ulgurji sotuvchilar bilan shartnoma", duration: "2-3 hafta" },
      { step: 3, title: "Joy jihozlash", description: "Javonlar, kassir uskuna, xavfsizlik kamera", duration: "2-3 hafta" },
      { step: 4, title: "Ro'yxatga olish", description: "IP yoki MCHJ ro'yxatdan o'tish", duration: "1-2 hafta" },
      { step: 5, title: "Marketing", description: "Mahalliy reklama, veb-sayt, Telegram kanal", duration: "Doimiy" },
    ],
    tags: ["Savdo", "Barqaror", "Mahalliy", "Kengaytirish mumkin"]
  },
  it: {
    businessType: "IT Xizmatlari",
    pros: [
      "Past boshlang'ich xarajat",
      "Masofaviy ishlash mumkin",
      "Yuqori daromad potensiali",
      "Xalqaro mijozlar bilan ishlash",
      "Tez o'sish imkoniyati"
    ],
    cons: [
      "Malakali mutaxassis topish qiyin",
      "Texnologiya tez o'zgaradi",
      "Dastlabki loyihalar qiyin",
      "Portfolio yaratish vaqt talab etadi",
      "Raqobat kuchli (xalqaro ham)"
    ],
    steps: [
      { step: 1, title: "Yo'nalish tanlash", description: "Web, mobile, AI, cybersecurity, consulting", duration: "1 hafta" },
      { step: 2, title: "Jamoa to'plash", description: "2-3 kuchli dasturchi, dizayner, menejer", duration: "3-4 hafta" },
      { step: 3, title: "Portfolio yaratish", description: "Demo loyihalar, GitHub, veb-sayt", duration: "4-6 hafta" },
      { step: 4, title: "Ro'yxatga olish", description: "MCHJ ochish, IT Park a'zoligini ko'rish", duration: "2-3 hafta" },
      { step: 5, title: "Birinchi mijozlar", description: "LinkedIn, Upwork, mahalliy korporatsiyalar", duration: "1-3 oy" },
    ],
    tags: ["IT", "Texnologiya", "Yuqori daromad", "Global"]
  }
};

export function analyzeLocation(lat: number, lng: number): string {
  if (lat >= 41.0 && lat <= 41.5 && lng >= 69.0 && lng <= 70.0) return 'tashkent';
  if (lat >= 39.5 && lat <= 40.0 && lng >= 66.5 && lng <= 67.5) return 'samarkand';
  if (lat >= 40.3 && lat <= 40.5 && lng >= 71.5 && lng <= 71.9) return 'fergana';
  return 'tashkent';
}

export function detectBusinessType(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('restoran') || lower.includes('oshxona') || lower.includes('taom')) return 'restoran';
  if (lower.includes('kafe') || lower.includes('cafe') || lower.includes('qahva') || lower.includes('coffee')) return 'cafe';
  if (lower.includes('it') || lower.includes('dastur') || lower.includes('tech') || lower.includes('kompyuter')) return 'it';
  if (lower.includes('do\'kon') || lower.includes('shop') || lower.includes('savdo') || lower.includes('magazin')) return 'dokon';
  return 'dokon';
}

export function generateAnalysis(
  businessInput: string,
  budget: number,
  lat: number,
  lng: number,
  locationName: string
): BusinessAnalysis {
  const locationKey = analyzeLocation(lat, lng);
  const location = uzbekistanLocations[locationKey];
  const businessKey = detectBusinessType(businessInput);
  const template = businessTemplates[businessKey];

  const budgetScore = Math.min(100, (budget / 50000) * 40);
  const locationScore = (location.footTraffic * 5) + (location.populationGrowth * 5);
  const demandScore = location.demandTrends[0].score * 0.3;
  const score = Math.round(Math.min(100, budgetScore + locationScore + demandScore));

  const baseRevenue = businessKey === 'restoran' ? 8000 :
                      businessKey === 'cafe' ? 4000 :
                      businessKey === 'it' ? 12000 : 5000;

  const multiplier = location.footTraffic / 5;
  const minRevenue = Math.round(baseRevenue * multiplier * 0.7);
  const maxRevenue = Math.round(baseRevenue * multiplier * 1.4);

  const breakEven = Math.round(budget / ((minRevenue + maxRevenue) / 2 - budget * 0.15));

  const currentYear = 2024;
  const populationData = Array.from({ length: 6 }, (_, i) => ({
    year: String(currentYear - 5 + i),
    population: Math.round(location.population * Math.pow(1 + location.populationGrowth / 100, i - 5))
  }));

  const revenueProjection = Array.from({ length: 12 }, (_, i) => {
    const month = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'][i];
    const growth = 1 + i * 0.05;
    return {
      month,
      revenue: Math.round(minRevenue * growth * (0.8 + Math.random() * 0.4)),
      expenses: Math.round(budget * 0.12 * (0.9 + Math.random() * 0.2))
    };
  });

  const startupCosts = businessKey === 'restoran' ? [
    { item: "Ijara (6 oy oldindan)", cost: Math.round(budget * 0.25) },
    { item: "Ta'mirlash va jihozlash", cost: Math.round(budget * 0.30) },
    { item: "Oshxona uskunalari", cost: Math.round(budget * 0.25) },
    { item: "Ruxsatnomalar", cost: Math.round(budget * 0.05) },
    { item: "Marketing va brending", cost: Math.round(budget * 0.08) },
    { item: "Ishchi kuchi (1 oy)", cost: Math.round(budget * 0.07) },
  ] : businessKey === 'cafe' ? [
    { item: "Ijara (3 oy)", cost: Math.round(budget * 0.20) },
    { item: "Qahva uskunalari", cost: Math.round(budget * 0.35) },
    { item: "Mebel va dekor", cost: Math.round(budget * 0.20) },
    { item: "Ruxsatnomalar", cost: Math.round(budget * 0.05) },
    { item: "Tovarlar zaxirasi", cost: Math.round(budget * 0.12) },
    { item: "Marketing", cost: Math.round(budget * 0.08) },
  ] : businessKey === 'it' ? [
    { item: "Kompyuterlar va uskunalar", cost: Math.round(budget * 0.40) },
    { item: "Ofis ijarasi (3 oy)", cost: Math.round(budget * 0.15) },
    { item: "Litsenziyalar va dasturlar", cost: Math.round(budget * 0.15) },
    { item: "Ro'yxatga olish", cost: Math.round(budget * 0.05) },
    { item: "Marketing va portfolio", cost: Math.round(budget * 0.15) },
    { item: "Xodimlar (1 oy)", cost: Math.round(budget * 0.10) },
  ] : [
    { item: "Ijara (3 oy)", cost: Math.round(budget * 0.20) },
    { item: "Tovarlar zaxirasi", cost: Math.round(budget * 0.45) },
    { item: "Jihozlash", cost: Math.round(budget * 0.20) },
    { item: "Ro'yxatga olish", cost: Math.round(budget * 0.03) },
    { item: "Marketing", cost: Math.round(budget * 0.07) },
    { item: "Kutilmagan xarajatlar", cost: Math.round(budget * 0.05) },
  ];

  const riskLevel: 'low' | 'medium' | 'high' =
    score > 70 ? 'low' : score > 45 ? 'medium' : 'high';

  const recommendations: Record<string, string> = {
    restoran: `${location.name}da restoran biznesini boshlash uchun ${score > 65 ? "YAXSHI" : "O'RTA"} imkoniyat mavjud. Aholi ${location.populationGrowth}% o'sib bormoqda va oziq-ovqat talabi yuqori. Daromadga erishish uchun ${breakEven} oy kerak.`,
    cafe: `${location.name}da kafe biznesini boshlash ${score > 70 ? "JUDA YAXSHI" : "YAXSHI"} g'oya! Yosh aholi ko'p, ijtimoiy tarmoqlar orqali tez tanilish mumkin. ${breakEven} oyda investitsiyangizni qaytara olasiz.`,
    it: `${location.name}da IT kompaniyasi ochish ${score > 75 ? "AJOYIB" : "YAXSHI"} qaror. Digital iqtisodiyot o'sib bormoqda, IT Park imtiyozlaridan foydalaning. ${breakEven} oyda foyda ko'rishni boshlaysiz.`,
    dokon: `${location.name}da do'kon ochish ${score > 60 ? "YAXSHI" : "MAQBUL"} imkoniyat. Mahalliy aholi ehtiyojiga yo'naltirilgan maxsus tovarlar tanlang. ${breakEven} oyda investitsiya qaytadi.`,
  };

  return {
    businessType: template.businessType || businessInput,
    budget,
    location: { lat, lng, name: locationName || location.name },
    score,
    profitability: breakEven,
    monthlyRevenue: [minRevenue, maxRevenue],
    startupCosts,
    pros: template.pros || [],
    cons: template.cons || [],
    steps: template.steps || [],
    marketInsights: location.demandTrends.map((d, i) => ({
      label: d.category,
      value: d.score,
      color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i]
    })),
    populationData,
    revenueProjection,
    competitors: location.nearbyBusinesses,
    recommendation: recommendations[businessKey] || `${location.name}da ${businessInput} biznesini boshlash imkoniyati mavjud.`,
    riskLevel,
    tags: template.tags || [],
  };
}
