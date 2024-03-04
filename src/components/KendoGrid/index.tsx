import { DataResult } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/api';

export const KendoGrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.results);
        console.log(popularMovies.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const gridData: DataResult = {
    data: movies,
    total: movies?.length || 0,
  };

  return (
    movies && (
      <Grid data={gridData.data} total={gridData.total}>
        <GridColumn field="poster_path" title="poster_path" />
        <GridColumn field="title" title="title" />
        <GridColumn field="release_date" title="release_date" />
        <GridColumn field="overview" title="overview" />
      </Grid>
    )
  );
};
