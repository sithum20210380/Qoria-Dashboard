import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Bootstrap function for standalone running
const mount = (el: HTMLElement) => {
  const root = ReactDOM.createRoot(el)
  root.render(<App />)
}

// Mount to root if running in isolation
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root')
  if (devRoot) {
    mount(devRoot)
  }
}

// Export for container application
export { default } from './components/ChartComponents'