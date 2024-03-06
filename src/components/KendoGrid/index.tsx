import { Upload } from '@mui/icons-material/';
import Fab from '@mui/material/Fab';
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
import { getPopularMovies, submitMovieWithDetails } from 'services/tmdbApi';
import { getImageUrl } from 'utils/image';

export const KendoGrid = () => {
  const handleSubmit = () => {
    if (selectedMovies.length > 0) {
      submitMovieWithDetails(selectedMovies);
    }
  };

  function FloatingActionButtons() {
    return (
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
        }}
        onClick={handleSubmit}
      >
        <Upload sx={{ mr: 1 }} />
        Upload
      </Fab>
    );
  }

  const { data, setData } = useContext(DataContext);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: 'and',
    filters: [{ field: 'title', operator: 'contains', value: '' }],
  });

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

  const handleCheckboxChange = (id: string) => {
    setSelectedMovies((prevSelectedMovies) => {
      if (prevSelectedMovies.includes(id)) {
        return prevSelectedMovies.filter((movie) => movie !== id);
      } else {
        return [...prevSelectedMovies, id];
      }
    });
  };

  const renderCheckbox = (dataItem: { dataItem: { id: string } }) => {
    return (
      <td>
        <input
          type="checkbox"
          checked={selectedMovies.includes(dataItem.dataItem.id)}
          onChange={() => handleCheckboxChange(dataItem.dataItem.id)}
        />
      </td>
    );
  };

  return (
    data && (
      <div style={{ position: 'relative' }}>
        <Grid
          data={filterBy(gridData.data, filter)}
          total={gridData.total}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
        >
          <GridColumn
            field="selected"
            title="Select"
            cell={renderCheckbox}
            width={50}
          />
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
        <FloatingActionButtons />
      </div>
    )
  );
};
