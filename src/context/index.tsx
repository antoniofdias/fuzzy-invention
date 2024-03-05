import React, { useState } from 'react';

export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type DataContextType = {
  data: MovieType[];
  setData: (newData: MovieType[]) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: [],
  setData: () => {
    return;
  },
});

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<MovieType[]>([]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
