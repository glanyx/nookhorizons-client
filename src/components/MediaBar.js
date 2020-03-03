import React from "react";

import {
  makeStyles, fade, Grid, Button, Icon, Typography, Link
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: 50,
    display: 'inline-flex',
    backgroundColor: fade(theme.palette.common.black, .85)
  },
  buttonDiscord: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
    '&:hover': {
      backgroundColor: '#7289DA',
    }
  },
  buttonTwitter: {
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#1DA1F2',
    }
  },
  typography: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  }
}));

function MediaBar({
  props
}) {

  const classes = useStyles();

    return (
      <Grid direction='row' className={classes.wrapper}>
        <Grid
          container
          alignItems='center'
          xs={3}
          className={classes.root}
        >
          <Typography variant='body2' className={classes.typography}>
            {`Read our `}
            <Link href='/privacy'>
              Privacy Policy
            </Link>
          </Typography>
        </Grid>
        <Grid
          container
          xs={9}
          justify='flex-end'
          alignItems='center'
        >
            <Grid item>
              <Button className={classes.buttonTwitter} href="https://twitter.com/NookHorizons">
                  <Icon className={`fab fa-twitter-square`} />
                  Twitter
              </Button>
            </Grid>
            <Grid item>
              <Button className={classes.buttonDiscord} href="https://discord.gg/3NPBpZh">
                  <Icon className={`fab fa-discord`} />
                  Discord
              </Button>
            </Grid>
        </Grid>
      </Grid>
    );
}

export default MediaBar;
