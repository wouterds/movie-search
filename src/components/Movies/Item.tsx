import { format } from 'date-fns';

import { API_ENDPOINT } from '@/config';

type Props = {
  data: Movie;
};

const MoviesItem = ({ data }: Props) => (
  <li className="bg-gray-50 p-2 rounded-lg">
    <img
      className="aspect-[2/3] w-full rounded-md"
      src={API_ENDPOINT + data.poster}
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

export default MoviesItem;
