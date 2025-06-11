export interface Style {
  id: number;
  name: string;
  short_description: string;
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
}

export interface Accessory {
  id: number;
  style_id: number;
  name: string;
  image_url: string;
}

export interface Brand {
  id: number;
  style_id: number;
  name: string;
}

export interface PsychologicalProfile {
  id: number;
  style_id: number;
  description: string;
}

export interface Event {
  id: number;
  style_id: number;
  name: string;
  description: string;
}

export interface Location {
  id: number;
  style_id: number;
  name: string;
}

export interface Combination {
  id: number;
  style_id: number;
  description: string;
}

export interface ChildStyle {
  id: number;
  parent_style_id: number;
  name: string;
}

export interface ParentStyle {
  id: number;
  child_style_id: number;
  name: string;
}

export interface Mood {
  id: number;
  style_id: number;
  description: string;
}

export interface ColorPalette {
  id: number;
  style_id: number;
  colors: string;
}

export interface Fabric {
  id: number;
  style_id: number;
  name: string;
}

export interface Icon {
  id: number;
  style_id: number;
  name: string;
  image_url: string;
}

export interface Symbol {
  id: number;
  style_id: number;
  description: string;
}

export interface Criticism {
  id: number;
  style_id: number;
  description: string;
}

export interface HairAndMakeup {
  id: number;
  style_id: number;
  description: string;
}

export interface TrendStatus {
  id: number;
  style_id: number;
  status: string;
}

export interface MediaReference {
  id: number;
  style_id: number;
  description: string;
}

export interface HybridStyle {
  id: number;
  style_id: number;
  description: string;
}

export interface UsageToday {
  id: number;
  style_id: number;
  description: string;
}

export interface HistoricalEvolution {
  id: number;
  style_id: number;
  description: string;
}

export interface ContrastingStyle {
  id: number;
  style_id: number;
  name: string;
}

export interface RelatedStyle {
  id: number;
  style_id: number;
  name: string;
}

export interface AgeGroup {
  id: number;
  style_id: number;
  description: string;
}

export interface OriginLocation {
  id: number;
  style_id: number;
  description: string;
} 