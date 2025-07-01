export const CHART_TYPES = {
  PIE: 'pie',
  COLUMN: 'column'
} as const;

export const MESSAGE_TYPES = {
  FILTER_CHANGE: 'FILTER_CHANGE',
  RUN_REPORT: 'RUN_REPORT',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  CHART_READY: 'CHART_READY'
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: 'https://dummyjson.com/products'
} as const;

export const ANIMATION_DURATION = 300;