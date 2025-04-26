import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { injectReducer } from '../store';
import searchReducer from '../store/searchSlice';

const SearchPage = () => {
  const [reducerLoaded, setReducerLoaded] = useState(false);

  useEffect(() => {
    // Inject the search reducer if not already in store
    if (!window.store?.asyncReducers?.search) {
      injectReducer('search', searchReducer);
    }
    setReducerLoaded(true);
  }, []);

  if (!reducerLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Movie Search
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for your favorite movies using the OMDb API
        </Typography>
      </Box>

      <SearchBar />
      <MovieList />
    </Container>
  );
};

export default SearchPage;
