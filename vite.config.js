import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', '@mui/material'],
          favorites: ['./src/store/favoritesSlice.js'],
          search: [
            './src/store/searchSlice.js',
            './src/components/SearchBar.jsx',
            './src/components/MovieList.jsx',
          ],
          detail: ['./src/pages/MovieDetailPage.jsx'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
    },
  },
});
