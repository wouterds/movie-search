import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useSyncQuery = (keyValue: {
  [key: string]: number | string | null | undefined;
}) => {
  if (Object.keys(keyValue).length !== 1) {
    throw new Error('syncQueryParam only accepts a single key-value pair');
  }

  const key = Object.keys(keyValue)[0];
  const value = keyValue[key];
  const router = useRouter();
  const param = router.query[key];

  useEffect(() => {
    if (value !== param) {
      if (value) {
        router.replace({ query: { q: value } });
      } else if (param) {
        router.replace({ query: {} });
      }
    }
  }, [value, router]);

  return (value || param || '') as string;
};
