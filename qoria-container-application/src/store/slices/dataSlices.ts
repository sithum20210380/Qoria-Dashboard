import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, DataState } from '../../types'

const initialState: DataState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Fetch Products Actions
    fetchProductsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false
      state.products = action.payload
      state.error = null
      
      // Generate categories from products
      const categoryMap = new Map<string, number>()
      action.payload.forEach(product => {
        const category = product.category
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      })
      
      state.categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        count
      }))
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    
    // Clear Data
    clearData: (state) => {
      state.products = []
      state.categories = []
      state.error = null
    },
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  clearData,
} = dataSlice.actions