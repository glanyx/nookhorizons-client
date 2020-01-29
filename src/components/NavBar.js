import React from "react";
import { Button, Divider, Grid, withStyles } from "@material-ui/core";

const styles = () => ({
  root: {
    marginTop: "90px",
    background: "#aa772c",
    display: "flex"
  },
  divider: {
    background: "#59380e",
    width: "3px",
    height: "15px",
    borderRadius: 50
  }
});

function NavBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Button>Hamburger</Button>
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
        <Button>Login</Button>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(NavBar);
