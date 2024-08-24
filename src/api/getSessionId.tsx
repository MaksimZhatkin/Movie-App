import axios from 'axios';

import { API_TOKEN, BASE_URL } from '../constants/constants';

export default async function getSessionId() {
  try {
    const response = await axios.get(`${BASE_URL}/3/authentication/guest_session/new`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.guest_session_id;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
