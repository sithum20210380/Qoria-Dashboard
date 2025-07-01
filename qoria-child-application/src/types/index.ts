export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
}

export interface CategoryData {
  name: string;
  value: number;
  products: Product[];
}

export interface ChartDataPoint {
  name: string;
  y: number;
  color?: string;
}

export interface ColumnChartData {
  name: string;
  data: number[];
  color?: string;
}

export interface FilterState {
  selectedCategory: string | null;
  selectedProducts: string[];
}

export interface ChartState {
  pieChartData: ChartDataPoint[];
  columnChartData: {
    categories: string[];
    series: ColumnChartData[];
  };
  loading: boolean;
  error: string | null;
  showColumnChart: boolean;
}

export interface UIState {
  theme: 'light' | 'dark';
  chartAnimations: boolean;
}

// Microfrontend communication interface
export interface MicrofrontendMessage {
  type: 'FILTER_CHANGE' | 'RUN_REPORT' | 'CLEAR_FILTERS';
  payload: unknown;
}