import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

import { makeStyles, fade } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import Routes from "./Routes";
import { Clock, NavBar, MediaBar } from "./components";
import { API, Auth } from "aws-amplify";

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    background: `linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)),url(${process
      .env.PUBLIC_URL + "/assets/grass.png"})`,
    backgroundSize: '150px',
    backgroundColor: theme.palette.secondary.dark,
    minWidth: '100%',
    minHeight: '100%',
  },
  backdrop: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/backdrop.png"})`,
    backgroundSize: '500px',
    height: '100%',
    minHeight: "100%",
    display: 'flex',
    flexDirection: 'column'
  },
  fill: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    paddingBottom: 50,
    width: '100%',
  },
  banner: {
    width: "100%",
    height: "150px",
    display: "table",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/banner2.png"})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
  
        if (isAuthenticated) {
          const user = await loadUser();
          setUser(user);
        }
      } catch (e) {
        if (e !== "No current user") {
          alert(e.response.data.error);
        }
      }
      setIsAuthenticating(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function loadUser() {
    return API.get('nh', `/user`);
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
            <div className={classes.banner}>
              <div className={classes.clockWrapper}>
                <Clock className={classes.clock} />
              </div>
            </div>
            <NavBar
              userProps={{ isAuthenticated, userHasAuthenticated, user, setUser }}
              onLogout={handleLogout}
            />
            <div className={classes.fill}>
              <Routes appProps={{ isAuthenticated, userHasAuthenticated, user, setUser }} />
            </div>
            <MediaBar />
          </div>
        </div>
      </MuiThemeProvider>
    )
  );
}

export default withRouter(App);
