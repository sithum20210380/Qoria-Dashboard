import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import dataReducer from './slices/dataSlices'
import filterReducer from './slices/filterSlice'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// qoria-container-application/src/store/sagas/rootSaga.ts
// (rootSaga is imported above; remove local definition here)