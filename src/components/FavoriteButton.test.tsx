import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../utils/test-utils';
import FavoriteButton from './FavoriteButton';
import { Movie } from '../types';

describe('FavoriteButton', () => {
  const mockMovie: Movie = {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: '',
    Type: 'movie',
  };

  it('renders add to favorites button by default', () => {
    render(<FavoriteButton movie={mockMovie} />);

    const button = screen.getByLabelText('add to favorites');
    expect(button).toBeInTheDocument();
  });

  it('changes to remove from favorites when clicked', () => {
    const { store } = render(<FavoriteButton movie={mockMovie} />);

    // Click to add to favorites
    fireEvent.click(screen.getByLabelText('add to favorites'));

    // Check if state updated
    const state = store.getState();
    expect(state.favorites.favorites.length).toBe(1);

    // Check if button changed
    expect(screen.getByLabelText('remove from favorites')).toBeInTheDocument();
  });

  it('handles size prop correctly', () => {
    render(<FavoriteButton movie={mockMovie} size="large" />);

    const button = screen.getByLabelText('add to favorites');
    expect(button).toHaveClass('MuiIconButton-sizeLarge');
  });

  it('prevents event propagation when clicked', () => {
    const mockClick = vi.fn();
    render(
      <div onClick={mockClick}>
        <FavoriteButton movie={mockMovie} />
      </div>
    );

    // Click the button
    fireEvent.click(screen.getByLabelText('add to favorites'));

    // The parent click handler should not be called
    expect(mockClick).not.toHaveBeenCalled();
  });
});
