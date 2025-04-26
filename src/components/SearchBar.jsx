import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setLoading, setResults, setCurrentPage } from '../store/searchSlice';
import { searchMovies } from '../services/api';

const SearchBar = () => {
  const dispatch = useDispatch();

  // Get search state safely with fallback for when reducer isn't loaded yet
  const searchState = useSelector((state) => state.search) || {};
  const { query = '' } = searchState;

  // Use local state for input while the reducer is loading
  const [inputValue, setInputValue] = useState(query);

  // Sync local state with Redux once reducer is loaded
  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, [query]);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    dispatch(setLoading(true));
    dispatch(setQuery(inputValue));
    dispatch(setCurrentPage(1));

    try {
      const data = await searchMovies(inputValue, 1);
      dispatch(setResults(data));
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(setQuery(''));
    dispatch(setResults({ Search: [], totalResults: '0' }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBar;
