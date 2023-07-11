import { useCallback, useMemo } from 'react';

import useReducer, { Action } from './reducer';

export const useFetch = <T = object>(endpoint: string) => {
  const [state, dispatch] = useReducer();

  const fetchData = useCallback(() => {
    (async () => {
      try {
        dispatch({ type: Action.FetchingData });

        const response = await fetch(endpoint, { cache: 'no-cache' });
        const data = await response.json();
        const cacheHit = response.headers.get('cf-cache-status') === 'HIT';

        dispatch({ type: Action.DataFetched, cacheHit, data });
      } catch {
        dispatch({ type: Action.Error });
      }
    })();
  }, [endpoint, dispatch]);

  return useMemo(
    () => ({
      ...state,
      data: state.data as T,
      fetch: fetchData,
    }),
    [state, fetchData],
  );
};
