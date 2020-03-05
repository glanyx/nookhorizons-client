import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  Box,
  Grid,
  Typography,
  Link,
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
  const preventDefault = event => event.preventDefault();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      await Auth.signIn(fields.username, fields.password, {
        "form-name": "login"
      });
      setSuccess(true);
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      console.log(e);
      alert(e.message);
      setLoading(false);
    }
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
                <Link href="#" onClick={preventDefault}>
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
    </>
  );
}

export default LoginForm;
