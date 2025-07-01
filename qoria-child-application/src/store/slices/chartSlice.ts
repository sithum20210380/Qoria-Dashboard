import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChartState, ChartDataPoint, ColumnChartData, FilterState } from '../../types';

const initialState: ChartState = {
  pieChartData: [],
  columnChartData: {
    categories: [],
    series: []
  },
  loading: false,
  error: null,
  showColumnChart: false
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    // Action to request chart data update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateChartData: (state, _action: PayloadAction<FilterState>) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action to set pie chart data
    setPieChartData: (state, action: PayloadAction<ChartDataPoint[]>) => {
      state.pieChartData = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Action to request column chart generation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    generateColumnChart: (state, _action: PayloadAction<FilterState>) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action to set column chart data
    setColumnChartData: (state, action: PayloadAction<{
      categories: string[];
      series: ColumnChartData[];
    }>) => {
      state.columnChartData = action.payload;
      state.showColumnChart = true;
      state.loading = false;
      state.error = null;
    },
    
    // Action to hide column chart
    hideColumnChart: (state) => {
      state.showColumnChart = false;
      state.columnChartData = {
        categories: [],
        series: []
      };
    },
    
    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Action to set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Action to clear all chart data
    clearChartData: (state) => {
      state.pieChartData = [];
      state.columnChartData = {
        categories: [],
        series: []
      };
      state.showColumnChart = false;
      state.error = null;
      state.loading = false;
    }
  }
});

export const {
  updateChartData,
  setPieChartData,
  generateColumnChart,
  setColumnChartData,
  hideColumnChart,
  setLoading,
  setError,
  clearChartData
} = chartSlice.actions;

export default chartSlice.reducer;