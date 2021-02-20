import React, { ReactElement, useEffect, useState } from "react";

import MoviePage from "./components/Movies/MoviePage";
import NavigationBar from "./components/NavigationBar";

import { CircularProgress } from "@material-ui/core";

import useMovies from "./hooks/useMovies";
import { useInView } from "react-intersection-observer";

import './App.css';

const App = (): ReactElement => {
  //Init Page to 0
  const [page, setPage] = useState(0);

  //Intersection-observer for scrolling
  const { ref, inView } = useInView({ threshold: 0 });

  //Fetch movies
  const { movies, loading } = useMovies({
    path: "movie/popular",
    page,
  });
  
  //Set page to next page when bottom is viewd
  useEffect(() => {
    if (inView) {
      setPage(p => p + 1);
    }
  }, [inView])

  return (
    <div>
        <NavigationBar/>
      <main>
        <MoviePage movies={movies} />
        <div ref={ref}>
          {loading && (<CircularProgress color="secondary" />)}
        </div>
      </main>
    </div>
  );
}

export default App;