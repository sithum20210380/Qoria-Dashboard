// vite.config.ts - container
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import pkg from './package.json'

const deps = pkg.dependencies as Record<string, string>

export default defineConfig({
  base: './', // 🛠️ ensures assets load properly in preview mode
  plugins: [
    react(),
    federation({
      name: 'container',
      // In container webpack config
      remotes: {
        chartComponents: 'http://localhost:3002/remoteEntry.js'
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
    cssCodeSplit: false
  },
  preview: {
    port: 3001,
    host: true
  },
  server: {
    cors: true,
    port: 3001,
    host: true
  }
})
