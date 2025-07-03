// vite.config.ts - chartComponents
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import pkg from './package.json'
const deps = pkg.dependencies;

export default defineConfig({
  base: './',
  plugins: [
    react(),
    federation({
      name: 'chartComponents',
      filename: 'remoteEntry.js',
      exposes: {
        './ChartComponents': './src/components/ChartComponents'
      },
      shared: {
        react: { requiredVersion: deps.react },
        'react-dom': { requiredVersion: deps['react-dom'] },
        highcharts: { requiredVersion: deps['highcharts'] }
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  preview: {
    port: 3002,
    host: true
  },
  server: {
    cors: true,
    port: 3002,
    host: true
  }
})
