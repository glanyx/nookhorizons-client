import React from "react";
import { RegisterForm } from '../components';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10)
  }
}));

function Register(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RegisterForm />
    </div>
  );
}

export default Register;
