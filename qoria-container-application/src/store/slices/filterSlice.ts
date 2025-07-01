import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FilterState } from '../../types'

const initialState: FilterState = {
  selectedCategory: null,
  selectedProducts: [],
  isRunReportEnabled: false,
  hasReportRun: false,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Category Selection
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      // Clear selected products when category changes
      if (action.payload !== state.selectedCategory) {
        state.selectedProducts = []
      }
      // Update run report button state
      state.isRunReportEnabled = !!(action.payload || state.selectedProducts.length > 0)
      state.hasReportRun = false
    },
    
    // Product Selection
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload
      // Update run report button state
      state.isRunReportEnabled = !!(state.selectedCategory || action.payload.length > 0)
      state.hasReportRun = false
    },
    
    // Add Single Product
    addSelectedProduct: (state, action: PayloadAction<string>) => {
      if (!state.selectedProducts.includes(action.payload)) {
        state.selectedProducts.push(action.payload)
        state.isRunReportEnabled = true
        state.hasReportRun = false
      }
    },
    
    // Remove Single Product
    removeSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(p => p !== action.payload)
      state.isRunReportEnabled = !!(state.selectedCategory || state.selectedProducts.length > 0)
      state.hasReportRun = false
    },
    
    // Clear Individual Filters
    clearCategoryFilter: (state) => {
      state.selectedCategory = null
      state.isRunReportEnabled = state.selectedProducts.length > 0
      state.hasReportRun = false
    },
    
    clearProductsFilter: (state) => {
      state.selectedProducts = []
      state.isRunReportEnabled = !!state.selectedCategory
      state.hasReportRun = false
    },
    
    // Clear All Filters
    clearAllFilters: (state) => {
      state.selectedCategory = null
      state.selectedProducts = []
      state.isRunReportEnabled = false
      state.hasReportRun = false
    },
    
    // Run Report Actions
    runReport: (state) => {
      state.hasReportRun = true
      state.isRunReportEnabled = false
    },
    
    enableRunReport: (state) => {
      state.isRunReportEnabled = !!(state.selectedCategory || state.selectedProducts.length > 0)
    },
  },
})

export const {
  setSelectedCategory,
  setSelectedProducts,
  addSelectedProduct,
  removeSelectedProduct,
  clearCategoryFilter,
  clearProductsFilter,
  clearAllFilters,
  runReport,
  enableRunReport,
} = filterSlice.actions