import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchProductsSuccess, fetchProductsFailure } from '../slices/dataSlices'
import type { Product, DummyJsonResponse } from '../../types'

/**
 * API service to fetch products from DummyJSON
 */
const fetchProductsApi = async (): Promise<Product[]> => {
  try {
    // Fetch all products with limit to get comprehensive data
    const response = await fetch('https://dummyjson.com/products?limit=100')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: DummyJsonResponse = await response.json()
    return data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Saga worker to handle product fetching
 */
function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(fetchProductsApi)
    yield put(fetchProductsSuccess(products))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
    yield put(fetchProductsFailure(errorMessage))
  }
}

/**
 * Saga watcher for product fetch requests
 */
export function* watchFetchProducts() {
  yield takeEvery('data/fetchProductsRequest', fetchProductsSaga)
}