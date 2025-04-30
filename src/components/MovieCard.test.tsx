import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import MovieCard from './MovieCard';
import { Movie } from '../types';

describe('MovieCard', () => {
  const mockMovie: Movie = {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://example.com/poster.jpg',
    Type: 'movie',
  };

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();

    const image = screen.getByAltText('The Shawshank Redemption');
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('renders placeholder image when Poster is N/A', () => {
    const movieWithoutPoster: Movie = { ...mockMovie, Poster: 'N/A' };
    render(<MovieCard movie={movieWithoutPoster} />);

    const image = screen.getByAltText('The Shawshank Redemption');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x450?text=No+Image');
  });

  it('navigates to movie detail page when clicked', async () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/tt0111161');
  });

  it('hides favorite button when showActions is false', () => {
    render(<MovieCard movie={mockMovie} showActions={false} />);

    const favoriteButton = screen.queryByRole('button');
    expect(favoriteButton).not.toBeInTheDocument();
  });

  it('adds movie to favorites when favorite button is clicked', async () => {
    const user = userEvent.setup();
    const { store } = render(<MovieCard movie={mockMovie} />);

    // Find and click the favorite button
    const favoriteButton = screen.getByLabelText('add to favorites');
    await user.click(favoriteButton);

    // Check if the movie was added to favorites in the Redux store
    const state = store.getState();
    expect(state.favorites.favorites.length).toBe(1);
    expect(state.favorites.favorites[0].imdbID).toBe('tt0111161');
  });
});
