import React from 'react';
import Img from 'react-image';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridwrapper: {
        padding: theme.spacing(5),
        width: '100%',
        height: '100%',
    },
    grid: {
        display: 'flex'
    },
    leftwrapper: {
    },
    rightwrapper: {
        display: 'flex'
    },
    logo: {
        width: 500,
        height: 270
    },
    soon: {
        width: 500,
        height: 270,
        marginTop: theme.spacing(-2)
    },
    lineup: {
        height: 400,
        width: 240
    }
}));

function Home(props) {

    const classes = useStyles();

    return (
        <>
            <Grid
                container
                direction='row'
                className={classes.gridwrapper}
            >
                <Grid
                    item
                    className={classes.leftwrapper}
                    xs={5}
                >
                    <Grid item className={classes.grid}>
                        <Img
                            className={classes.logo}
                            src={`${process.env.PUBLIC_URL + "/WoodLogoTease.png"}`}
                        />
                    </Grid>
                    <Grid item className={classes.grid}>
                        <Img
                            className={classes.soon}
                            src={`${process.env.PUBLIC_URL + "/comingsoon.png"}`}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    className={classes.rightwrapper}
                    xs={7}
                >
                    <Grid item>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/Lineup1.png"}`}
                        />
                    </Grid>
                    <Grid item>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/Lineup2.png"}`}
                        />
                    </Grid>
                    <Grid item>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/Lineup3.png"}`}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;