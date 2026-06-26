import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-react', // Keep existing static files separate
    rollupOptions: {
      input: {
        app: './index-react.html'
      }
    }
  }
});