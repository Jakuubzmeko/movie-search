import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import from vitest instead of jest
import { render } from '../utils/test-utils.jsx';
import FavoriteButton from './FavoriteButton';

describe('FavoriteButton', () => {
  const mockMovie = {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
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
    const mockClick = vi.fn(); // Use vi.fn() instead of jest.fn()
    const { container } = render(
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
