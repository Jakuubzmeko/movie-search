import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const MovieCard = ({ movie, showActions = true }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box
        component={Link}
        to={`/movie/${movie.imdbID}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={movie.Title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.Year}
          </Typography>
        </CardContent>
      </Box>

      {showActions && (
        <CardActions disableSpacing>
          <FavoriteButton movie={movie} />
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
