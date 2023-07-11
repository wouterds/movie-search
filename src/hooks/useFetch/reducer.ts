import { useReducer } from 'react';

type State<T = object> = {
  isLoading: boolean;
  hasError: boolean;
  data: T | null;
  cacheHit: boolean;
};

export enum Action {
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

const useFetchReducer = () => {
  return useReducer(reducer, {
    isLoading: false,
    hasError: false,
    data: null,
    cacheHit: false,
  });
};

export default useFetchReducer;
