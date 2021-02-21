import { useEffect, useState } from "react";
import useFetch from "use-http";

import { MovieDetails } from "../types/MovieDetails";

type useMovieDetailsProps = {
  path: string;
  movieId: number;
};

const useMovieDetails = ({ path, movieId }: useMovieDetailsProps) => {
  //Set api key
  const apikey = "7c9f7ccfb93d9953cb32e642f50ca904";
  const { get, response } = useFetch("https://api.themoviedb.org/3");

  const [movieDetails, setmovieDetails] = useState<MovieDetails>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMovieDetails = async () => {
    try {
      if (movieId === 0)
        return;
      
      //Start loading until await is finished
      setLoading(true);
      const res = await get(
        `${path}/${movieId}?api_key=${apikey}&language=en-US`
      );
      setLoading(false);

      //If get is successful, concat the previous result with new one
      if (response.ok) {
        setmovieDetails(res);
      }
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  //Check any changement on page number
  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, loading };
};

export default useMovieDetails;
