import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FilterState } from '../../types'

const initialState: FilterState = {
  selectedCategory: null,
  selectedProducts: [],
  isRunReportEnabled: false,
  hasReportRun: false,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      state.selectedProducts = [] // Clear products when category changes
      state.hasReportRun = false // Reset report status
      state.isRunReportEnabled = Boolean(action.payload)
    },
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload
      state.hasReportRun = false // Reset report status when products change
      state.isRunReportEnabled = Boolean(state.selectedCategory)
    },
    clearCategoryFilter: (state) => {
      state.selectedCategory = null
      state.selectedProducts = []
      state.hasReportRun = false
      state.isRunReportEnabled = false
    },
    clearProductsFilter: (state) => {
      state.selectedProducts = []
      state.hasReportRun = false
      state.isRunReportEnabled = Boolean(state.selectedCategory)
    },
    clearAllFilters: (state) => {
      state.selectedCategory = null
      state.selectedProducts = []
      state.hasReportRun = false
      state.isRunReportEnabled = false
    },
    runReport: (state) => {
      state.hasReportRun = true
      state.isRunReportEnabled = false // Disable until next filter change
    },
  },
})

export const {
  setSelectedCategory,
  setSelectedProducts,
  clearCategoryFilter,
  clearProductsFilter,
  clearAllFilters,
  runReport,
} = filterSlice.actions

export default filterSlice.reducer