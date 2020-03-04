import React from "react";
import { makeStyles, Typography, Grid, Button, Icon } from "@material-ui/core";
import { NoticeBoard, Pin } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    outerwrapper: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(10),
        maxWidth: '600px',
        height: '300px'
    },
    message: {
        marginBottom: theme.spacing(2)
    },
    hype: {
        fontWeight: 700,
        fontSize: 24
    },
    button: {
        bottom: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: '#7289DA',
        color: theme.palette.common.white,
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#5868A0',
        }
    }
}));

function Auth() {

    const classes = useStyles();

    return (
        <Grid container justify='center' className={classes.root}>
            <NoticeBoard
                title='Success!'
                pin={
                    <Pin />
                }
            >
                <div className={classes.outerwrapper}>
                    <Typography className={classes.message}>
                        That's a wrap!
                    </Typography>
                    <Typography className={classes.message}>
                        We're still setting things up on our end whilst we wait for the game to come out.
                    </Typography>
                    <Typography className={`${classes.hype} ${classes.message}`}>
                        HYPE
                    </Typography>
                    <Typography>
                        Why don't you join our Discord server in the meantime and hype with us?
                    </Typography>
                </div>
                <Grid container justify='center'>
                    <Button className={classes.button} href="https://discord.gg/3NPBpZh">
                        <Icon className={`fab fa-discord`} />
                        Join Discord
                    </Button>
                </Grid>
            </NoticeBoard>
        </Grid>
    );
}

export default Auth;
