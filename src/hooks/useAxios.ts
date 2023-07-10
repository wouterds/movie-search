import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { API_ENDPOINT } from '@/config';

const api = axios.create({ baseURL: API_ENDPOINT });

export const useAxios = <T = object>(
  endpoint: string,
  options?: { disable?: boolean; clear?: boolean },
) => {
  const disable = options?.disable || false;
  const clear = options?.clear || false;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (clear) {
      setData(null);
      setHasError(false);
      setIsLoading(false);
    }
  }, [clear]);

  useEffect(() => {
    (async () => {
      if (disable) {
        return;
      }

      setHasError(false);
      setIsLoading(true);

      try {
        const response = await api.get<T>(endpoint);
        setData(response.data);
        console.log(JSON.stringify(response.headers));
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    })();
  }, [endpoint, disable]);

  return useMemo(
    () => ({
      data,
      isLoading,
      hasError,
    }),
    [isLoading, hasError, data],
  );
};
