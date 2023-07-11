import { useMemo } from 'react';

import { API_ENDPOINT } from '@/config';

import { useFetch } from './useFetch';

export const useMovieSearch = (query?: string | null) => {
  const q = query ? query.trim() : '';
  const allowedToFetch = !!q;

  const { data, isLoading, hasError } = useFetch<Movie[]>(
    API_ENDPOINT + `/movies?${new URLSearchParams({ q })}`,
    allowedToFetch,
  );

  const movies = useMemo(() => data || [], [data]);

  return useMemo(
    () => ({ movies, isLoading, hasError }),
    [movies, isLoading, hasError],
  );
};
