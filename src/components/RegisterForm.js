import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Box, Grid, Link, Typography, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, fade, makeStyles } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { useFormFields } from '../libs/hooksLib';
import StyledTextbox from './StyledTextbox';
import StyledCheckbox from "./StyledCheckbox";
import LoaderButton from './LoaderButton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderRadius: '20px',
  },
  root: {
    display: 'flex',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(5),
    justify: 'center',
    maxWidth: 500
  },
  textbox: {
    margin: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: '100%'
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
  },
  confirmationWrapper: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(10),
    maxWidth: 500
  },
  confirmation: {
    marginBottom: theme.spacing(2)
  },
  code: {
    maxWidth: 200
  },
  link: {
    marginLeft: theme.spacing(1)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function RegisterForm({
  onSubmit,
  onTos,
  ...props
}) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    state: false,
    type: 'warning',
    message: 'message'
  });
  const [open, setOpen] = useState(false);

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [singleAccount, setSingleAccount] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    code: '',
    resendUsername: ''
  });

  function validateForm() {
    return (
      fields.username.length > 0 &&
      validateEmail() &&
      validatePassword() &&
      fields.email === fields.confirmEmail &&
      fields.password === fields.confirmPassword &&
      termsAndConditions &&
      singleAccount
    )
  }

  function validateConfirmForm() {
    return fields.code.length > 0;
  }

  function validateEmail() {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(fields.email.toLowerCase());
  }

  function validatePassword() {
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])(?=.{8,})");
    return regex.test(fields.password) && fields.password !== fields.username;
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    
    try {
      const newUser = await Auth.signUp({
        username: fields.username,
        password: fields.password,
        attributes: {
          email: fields.email
        }
      });
      setSnackbar({
        type: 'success',
        message: `We've sent you a confirmation code! Check your email!`,
        state: true
      });
      setLoading(false);
      setUser(newUser);
    } catch(e) {
      setSnackbar({
        type: 'error',
        message: e.message,
        state: true
      });
      setLoading(false);
    }
  }

  const openDialog = () => {
    setOpen(true);
  }

  const handleDialogClose = () => {
    setOpen(false);
  }

  async function resendCode(event) {
    event.preventDefault();
    setOpen(false);

    try {
      const newUser = await Auth.resendSignUp(fields.resendUsername);
      setSnackbar({
        type: 'success',
        message: `We've sent you a new confirmation code! Check your email!`,
        state: true
      });
      setLoading(false);
      setUser(newUser);
    } catch (e) {
      setSnackbar({
        type: 'error',
        message: e.message,
        state: true
      });
      setLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {

    event.preventDefault();
    setLoading(true);
    try {
      await Auth.confirmSignUp(fields.username, fields.code);
      props.history.push("/registered");
    } catch (e) {
      setSnackbar({
        type: 'error',
        message: e.message,
        state: true
      });
      setLoading(false);
    }
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ ...snackbar, state: false });
  }

  return (
    <>
      {user === null
        ? <form onSubmit={onSubmit || handleSubmit}>
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
                    error={!validateEmail() && fields.email.length > 0}
                    helperText={(!validateEmail() && fields.email.length > 0) && 'Please enter a valid email'}
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
                    error={fields.email !== fields.confirmEmail && fields.confirmEmail.length > 0}
                    helperText={(fields.email !== fields.confirmEmail && fields.confirmEmail.length > 0) && 'Emails must match'}
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
                    error={!validatePassword() && fields.password.length > 0}
                    helperText={(!validatePassword() && fields.password.length > 0) && (
                      <>
                        <span>Password requires the following:</span>
                          <li>At least 8 characters long</li>
                          <li>At least 1 lowercase character</li>
                          <li>At least 1 uppercase character</li>
                          <li>At least 1 numerical character</li>
                          <li>At least 1 special character - {`Accepted are ! ? @ # $ % ^ & *`}</li>
                          <li>Must not be the same as your Username</li>
                      </>
                      )}
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
                    error={fields.password !== fields.confirmPassword && fields.confirmPassword.length > 0}
                    helperText={(fields.password !== fields.confirmPassword && fields.confirmPassword.length > 0) && 'Passwords must match'}
                  >
                    <LockIcon />
                  </StyledTextbox>
                </Grid>
                <Grid item>
                  <Typography variant='body2' className={classes.link}>
                    <Link href='#' onClick={openDialog}>
                      Need a new confirmation code?
                    </Link>
                  </Typography>
                </Grid>
                <Grid container item>
                  <StyledCheckbox id='singleAccount' checked={singleAccount} onChange={e => setSingleAccount(e.target.checked)} className={classes.checkbox} />
                  <Typography variant='body2' className={classes.typography}>
                    I understand and agree that I am only allowed a single account
                  </Typography>
                </Grid>
                <Grid container item>
                  <StyledCheckbox id='termsAndConditions' checked={termsAndConditions} onChange={e => setTermsAndConditions(e.target.checked)} className={classes.checkbox} />
                  <Typography variant='body2' className={classes.typography}>
                    {`I accept the `}
                    <Link href='#' onClick={onTos}>
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
        : <div className={classes.confirmationWrapper}>
            <Typography className={classes.confirmation}>
              Hey there, thanks for registering!
            </Typography>
            <Typography>
              You should have a confirmation code in your inbox! Use this to verify your account. Don't forget to check your SPAM folder in case you can't see it.
            </Typography>
            <form onSubmit={handleConfirmationSubmit}>
              <StyledTextbox
                autoFocus
                id='code'
                className={`${classes.textbox} ${classes.code}`}
                placeholder='Confirmation Code'
                variant='outlined'
                color='primary'
                value={fields.code}
                onChange={handleFieldChange}   
              />
              <LoaderButton className={classes.button} disabled={!validateConfirmForm() || loading} type='submit' loading={loading} >
                Confirm
              </LoaderButton>
            </form>
          </div>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.state}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
      <Dialog className={classes.dialog} open={open} onClose={handleDialogClose} aria-labelledby='resend-code-dialog' maxWidth={'xl'}>
        <DialogTitle id='resend-code-dialog-title'>Resend Confirmation Code</DialogTitle>
        <DialogContent className={classes.dialogcontent}>
          <DialogContentText>
            Please enter your username:
          </DialogContentText>
          <StyledTextbox
            autoFocus
            id='resendUsername'
            label='Username'
            type='text'
            value={fields.resendUsername}
            onChange={handleFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} className={classes.dialogbutton}>
            Cancel
          </Button>
          <Button onClick={resendCode} className={classes.dialogbutton}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  onTos: PropTypes.func
}

export default withRouter(RegisterForm);
