import { Store, Reducer } from '@reduxjs/toolkit';

export interface ExtendedStore extends Store {
  asyncReducers?: Record<string, Reducer>;
}

declare global {
  interface Window {
    store: ExtendedStore;
    asyncReducers?: Record<string, Reducer>;
  }
}

// Movie interfaces
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail extends Movie {
  Error: any;
  Plot: string;
  Runtime: string;
  Director: string;
  Actors: string;
  Country: string;
  Language: string;
  Genre: string;
  Rated: string;
  Writer: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
}

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response?: string;
  Error?: string;
}

export interface SearchState {
  query: string;
  results: Movie[];
  totalResults: number;
  currentPage: number;
  scrollPosition: number;
  loading: boolean;
  error: string | null;
}

// Redux state types
export interface FavoritesState {
  favorites: Movie[];
}

export interface SearchState {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  scrollPosition: number;
}

export interface RootState {
  favorites: FavoritesState;
  search: SearchState;
}
