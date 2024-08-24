import React, { useContext, useEffect, useState } from 'react';
import { Divider, Flex, Pagination } from 'antd';

import { SessionContext, ErrorContext } from '../../contexts/GlobalContext';
import TabBody from '../tabBody/TabBody';
import getRatedMovies from '../../api/getRatedMovies';
import EmojiSpinner from '../emojiSpinner/EmojiSpinner';

export default function RatedTab() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(useContext(ErrorContext));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const sessionId = useContext(SessionContext);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      setIsLoading(true);

      try {
        const ratedMoviesData = await getRatedMovies(sessionId, currentPage);
        setRatedMovies(ratedMoviesData.results);
        setTotalResults(ratedMoviesData.total_results);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setError(err);
      }
    };

    if (sessionId && !error) {
      fetchRatedMovies();
    }
  }, [sessionId, currentPage]);

  return (
    <Flex vertical align="center">
      {isLoading ? (
        <EmojiSpinner message="Loading your rated movies..." emoji=" ⭐ " />
      ) : (
        <TabBody error={error} movies={ratedMovies} noMoviesFeedback="Rate some movies!🌟" />
      )}

      {totalResults > 20 && (
        <>
          <Divider />

          <Pagination
            simple
            showSizeChanger={false}
            current={currentPage}
            total={totalResults}
            pageSize={20}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </>
      )}
    </Flex>
  );
}
