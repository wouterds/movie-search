import { useCallback, useMemo } from 'react';

import useReducer, { Action } from './reducer';

export const useFetch = <T = object>(endpoint: string) => {
  const [state, dispatch] = useReducer();

  const fetchData = useCallback(() => {
    (async () => {
      try {
        dispatch({ type: Action.FetchingData });

        const response = await fetch(endpoint);
        response.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        dispatch({
          type: Action.DataFetched,
          cacheHit: response.headers.get('cf-cache-status') === 'HIT',
          data: await response.json(),
        });
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
