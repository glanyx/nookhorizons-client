import React from 'react';
import { makeStyles, fade, Paper, Grid, Typography } from '@material-ui/core';
import Img from 'react-image';

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(3)
    },
    post: {
        padding: theme.spacing(3),
        borderRadius: 20,
        backgroundColor: theme.palette.primary.light,
        backgroundImage: `-webkit-gradient(linear, 0 0, 100% 100%,
            color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
            color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
            color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
            to(transparent))`,
        backgroundSize: '50px 50px',
    },
    image: {
        width: '100%'
    },
    title: {
        fontSize: 30
    },
    postComponent: {
        backgroundColor: fade(theme.palette.common.white, .45),
        borderRadius: 20,
        padding: `${theme.spacing(2)}px !important`,
        marginBottom: theme.spacing(2),
        display: 'grid',
        fontSize: 16
    },
    signature: {
        fontWeight: 700
    }
}));

function Home(props) {

    const classes = useStyles();

    const post = {
        title: 'Website Launch',
        date: 'March 21, 2020 - 9pm GMT',
        text: ["Welcome islanders!",
        "As of today, Nook Horizons is live, HURRAY! For those of you who aren't quite sure what it is we offer, we are a trading platform for Animal Crossing: New Horizons. Our goal is to make it easy for players to buy and sell in-game items, without the hassle of having to hunt all over the internet to find exactly what you want.",
        "Although our marketplace is now available to use, we plan on making plenty of additions and improvements to it as time goes on. We want to make sure that we are able to offer you the most optimal service we can provide. There are many new features in the works too, so keep your eyes peeled as our site develops along with your islands!",
        "If you need further help, would like to report a bug or just want to chat, you should join us on Discord.",
        "Thanks for your patronage!"],
        signature: '~ The Nook Horizons Team ~',
        image: `${process.env.PUBLIC_URL + "/assets/WoodLogoTease.png"}`,
    }

    return (
        <Grid container direction='row' className={classes.wrapper}>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.post}>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={4}>
                            <Img
                                src={post.image}
                                className={classes.image}
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.postComponent}>
                            <Grid container direction='row' justify='flex-end'>
                                <Typography variant='body1'>
                                    {post.date}
                                </Typography>
                            </Grid>
                            <Typography variant='h2' className={classes.title}>
                                {post.title}
                            </Typography>
                            {post.text.map(t =>
                                <Typography variant='paragraph'>
                                    {t}
                                </Typography>
                            )}
                            <Grid container justify='flex-end'>
                                <Grid item>
                                    <Typography variant='paragraph' className={classes.signature}>
                                        {post.signature}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Home;