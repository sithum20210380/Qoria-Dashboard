import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { dataSlice } from './slices/dataSlices'
import { filterSlice } from './slices/filterSlice'
import { rootSaga } from './sagas/rootSaga'

// Create saga middleware
const sagaMiddleware = createSagaMiddleware()

// Configure store with Redux Toolkit
export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk as we're using saga
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// Run saga middleware
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch