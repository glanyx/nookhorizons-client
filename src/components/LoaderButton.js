import React from "react";
import clsx from "clsx";
import PropTypes from 'prop-types';
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
  type,
  loading,
  success,
  ...props
}) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  return (
    <div className={classes.root} {...props}>
      <div className={classes.wrapper}>
        <StyledButton
          variant={variant}
          color={color}
          className={buttonClassname}
          disabled={loading}
          type={type}
          {...props}
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

LoaderButton.propTypes = {
  loading: PropTypes.bool,
  success: PropTypes.bool
}

export default LoaderButton;
