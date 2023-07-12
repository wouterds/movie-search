import { useCallback, useMemo, useReducer } from 'react';

export const useFetch = <T = object>(endpoint: string) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    hasError: false,
    data: null,
    cacheHit: false,
  });

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

type State<T = object> = {
  isLoading: boolean;
  hasError: boolean;
  data: T | null;
  cacheHit: boolean;
};

enum Action {
  FetchingData = 'FETCHING_DATA',
  DataFetched = 'DATA_FETCHED',
  Error = 'ERROR',
}

const reducer = <T>(
  state: State<T>,
  action: Partial<State<T>> & { type: Action },
) => {
  switch (action.type) {
    case Action.FetchingData:
      return { ...state, isLoading: true, hasError: false };
    case Action.DataFetched:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.data || null,
        cacheHit: action.cacheHit || false,
      };
    case Action.Error:
      return { ...state, data: null, isLoading: false, hasError: true };
    default:
      return state;
  }
};
