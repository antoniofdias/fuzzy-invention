import { DataResult } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DataContext } from 'context';
import { useContext, useEffect } from 'react';
import { getPopularMovies } from 'services/api';
import { getImageUrl } from 'utils/image';

export const KendoGrid = () => {
  const { data, setData, filteredData, setFilteredData } =
    useContext(DataContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setData(popularMovies.results);
        setFilteredData(popularMovies.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const gridData: DataResult = {
    data: filteredData,
    total: filteredData?.length || 0,
  };

  const renderImage = (dataItem: {
    dataItem: { poster_path: string; title: string };
  }) => {
    return (
      <td>
        <img
          src={getImageUrl(dataItem?.dataItem?.poster_path)}
          alt={dataItem?.dataItem?.title}
          style={{ maxWidth: '100%' }}
        />
      </td>
    );
  };

  return (
    data && (
      <Grid data={gridData.data} total={gridData.total}>
        <GridColumn field="poster_path" title="Poster" cell={renderImage} />
        <GridColumn field="title" title="title" />
        <GridColumn field="release_date" title="release_date" />
        <GridColumn field="overview" title="overview" />
      </Grid>
    )
  );
};
