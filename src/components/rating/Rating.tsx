import { Rate } from 'antd';
import React, { useContext } from 'react';

import { GuestRatingsContext } from '../../contexts/GlobalContext';

function Rating({ movieId, rating, onRatingChange }: any) {
  const { guestRatings, addRating }: any = useContext(GuestRatingsContext);

  const movieRating = guestRatings[movieId] || rating;

  return (
    <Rate
      className="movie-card-rating"
      allowHalf
      count={10}
      value={movieRating}
      onChange={(value) => {
        addRating(value);
        onRatingChange(value);
      }}
    />
  );
}

export default Rating;
