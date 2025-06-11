export interface Style {
  id: number;
  name: string;                    // نام استایل
  shortDescription: string;        // توصیف کوتاه
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
  psychologicalProfile: string;    // پروفایل روان‌شناختی
  culturalPosition: string;        // موقعیت فرهنگی/اجتماعی
  commonMakeup: string;            // آرایش و مدل موهای رایج
  geographicalOrigin: string;      // موقعیت جغرافیایی
  historicalEvolution: string;     // تحولات تاریخی
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