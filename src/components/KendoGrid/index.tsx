import {
  CompositeFilterDescriptor,
  DataResult,
  filterBy,
} from '@progress/kendo-data-query';
import {
  Grid,
  GridColumn,
  GridFilterChangeEvent,
} from '@progress/kendo-react-grid';
import { DataContext } from 'context';
import { useContext, useEffect, useState } from 'react';
import { getPopularMovies } from 'services/api';
import { getImageUrl } from 'utils/image';

export const KendoGrid = () => {
  const { data, setData } = useContext(DataContext);

  const initialFilter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [{ field: 'title', operator: 'contains', value: '' }],
  };
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setData(popularMovies.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const gridData: DataResult = {
    data: data,
    total: data?.length || 0,
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

  const renderReleaseDate = (dataItem: {
    dataItem: { release_date: string };
  }) => {
    const date = new Date(dataItem.dataItem.release_date);
    const formattedDate = date.toLocaleDateString('en-US');

    return <td>{formattedDate}</td>;
  };

  return (
    data && (
      <Grid
        data={filterBy(gridData.data, filter)}
        total={gridData.total}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
      >
        <GridColumn
          field="poster_path"
          title="Poster"
          cell={renderImage}
          filterable={false}
        />
        <GridColumn field="title" title="Title" />
        <GridColumn
          field="release_date"
          title="Release Date"
          filter="date"
          cell={renderReleaseDate}
          filterable={false}
        />

        <GridColumn field="overview" title="Overview" />
      </Grid>
    )
  );
};
