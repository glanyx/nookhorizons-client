import React from "react";
import { Box, Grid, Link, Typography, makeStyles } from "@material-ui/core";

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import StyledTextbox from './StyledTextbox';
import StyledCheckbox from "./StyledCheckbox";
import LoaderButton from './LoaderButton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '400px',
    borderRadius: '20px',
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark
  },
  root: {
    display: 'flex',
    padding: theme.spacing(5),
    justify: 'center'
  },
  textbox: {
    margin: theme.spacing(1),
    width: '100%',
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '& label': {
      fontWeight: 'bold'
    },
    '& label.Mui-focused': {
      color: theme.palette.primary.dark
    },
    '& .MuiInput-underline:after': {
      color: theme.palette.primary.dark
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark,
      }
    }
  },
  checkbox: {
    marginLeft: theme.spacing(1),
    marginRight: '0px'
  },
  button: {
    margin: 'auto'
  },
  typography: {
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

function LoginForm(props) {

  const classes = useStyles();
  const preventDefault = event => event.preventDefault();

  return (
    <form>
      <Box border={5} className={classes.wrapper}>
        <Grid container className={classes.root} border={5}>
          <Grid container item>
            <StyledTextbox
              className={classes.textbox}
              type='email'
              label='Email address'
              variant='outlined'
              color='primary'
            >
              <MailIcon />
            </StyledTextbox>
          </Grid>
          <Grid container item>
            <StyledTextbox
              className={classes.textbox}
              type='password'
              label='Password'
              variant='outlined'
              color='primary'
            >
              <LockIcon />
            </StyledTextbox>
          </Grid>
          <Grid container item>
            <StyledCheckbox className={classes.checkbox} />
            <Typography variant='body2' className={classes.typography}>
              {`I accept the `}
              <Link href='#' onClick={preventDefault}>
                Terms and Conditions
              </Link>
            </Typography>
          </Grid>
          <Grid container item>
            <LoaderButton className={classes.button}>
              Login
            </LoaderButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default LoginForm;
