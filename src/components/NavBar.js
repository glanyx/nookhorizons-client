import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  InputBase,
  fade,
  Fade,
  Menu,
  MenuItem
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/MenuBar_back.png'})`,
    display: "flex",
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,.8)',
  },
  button: {
    textShadow: '0px 2px 1px rgba(190,140,70,.8)'
  },
  padding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1),
    width: "3px",
    height: "15px",
    borderRadius: 50
  },
  search: {
    color: fade("#ffffff", 0.7),
    margin: theme.spacing(1),
    position: "relative",
    borderRadius: 20,
    backgroundColor: fade(theme.palette.common.black, 0.3),
    boxShadow: '0px 0px 2px 2px rgba(190,140,70,.8)',
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.4)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    display: "block"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  menu: {
    '& .MuiMenu-paper': {
      backgroundColor: fade(theme.palette.common.black, 0.8),
      color: theme.palette.common.white
    }
  },
  menuitem: {
  }
}));

function NavBar({
  userProps,
  onLogout
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
        <Button className={classes.button} component={RouterLink} to="/collections">
          Collections
        </Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button className={classes.button} component={RouterLink} to="/guides">
          Guides
        </Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button className={classes.button} href="https://discord.gg/YM29Fxb">Discord</Button>
        <Divider className={classes.divider} orientation="vertical" />
      </Grid>
      <Grid
        container
        className={classes.padding}
        alignItems="center"
        alignContent="flex-end"
        justify="flex-end"
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search.."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        {userProps.isAuthenticated ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='user-menu'
              className={classes.menu}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
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

export default withRouter(NavBar);
