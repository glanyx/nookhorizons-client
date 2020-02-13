import React from "react";
import { RegisterForm, NoticeBoard, Pin } from '../components';
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
    height: '100%'
  }
}));

function Register(props) {

  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.root}>
      <NoticeBoard
        title='Register'
        pin={
          <Pin />
        } 
      >
        <RegisterForm />
      </NoticeBoard>
    </Grid>
  );
}

export default Register;
