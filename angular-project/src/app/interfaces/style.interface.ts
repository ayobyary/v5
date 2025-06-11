export interface Style {
  id: number;
  name: string;                    // نام استایل
  short_description: string;        // توصیف کوتاه
  main_image: string;
  psychological_profile?: {
    description: string;
  };
  color_palette?: {
    colors: string;
  };
  brands?: Array<{
    id: number;
    name: string;
  }>;
  accessories?: Array<{
    id: number;
    name: string;
    image_url: string;
  }>;
  events?: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  locations?: Array<{
    id: number;
    name: string;
  }>;
  fabrics?: Array<{
    id: number;
    name: string;
  }>;
  hair_and_makeup?: {
    description: string;
  };
  trend_status?: {
    status: string;
  };
  historical_evolution?: {
    description: string;
  };
  usage_today?: {
    description: string;
  };
  related_styles?: Array<{
    id: number;
    name: string;
  }>;
  contrasting_styles?: Array<{
    id: number;
    name: string;
  }>;
  age_groups?: Array<{
    id: number;
    description: string;
  }>;
  historicalRoot: string;          // ریشه تاریخی
  keyFeatures: string[];           // ویژگی‌های کلیدی
  symbols: string[];               // نمادها و المان‌های مشخصه
  mood: string;                    // حس و حال
  iconPersonality: string;         // شخصیت الهام‌بخش
  relatedStyles: string[];         // استایل‌های مرتبط
  modernUsage: string[];           // کاربرد امروز
  philosophy: string;              // فلسفه استایل
  commonAccessories: string[];     // اکسسوری‌های رایج
  parentStyles: string[];          // والدین
  childStyles: string[];           // فرزندان
  commonFabrics: string[];         // جنس پارچه‌های رایج
  colorPalette: string[];          // پالت رنگی رایج
  commonOutfits: string[];         // ترکیب‌های رایج لباس
  culturalPosition: string;        // موقعیت فرهنگی/اجتماعی
  commonMakeup: string;            // آرایش و مدل موهای رایج
  geographicalOrigin: string;      // موقعیت جغرافیایی
  controversies: string;           // نگاه منتقدانه
  hybridStyles: string[];          // ترکیب با استایل‌های دیگر
  commonLocations: string[];       // لوکیشن‌های معمول
  relatedEvents: string[];         // ایونت‌های مرتبط
  mediaInfluence: string;          // نقش در رسانه
  trendStatus: 'trend' | 'classic'; // ترند یا ماندگار
  oppositeStyles: string[];        // استایل‌های متضاد
  targetAgeGroups: string[];       // سنین غالب
  famousBrands: string[];          // برندهای معروف
  gallery: string[];               // گالری تصاویر
} 