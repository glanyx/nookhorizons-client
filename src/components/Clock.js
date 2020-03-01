import React from "react";
import "./Clock.css";
import { useNewTimer } from '../libs/timerHook';
import { makeStyles, Typography, Divider, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "inline-block"
  },
  timeWrapper: {
    display: "block",
    color: props => props.color
  },
  flexWrapper: {
    display: "flex"
  },
  time: {
    fontSize: 30,
    fontWeight: "bold",
    margin: "auto"
  },
  timeSuffix: {
    marginTop: "auto",
    marginBottom: "4px",
    marginRight: "auto",
    marginLeft: theme.spacing(-1)
  },
  dateWrapper: {
    color: props => props.color,
    display: "flex",
    padding: theme.spacing(1),
    borderRadius: 15
  },
  dateSuffix: {
    marginLeft: theme.spacing(1),
    marginTop: "auto",
    marginBottom: "2px",
    padding: theme.spacing(1),
    paddingTop: "1px",
    paddingBottom: "1px",
    borderRadius: 15,
    color: theme.palette.common.black,
    backgroundColor: props => props.color,
    fontWeight: 'bold'
  },
  divider: {
    backgroundColor: props => props.color,
    height: "2px"
  }
}));

function Clock(props) {
    
  const classes = useStyles(props);
  const timer = useNewTimer(new Date());

  const hours = timer.getHours();
  const minutes = timer.getMinutes();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const month = months[timer.getMonth()];
  const dateNumber = timer.getDate();
  const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  const day = days[timer.getDay()];

  return (
    <div className={props.className}>
      <Grid container direction='column'>
        <Grid item className={classes.timeWrapper}>
          <Grid item className={classes.flexWrapper}>
            <Typography className={classes.time}>
              {`${hours >= 13 ? hours - 12 : hours}:${
                minutes.toString().length < 2 ? `0${minutes}` : minutes
              }`}
            </Typography>
            <Typography className={classes.timeSuffix}>
              {hours >= 12 ? "PM" : "AM"}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <Grid container className={classes.dateWrapper} alignItems='center'>
          <Typography className={classes.date}>{`${month} ${dateNumber}`}</Typography>
          <Typography className={`text-cutout ${classes.dateSuffix}`}>
            {day}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Clock.defaultProps = {
  color: "white"
};

export default Clock;
