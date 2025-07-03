import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DataState, Product } from '../../types'

const initialState: DataState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
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
        const count = categoryMap.get(product.category) || 0
        categoryMap.set(product.category, count + 1)
      })
      
      state.categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        count,
      }))
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = dataSlice.actions

export default dataSlice.reducer