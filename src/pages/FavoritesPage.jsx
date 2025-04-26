import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Grid, Alert } from '@mui/material';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const { favorites } = useSelector((state) => state.favorites);

  return (
    <Container>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Favorite Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your personal collection of favorite movies
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Alert severity="info">
          You haven't added any movies to your favorites yet. Go to the search page to find and add
          movies!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid key={movie.imdbID} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
