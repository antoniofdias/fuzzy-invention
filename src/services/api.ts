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

export const getMovieDetails = async (movieIds: string[]) => {
  try {
    const requests = movieIds.map((movieId) => {
      return tmdbApi.get(
        `/movie/${movieId}?language=en-US&append_to_response=credits`
      );
    });

    const responses = await Promise.all(requests);
    const movieDetails = responses.map((response) => {
      return {
        title: response.data.title,
        director:
          response.data.credits.crew.filter(
            (crewmate: { job: string }) => crewmate.job === 'Director'
          )[0]?.name || 'Unknown',
      };
    });

    console.log(movieDetails);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};
