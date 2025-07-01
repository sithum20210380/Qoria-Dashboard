import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  updateChartData,
  setPieChartData,
  generateColumnChart,
  setColumnChartData,
  setError,
  setLoading
} from '../slices/chartSlice';
import type { FilterState, Product } from '../../types';
import { transformToPieChartData, transformToColumnChartData } from '../../utils/chartUtils';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Fetch products from API
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchProducts(): Generator<any, Product[], any> {
  try {
    const response = yield call(fetch, API_ENDPOINTS.PRODUCTS);
    const data = yield call([response, 'json']);
    return data.products || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch products data');
  }
}

/**
 * Handle chart data update
 */
function* handleUpdateChartData(action: PayloadAction<FilterState>) {
  try {
    yield put(setLoading(true));
    
    const products: Product[] = yield call(fetchProducts);
    const { selectedCategory, selectedProducts } = action.payload;
    
    // Transform data for pie chart
    const pieChartData = transformToPieChartData(
      products,
      selectedCategory || undefined,
      selectedProducts.length > 0 ? selectedProducts : undefined
    );
    
    yield put(setPieChartData(pieChartData));
  } catch (error) {
    yield put(setError(error instanceof Error ? error.message : 'An error occurred'));
  }
}

/**
 * Handle column chart generation
 */
function* handleGenerateColumnChart(action: PayloadAction<FilterState>) {
  try {
    yield put(setLoading(true));
    
    const products: Product[] = yield call(fetchProducts);
    const { selectedCategory, selectedProducts } = action.payload;
    
    // Transform data for column chart
    const columnChartData = transformToColumnChartData(
      products,
      selectedCategory || undefined,
      selectedProducts.length > 0 ? selectedProducts : undefined
    );
    
    yield put(setColumnChartData(columnChartData));
  } catch (error) {
    yield put(setError(error instanceof Error ? error.message : 'An error occurred'));
  }
}

/**
 * Root chart saga
 */
export default function* chartSaga() {
  yield takeLatest(updateChartData.type, handleUpdateChartData);
  yield takeLatest(generateColumnChart.type, handleGenerateColumnChart);
}