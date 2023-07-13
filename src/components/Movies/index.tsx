import Movie from './Item';

type Props = {
  data: Movie[];
};

const Movies = ({ data }: Props) => (
  <ul className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 gap-y-6 md:gap-6 md:gap-y-8">
    {data.map(movie => (
      <Movie key={movie.id} data={movie} />
    ))}
  </ul>
);

export default Movies;
