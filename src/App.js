import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

import { makeStyles, fade } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import Routes from "./Routes";
import { Clock, NavBar } from "./components";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(() => ({
  wrapper: {
    background: `linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)),url(${process
      .env.PUBLIC_URL + "/grass1.png"})`,
    backgroundSize: '150px',
    backgroundColor: theme.palette.secondary.dark
  },
  backdrop: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/backdrop13.png"})`,
    backgroundSize: '500px',
    height: "100%",
    display: 'block'
  },
  banner: {
    width: "100%",
    height: "150px",
    display: "table",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/banner2.png"})`,
    backgroundSize: 'cover'
  },
  clock: {
    position: "relative",
    padding: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.black, 0.35),
    color: "white",
    borderRadius: 10,
    display: "inline-block",
    float: "right",
    marginRight: theme.spacing(2)
  },
  clockWrapper: {
    display: "table-cell",
    verticalAlign: "middle"
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
          <div className={`App-header container ${classes.backdrop}`} id='test'>
            <div className={classes.banner}>
              <div className={classes.clockWrapper}>
                <Clock className={classes.clock} />
              </div>
            </div>
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
