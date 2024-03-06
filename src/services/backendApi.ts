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
    if (response.data) {
      alert('The movies were created successfully!');
    }
  } catch (error) {
    console.error('Error submitting movies:', error);
    alert('An error occured while submitting. Please try again later');
    throw error;
  }
};
