import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import { Box, Grid, Link, Typography, fade, makeStyles } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { useFormFields } from '../libs/hooksLib';
import StyledTextbox from './StyledTextbox';
import StyledCheckbox from "./StyledCheckbox";
import LoaderButton from './LoaderButton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '500px',
    borderRadius: '20px',
    height: '100%'
  },
  root: {
    display: 'flex',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(5),
    justify: 'center'
  },
  title: {
    color: fade(theme.palette.common.black, 0.8),
    textShadow: '1px 2px 2px rgba(210,170,110,.7)',
    position: 'relative',
    padding: theme.spacing(2),
    transform: 'translateY(-50%)',
    marginBottom: theme.spacing(-5),
    backgroundImage: `url(${process.env.PUBLIC_URL + '/MenuBar_back.png'})`,
    backgroundSize: 'cover',
    borderRadius: 20,
    boxShadow: '2px 4px 4px 2px rgba(0,0,0,.8)',
  },
  textbox: {
    margin: theme.spacing(1),
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: 50,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
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
    marginBottom: 'auto',
  }
}));

function RegisterForm({
  onSubmit,
  props
}) {
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();

  const [loading, setLoading] = useState(false);

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  function validateForm() {
    return (
      fields.username.length > 0 &&
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.email === fields.confirmEmail &&
      fields.password === fields.confirmPassword &&
      termsAndConditions
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    
    try {
      await Auth.signUp({
        username: fields.username,
        password: fields.password,
        attributes: {
          email: fields.email
        }
      });
      setLoading(false);
    } catch(e) {
      alert(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit || handleSubmit}>
        <Box className={classes.wrapper}>
          <Grid container className={classes.root}>
            <Grid container item>
              <StyledTextbox
                autoFocus
                id='username'
                className={classes.textbox}
                placeholder='Username'
                type='username'
                variant='outlined'
                color='primary'
                value={fields.username}
                onChange={handleFieldChange}
              >
                <AccountCircleIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                id='email'
                className={classes.textbox}
                placeholder='Email address'
                type='email'
                variant='outlined'
                color='primary'
                value={fields.email}
                onChange={handleFieldChange}
              >
                <MailIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                id='confirmEmail'
                className={classes.textbox}
                placeholder='Confirm Email address'
                type='email'
                variant='outlined'
                color='primary'
                value={fields.confirmEmail}
                onChange={handleFieldChange}
              >
                <MailIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                id='password'
                className={classes.textbox}
                placeholder='Password'
                type='password'
                variant='outlined'
                color='primary'
                value={fields.password}
                onChange={handleFieldChange}
              >
                <LockIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                id='confirmPassword'
                className={classes.textbox}
                placeholder='Confirm Password'
                type='password'
                variant='outlined'
                color='primary'
                value={fields.confirmPassword}
                onChange={handleFieldChange}
              >
                <LockIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledCheckbox id='termsAndConditions' checked={termsAndConditions} onChange={e => setTermsAndConditions(e.target.checked)} className={classes.checkbox} />
              <Typography variant='body2' className={classes.typography}>
                {`I accept the `}
                <Link href='#' onClick={preventDefault}>
                  Terms and Conditions
                </Link>
              </Typography>
            </Grid>
            <Grid container item>
              <LoaderButton className={classes.button} disabled={!validateForm() || loading} type='submit' loading={loading} >
                Register
              </LoaderButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default RegisterForm;
