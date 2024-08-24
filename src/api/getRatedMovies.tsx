import axios from 'axios';

import { API_TOKEN, BASE_URL } from '../constants/constants';

export default async function getRatedMovies(sessionId: any, page: any) {
  try {
    const response = await axios.get(`${BASE_URL}/3/guest_session/${sessionId}/rated/movies`, {
      params: {
        page,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return await response.data;
  } catch (err: any) {
    return { result: [], error: err.message };
  }
}
