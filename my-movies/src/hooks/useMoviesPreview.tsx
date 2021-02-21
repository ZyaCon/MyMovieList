import { useEffect, useState } from "react";
import useFetch from "use-http";

import type { MoviesPreview } from "../types/MoviesPreview";

type useMoviesPreviewProps = {
  path: string;
  page: number;
};

const useMoviesPreview = ({ path, page }: useMoviesPreviewProps) => {
  //Set api key
  const apikey = "b040330e9290b4874cd99436e831c309";
  const { get, response, loading } = useFetch("https://api.themoviedb.org/3");

  const [movies, setMovies] = useState<MoviesPreview[]>([]);
  const [, setError] = useState();

  const fetchMovies = async () => {
    try {
      if (page === 0)
        return;

        //Start loading until await is finished
      const res = await get(
        `${path}?api_key=${apikey}&language=en-US&page=${page}`
      );
      
      //If get is successful, concat the previous result with new one
      if (response.ok) {
        setMovies(movies.concat(
          res.results.filter(
            (result: MoviesPreview) => !movies.find(movie => movie.id === result.id)
          )
        ));
      }
    } catch (e) {
      setError(e);
    }
  };

  //Check any changement on page number
  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { movies, loading };
};

export default useMoviesPreview;
