import { API_ENDPOINT } from "@/config";
import { useAxios } from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [q, setQ] = useState<string | null>(router.query.q as string || null);
  const { data } = useAxios<Movie[]>(`/movies?${new URLSearchParams({ q: q || '' })}`, { disable: !q, clear: !q });
  const movies = data || [];

  useEffect(() => {
    if (q !== router.query.q) {
      if (q) {
        router.replace({ query: { q } });
      } else if (router.query.q) {
        router.replace({ query: {} });
      }
    }

    if (q === null && router.query.q) {
      setQ(router.query.q as string);
    }
  }, [q, router]);

  return (
    <main className="flex flex-col min-h-screen w-full p-12">
      <h1 className="text-4xl font-bold mb-4">Movies search</h1>
      <form className="max-w-2xl w-full">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Search for any movie title.."
          onChange={(e) => setQ(e.target.value)}
          value={q || ''}
          autoFocus
        />
      </form>
      <ul className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 gap-y-8 mt-6">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-gray-50 p-2 rounded-lg">
            <img
              className="aspect-[9/16] w-full rounded-md"
              src={`${API_ENDPOINT}${movie.poster}`}
              alt={movie.title}
              loading="lazy"
            />
            <div className="m-1 mt-2">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <p className="text-sm text-gray-500">{format(new Date(movie.releaseDate), 'LLLL do, yyyy')}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home;

type Movie = {
  id: string;
  title: string;
  description: string;
  poster: string;
  wallpaper: string;
  releaseDate: string;
}
