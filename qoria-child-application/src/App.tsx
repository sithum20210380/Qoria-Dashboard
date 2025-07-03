import React from 'react'
import { ConfigProvider } from 'antd'
import ChartComponents from './components/ChartComponents'
import './App.css'

/**
 * Child Application - Chart Components
 * Microfrontend application for rendering charts
 */
const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <ChartComponents />
    </ConfigProvider>
  )
}

export default App