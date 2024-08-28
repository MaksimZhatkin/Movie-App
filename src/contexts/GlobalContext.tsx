import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

import getGenres from '../api/getGenres';
import getSessionId from '../api/getSessionId';

export const GuestRatingsContext = createContext(null);
export const GenreContext = createContext(null);
export const SessionContext = createContext(null);
export const ErrorContext = createContext(null);

export default function GlobalProvider({ children }: any) {
  const [genres, setGenres] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [sessionId, setSessionId] = useState<any>(null);
  const [guestRatings, setGuestRatings] = useState<any>({});

  const addRating = useCallback((movieId: number, rating: number) => {
    setGuestRatings((prevRatings: any) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData: any = await getGenres();
        setGenres(genresData.data.genres);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    const fetchSessionId = async () => {
      try {
        const sessionRequest = await getSessionId();
        setSessionId(sessionRequest);
        fetchGenres();
      } catch (err: any) {
        setError(new Error(err.message));
      }
    };

    fetchSessionId();
  }, []);
  const RatingsProviderData = useMemo<any>(() => ({ guestRatings, addRating }), [guestRatings]);

  return (
    <GuestRatingsContext.Provider value={RatingsProviderData}>
      <ErrorContext.Provider value={error}>
        <SessionContext.Provider value={sessionId}>
          <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
        </SessionContext.Provider>
      </ErrorContext.Provider>
    </GuestRatingsContext.Provider>
  );
}
