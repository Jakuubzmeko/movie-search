import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Paper, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteButton from '../components/FavoriteButton';
import { getMovieDetails } from '../services/api';
import { MovieDetail } from '../types';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getMovieDetails(id);

        if (data.Error) {
          setError(data.Error);
        } else {
          setMovie(data);
          setError(null);
        }
      } catch (error) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) return null;

  return (
    <Container>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.Title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
                {movie.Title}
              </Typography>
              <FavoriteButton movie={movie} size="large" />
            </Box>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {movie.Year} • {movie.Rated} • {movie.Runtime}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" paragraph>
                {movie.Plot}
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Director:</strong> {movie.Director}
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Writers:</strong> {movie.Writer}
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Actors:</strong> {movie.Actors}
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Language:</strong> {movie.Language}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Country:</strong> {movie.Country}
              </Typography>
            </Box>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Ratings
                </Typography>
                {movie.Ratings.map((rating) => (
                  <Typography key={rating.Source} variant="body2" sx={{ mb: 1 }}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </Typography>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetailPage;
