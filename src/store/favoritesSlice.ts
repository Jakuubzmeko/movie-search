import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types';

interface FavoritesState {
  favorites: Movie[];
}

const loadFavorites = (): Movie[] => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const saveFavorites = (favorites: Movie[]): void => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const initialState: FavoritesState = {
  favorites: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (!state.favorites.find((m) => m.imdbID === movie.imdbID)) {
        state.favorites.push(movie);
        saveFavorites(state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const imdbID = action.payload;
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== imdbID);
      saveFavorites(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
