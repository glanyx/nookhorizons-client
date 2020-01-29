import React from "react";
import { Button, Divider, Grid, withStyles, InputBase, fade } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: {
    background: "#aa772c",
    display: "flex",
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
    margin: theme.spacing(1),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
});

function NavBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
      <IconButton
            aria-label="site menu"
            aria-controls="menu-appbar"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Button>News</Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button>Market</Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button>Guides</Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button>Discord</Button>
        <Divider className={classes.divider} orientation="vertical" />
      </Grid>
      <Grid
        container
        alignItems="center"
        alignContent="flex-end"
        justify="flex-end"
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search..'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {props.isAuthenticated
        ? <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        : <>
            <Button>Register</Button>
              <Divider className={classes.divider} orientation="vertical" />
            <Button>Login</Button>
          </>
        }
      </Grid>
    </div>
  );
}

export default withStyles(styles)(NavBar);
