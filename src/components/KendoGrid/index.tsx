import { DataResult } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import { getPopularMovies } from 'services/api';
import { getImageUrl } from 'utils/image';

export const KendoGrid = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.results);
        setFilteredMovies(popularMovies.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies) {
      const updatedFilterdMovies = movies?.filter((movie: { title: string }) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredMovies(updatedFilterdMovies);
    }
  }, [filter, movies]);

  const gridData: DataResult = {
    data: filteredMovies,
    total: filteredMovies?.length || 0,
  };

  const renderImage = (dataItem: {
    dataItem: { poster_path: string; title: string };
  }) => {
    return (
      <img
        src={getImageUrl(dataItem?.dataItem?.poster_path)}
        alt={dataItem?.dataItem?.title}
        style={{ maxWidth: '100%' }}
      />
    );
  };

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by title"
        style={{ width: '100%' }}
      />
      {movies && (
        <Grid data={gridData.data} total={gridData.total}>
          <GridColumn field="poster_path" title="Poster" cell={renderImage} />
          <GridColumn field="title" title="title" />
          <GridColumn field="release_date" title="release_date" />
          <GridColumn field="overview" title="overview" />
        </Grid>
      )}
    </>
  );
};
