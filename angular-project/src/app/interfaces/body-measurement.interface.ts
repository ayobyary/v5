export interface BodyMeasurement {
  id: string;
  name: string;
  description: string;
  unit: string;
  value: number | null;
}

export interface BodyProportion {
  id: string;
  name: string;
  value: number;
  category: 'upper' | 'lower' | 'overall' | 'composition';
  analysis?: string;
} 