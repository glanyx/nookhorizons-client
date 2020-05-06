import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

import { makeStyles, fade, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import Routes from "./Routes";
import { Clock, NavBar, MediaBar } from "./components";
import { API, Auth } from "aws-amplify";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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

  const DEFAULT_MESSAGE = `Something went wrong.. Please try again or contact the Nook Horizons team.`;

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [user, setUser] = useState({
    username: '',
    discordTag: '',
  });

  const [alert, setAlert] = useState({
    active: false,
    type: 'warning',
    message: '[message]'
  })

  useEffect((setAlert) => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
  
        const user = await loadUser();
        setUser(user);

      } catch (e) {
        if (e !== "No current user") {
          setAlert({
            active: true,
            type: 'error',
            message: e.response.data ? e.response.data.error : e.message
          });
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

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({
      ...alert,
      active: false,
    })
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
              userProps={{ isAuthenticated, userHasAuthenticated, user, setUser, setAlert }}
              onLogout={handleLogout}
            />
            <div className={classes.fill}>
              <Routes appProps={{ isAuthenticated, userHasAuthenticated, user, setUser, setAlert }} />
            </div>
            <MediaBar />
          </div>
        </div>
        <Snackbar open={alert.active} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alert.message === 'undefined' ? 'error' : alert.type}>
            {alert.message === 'undefined' ? DEFAULT_MESSAGE : alert.message}
          </Alert>
        </Snackbar>
      </MuiThemeProvider>
    )
  );
}

export default withRouter(App);
