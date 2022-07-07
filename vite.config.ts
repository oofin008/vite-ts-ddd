import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': path.join(__dirname, 'src/'),
    }
  },
  plugins: [react()]
})
