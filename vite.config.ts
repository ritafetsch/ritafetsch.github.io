import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/ritafetsch.github.io/', // Important: add your repo name with a trailing slash
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})