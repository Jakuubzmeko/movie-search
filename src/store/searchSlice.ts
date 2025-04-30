import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResponse, SearchState } from '../types';

const initialState: SearchState = {
  query: '',
  results: [],
  totalResults: 0,
  currentPage: 1,
  scrollPosition: 0,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResponse>) => {
      state.results = action.payload.Search || [];
      state.totalResults = Number(action.payload.totalResults) || 0;
    },
    appendResults: (state, action: PayloadAction<SearchResponse>) => {
      if (action.payload.Search) {
        state.results = [...state.results, ...action.payload.Search];
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setQuery,
  setResults,
  appendResults,
  setCurrentPage,
  setScrollPosition,
  setLoading,
  setError,
} = searchSlice.actions;
export default searchSlice.reducer;
