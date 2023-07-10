import { API_ENDPOINT } from "@/config";
import { useAxios } from "@/hooks/useAxios";
import { useState } from "react";

const Home = () => {
  const [q, setQ] = useState('');
  const { data } = useAxios<Movie[]>(`/movies?${new URLSearchParams({ q })}`, { disable: !q });
  const movies = data || [];

  return (
    <main className="flex flex-col min-h-screen w-full p-12">
      <form className="max-w-2xl w-full">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Search for any movie title.."
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
      <ul className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 mt-6">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-gray-50 p-2 rounded-lg">
            <img
              className="aspect-[9/16] w-full rounded-md"
              src={`${API_ENDPOINT}${movie.poster}`}
              alt={movie.title}
              loading="lazy"
              />
            <div className="m-1 mt-3">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-500">{movie.releaseDate}</p>
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
