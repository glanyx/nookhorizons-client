import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  outer: {
    display: 'inline-block',
    padding: theme.spacing(0, 3, 6, 3),
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/WoodBackground.png'})`,
    backgroundColor: 'transparent',
    backgroundSize: '100% 100%',
    overflowX: 'hidden'
  },
  inner: {
      position: 'relative',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/PaperMidRegisterFull.png'})`,
      backgroundColor: 'transparent',
      backgroundSize: '100% 105%',
      backgroundRepeat: 'no-repeat',
      paddingTop: theme.spacing(0.2),
      paddingRight: theme.spacing(5),
      marginRight: theme.spacing(-5),
      paddingBottom: theme.spacing(3),
      marginBottom: theme.spacing(-3)
  },
  title: {
      margin: theme.spacing(3, 0, 1, 0),
      letterSpacing: theme.spacing(1),
      fontSize: 40
  },
  pin: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(-2)
  },
  contentWrapper: {
      marginTop: theme.spacing(3)
  },
  stamp: {
    position: 'absolute',
    display: 'flex',
    maxWidth: 80,
    bottom: 60,
    right: '15%'
  }
}));

function NoticeBoard({
    title,
    pin,
    sticker,
    ...props
}) {

  const classes = useStyles();

  return (
    <Paper className={classes.outer} {...props}>
        <Typography variant='h2' className={classes.title}>
            {`- ${title} -`}
        </Typography>
        <Paper className={classes.inner}>
            {pin 
            ? <Grid container justify='center' className={classes.pin}>
                    {pin}
                </Grid>
            : null
            }
            <div className={classes.contentWrapper}>
                {props.children}
            </div>
            {sticker 
            ? <Grid container justify='center' className={classes.stamp}>
                    {sticker}
                </Grid>
            : null
            }
        </Paper>
    </Paper>
  );
}

NoticeBoard.propTypes = {
    title: PropTypes.string,
    pin: PropTypes.node,
    sticker: PropTypes.node
}

export default NoticeBoard;
