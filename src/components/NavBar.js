import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Icon
} from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/MenuBar_back.png'})`,
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
        .env.PUBLIC_URL + "/buttonBackground.png"})`,
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

  if (isWidthDown('md', props.width)) {
    return(
      <div className={classes.root}>
        <Grid container className={classes.padding} alignItems="center">
          <Button className={classes.button}>
            <Icon className={`fas fa-bars`} />
          </Button>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container className={classes.padding} alignItems="center">
          <Button className={classes.button} component={RouterLink} to="/">
            Home
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
          <Button className={classes.button} href="https://discord.gg/3NPBpZh">
            <Icon className={`fab fa-discord`} />
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
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
}

export default withWidth()(withRouter(NavBar));
