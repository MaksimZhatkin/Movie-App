import React, { useState, useContext } from 'react';
import { Card } from 'antd';

import postMovieRate from '../../api/postMovieRating';
import { truncateText, formatDate, findGenres } from '../../utils/helpers';
import Rating from '../rating/Rating';
import { SessionContext, GenreContext, GuestRatingsContext } from '../../contexts/GlobalContext';

export default function MovieCard({ movie }: any) {
  const [, setRating] = useState(movie.rating);
  const sessionId = useContext(SessionContext);
  const genres: any = useContext(GenreContext);
  const genresRender = genres && findGenres(genres, movie.genre_ids);

  const guestRatingsContext = useContext<any>(GuestRatingsContext); // Use GuestRatingsContext
  const addRating = guestRatingsContext?.addRating; // Destructure addRating

  let ratingStyle = {};

  if (movie.vote_average >= 0 && movie.vote_average <= 3) {
    ratingStyle = { borderColor: '#E90000' };
  } else if (movie.vote_average > 3 && movie.vote_average <= 5) {
    ratingStyle = { borderColor: '#E97E00' };
  } else if (movie.vote_average > 5 && movie.vote_average <= 7) {
    ratingStyle = { borderColor: '#E9D100' };
  } else if (movie.vote_average > 7) {
    ratingStyle = { borderColor: '#66E900' };
  }

  const onRaitingChange = (value: number) => {
    postMovieRate(movie.id, value, sessionId);
    setRating(value);
    if (addRating) {
      addRating(movie.id, value); // Update the guest ratings context
    }
  };

  const img = movie.poster_path ? (
    <img className="movie-cover" alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
  ) : (
    <div className="movie-cover">
      🙈 <br />
      <span> Image not found!</span>
    </div>
  );

  return (
    <Card className="movie-card" hoverable>
      {img}
      <div className="movie-card-body">
        <h2 className="movie-card-title">{truncateText(movie.title, 31)}</h2>
        <div className="movie-card-rating-id" style={ratingStyle}>
          {movie.vote_average.toString().slice(0, 4) || '0'}
        </div>
        <p className="movie-card-date">{formatDate(movie.release_date)}</p>
        <ul className="movie-card-genres">
          {genresRender.map((genreLabel: any) => (
            <li className="movie-card-genre" key={genreLabel.id}>
              {genreLabel.name}
            </li>
          ))}
        </ul>
        <p className="movie-card-description">
          {movie.overview ? truncateText(movie.overview, 110) : <i>Overview not found...</i>}
        </p>
        <Rating id={movie.id} rating={movie.rating} onRatingChange={onRaitingChange} movieId={movie.id} />
      </div>
    </Card>
  );
}
