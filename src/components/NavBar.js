import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import {
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/MenuBar_back.png'})`,
    backgroundSize: 'cover',
    display: "flex",
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,.8)',
    paddingTop: theme.spacing(.25),
    paddingBottom: theme.spacing(.25)
  },
  button: {
    textShadow: '1px 2px 2px rgba(210,170,110,.7)',
    height: '80%',
    '&:hover': {
      background: `linear-gradient(rgba(255,200,200,.1),rgba(255,200,200,.1)),url(${process
        .env.PUBLIC_URL + "/assets/buttonBackground.png"})`,
      boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
      color: theme.palette.primary.light,
      textShadow: '1px 2px 0px rgba(50,40,30,.9)',
    }
  },
  padding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1),
    boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
    width: "3px",
    height: "15px",
    borderRadius: 50
  },
}));

function NavBar({
  userProps,
  onLogout,
  ...props
}) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.padding} alignItems="center">
        <Button className={classes.button} component={RouterLink} to="/">
          Home
        </Button>
      </Grid>
      <Grid
        container
        className={classes.padding}
        alignItems="center"
        justify="flex-end"
      >
        <Button className={classes.button} component={RouterLink} to="/register">
          Register
        </Button>
      </Grid>
    </div>
  );
}

export default withRouter(NavBar);