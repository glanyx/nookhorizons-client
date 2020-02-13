import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { LoginForm, NoticeBoard, Pin } from '../components';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '100%',
        height: '100%'
      }
}));

function Login(props) {

    const classes = useStyles();

    return (
        <Grid container justify='center' className={classes.root}>
            <NoticeBoard
                title='Login'
                pin={
                    <Pin />
                }
            >
                <LoginForm />
            </NoticeBoard>
        </Grid>
    );
}

export default Login;