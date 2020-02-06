import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(7),
        display: 'inline-block',
        textAlign: 'center'
    }
}));

function Guides(props) {

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant='h3'>
        Oh oh, that's not right!
      </Typography>
      <Typography variant='subtitle1'>
        Looks like Rosetti couldn't dig up that page for you.
      </Typography>
    </div>
  );
}

export default Guides;
