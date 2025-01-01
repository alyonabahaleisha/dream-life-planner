import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dream-life-planner/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Opener-Policy': 'unsafe-none'
    }
  }
});