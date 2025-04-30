import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';
import {
  appendResults,
  setCurrentPage,
  setScrollPosition,
  setLoading,
  setError,
} from '../store/searchSlice';
import { searchMovies } from '../services/api';
import { RootState } from '../types';

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const { query, results, totalResults, currentPage, scrollPosition, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Restore scroll position when component mounts
    if (containerRef.current && scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }

    // Save scroll position when component unmounts
    return () => {
      if (typeof window !== 'undefined') {
        dispatch(setScrollPosition(window.scrollY));
      }
    };
  }, [dispatch, scrollPosition]);

  const loadMoreMovies = async () => {
    console.log('Loading more movies...');
    if (loading || results.length >= totalResults) return;

    const nextPage = currentPage + 1;
    dispatch(setLoading(true));

    try {
      const data = await searchMovies(query, nextPage);
      dispatch(appendResults(data));
      dispatch(setCurrentPage(nextPage));
      dispatch(setError(data.Error || null));
    } catch (error: any) {
      dispatch(setError('Failed to fetch more movies'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!query && results.length === 0) {
    return (
      <Typography variant="body1" align="center" color="textSecondary">
        Search for movies to see results
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <div ref={containerRef} id="movie-list-container">
      <Typography variant="h6" align="center" color="textSecondary" sx={{ my: 2 }}>
        Total Results: {totalResults}
      </Typography>
      <InfiniteScroll
        dataLength={results.length}
        next={loadMoreMovies}
        hasMore={results.length < totalResults}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <Grid container spacing={3}>
          {results.map((movie) => (
            <Grid key={movie.imdbID} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {results.length === 0 && !loading && (
        <Typography variant="body1" align="center" color="textSecondary">
          No movies found
        </Typography>
      )}
    </div>
  );
};

export default MovieList;
