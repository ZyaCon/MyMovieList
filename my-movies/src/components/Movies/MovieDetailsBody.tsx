import { CardMedia, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { ReactElement } from "react";
import { MovieDetails } from "../../types/MovieDetails";

const useStyles = makeStyles({
  media: {
    height: 480,
    maxHeight: 480,
    width: 350,
  },
  modalDetail: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: 1400,
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
    <div className={classes.modalDetail} >
      <Paper>
        <Grid container xs spacing={1}>
          <Grid container direction="row" spacing={3}>
            <Grid item container direction="column" xs={3}>
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
                title={movieDetails?.title}
              />
            </Grid>
            <Grid item container direction="column" xs spacing={3}>
              <Grid item xs container direction="row" spacing={3}>
                <Grid item xs={6} container direction="column" spacing={1}>
                  <Grid item xs container direction="column">
                    <h1 style={{marginBottom: 0}}>{movieDetails?.title}</h1>
                    ({movieDetails?.original_title})
                    <h3>{movieDetails?.tagline}</h3>
                    <p>Score: <b>{movieDetails?.vote_average}</b> for <b>{movieDetails?.vote_count}</b> votes </p>
                    <p>Duration: <b>{movieDetails?.runtime }</b> min</p>
                  </Grid>
                  <Grid item xs container direction="column">
                    <h3>Overview</h3>
                    {movieDetails?.overview}
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container direction="row" spacing={1}>
                    <Grid item xs>
                      <h3>Release Date:</h3>
                      {movieDetails?.release_date}
                      <h3>Genres:</h3>
                      {movieDetails?.genres.map(({ id, name }) => (
                        <Grid key={id} item xs>
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
                        <Grid key={id} item xs>
                          <li>
                            {name} ({origin_country}) {logo_path &&
                            <img alt="Logo of company" className={classes.logo} src={`https://image.tmdb.org/t/p/original${logo_path}`}></img>}
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