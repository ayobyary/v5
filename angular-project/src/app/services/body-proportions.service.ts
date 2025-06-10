import { Injectable } from '@angular/core';
import { BodyMeasurement, BodyProportion } from '../interfaces/body-measurement.interface';

@Injectable({
  providedIn: 'root'
})
export class BodyProportionsService {
  constructor() {}

  calculateProportions(measurements: BodyMeasurement[]): BodyProportion[] {
    const measurementsMap = new Map(measurements.map(m => [m.id, m]));
    const proportions: BodyProportion[] = [];

    // Helper functions
    const hasRequiredMeasurements = (ids: string[]): boolean => {
      return ids.every(id => measurementsMap.has(id) && measurementsMap.get(id)?.value !== null);
    };

    const createProportion = (name: string, value: number, category: BodyProportion['category']): BodyProportion => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      value,
      category
    });

    const calculateRatio = (a: number, b: number): number => {
      return b !== 0 ? a / b : 0;
    };

    // Upper Body Proportions
    if (hasRequiredMeasurements(['chest', 'waist'])) {
      const chest = measurementsMap.get('chest')!.value!;
      const waist = measurementsMap.get('waist')!.value!;
      proportions.push(createProportion('نسبت سینه به کمر', calculateRatio(chest, waist), 'upper'));
    }

    if (hasRequiredMeasurements(['highBust', 'chest'])) {
      const highBust = measurementsMap.get('highBust')!.value!;
      const chest = measurementsMap.get('chest')!.value!;
      proportions.push(createProportion('نسبت بالای سینه به سینه', calculateRatio(highBust, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['shoulderWidth', 'chest'])) {
      const shoulderWidth = measurementsMap.get('shoulderWidth')!.value!;
      const chest = measurementsMap.get('chest')!.value!;
      proportions.push(createProportion('نسبت عرض شانه به سینه', calculateRatio(shoulderWidth, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['backWidth', 'chest'])) {
      const backWidth = measurementsMap.get('backWidth')!.value!;
      const chest = measurementsMap.get('chest')!.value!;
      proportions.push(createProportion('نسبت عرض پشت به سینه', calculateRatio(backWidth, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['upperBackWidth', 'backWidth'])) {
      const upperBackWidth = measurementsMap.get('upperBackWidth')!.value!;
      const backWidth = measurementsMap.get('backWidth')!.value!;
      proportions.push(createProportion('نسبت عرض بالای پشت به عرض پشت', calculateRatio(upperBackWidth, backWidth), 'upper'));
    }

    if (hasRequiredMeasurements(['armhole', 'chest'])) {
      const armhole = measurementsMap.get('armhole')!.value!;
      const chest = measurementsMap.get('chest')!.value!;
      proportions.push(createProportion('نسبت دور حلقه آستین به سینه', calculateRatio(armhole, chest), 'upper'));
    }

    if (hasRequiredMeasurements(['shoulderLength', 'shoulderWidth'])) {
      const shoulderLength = measurementsMap.get('shoulderLength')!.value!;
      const shoulderWidth = measurementsMap.get('shoulderWidth')!.value!;
      proportions.push(createProportion('نسبت طول شانه به عرض شانه', calculateRatio(shoulderLength, shoulderWidth), 'upper'));
    }

    // Lower Body Proportions
    if (hasRequiredMeasurements(['waist', 'hip'])) {
      const waist = measurementsMap.get('waist')!.value!;
      const hip = measurementsMap.get('hip')!.value!;
      proportions.push(createProportion('نسبت کمر به باسن', calculateRatio(waist, hip), 'lower'));
    }

    if (hasRequiredMeasurements(['waistToHipLength', 'height'])) {
      const waistToHipLength = measurementsMap.get('waistToHipLength')!.value!;
      const height = measurementsMap.get('height')!.value!;
      proportions.push(createProportion('نسبت طول کمر به باسن به قد', calculateRatio(waistToHipLength, height), 'lower'));
    }

    if (hasRequiredMeasurements(['thigh', 'hip'])) {
      const thigh = measurementsMap.get('thigh')!.value!;
      const hip = measurementsMap.get('hip')!.value!;
      proportions.push(createProportion('نسبت ران به باسن', calculateRatio(thigh, hip), 'lower'));
    }

    if (hasRequiredMeasurements(['calf', 'thigh'])) {
      const calf = measurementsMap.get('calf')!.value!;
      const thigh = measurementsMap.get('thigh')!.value!;
      proportions.push(createProportion('نسبت ساق پا به ران', calculateRatio(calf, thigh), 'lower'));
    }

    if (hasRequiredMeasurements(['knee', 'thigh'])) {
      const knee = measurementsMap.get('knee')!.value!;
      const thigh = measurementsMap.get('thigh')!.value!;
      proportions.push(createProportion('نسبت زانو به ران', calculateRatio(knee, thigh), 'lower'));
    }

    if (hasRequiredMeasurements(['ankle', 'calf'])) {
      const ankle = measurementsMap.get('ankle')!.value!;
      const calf = measurementsMap.get('calf')!.value!;
      proportions.push(createProportion('نسبت مچ پا به ساق پا', calculateRatio(ankle, calf), 'lower'));
    }

    // Overall Proportions
    if (hasRequiredMeasurements(['height', 'weight'])) {
      const height = measurementsMap.get('height')!.value! / 100; // Convert to meters
      const weight = measurementsMap.get('weight')!.value!;
      const bmi = weight / (height * height);
      proportions.push(createProportion('شاخص توده بدنی (BMI)', bmi, 'overall'));
    }

    if (hasRequiredMeasurements(['waistHeight', 'height'])) {
      const waistHeight = measurementsMap.get('waistHeight')!.value!;
      const height = measurementsMap.get('height')!.value!;
      proportions.push(createProportion('نسبت ارتفاع کمر به قد', calculateRatio(waistHeight, height), 'overall'));
    }

    if (hasRequiredMeasurements(['torsoFront', 'torsoBack'])) {
      const torsoFront = measurementsMap.get('torsoFront')!.value!;
      const torsoBack = measurementsMap.get('torsoBack')!.value!;
      proportions.push(createProportion('نسبت طول تنه جلو به پشت', calculateRatio(torsoFront, torsoBack), 'overall'));
    }

    // Body Composition Analysis
    if (hasRequiredMeasurements(['wrist', 'height'])) {
      const wrist = measurementsMap.get('wrist')!.value!;
      const height = measurementsMap.get('height')!.value!;
      proportions.push(createProportion('نسبت مچ دست به قد', calculateRatio(wrist, height), 'composition'));
    }

    if (hasRequiredMeasurements(['forearm', 'bicep'])) {
      const forearm = measurementsMap.get('forearm')!.value!;
      const bicep = measurementsMap.get('bicep')!.value!;
      proportions.push(createProportion('نسبت ساعد به بازو', calculateRatio(forearm, bicep), 'composition'));
    }

    if (hasRequiredMeasurements(['chest', 'fullChest'])) {
      const chest = measurementsMap.get('chest')!.value!;
      const fullChest = measurementsMap.get('fullChest')!.value!;
      proportions.push(createProportion('ظرفیت ریه', fullChest - chest, 'composition'));
    }

    // Body Type Analysis
    const bodyType = this.determineBodyType(measurementsMap);
    proportions.push({
      id: 'bodyType',
      name: 'نوع ساختار بدنی',
      value: 0,
      category: 'composition',
      analysis: this.getBodyTypeAnalysis(bodyType)
    });

    // Body Shape Analysis
    const bodyShape = this.determineBodyShape(measurementsMap);
    proportions.push({
      id: 'bodyShape',
      name: 'فرم بدن',
      value: 0,
      category: 'composition',
      analysis: this.getBodyShapeAnalysis(bodyShape)
    });

    return proportions;
  }

  private determineBodyType(measurements: Map<string, BodyMeasurement>): 'ectomorph' | 'mesomorph' | 'endomorph' {
    const height = measurements.get('height')?.value || 0;
    const weight = measurements.get('weight')?.value || 0;
    const shoulderWidth = measurements.get('shoulderWidth')?.value || 0;
    const hipWidth = measurements.get('hipWidth')?.value || 0;
    const waist = measurements.get('waist')?.value || 0;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const shoulderHipRatio = shoulderWidth / hipWidth;
    const waistHeightRatio = waist / height;

    if (bmi < 18.5 && shoulderHipRatio < 1.1) {
      return 'ectomorph';
    } else if (bmi >= 18.5 && bmi < 25 && shoulderHipRatio >= 1.1) {
      return 'mesomorph';
    } else {
      return 'endomorph';
    }
  }

  private determineBodyShape(measurements: Map<string, BodyMeasurement>): 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'inverted-triangle' {
    const bust = measurements.get('chest')?.value || 0;
    const waist = measurements.get('waist')?.value || 0;
    const hip = measurements.get('hip')?.value || 0;
    const shoulderWidth = measurements.get('shoulderWidth')?.value || 0;

    const bustWaistRatio = bust / waist;
    const waistHipRatio = waist / hip;
    const shoulderHipRatio = shoulderWidth / hip;

    if (bustWaistRatio > 1.1 && waistHipRatio < 0.8) {
      return 'hourglass';
    } else if (shoulderHipRatio < 0.9) {
      return 'pear';
    } else if (bustWaistRatio < 0.9) {
      return 'apple';
    } else if (shoulderHipRatio > 1.1) {
      return 'inverted-triangle';
    } else {
      return 'rectangle';
    }
  }

  private getBodyTypeAnalysis(bodyType: 'ectomorph' | 'mesomorph' | 'endomorph'): string {
    switch (bodyType) {
      case 'ectomorph':
        return `ساختار بدنی شما اکتومورف است. توصیه‌های استایل:
        - استفاده از لباس‌های حجم‌دهنده
        - انتخاب رنگ‌های روشن و گرم
        - استفاده از برش‌های افقی
        - لایه‌بندی لباس‌ها
        - استفاده از پارچه‌های با بافت ضخیم
        - پرهیز از لباس‌های خیلی تنگ
        - استفاده از جزئیات و تزئینات حجم‌دهنده`;

      case 'mesomorph':
        return `ساختار بدنی شما مزومورف است. توصیه‌های استایل:
        - استفاده از لباس‌های جذب و خوش‌فرم
        - انتخاب برش‌های تمیز و دقیق
        - استفاده از پارچه‌های با کشش مناسب
        - نمایش خطوط بدن
        - استفاده از رنگ‌های متنوع
        - پرهیز از لباس‌های خیلی گشاد
        - استفاده از جزئیات ظریف`;

      case 'endomorph':
        return `ساختار بدنی شما اندومورف است. توصیه‌های استایل:
        - استفاده از لباس‌های آزاد و راحت
        - انتخاب رنگ‌های تیره و خنثی
        - استفاده از برش‌های عمودی
        - لایه‌بندی هوشمندانه
        - استفاده از پارچه‌های نازک و روان
        - پرهیز از لباس‌های خیلی تنگ
        - استفاده از جزئیات عمودی`;

      default:
        return 'تعیین نوع ساختار بدنی نیاز به اطلاعات بیشتری دارد.';
    }
  }

  private getBodyShapeAnalysis(bodyShape: 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'inverted-triangle'): string {
    switch (bodyShape) {
      case 'hourglass':
        return `فرم بدن شما ساعت شنی است. توصیه‌های استایل:
        - استفاده از لباس‌های جذب در کمر
        - انتخاب برش‌های متناسب با فرم بدن
        - استفاده از کمربند برای تاکید بر کمر
        - پرهیز از لباس‌های گشاد و راسته
        - استفاده از رنگ‌های متناسب با فرم بدن`;

      case 'pear':
        return `فرم بدن شما گلابی است. توصیه‌های استایل:
        - استفاده از لباس‌های حجم‌دهنده در بالاتنه
        - انتخاب رنگ‌های روشن برای بالاتنه
        - استفاده از برش‌های A-line برای پایین‌تنه
        - پرهیز از لباس‌های تنگ در پایین‌تنه
        - استفاده از جزئیات و تزئینات در بالاتنه`;

      case 'apple':
        return `فرم بدن شما سیبی است. توصیه‌های استایل:
        - استفاده از لباس‌های آزاد در بالاتنه
        - انتخاب برش‌های V شکل برای بالاتنه
        - استفاده از برش‌های مستقیم برای پایین‌تنه
        - پرهیز از لباس‌های تنگ در بالاتنه
        - استفاده از رنگ‌های تیره برای بالاتنه`;

      case 'rectangle':
        return `فرم بدن شما مستطیلی است. توصیه‌های استایل:
        - استفاده از لباس‌های حجم‌دهنده در شانه و باسن
        - انتخاب برش‌های متنوع برای ایجاد فرم
        - استفاده از لایه‌بندی برای ایجاد عمق
        - پرهیز از لباس‌های راسته و ساده
        - استفاده از جزئیات و تزئینات برای ایجاد فرم`;

      case 'inverted-triangle':
        return `فرم بدن شما مثلث معکوس است. توصیه‌های استایل:
        - استفاده از لباس‌های حجم‌دهنده در پایین‌تنه
        - انتخاب برش‌های A-line برای پایین‌تنه
        - استفاده از رنگ‌های روشن برای پایین‌تنه
        - پرهیز از لباس‌های تنگ در بالاتنه
        - استفاده از جزئیات و تزئینات در پایین‌تنه`;

      default:
        return 'تعیین فرم بدن نیاز به اطلاعات بیشتری دارد.';
    }
  }
} 