import React, { Fragment, ReactElement, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
  Backdrop,
  Fade
} from "@material-ui/core";

import type { MoviePageProps } from "../../types/MoviesPreview";
import useMovieDetails from "../../hooks/useMovieDetails";
import MovieDetailsBody from "./MovieDetailsBody";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    height: 450,
  },
  text: {
    maxHeight: 100,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  modalDetail: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  }

});

const MoviePage = ({ movies }: MoviePageProps): ReactElement => {
  //Init MovieId
  const [movieId, setmovieId] = useState(0);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);

  //Fetch the movie's details
  const { movieDetails, loading } = useMovieDetails({
    path: "movie",
    movieId,
  })
  
  const classes = useStyles();

  const toggleDetails = (id: number) => {
    setmovieId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {movies.map(({ id, poster_path, title, overview}) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => toggleDetails(id)} className={classes.root}>
              <CardActionArea>
                {poster_path &&
                  <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/original${poster_path}`}
                    title={title}
                  />}
                <CardContent className={classes.text}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        aria-labelledby="Movie details modal"
        aria-describedby="Display the details of a movie"
      >
        <MovieDetailsBody movieDetails={movieDetails}/>
      </Modal>
    </Box>
  )
};

export default MoviePage;
