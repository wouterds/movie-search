import Axios, { AxiosResponse } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { API_ENDPOINT } from '@/config'

const axios = Axios.create({ baseURL: API_ENDPOINT });

export const useAxios = <T = any>(endpoint: string, options?: { disable?: boolean }) => {
  const disable = options?.disable || false;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      if (disable) {
        return;
      }

      setHasError(false);
      setIsLoading(true);

      try {
        const response = await axios.get<T>(endpoint);
        setData(response.data);
        console.log(JSON.stringify(response.headers))
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    })();
  }, [endpoint, disable]);


  return useMemo(() => ({
    data,
    isLoading,
    hasError,
  }), [isLoading, hasError, data]);
}
