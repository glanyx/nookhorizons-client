import React from 'react';
import { makeStyles } from '@material-ui/core';

import { LoginForm } from '../components';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(10)
    }
}));

function Login(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LoginForm {...props} />
        </div>
    );
}

export default Login;