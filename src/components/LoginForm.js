import React, { useState } from "react";
import { Auth, API } from "aws-amplify";
import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  fade,
  makeStyles
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { useFormFields } from "../libs/hooksLib";
import StyledTextbox from "./StyledTextbox";
import LoaderButton from "./LoaderButton";

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: "500px",
    minWidth: "200px",
    borderRadius: "20px"
  },
  root: {
    display: "flex",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(5),
    justify: "center"
  },
  title: {
    color: fade(theme.palette.common.black, 0.8),
    textShadow: "1px 2px 2px rgba(210,170,110,.7)",
    position: "relative",
    padding: theme.spacing(2),
    transform: "translateY(-50%)",
    marginBottom: theme.spacing(-5),
    backgroundImage: `url(${process.env.PUBLIC_URL + "/MenuBar_back.png"})`,
    backgroundSize: "cover",
    borderRadius: 20,
    boxShadow: "2px 4px 4px 2px rgba(0,0,0,.8)"
  },
  textbox: {
    margin: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: '100%'
  },
  button: {
    margin: "auto"
  },
  typography: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: theme.spacing(3)
  }
}));

function LoginForm({ onSubmit, ...props }) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  const [openForget, setOpenForget] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [user, setUser] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
    changePassword: '',
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.confirmPassword === fields.newPassword &&
      validateNewPassword()
    );
  }

  function validateEmail() {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(fields.email.toLowerCase());
  }

  function validatePassword() {
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])(?=.{8,})");
    return regex.test(fields.changePassword) && fields.changePassword !== fields.username;
  }

  function validateNewPassword() {
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])(?=.{8,})");
    return regex.test(fields.newPassword) && fields.newPassword !== fields.username;
  }

  const handleUserStore = async (username) => {

    try{
        await storeUser({
          username,
        });
    } catch(e) {
      console.log(e);
    }
  }

  function storeUser(user) {
    return API.post('nh', '/user', {
      body: user
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const userLogin = await Auth.signIn(fields.username, fields.password, {
        "form-name": "login"
      });

      if (userLogin.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUser(userLogin);
        setOpen(true);
        return;
      };

      const user = await Auth.currentUserInfo();
      handleUserStore(user.username);

      setSuccess(true);
      props.userHasAuthenticated(true);

    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  async function handleForcePassword(event) {

    event.preventDefault();
    setSubmitting(true);

    try {
      
      await Auth.completeNewPassword(
        user,
        fields.changePassword
      );

      setSubmitting(false);
      props.userHasAuthenticated(true);
      props.history.push('/');

    } catch (e) {
      setSubmitting(false);
      alert(e.message);
    }
  }

  async function handleSendCode(event) {

    event.preventDefault();
    setSubmitting(true);

    try {
      await Auth.forgotPassword(fields.email);
    } catch(e) {
      alert(e);
    }
    setCodeSent(true);
    setSubmitting(false);
  }

  async function handleForgotPassword(event) {

    event.preventDefault();
    setSubmitting(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.newPassword
      );
    } catch(e) {
      alert(e);
    }
    setCodeSent(false);
    setSubmitting(false);
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    setOpenForget(false);
  }

  function renderEmailDialog() {
    return (
      <form onSubmit={handleSendCode}>
        <DialogContent>
          <DialogContentText>
            Please enter your email address:
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            id='email'
            label='Email address'
            type='text'
            value={fields.email}
            onChange={handleFieldChange}
            error={!validateEmail() && fields.email.length > 0}
            helperText={(!validateEmail() && fields.email.length > 0) && (
              'Please enter a valid email address'
            )}
          />
        </DialogContent>
        <DialogActions>
          <LoaderButton
            disabled={!validateEmail() || submitting}
            loading={submitting}
            type='submit'
          >
            Send
          </LoaderButton>
        </DialogActions>
      </form>
    );
  }

  function renderResetDialog() {
    return (
      <form onSubmit={handleForgotPassword}>
        <DialogContent>
          <DialogContentText>
            Please check your email for the validation code.
          </DialogContentText>
          <Grid container direction='column'>
            <TextField
              autoFocus
              margin='normal'
              id='code'
              label='Validation Code'
              type='text'
              value={fields.code}
              onChange={handleFieldChange}
            />
            <TextField
              margin='normal'
              id='newPassword'
              label='New Password'
              type='password'
              value={fields.newPassword}
              onChange={handleFieldChange}
              error={!validateNewPassword() && fields.newPassword.length > 0}
              helperText={(!validateNewPassword() && fields.newPassword.length > 0) && (
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
            />
            <TextField
              margin='normal'
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              value={fields.confirmPassword}
              onChange={handleFieldChange}
              error={fields.newPassword !== fields.confirmPassword && fields.confirmPassword.length > 0}
              helperText={(fields.newPassword !== fields.confirmPassword && fields.confirmPassword.length > 0) && 'Passwords must match'}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoaderButton
            disabled={!validateResetForm() || submitting}
            loading={submitting}
            type='submit'
          >
            Set Password
          </LoaderButton>
        </DialogActions>
      </form>
    );
  }

  return (
    <>
      <form
        name="login"
        onSubmit={onSubmit || handleSubmit}
      >
        <Box className={classes.wrapper}>
          <Grid container className={classes.root}>
            <Grid container item>
              <StyledTextbox
                autoFocus
                className={classes.textbox}
                id="username"
                placeholder="Username"
                type="username"
                name="username"
                variant="outlined"
                color="primary"
                value={fields.username}
                onChange={handleFieldChange}
              >
                <AccountCircleIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                className={classes.textbox}
                id="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                color="primary"
                value={fields.password}
                onChange={handleFieldChange}
              >
                <LockIcon />
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <Typography variant="body2" className={classes.typography}>
                <Link href="#" onClick={() => setOpenForget(true)}>
                  Forgotten your password?
                </Link>
              </Typography>
            </Grid>
            <Grid container item>
              <LoaderButton
                className={classes.button}
                disabled={!validateForm() || loading}
                type="submit"
                loading={loading}
                success={success}
              >
                Login
              </LoaderButton>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Dialog open={open} onClose={handleClose} aria-labelledby='force-change-password'>
        <DialogTitle id='change-password-title'>Change your Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            id='changePassword'
            label='Password'
            type='password'
            value={fields.changePassword}
            onChange={handleFieldChange}
            error={!validatePassword() && fields.changePassword.length > 0}
            helperText={(!validatePassword() && fields.changePassword.length > 0) && (
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
            />
        </DialogContent>
        <DialogActions>
          <LoaderButton
            onClick={handleForcePassword}
            disabled={!validatePassword() || submitting}
            loading={submitting}
            type='button'
          >
            Confirm
          </LoaderButton>
        </DialogActions>
      </Dialog>
      <Dialog open={openForget} onClose={handleClose} aria-labelledby='forgot-password'>
        <DialogTitle>Forgot Password</DialogTitle>
        {!codeSent
          ? renderEmailDialog()
          : renderResetDialog()
        }
      </Dialog>
    </>
  );
}

export default LoginForm;
