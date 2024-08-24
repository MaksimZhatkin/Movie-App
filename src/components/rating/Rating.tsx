import { Rate } from 'antd';
import React, { useState } from 'react';

function Rating({ rating, onRatingChange }: any) {
  const [movieRating, setMovieRating] = useState(rating);

  return (
    <Rate
      className="movie-card-rating"
      allowHalf
      count={10}
      value={movieRating}
      onChange={(value) => {
        setMovieRating(onRatingChange(value));
      }}
    />
  );
}

export default Rating;
