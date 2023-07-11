import { useEffect, useMemo, useState } from 'react';

export const useFetch = <T = object>(
  endpoint: string,
  enable: boolean = true,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      if (!enable) {
        return;
      }

      try {
        setHasError(false);
        setIsLoading(true);

        const response = await fetch(endpoint);
        setData(await response.json());
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [endpoint, enable]);

  return useMemo(
    () => ({
      data,
      isLoading,
      hasError,
    }),
    [data, isLoading, hasError],
  );
};
