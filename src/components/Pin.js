import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: (props) => ({
    backgroundImage: `url(${process.env.PUBLIC_URL + `/assets/${props.pin}.png`})`,
    backgroundSize: 'cover',
    width: '50px',
    height: '50px'
  })
}));

const pins = [
    'TurnipPin',
    'BellBag',
    'TentPin',
    'PearPin',
    'PeachPin',
    'OrangePin',
    'DodoPin',
    'Coconut',
    'Cherry',
    'apple'
]

function Pin() {

  const pin = pins[Math.random() * pins.length << 0];
  const classes = useStyles({pin});

  return (
    <div className={classes.root} />
  );
}

export default Pin;
