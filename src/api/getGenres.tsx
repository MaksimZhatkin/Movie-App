import axios from 'axios';

import { API_KEY } from '../constants/constants';

export default async function fetchGenres() {
  try {
    const response = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`, {});
    return response;
  } catch (err: any) {
    throw new Error(err);
  }
}
