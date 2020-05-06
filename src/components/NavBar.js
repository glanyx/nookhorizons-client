import React, { useState, useEffect } from "react";
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
  Typography,
  Drawer
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/MenuBar_back.png'})`,
    backgroundSize: 'cover',
    display: "flex",
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,.8)',
    paddingTop: theme.spacing(.5),
    paddingBottom: theme.spacing(.5)
  },
  button: {
    textShadow: '1px 2px 2px rgba(210,170,110,.7)',
    height: '100%',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, .65),
      boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
      color: theme.palette.primary.light,
      textShadow: '1px 2px 0px rgba(50,40,30,.9)',
    },
  },
  drawerbutton: {
    height: '100%',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      backgroundImage: `-webkit-gradient(linear, 0 0, 100% 100%,
        color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
        color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
        color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
        to(transparent))`,
      backgroundSize: '50px 50px',
      color: theme.palette.common.black,
    },
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
  drawerwrapper: {
    display: 'grid',
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `-webkit-gradient(linear, 0 0, 100% 100%,
      color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
      color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
      color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
      to(transparent))`,
    backgroundSize: '50px 50px',
    height: '100vh'
  },
  drawersoontext: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 500,
    top: '25%',
    color: theme.palette.common.white
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
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [username, setUsername] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
    setAnchorEl2(null);
    setOpenDrawer(false);
  }

  async function handleLogout() {
    setAnchorEl(null);
    setAnchorEl2(null);
    setOpenDrawer(false);
    setUserMenu(false);
    userProps.setUser(null);
    onLogout();
  }

  const handleResetNav = () => {
    setOpenDrawer(false);
    setUserMenu(false);
  }

  useEffect(() => {
    if (userProps.user) {
      setUsername(userProps.user.username);
    }
  }, [userProps.user]);

  if (isWidthDown('md', props.width)) {
    return(
      <>
        <div className={classes.root}>
          <Grid container className={classes.padding} alignItems="center">
            <Button className={classes.button} onClick={() => setOpenDrawer(true)}>
              <Icon className={`fas fa-bars`} />
            </Button>
          </Grid>
        </div>
        <Drawer anchor='left' open={openDrawer} onClose={handleClose}>
          <div className={classes.drawerwrapper}>
            {!userMenu
            ?
              <>
                <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/">
                  News
                </Button>
                <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/marketplace">
                  Market
                </Button>
                <Button disabled className={`${classes.drawerbutton} ${classes.comingsoon}`} onClick={handleResetNav} component={RouterLink} to="/collections">
                  Collections
                  <Typography className={classes.drawersoontext}>Coming Soon!</Typography>
                </Button>
                <Button disabled className={`${classes.drawerbutton} ${classes.comingsoon}`} onClick={handleResetNav} component={RouterLink} to="/guides">
                  Guides
                  <Typography className={classes.drawersoontext}>Coming Soon!</Typography>
                </Button>
                {!userProps.isAuthenticated
                ?
                  <>
                    <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/register">
                      Register
                    </Button>
                    <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/login">
                      Login
                    </Button>
                    <Button className={classes.drawerbutton} onClick={handleResetNav} href="https://discord.gg/3NPBpZh" target="_blank">
                      <Icon className={`fab fa-discord`} />
                    </Button>
                  </>
                :
                  <>
                    <Button className={classes.drawerbutton} onClick={() => setUserMenu(true)}>
                      <Icon className={`fas fa-user-circle`} />&nbsp;
                      {username}
                    </Button>
                  </>
                }
              </>
            :
              <>
                <Button className={classes.drawerbutton} onClick={() => setUserMenu(false)}>
                  <ArrowBackIcon />
                </Button>
                <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/user">
                  My Account
                </Button>
                <Button className={classes.drawerbutton} onClick={handleResetNav} component={RouterLink} to="/user/sales">
                  My Trades
                </Button>
                <Button className={classes.drawerbutton} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            }
          </div>
        </Drawer>
      </>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container className={classes.padding} alignItems="center">
          <Grid item xs={8}>
            <Grid container direction='row' alignItems="center">
              <Button className={classes.button} component={RouterLink} to="/">
                News
              </Button>
              <Divider className={classes.divider} orientation="vertical" />
              <Button className={classes.button} onClick={(event) => setAnchorEl2(event.currentTarget)}>
                Database
              </Button>
              <Menu
                id='database-menu'
                className={classes.menu}
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem className={classes.menuitem} onClick={handleClose} component={RouterLink} to='/items'>Items</MenuItem>
                <MenuItem className={classes.menuitem} onClick={handleClose} component={RouterLink} to='/recipes'>Recipes</MenuItem>
                <MenuItem className={classes.menuitem} onClick={handleClose} component={RouterLink} to='/villagers'>Villagers</MenuItem>
              </Menu>
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
          </Grid>
          <Grid item xs={4}>
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
                    <Icon className={`fas fa-user-circle`} />&nbsp;
                    {username}
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
                    <MenuItem className={classes.menuitem} onClick={handleClose} component={RouterLink} to='/user'>My Account</MenuItem>
                    <MenuItem className={classes.menuitem} onClick={handleClose} component={RouterLink} to='/user/sales'>My Trades</MenuItem>
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withRouter(NavBar));