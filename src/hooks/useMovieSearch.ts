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

  return useMemo(
    () => ({ movies: data || [], isLoading, hasError, cacheHit }),
    [data, isLoading, hasError, cacheHit],
  );
};
