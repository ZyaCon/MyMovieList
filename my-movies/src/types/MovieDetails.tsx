type genre = {
  id: number;
  name: string;
}

type production_companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

type MovieDetails = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
  production_companies: production_companies[];
  runtime: number;
  genres: genre[];
};

export type { MovieDetails };
