import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { StyledTextbox, LoaderButton } from '../components';
import { useFormFields } from '../libs/hooksLib';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(5)
    },
    root: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 20,
        padding: theme.spacing(5)
    }
}))

function User(props) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    oldPassword: '',
    newPassword: '',
  });

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.completeNewPassword(
            user,
            fields.oldPassword,
            fields.newPassword
        );
        setLoading(false);
        setSuccess(true);
      } catch (e) {
        setLoading(false);
        console.log(e);
        alert(e.message);
      }
  }

  function validateForm() {
    return(
      validatePassword() &&
      fields.oldPassword.length > 0
    )
  }

  function validatePassword() {
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])(?=.{8,})");
    return regex.test(fields.newPassword);
  }

  return (
    <>
      <div>
        <h1>User Page</h1>
      </div>
      <form
        name="changepassword"
        onSubmit={handleSubmit}
      >
        <Box className={classes.wrapper}>
          <Grid container spacing={2} className={classes.root}>
            <Grid container item>
                <StyledTextbox
                autoFocus
                className={classes.textbox}
                id="oldPassword"
                placeholder="Old Password"
                type="password"
                variant="outlined"
                color="primary"
                value={fields.oldPassword}
                onChange={handleFieldChange}
            >
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <StyledTextbox
                className={classes.textbox}
                id="newPassword"
                placeholder="New Password"
                type="password"
                variant="outlined"
                color="primary"
                value={fields.newPassword}
                onChange={handleFieldChange}
                error={!validatePassword() && fields.newPassword.length > 0}
                helperText={(!validatePassword() && fields.newPassword.length > 0) && (
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
              </StyledTextbox>
            </Grid>
            <Grid container item>
              <LoaderButton
                className={classes.button}
                disabled={!validateForm() || loading}
                type="submit"
                loading={loading}
                success={success}
              >
                Change Password
              </LoaderButton>
            </Grid>
        </Grid>
        </Box>
      </form>
    </>
  );
}

export default User;