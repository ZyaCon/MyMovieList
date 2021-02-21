import { CardMedia, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { ReactElement } from "react";
import { MovieDetails } from "../../types/MovieDetails";

const useStyles = makeStyles({
  media: {
    height: 450,
    maxHeight: 450,
    width: 350,
  },
  modalDetail: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
  logo: {
    maxHeight: 20,
    maxWidth: 20,
    verticalAlign: "bottom",
  }
});

const MovieDetailsBody = ({movieDetails}: {movieDetails: MovieDetails | undefined}): ReactElement => {
  const classes = useStyles();
  
  return (
    <div>
      {/* {JSON.stringify(movieDetails)} */}
      <Paper>
        <Grid container spacing={1}>
          <Grid item xs container direction="row" spacing={3}>
            <Grid item container direction="column" xs={3}>
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
                title={movieDetails?.title}
              />
            </Grid>
            <Grid item container direction="column" xs={7} spacing={3}>
              <Grid item xs container direction="row" spacing={3}>
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs container direction="column">
                    <h1>{movieDetails?.title}</h1>
                    ({movieDetails?.original_title})
                    <h3>{movieDetails?.tagline}</h3>
                  </Grid>
                  <Grid item xs container direction="column">
                    <h3>Overview</h3>
                    {movieDetails?.overview}
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item xs container direction="row" spacing={1}>
                    <Grid item xs>
                      <h3>Genres:</h3>
                      {movieDetails?.genres.map(({ id, name }) => (
                        <Grid key={id} item xs={12}>
                          <li>
                            {name}
                          </li>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs container direction="row" spacing={1}>
                    <Grid item xs>
                      <h3>Production Companies:</h3>
                      {movieDetails?.production_companies.map(({ id, name, origin_country, logo_path }) => (
                        <Grid key={id} item xs={12}>
                          <li>
                            {name} ({origin_country}) {logo_path &&
                            <img className={classes.logo} src={`https://image.tmdb.org/t/p/original${logo_path}`}></img>}
                          </li>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default MovieDetailsBody;