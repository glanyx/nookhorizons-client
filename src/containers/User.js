import React, { useState, useEffect } from "react";
import { Auth, API } from 'aws-amplify';
import { makeStyles, fade, Box, Grid, Typography, Link } from '@material-ui/core';
import { StyledTextbox, LoaderButton } from '../components';
import { useFormFields } from '../libs/hooksLib';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(5)
    },
    root: {
        backgroundColor: fade(theme.palette.common.white, .65),
        borderRadius: 20,
        padding: theme.spacing(5),
        color: theme.palette.common.black
    },
    title: {
      marginBottom: theme.spacing(1)
    },
    text: {
      fontSize: 14
    },
    username: {
      fontWeight: 700
    },
    discordwrapper: {
      marginTop: theme.spacing(1)
    },
    discordtag: {
      marginLeft: theme.spacing(2),
      fontWeight: 700
    }
}))

function User(props) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discordSuccess, setDiscordSuccess] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    oldPassword: '',
    newPassword: '',
  });
  const [discordTag, setDiscordTag] = useState('');

  const editDiscordTag = () => {
    setDiscordSuccess(false);
    setEditing(true);
  }

  const handleDiscordSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try{
      await storeDiscordTag({
        discordTag: discordTag
      });
    } catch(e) {
        alert(e.message);
    }
    props.setUser({
      ...props.user,
      discordTag: discordTag
    })
    setSubmitting(false);
    setDiscordSuccess(true);
    setEditing(false);
  }

  function storeDiscordTag(tag) {
    return API.put('nh', '/user', {
      body: tag
    });
  }

  const handlePasswordSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(
            user,
            fields.oldPassword,
            fields.newPassword
        );
        setLoading(false);
        setSuccess(true);
      } catch (e) {
        setLoading(false);
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

  
  function validateDiscord() {
    let regex = /([\S ]{2,32}#[0-9]{4,4})$/;
    return regex.test(discordTag);
  }

  useEffect(() => {
    setDiscordTag(props.user ? (props.user.discordTag ? props.user.discordTag : '') : '');
  }, [props]);

  return (
    <>
      <Typography variant='h2'>
        Hi{props.user ? ` ${props.user.username}` : null}!
      </Typography>
      <form
        name="discord"
        onSubmit={handleDiscordSubmit}
      >
        <Box className={classes.wrapper}>
          <Grid container spacing={2} className={classes.root}>
            <Typography variant='h3' className={classes.title}>
              Add your Discord Tag
            </Typography>
            <Typography variant='body2' className={classes.text}>
              We need your Discord Tag to allow buyers to contact you. When someone buys one of your listings, we'll be giving them your Discord Tag so they can reach out to you.
            </Typography>
            <Grid container>
              {!editing
                ?
                  <Grid container direction='column'spacing={1} className={classes.discordwrapper}>
                    <Typography variant='body1'>Your Discord Tag:</Typography>
                    <Typography variant='body1' className={classes.discordtag}>
                      {props.user ? props.user.discordTag : null}&nbsp;
                      <Link href='#' onClick={editDiscordTag}>
                        {props.user ? (props.user.discordTag ? 'Change' : 'Add') : ''}
                      </Link>
                    </Typography>
                  </Grid>
                :
                  <>
                    <StyledTextbox
                      autoFocus
                      id="discordTag"
                      placeholder="Discord Tag"
                      type="text"
                      variant="outlined"
                      color="primary"
                      value={discordTag}
                      onChange={event => setDiscordTag(event.target.value)}
                      error={!validateDiscord() && discordTag.length > 0}
                      helperText={(!validateDiscord() && discordTag.length > 0) && (
                        <>
                          Discord tags should look like this: <span className={classes.username}>NookHorizons#0001</span>
                        </>
                      )}
                    />
                    <Typography variant='body1'>
                      <Link href='#' onClick={() => setEditing(false)}>
                        Cancel
                      </Link>
                    </Typography>
                    <Grid container item>
                      <LoaderButton
                        className={classes.button}
                        disabled={!validateDiscord() || props.user.discordTag === discordTag || submitting}
                        type="submit"
                        loading={submitting}
                        success={discordSuccess}
                      >
                        Save
                      </LoaderButton>
                    </Grid>
                  </>
              }
            </Grid>
          </Grid>
        </Box>
      </form>
      <form
        name="changepassword"
        onSubmit={handlePasswordSubmit}
      >
        <Box className={classes.wrapper}>
          <Grid container spacing={2} className={classes.root}>
            <Typography variant='h3' className={classes.title}>
              Change Your Password
            </Typography>
            <Grid container item>
              <StyledTextbox
                autoFocus
                id="oldPassword"
                placeholder="Old Password"
                type="password"
                variant="outlined"
                color="primary"
                value={fields.oldPassword}
                onChange={handleFieldChange}
              />
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