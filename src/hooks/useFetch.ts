import md5 from 'md5';
import { useCallback, useMemo, useReducer } from 'react';

export const useFetch = <T = object>(endpoint: string) => {
  const hashKey = useMemo(() => md5(endpoint), [endpoint]);
  const [state, dispatch] = useReducer(reducer, {});

  const fetchData = useCallback(() => {
    (async () => {
      try {
        dispatch({ type: Action.FetchingData, hashKey });

        const response = await fetch(endpoint, { cache: 'no-cache' });
        const data = await response.json();
        const cacheHit = response.headers.get('cf-cache-status') === 'HIT';

        dispatch({ type: Action.DataFetched, hashKey, cacheHit, data });
      } catch {
        dispatch({ type: Action.Error, hashKey });
      }
    })();
  }, [endpoint, hashKey, dispatch]);

  return useMemo(() => {
    const entry = state[hashKey] || stateEntryFactory();

    return {
      ...entry,
      data: entry.data as T,
      fetch: fetchData,
    };
  }, [state, hashKey, fetchData]);
};

type HashKey = string;

type Entry<T> = {
  isLoading: boolean;
  hasError: boolean;
  data: T | null;
  cacheHit: boolean;
};

type State<T = object> = Record<HashKey, Entry<T>>;

enum Action {
  FetchingData = 'FETCHING_DATA',
  DataFetched = 'DATA_FETCHED',
  Error = 'ERROR',
}

const stateEntryFactory = <T = object>(
  data: Partial<Entry<T>> = {},
): Entry<T> => ({
  isLoading: false,
  hasError: false,
  data: null,
  cacheHit: false,
  ...data,
});

const reducer = <T>(
  state: State<T>,
  action: Partial<Entry<T>> & { type: Action; hashKey: HashKey },
) => {
  const entry = state[action.hashKey] || stateEntryFactory();

  switch (action.type) {
    case Action.FetchingData:
      return {
        ...state,
        [action.hashKey]: {
          ...entry,
          isLoading: true,
          hasError: false,
        },
      };
    case Action.DataFetched:
      return {
        ...state,
        [action.hashKey]: {
          ...entry,
          isLoading: false,
          hasError: false,
          data: action.data || null,
          cacheHit: action.cacheHit || false,
        },
      };
    case Action.Error:
      return {
        ...state,
        [action.hashKey]: {
          ...entry,
          data: null,
          isLoading: false,
          hasError: true,
        },
      };
    default:
      return {
        ...state,
        [action.hashKey]: entry,
      };
  }
};
