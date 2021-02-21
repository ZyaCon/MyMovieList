import React, { ReactElement } from 'react';

import {
  createStyles,
  Theme,
  makeStyles
} from '@material-ui/core/styles';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);

const NavigationBar = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            My Movies
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;