export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  brand: string;
  stock: number;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

// Filter State Types
export interface FilterState {
  selectedCategory: string | null;
  selectedProducts: string[];
  isRunReportEnabled: boolean;
  hasReportRun: boolean;
}

// Chart Data Types
export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface ColumnChartData {
  name: string;
  value: number;
  category: string;
}

// Redux State Types
export interface RootState {
  data: DataState;
  filter: FilterState;
}

export interface DataState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// API Response Types
export interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Component Props Types
export interface FilterPanelProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export interface ChartContainerProps {
  pieData: PieChartData[];
  columnData: ColumnChartData[];
  showColumnChart: boolean;
}