import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../utils/test-utils';
import MovieList from './MovieList';
import { setResults, setQuery, setTotalResults } from '../store/searchSlice';

describe('MovieList', () => {
  const mockMovies = [
    {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'https://example.com/poster1.jpg',
    },
    {
      imdbID: 'tt0068646',
      Title: 'The Godfather',
      Year: '1972',
      Poster: 'https://example.com/poster2.jpg',
    },
  ];

  it('displays movies from search results', async () => {
    // Create an initial state that matches what the component expects
    const preloadedState = {
      search: {
        query: 'test query',
        results: mockMovies,
        totalResults: '2',
        loading: false,
        error: null,
        currentPage: 1,
        scrollPosition: 0,
      },
    };

    // Render with the preloaded state
    const { store } = render(<MovieList />, { preloadedState });

    // Wait for the component to update
    await waitFor(() => {
      // Try to find the movie titles
      expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
      expect(screen.getByText('The Godfather')).toBeInTheDocument();
    });
  });

  it('shows no results message when search returns empty', async () => {
    // Create an initial state with a query but no results
    const preloadedState = {
      search: {
        query: 'nonexistent movie',
        results: [],
        totalResults: '0',
        loading: false,
        error: null,
        currentPage: 1,
        scrollPosition: 0,
      },
    };

    // Render with the preloaded state
    render(<MovieList />, { preloadedState });

    await waitFor(() => {
      expect(screen.getByText('No movies found')).toBeInTheDocument();
    });
  });

  it('shows initial message when no search has been performed', () => {
    render(<MovieList />);

    expect(screen.getByText('Search for movies to see results')).toBeInTheDocument();
  });
});
