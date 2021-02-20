import React, { ReactElement } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import type { MoviePageProps } from "../../types/Movies";

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
  }
});

const MoviePage = ({ movies }: MoviePageProps): ReactElement => {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {movies.map(({ id, poster_path, title, overview}) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
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
    </Box>
  )
};

export default MoviePage;
