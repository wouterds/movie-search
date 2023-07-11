import { useEffect, useState } from 'react';
import { FaCloudflare } from 'react-icons/fa';
import { usePrevious } from 'react-use';

import Movies from '@/components/Movies';
import { useMovieSearch, useSyncQuery } from '@/hooks';

const Home = () => {
  const [q, setQ] = useState<string | null>(null);
  const { movies, isLoading, cacheHit } = useMovieSearch(q);
  const [apiCalls, setApiCalls] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);

  const wasLoading = usePrevious(isLoading);
  useEffect(() => {
    if (!isLoading && wasLoading) {
      setApiCalls(calls => calls + 1);
      setCacheHits(hits => hits + (cacheHit ? 1 : 0));
    }
  }, [isLoading, wasLoading, cacheHit]);

  const initialQueryParam = useSyncQuery({ q });
  useEffect(() => {
    if (initialQueryParam && q === null) {
      setQ(initialQueryParam);
    }
  }, [initialQueryParam, q]);

  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className="bg-orange-600 text-white w-full text-sm px-4 sm:px-6 py-3 flex items-center">
        <FaCloudflare className="inline-block text-2xl leading-none mr-2 sm:mr-4" />
        <ul className="inline-block">
          <li className="inline-block mx-1 sm:mx-2">
            <span className="font-semibold">API calls:</span>{' '}
            <span className="font-medium text-white/90">{apiCalls}</span>
          </li>
          <li className="inline-block mx-1 sm:mx-2">
            <span className="font-semibold">CDN hits:</span>{' '}
            <span className="font-medium text-white/90">{cacheHits}</span>
          </li>
          <li className="inline-block mx-1 sm:mx-2">
            <span className="font-semibold">Cache rate:</span>{' '}
            <span className="font-medium text-white/90">
              {apiCalls > 0 ? Math.round((cacheHits / apiCalls) * 100) : 0}%
            </span>
          </li>
        </ul>
      </div>

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 lg:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          Movie Search
        </h1>
        <form className="w-full lg:max-w-2xl mb-6 md:mb-8 lg:mb-10">
          <input
            className="block w-full p-3 text-md text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Search for any movie title.."
            onChange={e => setQ(e.target.value)}
            value={initialQueryParam}
            autoFocus
          />
        </form>

        <Movies data={movies} />
      </div>
    </main>
  );
};

export default Home;
