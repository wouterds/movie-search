import Movie from './Item';

type Props = {
  data: Movie[];
};

const Movies = ({ data }: Props) => (
  <ul className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 gap-y-8">
    {data.map(movie => (
      <Movie key={movie.id} data={movie} />
    ))}
  </ul>
);

export default Movies;
