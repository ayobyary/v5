import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyInfoComponent } from './body-info/body-info.component';

interface BodyMeasurement {
  id: string;
  name: string;
  description: string;
  unit: string;
  value: number | null;
}

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BodyInfoComponent
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
    { id: 'chest', name: 'دور سینه (Bust/Chest)', description: 'پرحجم‌ترین نقطه سینه', unit: 'cm', value: null },
    { id: 'underbust', name: 'زیر سینه (Underbust)', description: 'پایین‌ترین بخش قفسه سینه', unit: 'cm', value: null },
    { id: 'waist', name: 'دور کمر (Waist)', description: 'باریک‌ترین قسمت تنه، معمولاً بالای ناف', unit: 'cm', value: null },
    { id: 'hip', name: 'دور باسن (Hip)', description: 'عریض‌ترین نقطه در پایین‌تنه', unit: 'cm', value: null },
    { id: 'armLength', name: 'طول دست (Arm Length)', description: 'از شانه تا مچ', unit: 'cm', value: null },
    { id: 'bicep', name: 'دور بازو (Bicep Circumference)', description: 'در پرحجم‌ترین نقطه', unit: 'cm', value: null },
    { id: 'wrist', name: 'دور مچ (Wrist)', description: 'معمولاً برای آستین و دستکش', unit: 'cm', value: null },
    { id: 'inseam', name: 'طول پا (Inseam)', description: 'از کشاله ران تا پایین قوزک', unit: 'cm', value: null },
    { id: 'thigh', name: 'دور ران (Thigh)', description: 'ضخیم‌ترین قسمت ران', unit: 'cm', value: null },
    { id: 'knee', name: 'دور زانو (Knee)', description: 'در مرکز زانو', unit: 'cm', value: null },
    { id: 'ankle', name: 'دور مچ پا (Ankle)', description: 'برای طراحی شلوار، بوت و لگینگ', unit: 'cm', value: null },
    { id: 'torsoFront', name: 'طول تنه جلو (Torso Front)', description: 'از سر شانه تا خط کمر جلو', unit: 'cm', value: null },
    { id: 'torsoBack', name: 'طول تنه پشت (Torso Back)', description: 'از مهره گردن تا خط کمر عقب', unit: 'cm', value: null },
    { id: 'bustToWaist', name: 'ارتفاع سینه تا کمر (Bust to Waist)', description: 'برای طراحی دقیق', unit: 'cm', value: null }
  ];

  bodyForm: FormGroup;
  showInfo = false;
  savedMeasurements: BodyMeasurement[] = [];

  constructor(private fb: FormBuilder) {
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
      this.showInfo = true;
      console.log('Saving measurements:', this.savedMeasurements);
      // Implement save logic here
    }
  }

  editMeasurements(): void {
    this.showInfo = false;
    // Reset form with saved values
    this.savedMeasurements.forEach(measurement => {
      this.bodyForm.get(measurement.id)?.setValue(measurement.value);
    });
  }

  closeInfo(): void {
    this.showInfo = false;
  }
}
