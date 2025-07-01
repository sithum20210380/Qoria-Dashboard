import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Create root element if it doesn't exist (for microfrontend)
let rootElement = document.getElementById('child-app-root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'child-app-root';
  document.body.appendChild(rootElement);
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Export for microfrontend integration
export { default as ChartApp } from './App';

// For development mode
if (import.meta.env.DEV) {
  console.log('Child Chart App running in development mode');
}