import { Injectable } from '@angular/core';

export interface BodyMeasurement {
  id: string;
  name: string;
  description: string;
  unit: string;
  value: number | null;
}

export interface BodyProportion {
  name: string;
  value: number;
  category: 'upper' | 'lower' | 'overall' | 'composition';
  analysis: string;
}

@Injectable({
  providedIn: 'root'
})
export class BodyProportionsService {
  constructor() {}

  calculateProportions(measurements: BodyMeasurement[]): BodyProportion[] {
    const measurementsMap = new Map(measurements.map(m => [m.id, m.value]));
    const proportions: BodyProportion[] = [];

    // Helper function to check if required measurements exist
    const hasRequiredMeasurements = (ids: string[]): boolean => {
      return ids.every(id => measurementsMap.has(id) && measurementsMap.get(id) !== null);
    };

    // Helper function to calculate ratio
    const calculateRatio = (numerator: number, denominator: number): number => {
      return denominator !== 0 ? numerator / denominator : 0;
    };

    // Helper function to create proportion
    const createProportion = (name: string, value: number, category: 'upper' | 'lower' | 'overall' | 'composition'): BodyProportion => {
      return {
        name,
        value,
        category,
        analysis: this.getProportionAnalysis({ name, value, category, analysis: '' })
      };
    };

    // Upper Body Proportions
    if (hasRequiredMeasurements(['chest', 'waist'])) {
      const chest = measurementsMap.get('chest')!;
      const waist = measurementsMap.get('waist')!;
      proportions.push(createProportion('نسبت سینه به کمر', calculateRatio(chest, waist), 'upper'));
    }

    if (hasRequiredMeasurements(['highBust', 'chest'])) {
      const highBust = measurementsMap.get('highBust')!;
      const chest = measurementsMap.get('chest')!;
      proportions.push(createProportion('نسبت بالای سینه به سینه', calculateRatio(highBust, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['shoulder', 'chest'])) {
      const shoulder = measurementsMap.get('shoulder')!;
      const chest = measurementsMap.get('chest')!;
      proportions.push(createProportion('نسبت عرض شانه به سینه', calculateRatio(shoulder, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['backWidth', 'chest'])) {
      const backWidth = measurementsMap.get('backWidth')!;
      const chest = measurementsMap.get('chest')!;
      proportions.push(createProportion('نسبت عرض کتف به سینه', calculateRatio(backWidth, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['upperBackWidth', 'backWidth'])) {
      const upperBackWidth = measurementsMap.get('upperBackWidth')!;
      const backWidth = measurementsMap.get('backWidth')!;
      proportions.push(createProportion('نسبت عرض پشت بالای کمر به عرض کتف', calculateRatio(upperBackWidth, backWidth), 'upper'));
    }

    if (hasRequiredMeasurements(['armhole', 'chest'])) {
      const armhole = measurementsMap.get('armhole')!;
      const chest = measurementsMap.get('chest')!;
      proportions.push(createProportion('نسبت دور زیر بغل به سینه', calculateRatio(armhole, chest), 'upper'));
    }

    // Lower Body Proportions
    if (hasRequiredMeasurements(['waist', 'hip'])) {
      const waist = measurementsMap.get('waist')!;
      const hip = measurementsMap.get('hip')!;
      proportions.push(createProportion('نسبت کمر به باسن', calculateRatio(waist, hip), 'lower'));
    }

    if (hasRequiredMeasurements(['waistToHipLength', 'height'])) {
      const waistToHipLength = measurementsMap.get('waistToHipLength')!;
      const height = measurementsMap.get('height')!;
      proportions.push(createProportion('نسبت طول کمر تا باسن به قد', calculateRatio(waistToHipLength, height), 'lower'));
    }

    if (hasRequiredMeasurements(['thigh', 'hip'])) {
      const thigh = measurementsMap.get('thigh')!;
      const hip = measurementsMap.get('hip')!;
      proportions.push(createProportion('نسبت ران به باسن', calculateRatio(thigh, hip), 'lower'));
    }

    if (hasRequiredMeasurements(['calf', 'thigh'])) {
      const calf = measurementsMap.get('calf')!;
      const thigh = measurementsMap.get('thigh')!;
      proportions.push(createProportion('نسبت ساق پا به ران', calculateRatio(calf, thigh), 'lower'));
    }

    // Overall Proportions
    if (hasRequiredMeasurements(['height', 'weight'])) {
      const height = measurementsMap.get('height')! / 100; // Convert to meters
      const weight = measurementsMap.get('weight')!;
      const bmi = weight / (height * height);
      proportions.push(createProportion('شاخص توده بدنی (BMI)', bmi, 'overall'));
    }

    if (hasRequiredMeasurements(['torsoFront', 'torsoBack'])) {
      const torsoFront = measurementsMap.get('torsoFront')!;
      const torsoBack = measurementsMap.get('torsoBack')!;
      proportions.push(createProportion('نسبت طول تنه جلو به پشت', calculateRatio(torsoFront, torsoBack), 'overall'));
    }

    if (hasRequiredMeasurements(['waistHeight', 'height'])) {
      const waistHeight = measurementsMap.get('waistHeight')!;
      const height = measurementsMap.get('height')!;
      proportions.push(createProportion('نسبت ارتفاع کمر به قد', calculateRatio(waistHeight, height), 'overall'));
    }

    // Body Composition Analysis
    if (hasRequiredMeasurements(['wrist', 'height'])) {
      const wrist = measurementsMap.get('wrist')!;
      const height = measurementsMap.get('height')!;
      proportions.push(createProportion('نسبت مچ دست به قد', calculateRatio(wrist, height), 'composition'));
    }

    if (hasRequiredMeasurements(['forearm', 'bicep'])) {
      const forearm = measurementsMap.get('forearm')!;
      const bicep = measurementsMap.get('bicep')!;
      proportions.push(createProportion('نسبت ساعد به بازو', calculateRatio(forearm, bicep), 'composition'));
    }

    if (hasRequiredMeasurements(['chest', 'fullChest'])) {
      const chest = measurementsMap.get('chest')!;
      const fullChest = measurementsMap.get('fullChest')!;
      proportions.push(createProportion('ظرفیت ریه', fullChest - chest, 'composition'));
    }

    // Body Fat and Muscle Mass Calculations
    if (hasRequiredMeasurements(['height', 'weight', 'waist', 'neck', 'hip'])) {
      const height = measurementsMap.get('height')!;
      const weight = measurementsMap.get('weight')!;
      const waist = measurementsMap.get('waist')!;
      const neck = measurementsMap.get('neck')!;
      const hip = measurementsMap.get('hip')!;

      // Body Fat Percentage (US Navy Method)
      const bodyFat = this.calculateBodyFat(height, weight, waist, neck, hip);
      proportions.push(createProportion('درصد چربی بدن', bodyFat, 'composition'));

      // Lean Body Mass
      const leanMass = weight * (1 - bodyFat / 100);
      proportions.push(createProportion('وزن بدون چربی', leanMass, 'composition'));

      // Muscle Mass Estimate
      const muscleMass = this.estimateMuscleMass(weight, bodyFat);
      proportions.push(createProportion('تخمین حجم عضله', muscleMass, 'composition'));
    }

    return proportions;
  }

  private calculateBodyFat(height: number, weight: number, waist: number, neck: number, hip: number): number {
    // US Navy Method for Body Fat Calculation
    const bmi = weight / Math.pow(height / 100, 2);
    const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    return Math.max(0, Math.min(100, bodyFat)); // Ensure result is between 0 and 100
  }

  private estimateMuscleMass(weight: number, bodyFat: number): number {
    // Simple estimation based on weight and body fat percentage
    const fatMass = weight * (bodyFat / 100);
    const leanMass = weight - fatMass;
    // Assuming about 40% of lean mass is muscle
    return leanMass * 0.4;
  }

  getProportionAnalysis(proportion: BodyProportion): string {
    switch (proportion.name) {
      case 'نسبت سینه به کمر':
        return this.analyzeBustToWaistRatio(proportion.value);
      case 'نسبت بالای سینه به سینه':
        return this.analyzeHighBustRatio(proportion.value);
      case 'نسبت عرض شانه به سینه':
        return this.analyzeShoulderToChestRatio(proportion.value);
      case 'نسبت عرض کتف به سینه':
        return this.analyzeBackWidthRatio(proportion.value);
      case 'نسبت عرض پشت بالای کمر به عرض کتف':
        return this.analyzeUpperBackWidthRatio(proportion.value);
      case 'نسبت دور زیر بغل به سینه':
        return this.analyzeArmholeRatio(proportion.value);
      case 'نسبت کمر به باسن':
        return this.analyzeWaistToHipRatio(proportion.value);
      case 'نسبت طول کمر تا باسن به قد':
        return this.analyzeWaistToHipLengthRatio(proportion.value);
      case 'نسبت ران به باسن':
        return this.analyzeThighToHipRatio(proportion.value);
      case 'نسبت ساق پا به ران':
        return this.analyzeCalfToThighRatio(proportion.value);
      case 'شاخص توده بدنی (BMI)':
        return this.analyzeBMI(proportion.value);
      case 'نسبت طول تنه جلو به پشت':
        return this.analyzeTorsoRatio(proportion.value);
      case 'نسبت ارتفاع کمر به قد':
        return this.analyzeWaistHeightRatio(proportion.value);
      case 'نسبت مچ دست به قد':
        return this.analyzeWristToHeightRatio(proportion.value);
      case 'نسبت ساعد به بازو':
        return this.analyzeForearmToBicepRatio(proportion.value);
      case 'ظرفیت ریه':
        return this.analyzeLungCapacity(proportion.value);
      case 'درصد چربی بدن':
        return this.analyzeBodyFat(proportion.value);
      case 'وزن بدون چربی':
        return this.analyzeLeanBodyMass(proportion.value);
      case 'تخمین حجم عضله':
        return this.analyzeMuscleMass(proportion.value);
      default:
        return 'تحلیل در دسترس نیست';
    }
  }

  private analyzeBustToWaistRatio(ratio: number): string {
    if (ratio > 1.2) return 'بالاتنه حجیم‌تر از پایین‌تنه';
    if (ratio < 0.8) return 'پایین‌تنه حجیم‌تر از بالاتنه';
    return 'تناسب متعادل بین بالاتنه و پایین‌تنه';
  }

  private analyzeHighBustRatio(ratio: number): string {
    if (ratio > 0.95) return 'حجم سینه در قسمت بالا بیشتر است';
    if (ratio < 0.85) return 'حجم سینه در قسمت پایین بیشتر است';
    return 'توزیع حجم سینه متعادل است';
  }

  private analyzeShoulderToChestRatio(ratio: number): string {
    if (ratio > 0.4) return 'شانه‌های پهن';
    if (ratio < 0.3) return 'شانه‌های باریک';
    return 'عرض شانه متعادل';
  }

  private analyzeBackWidthRatio(ratio: number): string {
    if (ratio > 0.9) return 'پشت پهن';
    if (ratio < 0.7) return 'پشت باریک';
    return 'عرض پشت متعادل';
  }

  private analyzeUpperBackWidthRatio(ratio: number): string {
    if (ratio > 0.95) return 'پشت بالای کمر پهن';
    if (ratio < 0.85) return 'پشت بالای کمر باریک';
    return 'عرض پشت بالای کمر متعادل';
  }

  private analyzeArmholeRatio(ratio: number): string {
    if (ratio > 0.5) return 'دور زیر بغل بزرگ';
    if (ratio < 0.3) return 'دور زیر بغل کوچک';
    return 'دور زیر بغل متعادل';
  }

  private analyzeWaistToHipRatio(ratio: number): string {
    if (ratio > 0.85) return 'کمر به باسن نزدیک';
    if (ratio < 0.7) return 'کمر به باسن دور';
    return 'فاصله کمر تا باسن متعادل';
  }

  private analyzeWaistToHipLengthRatio(ratio: number): string {
    if (ratio > 0.3) return 'طول کمر تا باسن بلند';
    if (ratio < 0.2) return 'طول کمر تا باسن کوتاه';
    return 'طول کمر تا باسن متعادل';
  }

  private analyzeThighToHipRatio(ratio: number): string {
    if (ratio > 0.6) return 'ران حجیم';
    if (ratio < 0.5) return 'ران لاغر';
    return 'حجم ران متعادل';
  }

  private analyzeCalfToThighRatio(ratio: number): string {
    if (ratio > 0.8) return 'ساق پا حجیم';
    if (ratio < 0.6) return 'ساق پا لاغر';
    return 'حجم ساق پا متعادل';
  }

  private analyzeBMI(bmi: number): string {
    if (bmi < 18.5) return 'کمبود وزن';
    if (bmi < 25) return 'وزن طبیعی';
    if (bmi < 30) return 'اضافه وزن';
    return 'چاقی';
  }

  private analyzeTorsoRatio(ratio: number): string {
    if (ratio > 1.1) return 'طول تنه جلو بیشتر از پشت';
    if (ratio < 0.9) return 'طول تنه پشت بیشتر از جلو';
    return 'طول تنه جلو و پشت متعادل';
  }

  private analyzeWaistHeightRatio(ratio: number): string {
    if (ratio > 0.6) return 'کمر بلند';
    if (ratio < 0.5) return 'کمر کوتاه';
    return 'ارتفاع کمر متعادل';
  }

  private analyzeWristToHeightRatio(ratio: number): string {
    if (ratio < 0.055) return 'استخوان‌بندی ظریف (اکتومورف)';
    if (ratio > 0.065) return 'استخوان‌بندی پهن (اندومورف)';
    return 'استخوان‌بندی متوسط (مزومورف)';
  }

  private analyzeForearmToBicepRatio(ratio: number): string {
    if (ratio > 0.85) return 'عضلانی بودن طبیعی';
    if (ratio < 0.7) return 'عضلانی بودن کمتر';
    return 'عضلانی بودن متوسط';
  }

  private analyzeLungCapacity(expansion: number): string {
    if (expansion > 5) return 'ظرفیت ریه بالا (ورزشکاری)';
    if (expansion < 3) return 'ظرفیت ریه پایین';
    return 'ظرفیت ریه متوسط';
  }

  private analyzeBodyFat(percentage: number): string {
    if (percentage < 10) return 'چربی بسیار کم (ورزشکار)';
    if (percentage < 20) return 'چربی کم (ورزشکار)';
    if (percentage < 25) return 'چربی متوسط';
    if (percentage < 30) return 'چربی بالا';
    return 'چربی بسیار بالا';
  }

  private analyzeLeanBodyMass(mass: number): string {
    if (mass > 70) return 'توده عضلانی بالا';
    if (mass < 50) return 'توده عضلانی پایین';
    return 'توده عضلانی متوسط';
  }

  private analyzeMuscleMass(mass: number): string {
    if (mass > 30) return 'حجم عضله بالا (مزومورف)';
    if (mass < 20) return 'حجم عضله پایین';
    return 'حجم عضله متوسط';
  }
} 