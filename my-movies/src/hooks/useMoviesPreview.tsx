import { useEffect, useState } from "react";
import useFetch from "use-http";
import { useRecoilState } from "recoil";

import { alertState } from "../Recoil/Atoms/atoms";
import type { MoviesPreview } from "../types/MoviesPreview";

type useMoviesPreviewProps = {
  path: string;
  page: number;
};

const useMoviesPreview = ({ path, page }: useMoviesPreviewProps) => {
  //Set api key
  const apikey = "7c9f7ccfb93d9953cb32e642f50ca904";
  const { get, response } = useFetch("https://api.themoviedb.org/3");

  const [, setAlert] = useRecoilState(alertState);

  const [movies, setMovies] = useState<MoviesPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMovies = async () => {
    try {
      if (page === 0)
        return;
      //throw error
      //Start loading until await is finished
      setLoading(true);
      const res = await get(
        `${path}?api_key=${apikey}&language=en-US&page=${page}`
      );
      setLoading(false);
      
      //If get is successful, concat the previous result with new one
      if (response.ok) {
        setMovies(movies.concat(
          res.results.filter(
            (result: MoviesPreview) => !movies.find(movie => movie.id === result.id)
          )
        ));
      }
    } catch (e) {
      setLoading(false);
      setError(e);
      setAlert({ severity: "error", message: error });
    }
  };

  //Check any changement on page number
  useEffect(() => {
    fetchMovies();
  }, [page]);

  return { movies, loading };
};

export default useMoviesPreview;
