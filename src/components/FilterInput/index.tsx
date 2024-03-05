import { DataContext } from 'context';
import { useContext, useEffect, useState } from 'react';

export const FilterInput = () => {
  const { data, setFilteredData } = useContext(DataContext);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (data) {
      const updatedFilterdMovies = data?.filter((movie: { title: string }) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredData(updatedFilterdMovies);
    }
  }, [filter, data]);

  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Filter by title"
      style={{ width: '100%' }}
    />
  );
};
