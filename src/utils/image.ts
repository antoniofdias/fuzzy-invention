export const getImageUrl = (path: string) => {
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  return `${baseImageUrl}${path}`;
};
