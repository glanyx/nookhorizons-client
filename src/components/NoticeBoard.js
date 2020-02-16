import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  outer: {
    display: 'inline-block',
    padding: theme.spacing(0, 3, 6, 3)
  },
  inner: {
      position: 'relative',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/PaperMidRegisterFull.png'})`,
      backgroundSize: '100% 105%',
      backgroundRepeat: 'no-repeat',
      paddingTop: theme.spacing(0.2),
      paddingRight: theme.spacing(5),
      marginRight: theme.spacing(-5),
      paddingBottom: theme.spacing(3),
      marginBottom: theme.spacing(-3)
  },
  title: {
      margin: theme.spacing(2, 1, 1, 1),
      letterSpacing: theme.spacing(1)
  },
  pin: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(-2)
  },
  contentWrapper: {
      marginTop: theme.spacing(3)
  },
  stamp: {
    display: 'inline-block',
    flexWrap: 'wrap',
    position: 'absolute',
    left: '65%',
    bottom: '12%'
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
            {pin 
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
