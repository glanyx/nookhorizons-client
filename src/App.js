import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

import { makeStyles } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import Routes from "./Routes";
import { NavBar } from "./components";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/ac%20background.png"})`
  },
  backdrop: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/backdrop.png"})`
  },
  banner: {
    width: "100%",
    height: "150px",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/banner.png"})`
  }
}));

function App(props) {
  const classes = useStyles();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <MuiThemeProvider theme={theme}>
        <div className={classes.wrapper}>
          <div className={`App-header container ${classes.backdrop}`}>
            <div className={classes.banner} />
            <NavBar
              userProps={{ isAuthenticated, userHasAuthenticated }}
              onLogout={handleLogout}
            />
            <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  );
}

export default withRouter(App);
