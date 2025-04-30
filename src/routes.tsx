import React, { lazy, Suspense, ReactNode } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import { CircularProgress, Box } from '@mui/material';

// Lazy load the page components
const SearchPage = lazy(() => import('./pages/SearchPage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Helper function to wrap components with Suspense
const withSuspense = (component: ReactNode): ReactNode => (
  <Suspense fallback={<LoadingFallback />}>{component}</Suspense>
);

// Route definitions
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(<SearchPage />),
      },
      {
        path: 'movie/:id',
        element: withSuspense(<MovieDetailPage />),
      },
      {
        path: 'favorites',
        element: withSuspense(<FavoritesPage />),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
