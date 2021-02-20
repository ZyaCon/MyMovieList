type MoviesDetails = {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
};

type MoviePageProps = {
  movies: MoviesDetails[];
};

export type { MoviesDetails, MoviePageProps};
