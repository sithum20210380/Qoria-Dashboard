import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import type { RootState } from '../store';
import { updateChartData, generateColumnChart, clearChartData } from '../store/slices/chartSlice';
import type { FilterState } from '../types';

/**
 * Custom hook for managing chart data
 */
export const useChartData = () => {
  const dispatch = useDispatch();
  const chartState = useSelector((state: RootState) => state.chart);
  const uiState = useSelector((state: RootState) => state.ui);

  // Memoized chart options
  const chartOptions = useMemo(() => ({
    theme: uiState.theme,
    animations: uiState.chartAnimations
  }), [uiState.theme, uiState.chartAnimations]);

  /**
   * Update pie chart data based on filters
   */
  const updatePieChart = (filters: FilterState) => {
    dispatch(updateChartData(filters));
  };

  /**
   * Generate column chart based on filters
   */
  const generateChart = (filters: FilterState) => {
    dispatch(generateColumnChart(filters));
  };

  /**
   * Clear all chart data
   */
  const clearCharts = () => {
    dispatch(clearChartData());
  };

  /**
   * Initialize charts with default data
   */
  const initializeCharts = () => {
    updatePieChart({ selectedCategory: null, selectedProducts: [] });
  };

  return {
    // State
    pieChartData: chartState.pieChartData,
    columnChartData: chartState.columnChartData,
    showColumnChart: chartState.showColumnChart,
    loading: chartState.loading,
    error: chartState.error,
    chartOptions,
    
    // Actions
    updatePieChart,
    generateChart,
    clearCharts,
    initializeCharts
  };
};

export default useChartData;