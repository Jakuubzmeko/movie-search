import axios from 'axios';
import { SearchResponse, MovieDetail } from '../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query: string, page = 1): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const getMovieDetails = async (id: string): Promise<MovieDetail> => {
  try {
    const response = await axios.get<MovieDetail>(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
