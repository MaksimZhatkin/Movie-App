import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Flex, Input, Divider, Pagination } from 'antd';
import debounce from 'lodash.debounce';

import getMovies from '../../api/getMovies';
import EmojiSpinner from '../emojiSpinner/EmojiSpinner';
import TabBody from '../tabBody/TabBody';
import { ErrorContext } from '../../contexts/GlobalContext';

export default function SearchTab() {
  const [movies, setMovies] = useState([]);
  const [titleRequest, setTitleRequest] = useState('');
  const [error, setError] = useState(useContext(ErrorContext));

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedHandleSearchMovie = useCallback(
    debounce(
      (e: any) => {
        if (!error) {
          setTitleRequest(e.target.value);
          setCurrentPage(1);
        }
      },
      1000,
      { maxWait: 3000 }
    ),
    []
  );

  useEffect(() => {
    setIsLoading(true);

    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies(titleRequest, currentPage);
        setMovies(moviesData.results);
        setTotalResults(moviesData.total_results);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };
    if (!error) {
      fetchMovies();
    }
  }, [titleRequest, currentPage, error]);

  return (
    <Flex align="center" vertical>
      <Input
        className="movie-search-input"
        size="large"
        placeholder="🔍Search some movies!🎞️"
        onChange={(e) => {
          debouncedHandleSearchMovie(e);
        }}
        autoFocus
      />
      <Divider />

      {isLoading ? (
        <EmojiSpinner message="Loading movies..." />
      ) : (
        <TabBody
          movies={movies}
          titleRequest={titleRequest}
          error={error}
          noMoviesFeedback="Try to search another title!🤔"
        />
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
