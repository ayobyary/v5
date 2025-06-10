import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BodyMeasurement {
  id: string;
  name: string;
  description: string;
  unit: string;
  value: number | null;
}

@Component({
  selector: 'app-body-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-black leading-none tracking-tight">اطلاعات اندازه‌گیری</h2>
          <button (click)="close()" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div *ngFor="let measurement of measurements" class="bg-gray-50 rounded-xl p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800">{{measurement.name}}</h3>
                <p class="text-sm text-gray-500 mt-1">{{measurement.description}}</p>
              </div>
              <div class="text-lg font-bold text-pink-500">
                {{measurement.value}} {{measurement.unit}}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button (click)="close()" 
                  class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            بستن
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BodyInfoComponent {
  @Input() measurements: BodyMeasurement[] = [];
  @Input() onClose: () => void = () => {};

  close() {
    this.onClose();
  }
} 