import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyProportionsService } from '../../../../services/body-proportions.service';
import { BodyMeasurement, BodyProportion } from '../../../../interfaces/body-measurement.interface';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterPipe
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  measurements: BodyMeasurement[] = [
    { id: 'height', name: 'قد (Height)', description: 'از فرق سر تا کف پا (بدون کفش)', unit: 'cm', value: null },
    { id: 'weight', name: 'وزن (Weight)', description: 'به کیلوگرم', unit: 'kg', value: null },
    { id: 'neck', name: 'دور گردن (Neck Circumference)', description: 'برای طراحی یقه پیراهن و ژاکت', unit: 'cm', value: null },
    { id: 'shoulder', name: 'عرض شانه (Shoulder Width)', description: 'از انتهای شانه چپ تا راست', unit: 'cm', value: null },
    { id: 'shoulderLength', name: 'طول شانه (Shoulder Length)', description: 'از گردن تا انتهای شانه برای برش‌های دقیق', unit: 'cm', value: null },
    { id: 'highBust', name: 'دور بالای سینه (High Bust)', description: 'اندازه‌گیری دور سینه بالاتر از نقطه پرحجم', unit: 'cm', value: null },
    { id: 'chest', name: 'دور سینه (Bust/Chest)', description: 'پرحجم‌ترین نقطه سینه', unit: 'cm', value: null },
    { id: 'fullChest', name: 'دور قفسه سینه هنگام دم عمیق (Full Chest Expansion)', description: 'تعیین ظرفیت ریه و فرم قفسه سینه', unit: 'cm', value: null },
    { id: 'underbust', name: 'زیر سینه (Underbust)', description: 'پایین‌ترین بخش قفسه سینه', unit: 'cm', value: null },
    { id: 'armhole', name: 'دور زیر بغل (Armhole Circumference)', description: 'برای برش دقیق آستین و راحتی حرکت دست', unit: 'cm', value: null },
    { id: 'backWidth', name: 'عرض کتف (Back Width)', description: 'پهنای قسمت بالای پشت برای طراحی مناسب پشت لباس', unit: 'cm', value: null },
    { id: 'upperBackWidth', name: 'عرض پشت بالای کمر (Upper Back Width)', description: 'برای تناسب بیشتر پشت لباس و راحتی', unit: 'cm', value: null },
    { id: 'waist', name: 'دور کمر (Waist)', description: 'باریک‌ترین قسمت تنه، معمولاً بالای ناف', unit: 'cm', value: null },
    { id: 'waistHeight', name: 'ارتفاع کمر از زمین (Waist Height)', description: 'فاصله کمر تا زمین، برای طراحی کمر لباس و شلوار', unit: 'cm', value: null },
    { id: 'waistToHipLength', name: 'طول کمر تا باسن (Waist to Hip Length)', description: 'فاصله عمودی بین کمر و باسن برای طراحی دقیق پایین‌تنه', unit: 'cm', value: null },
    { id: 'hip', name: 'دور باسن (Hip)', description: 'عریض‌ترین نقطه در پایین‌تنه', unit: 'cm', value: null },
    { id: 'armLength', name: 'طول دست (Arm Length)', description: 'از شانه تا مچ', unit: 'cm', value: null },
    { id: 'bicep', name: 'دور بازو (Bicep Circumference)', description: 'در پرحجم‌ترین نقطه', unit: 'cm', value: null },
    { id: 'forearm', name: 'دور ساعد (Forearm Circumference)', description: 'تعیین عضلانی بودن دست بدون تمرین ورزشی', unit: 'cm', value: null },
    { id: 'upperArm', name: 'دور بازوی بالاتر (Upper Arm Circumference)', description: 'اگر بازو حجیم است، مشخص کردن نقطه بالاتر بازو برای برش بهتر', unit: 'cm', value: null },
    { id: 'wrist', name: 'دور مچ (Wrist)', description: 'برای محاسبه نسبت قد به مچ دست و تشخیص نوع استخوان‌بندی', unit: 'cm', value: null },
    { id: 'inseam', name: 'طول پا (Inseam)', description: 'از کشاله ران تا پایین قوزک', unit: 'cm', value: null },
    { id: 'thigh', name: 'دور ران (Thigh)', description: 'ضخیم‌ترین قسمت ران', unit: 'cm', value: null },
    { id: 'knee', name: 'دور زانو (Knee)', description: 'در مرکز زانو', unit: 'cm', value: null },
    { id: 'calf', name: 'دور ساق پا (Calf Circumference)', description: 'برای طراحی بوت، شلوار جذب و لگینگ', unit: 'cm', value: null },
    { id: 'ankle', name: 'دور قوزک پا (Ankle Bone Visibility)', description: 'برای تشخیص نازک‌استخوان یا استخوان‌بندی پهن', unit: 'cm', value: null },
    { id: 'torsoFront', name: 'طول تنه جلو (Torso Front)', description: 'از سر شانه تا خط کمر جلو', unit: 'cm', value: null },
    { id: 'torsoBack', name: 'طول تنه پشت (Torso Back)', description: 'از مهره گردن تا خط کمر عقب', unit: 'cm', value: null }
  ];

  bodyForm: FormGroup;
  showInfo = false;
  showTestMenu = false;
  savedMeasurements: BodyMeasurement[] = [];
  bodyProportions: BodyProportion[] = [];
  activeTab: 'analysis' | 'measurements' | 'proportions' = 'analysis';
  activeSection: 'analysis' | 'measurements' | 'proportions' | null = null;

  // نمونه‌های تست
  private testSamples = {
    hourglass: [
      { id: 'height', value: 165 },
      { id: 'weight', value: 55 },
      { id: 'neck', value: 35 },
      { id: 'shoulder', value: 40 },
      { id: 'shoulderWidth', value: 40 },
      { id: 'shoulderLength', value: 12 },
      { id: 'highBust', value: 85 },
      { id: 'chest', value: 90 },
      { id: 'fullChest', value: 95 },
      { id: 'underbust', value: 75 },
      { id: 'armhole', value: 45 },
      { id: 'backWidth', value: 35 },
      { id: 'upperBackWidth', value: 30 },
      { id: 'waist', value: 65 },
      { id: 'waistHeight', value: 105 },
      { id: 'waistToHipLength', value: 20 },
      { id: 'hip', value: 90 },
      { id: 'armLength', value: 58 },
      { id: 'bicep', value: 28 },
      { id: 'forearm', value: 25 },
      { id: 'upperArm', value: 30 },
      { id: 'wrist', value: 15 },
      { id: 'inseam', value: 75 },
      { id: 'thigh', value: 55 },
      { id: 'knee', value: 38 },
      { id: 'calf', value: 35 },
      { id: 'ankle', value: 22 },
      { id: 'torsoFront', value: 60 },
      { id: 'torsoBack', value: 62 }
    ],
    pear: [
      { id: 'height', value: 160 },
      { id: 'weight', value: 58 },
      { id: 'neck', value: 34 },
      { id: 'shoulder', value: 38 },
      { id: 'shoulderWidth', value: 38 },
      { id: 'shoulderLength', value: 11 },
      { id: 'highBust', value: 82 },
      { id: 'chest', value: 85 },
      { id: 'fullChest', value: 90 },
      { id: 'underbust', value: 73 },
      { id: 'armhole', value: 44 },
      { id: 'backWidth', value: 34 },
      { id: 'upperBackWidth', value: 29 },
      { id: 'waist', value: 70 },
      { id: 'waistHeight', value: 100 },
      { id: 'waistToHipLength', value: 22 },
      { id: 'hip', value: 95 },
      { id: 'armLength', value: 56 },
      { id: 'bicep', value: 27 },
      { id: 'forearm', value: 24 },
      { id: 'upperArm', value: 29 },
      { id: 'wrist', value: 15 },
      { id: 'inseam', value: 73 },
      { id: 'thigh', value: 58 },
      { id: 'knee', value: 39 },
      { id: 'calf', value: 36 },
      { id: 'ankle', value: 21 },
      { id: 'torsoFront', value: 58 },
      { id: 'torsoBack', value: 60 }
    ],
    apple: [
      { id: 'height', value: 162 },
      { id: 'weight', value: 65 },
      { id: 'neck', value: 36 },
      { id: 'shoulder', value: 42 },
      { id: 'shoulderWidth', value: 42 },
      { id: 'shoulderLength', value: 13 },
      { id: 'highBust', value: 90 },
      { id: 'chest', value: 95 },
      { id: 'fullChest', value: 100 },
      { id: 'underbust', value: 80 },
      { id: 'armhole', value: 46 },
      { id: 'backWidth', value: 36 },
      { id: 'upperBackWidth', value: 32 },
      { id: 'waist', value: 85 },
      { id: 'waistHeight', value: 102 },
      { id: 'waistToHipLength', value: 18 },
      { id: 'hip', value: 90 },
      { id: 'armLength', value: 57 },
      { id: 'bicep', value: 29 },
      { id: 'forearm', value: 26 },
      { id: 'upperArm', value: 31 },
      { id: 'wrist', value: 16 },
      { id: 'inseam', value: 74 },
      { id: 'thigh', value: 56 },
      { id: 'knee', value: 40 },
      { id: 'calf', value: 37 },
      { id: 'ankle', value: 23 },
      { id: 'torsoFront', value: 62 },
      { id: 'torsoBack', value: 64 }
    ],
    rectangle: [
      { id: 'height', value: 168 },
      { id: 'weight', value: 52 },
      { id: 'neck', value: 34 },
      { id: 'shoulder', value: 39 },
      { id: 'shoulderWidth', value: 39 },
      { id: 'shoulderLength', value: 12 },
      { id: 'highBust', value: 83 },
      { id: 'chest', value: 85 },
      { id: 'fullChest', value: 90 },
      { id: 'underbust', value: 74 },
      { id: 'armhole', value: 45 },
      { id: 'backWidth', value: 35 },
      { id: 'upperBackWidth', value: 30 },
      { id: 'waist', value: 75 },
      { id: 'waistHeight', value: 108 },
      { id: 'waistToHipLength', value: 20 },
      { id: 'hip', value: 85 },
      { id: 'armLength', value: 59 },
      { id: 'bicep', value: 27 },
      { id: 'forearm', value: 25 },
      { id: 'upperArm', value: 29 },
      { id: 'wrist', value: 15 },
      { id: 'inseam', value: 76 },
      { id: 'thigh', value: 52 },
      { id: 'knee', value: 37 },
      { id: 'calf', value: 34 },
      { id: 'ankle', value: 21 },
      { id: 'torsoFront', value: 61 },
      { id: 'torsoBack', value: 63 }
    ],
    invertedTriangle: [
      { id: 'height', value: 170 },
      { id: 'weight', value: 60 },
      { id: 'neck', value: 37 },
      { id: 'shoulder', value: 45 },
      { id: 'shoulderWidth', value: 45 },
      { id: 'shoulderLength', value: 14 },
      { id: 'highBust', value: 90 },
      { id: 'chest', value: 95 },
      { id: 'fullChest', value: 100 },
      { id: 'underbust', value: 80 },
      { id: 'armhole', value: 47 },
      { id: 'backWidth', value: 38 },
      { id: 'upperBackWidth', value: 33 },
      { id: 'waist', value: 75 },
      { id: 'waistHeight', value: 110 },
      { id: 'waistToHipLength', value: 19 },
      { id: 'hip', value: 85 },
      { id: 'armLength', value: 60 },
      { id: 'bicep', value: 30 },
      { id: 'forearm', value: 26 },
      { id: 'upperArm', value: 32 },
      { id: 'wrist', value: 16 },
      { id: 'inseam', value: 77 },
      { id: 'thigh', value: 53 },
      { id: 'knee', value: 38 },
      { id: 'calf', value: 35 },
      { id: 'ankle', value: 22 },
      { id: 'torsoFront', value: 63 },
      { id: 'torsoBack', value: 65 }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private bodyProportionsService: BodyProportionsService
  ) {
    this.bodyForm = this.fb.group({});
    this.measurements.forEach(measurement => {
      this.bodyForm.addControl(measurement.id, this.fb.control(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(300)
      ]));
    });
  }

  ngOnInit(): void {
    // Load saved measurements if any
  }

  saveMeasurements(): void {
    if (this.bodyForm.valid) {
      this.savedMeasurements = this.measurements.map(m => ({
        ...m,
        value: this.bodyForm.get(m.id)?.value
      }));
      this.bodyProportions = this.bodyProportionsService.calculateProportions(this.savedMeasurements);
      this.showInfo = true;
      console.log('Saving measurements:', this.savedMeasurements);
      console.log('Calculated proportions:', this.bodyProportions);
    }
  }

  editMeasurements(): void {
    this.showInfo = false;
    // Reset form with saved values
    this.savedMeasurements.forEach(measurement => {
      this.bodyForm.get(measurement.id)?.setValue(measurement.value);
    });
  }

  getProportionAnalysis(proportion: BodyProportion): string {
    return this.bodyProportionsService.getProportionAnalysis(proportion);
  }

  // متد برای اعمال نمونه تست
  applyTestSample(sampleType: 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'invertedTriangle'): void {
    const sample = this.testSamples[sampleType];
    sample.forEach(measurement => {
      this.bodyForm.get(measurement.id)?.setValue(measurement.value);
    });
  }

  toggleSection(section: 'analysis' | 'measurements' | 'proportions') {
    this.activeSection = this.activeSection === section ? null : section;
  }

  onSubmit() {
    if (this.bodyForm.valid) {
      this.saveMeasurements();
    }
  }
}
