import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants/constants';

export default async function postMovieRating(movieId: any, rating: any, guestSessionId: any) {
  try {
    const isDeleteRating: boolean = rating === 0;
    await axios({
      method: isDeleteRating ? 'delete' : 'post',
      url: `${BASE_URL}/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=${API_KEY}`,
      data: {
        value: rating,
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err: any) {
    console.log('Erorr rate movie', err);
  }
  return rating;
}
