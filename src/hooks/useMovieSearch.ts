import { useEffect, useMemo } from 'react';

import { API_ENDPOINT } from '@/config';

import { useFetch } from './useFetch';

export const useMovieSearch = (query?: string | null) => {
  const q = query ? query.trim() : '';

  const { fetch, data, isLoading, hasError, cacheHit } = useFetch<Movie[]>(
    API_ENDPOINT + `/movies?${new URLSearchParams({ q })}`,
  );

  useEffect(() => {
    if (q) {
      fetch();
    }
  }, [q, fetch]);

  const movies = useMemo(() => {
    if (!q) {
      return [];
    }

    return data || [];
  }, [data, q]);

  return useMemo(
    () => ({ movies, isLoading, hasError, cacheHit }),
    [movies, isLoading, hasError, cacheHit],
  );
};
