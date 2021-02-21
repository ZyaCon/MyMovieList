import { useEffect, useState } from "react";
import useFetch from "use-http";

import { MovieDetails } from "../types/MovieDetails";

type useMovieDetailsProps = {
  path: string;
  movieId: number;
};

const useMovieDetails = ({ path, movieId }: useMovieDetailsProps) => {
  //Set api key
  const apikey = "b040330e9290b4874cd99436e831c309";
  const { get, response, loading } = useFetch("https://api.themoviedb.org/3");
  const [movieDetails, setmovieDetails] = useState<MovieDetails>();
  const [, setError] = useState();

  const fetchMovieDetails = async () => {
    try {
      if (movieId === 0)
        return;
      
      //Start loading until await is finished
      const res = await get(
        `${path}/${movieId}?api_key=${apikey}&language=en-US`
      );

      //If get is successful, concat the previous result with new one
      if (response.ok) {
        setmovieDetails(res);
      }
    } catch (e) {
      setError(e);
    }
  };

  //Check any changement on page number
  useEffect(() => {
    fetchMovieDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return { movieDetails, loading };
};

export default useMovieDetails;
