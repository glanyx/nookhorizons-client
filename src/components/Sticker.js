import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: (props) => ({
    backgroundImage: `url(${process.env.PUBLIC_URL + `/${props.sticker}.png`})`,
    backgroundSize: 'cover',
    width: '80px',
    height: '80px'
  })
}));

const stickers = [
    'SmallStampLogin',
    'BigStamp'
]

function Sticker() {

  const sticker = stickers[Math.random() * stickers.length << 0];
  const classes = useStyles({sticker});

  return (
    <div className={classes.root} />
  );
}

export default Sticker;
