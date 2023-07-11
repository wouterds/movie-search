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
    console.log({ isLoading, wasLoading, cacheHit });
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
    <main className="flex flex-col min-h-screen w-full p-8 lg:p-12">
      <div className="flex flex-col justify-between items-start mb-8 lg:flex-row-reverse">
        <div className="border-2 border-orange-600 bg-gray-50 rounded-lg w-full mb-6 lg:mb-0 lg:w-48">
          <h2 className="text-sm font-semibold uppercase bg-orange-600 text-orange-50 px-2 py-1 flex justify-between items-center">
            <span>API Call Stats</span>
            <FaCloudflare className="inline-block text-lg mr-1" />
          </h2>
          <div className="p-2 text-sm">
            <p>
              <span className="font-semibold">API calls:</span> {apiCalls}
            </p>
            <p>
              <span className="font-semibold">Cloudflare CDN hits:</span>{' '}
              {cacheHits}
            </p>
            <p>
              <span className="font-semibold">Cache rate:</span>{' '}
              {apiCalls > 0 ? Math.round((cacheHits / apiCalls) * 100) : 0}%
            </p>
            <div className="mt-1.5 bg-red-600 rounded-md h-2 overflow-hidden flex">
              <div
                className="bg-green-600 h-full transition-all duration-500"
                style={{
                  width: `${apiCalls > 0 ? (cacheHits / apiCalls) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Movie Search</h1>
          <form>
            <input
              className="block w-full p-3 text-md text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Search for any movie title.."
              onChange={e => setQ(e.target.value)}
              value={initialQueryParam}
              autoFocus
            />
          </form>
        </div>
      </div>

      <Movies data={movies} />
    </main>
  );
};

export default Home;
