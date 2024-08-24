import { format } from 'date-fns';

export const truncateText = (text: any, length: any) => {
  if (text.length <= length) return text;
  return `${text.substring(0, text.lastIndexOf(' ', length))}...`;
};

export const formatDate = (date: any) => {
  if (!date) return 'Unknown date';
  try {
    return format(new Date(date), 'PP ');
  } catch {
    return 'Invalid date';
  }
};

export const findGenres = (genresMap: any[], genresArr = []) => {
  return genresArr.map((cardGenreId: any) => genresMap.find((genre: any) => cardGenreId === genre.id));
};
