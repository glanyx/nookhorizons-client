import React from 'react';
import './App.css';

import {withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Routes from './Routes';
import { NavBar } from './components';

const styles = () => ({
  wrapper: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/ac%20background.png'})`
  },
  // innerWrapper: {
  //   backgroundImage: `url(${process.env.PUBLIC_URL + '/backdrop.png'})`,
  // },
  banner: {
    width: '100%',
    height: '150px'
  }
});

function App(props) {

  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        <div className="App-header container">
          <div className={classes.banner} />
          <NavBar />
          <div className={classes.innerWrapper}>
            <Routes />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
