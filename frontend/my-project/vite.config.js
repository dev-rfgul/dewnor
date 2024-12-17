import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve node_modules path if necessary
      'slick-carousel/slick/slick.css': 'slick-carousel/slick/slick.css',
      'slick-carousel/slick/slick-theme.css': 'slick-carousel/slick/slick-theme.css',
    },
  },
  optimizeDeps: {
    include: ['react-slick', 'slick-carousel'],
  },
  build: {
    rollupOptions: {
      external: [
        'slick-carousel/slick/slick.css',
        'slick-carousel/slick/slick-theme.css',
      ],
    },
  },
});
