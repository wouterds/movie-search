import { useEffect, useState } from 'react';

import Movies from '@/components/Movies';
import { useAxios } from '@/hooks/useAxios';
import { useSyncQuery } from '@/hooks/useSyncQuery';

const Home = () => {
  const [q, setQ] = useState<string | null>(null);
  const { data } = useAxios<Movie[]>(
    `/movies?${new URLSearchParams({ q: q || '' })}`,
    { disable: !q, clear: !q },
  );
  const movies = data || [];

  const initialQueryParam = useSyncQuery({ q });
  useEffect(() => {
    if (initialQueryParam && q === null) {
      setQ(initialQueryParam);
    }
  }, [initialQueryParam, q]);

  return (
    <main className="flex flex-col min-h-screen w-full p-12">
      <h1 className="text-5xl font-bold mb-6">Movies Search</h1>
      <form className="max-w-2xl w-full mb-6">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          type="text"
          placeholder="Search for any movie title.."
          onChange={e => setQ(e.target.value)}
          value={initialQueryParam}
          autoFocus
        />
      </form>
      <Movies data={movies} />
    </main>
  );
};

export default Home;
