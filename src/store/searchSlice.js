import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    totalResults: 0,
    currentPage: 1,
    scrollPosition: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload.Search || [];
      state.totalResults = Number(action.payload.totalResults) || 0;
    },
    appendResults: (state, action) => {
      if (action.payload.Search) {
        state.results = [...state.results, ...action.payload.Search];
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
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
