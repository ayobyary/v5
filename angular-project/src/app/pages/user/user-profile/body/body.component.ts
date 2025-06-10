import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyProportionsService, BodyMeasurement, BodyProportion } from '../../../../services/body-proportions.service';
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
  savedMeasurements: BodyMeasurement[] = [];
  bodyProportions: BodyProportion[] = [];

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
}
