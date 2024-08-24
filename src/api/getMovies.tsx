import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants/constants';

export default async function getMovies(query: any, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/3/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
