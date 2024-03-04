import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/day?language=en-US');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
