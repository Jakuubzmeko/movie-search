/* eslint-disable */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', '@mui/material'],
          favorites: ['./src/store/favoritesSlice.ts'],
          search: [
            './src/store/searchSlice.ts',
            './src/components/SearchBar.tsx',
            './src/components/MovieList.tsx',
          ],
          detail: ['./src/pages/MovieDetailPage.tsx'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
