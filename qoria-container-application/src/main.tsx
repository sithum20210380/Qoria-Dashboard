import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import './index.css'

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: '#f0f2f5',
      headerBg: '#1890ff',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      borderRadiusLG: 8,
    },
    Select: {
      borderRadius: 8,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)