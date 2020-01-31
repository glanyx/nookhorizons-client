import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles, CircularProgress } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

import StyledButton from "./StyledButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: 'inline-block',
  },
  buttonSuccess: {
    backgroundColor: "green",
    color: 'white'
  },
  buttonProgress: {
    color: theme.palette.secondary.dark,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonDone: {
    color: theme.palette.secondary.dark,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

function LoaderButton({
  color = 'primary',
  variant = 'contained',
  ...props
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.root} {...props}>
      <div className={classes.wrapper}>
        <StyledButton
          variant={variant}
          color={color}
          className={buttonClassname}
          disabled={loading}
          onClick={handleClick}
        >
          {success
            ? <CheckIcon />
            : props.children
          }
        </StyledButton>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        
      </div>
    </div>
  );
}

export default LoaderButton;
