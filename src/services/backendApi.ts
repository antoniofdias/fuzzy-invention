import axios from 'axios';

const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const createMultipleMovies = async (
  movies: { title: string; director: string }[]
) => {
  try {
    const response = await backendApi.post('/movies/create_multiple', {
      user_id: 1,
      movie_data: movies,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting movies:', error);
    throw error;
  }
};
