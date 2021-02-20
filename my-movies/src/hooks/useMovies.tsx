import { useEffect, useState } from "react";
import useFetch from "use-http";
import { useRecoilState } from "recoil";

import { alertState } from "../Recoil/Atoms/atoms";
import type { MoviesDetails } from "../types/Movies";

type useMoviesProps = {
  path: string;
  page: number;
};

const useMovies = ({ path, page }: useMoviesProps) => {
  //Set api key
  const apikey = "7c9f7ccfb93d9953cb32e642f50ca904";
  const { get, response } = useFetch("https://api.themoviedb.org/3");

  const [, setAlert] = useRecoilState(alertState);

  const [movies, setMovies] = useState<MoviesDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMovies = async () => {
    try {
      if (page === 0)
        return;
      
      //Start loading until await is finished
      setLoading(true);
      const res = await get(
        `${path}?api_key=${apikey}&language=en-US&page=${page}`
      );
      setLoading(false);

      //If get is successful, concat the previous result with new one
      if (response.ok) {
        setMovies(movies.concat(res.results));
      }
    } catch (e) {
      setLoading(false);
      setError(e);
      setAlert({ severity: "error", message: "Unable to load movies !" });
    }
  };

  //Check any changement on page number
  useEffect(() => {
    fetchMovies();
  }, [page]);

  return { movies, loading, error };
};

export default useMovies;
