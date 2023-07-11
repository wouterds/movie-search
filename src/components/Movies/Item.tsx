import { format } from 'date-fns';

// import { API_ENDPOINT } from '@/config';

type Props = {
  data: Movie;
};

const MoviesItem = ({ data }: Props) => {
  // const imageUrl = API_ENDPOINT + data.poster;
  // temporary because we don't want to see those request come in for a demo
  // normally we can use above; API_ENDPOINT + data.poster
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data.poster
    .split('/')
    .pop()}`;

  return (
    <li className="bg-gray-50 p-2 rounded-lg">
      <img
        className="aspect-[2/3] w-full rounded-md"
        src={imageUrl}
        alt={data.title}
        loading="lazy"
      />
      <div className="m-1 mt-2">
        <h2 className="text-lg font-semibold truncate">{data.title}</h2>
        <p className="text-sm text-gray-500">
          {format(new Date(data.releaseDate), 'LLLL do, yyyy')}
        </p>
      </div>
    </li>
  );
};

export default MoviesItem;
