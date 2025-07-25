import React, { useState } from "react";
import { RegisterForm, NoticeBoard, Pin, Sticker, Tos } from '../components';
import { Grid, makeStyles, Dialog, DialogContent, DialogContentText, DialogActions, Button, fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexWrap: 'wrap',
    '& .MuiPaper-root': {
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/board.png'})`,
      backgroundColor: 'transparent',
      backgroundSize: '100% 100%'
    }
  },
  button: {
    color: 'rgba(0, 0, 0, 0.75)',
    textShadow: "1px 2px 2px rgba(210,170,110,.7)",
    fontSize: 36,
    fontWeight: 900,
    backgroundColor: fade(theme.palette.common.white, 0.35)
  }
}));

function Register(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleTos = () => {
    setOpen(!open);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Grid container justify='center' className={classes.root}>
        <NoticeBoard
          title='Register'
          pin={
            <Pin />
          }
          sticker={
            <Sticker />
          }
        >
          <RegisterForm
            onTos={handleTos}
            {...props}
          />
        </NoticeBoard>
      </Grid>
      <Dialog className={classes.backdrop} open={open} onClose={handleClose} aria-labelledby='tos-dialog' maxWidth={'xl'}>
        <DialogContent className={classes.content}>
          <DialogContentText>
            <Tos onClickAway={handleClose} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.button}>
            GOT IT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Register;
