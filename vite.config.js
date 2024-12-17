import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dream-life-planner/', // Your base path
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
