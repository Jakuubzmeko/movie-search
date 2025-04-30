import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { Movie, RootState } from '../types';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, size = 'medium' }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((fav: { imdbID: string }) => fav.imdbID === movie.imdbID);

  const handleToggleFavorite = (e?: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
        onClick={handleToggleFavorite}
        color={isFavorite ? 'secondary' : 'default'}
        size={size}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
