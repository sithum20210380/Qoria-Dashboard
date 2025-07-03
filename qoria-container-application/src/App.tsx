import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import DashboardLayout from './layouts/DashboardLayout'
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DashboardLayout />
    </Provider>
  )
}

export default App
