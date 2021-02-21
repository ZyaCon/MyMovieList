type MoviesPreview = {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
};

type MoviePageProps = {
  movies: MoviesPreview[];
};

export type { MoviesPreview, MoviePageProps};
