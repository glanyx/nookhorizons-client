import React, { useState } from "react";
import { RegisterForm, NoticeBoard, Pin, Sticker, Tos } from '../components';
import { Grid, makeStyles, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexWrap: 'wrap'
  },
  button: {
    color: 'rgba(0, 0, 0, 0.75)',
    textShadow: "1px 2px 2px rgba(210,170,110,.7)",
    fontSize: 36,
    fontWeight: 900
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
          />
        </NoticeBoard>
      </Grid>
      <Dialog className={classes.backdrop} open={open} onClose={handleClose} aria-labelledby='tos-dialog' maxWidth={960}>
        <DialogContent>
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
