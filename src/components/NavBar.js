import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Icon,
  fade,
  Fade,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/MenuBar_back.png'})`,
    backgroundSize: 'cover',
    display: "flex",
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,.8)',
    paddingTop: theme.spacing(.25),
    paddingBottom: theme.spacing(.25)
  },
  button: {
    textShadow: '1px 2px 2px rgba(210,170,110,.7)',
    height: '80%',
    '&:hover': {
      background: `linear-gradient(rgba(255,200,200,.1),rgba(255,200,200,.1)),url(${process
        .env.PUBLIC_URL + "/assets/buttonBackground.png"})`,
      boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
      color: theme.palette.primary.light,
      textShadow: '1px 2px 0px rgba(50,40,30,.9)',
    }
  },
  padding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1),
    boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
    width: "3px",
    height: "15px",
    borderRadius: 50
  },
  menu: {
    '& .MuiMenu-paper': {
      backgroundImage: 'none',
      backgroundColor: fade(theme.palette.common.black, 0.8),
      color: theme.palette.common.white
    }
  },
  comingsoon: {
    position: 'relative'
  },
  soontext: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 500,
    top: -4,
    color: theme.palette.common.white
  }
}));

function NavBar({
  userProps,
  onLogout,
  ...props
}) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleLogout() {
    setAnchorEl(null);
    onLogout();
  }

  if (isWidthDown('md', props.width)) {
    return(
      <div className={classes.root}>
        <Grid container className={classes.padding} alignItems="center">
          <Button className={classes.button}>
            <Icon className={`fas fa-bars`} />
          </Button>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container className={classes.padding} alignItems="center">
          <Button className={classes.button} component={RouterLink} to="/">
            News
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
          <Button className={classes.button} component={RouterLink} to="/marketplace">
            Market
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
          <Button disabled className={`${classes.button} ${classes.comingsoon}`} component={RouterLink} to="/collections">
            Collections
            <Typography className={classes.soontext}>Coming Soon!</Typography>
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
          <Button disabled className={`${classes.button} ${classes.comingsoon}`} component={RouterLink} to="/guides">
            Guides
            <Typography className={classes.soontext}>Coming Soon!</Typography>
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
          <Button className={classes.button} href="https://discord.gg/3NPBpZh" target="_blank">
            <Icon className={`fab fa-discord`} />
          </Button>
          <Divider className={classes.divider} orientation="vertical" />
        </Grid>
        <Grid
          container
          className={classes.padding}
          alignItems="center"
          alignContent="center"
          justify="flex-end"
        >
          {userProps.isAuthenticated ? (
            <>
              <Button className={classes.button} onClick={handleClick}>
                <Icon className={`fas fa-user-circle`} />
              </Button>
              <Menu
                id='user-menu'
                className={classes.menu}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem className={classes.menuitem} component={RouterLink} to='/user'>My Account</MenuItem>
                <MenuItem className={classes.menuitem} component={RouterLink} to='/user/sales'>My Sales</MenuItem>
                <MenuItem className={classes.menuitem} onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button className={classes.button} component={RouterLink} to="/register">
                Register
              </Button>
              <Divider className={classes.divider} orientation="vertical" />
              <Button className={classes.button} component={RouterLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withRouter(NavBar));