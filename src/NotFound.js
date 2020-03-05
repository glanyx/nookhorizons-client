import React from "react";
import Img from 'react-image';
import { makeStyles, Typography, fade, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: 'auto',
        display: 'inline-block',
        textAlign: 'center'
    },
    innerwrapper: {
      display: 'inline-flex'
    },
    image: {
      height: 700,
      width: 700
    },
    textwrapper: {
      display: 'inline-table',
      width: 350,
      backgroundColor: fade(theme.palette.common.black, .85),
      color: theme.palette.common.white,
      padding: theme.spacing(3),
      borderRadius: 10,
      right: '25%'
    },
    text: {
      fontSize: 24
    }
}));

function NotFound(props) {

  const classes = useStyles();

  return (
    <Grid container direction='column' justify='center' alignItems='center' className={classes.wrapper}>
      <Grid item className={classes.innerwrapper}>
        <Img
          className={classes.image}
          src={`${process.env.PUBLIC_URL + "/assets/resetti.png"}`}
        />
        <div className={classes.textwrapper}>
          <Typography className={classes.text}>
            WHAT??! I have no idea where to find that page, punk! You gotta type the link in right. See?
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default NotFound;
