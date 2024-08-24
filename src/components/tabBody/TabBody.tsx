import React from 'react';
import { Alert, Typography } from 'antd';

import MovieCard from '../movieCard/MovieCard';
const { Text } = Typography;

export default function TabBody({ movies = [], titleRequest = true, error, noMoviesFeedback }: any) {
  if (error) {
    return <Alert message="Something went wrong!" description={error.message} showIcon type="error" />;
  }
  if (!titleRequest || titleRequest === '') {
    return <Text strong>Type something!☝️</Text>;
  }

  if (movies.length === 0) {
    return <Text strong>{`${noMoviesFeedback}`}</Text>;
  }

  return (
    <div className="cards-wrapper">
      {movies.map((movie: any) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
