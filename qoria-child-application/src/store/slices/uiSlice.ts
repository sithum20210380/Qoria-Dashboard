import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
  theme: 'light',
  chartAnimations: true
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    
    toggleChartAnimations: (state) => {
      state.chartAnimations = !state.chartAnimations;
    },
    
    setChartAnimations: (state, action: PayloadAction<boolean>) => {
      state.chartAnimations = action.payload;
    }
  }
});

export const {
  setTheme,
  toggleChartAnimations,
  setChartAnimations
} = uiSlice.actions;

export default uiSlice.reducer;