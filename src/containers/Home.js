import React from 'react';
import Img from 'react-image';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridwrapper: {
        padding: theme.spacing(3),
        width: '100%',
        height: '100%',
    },
    topwrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    bottomwrapper: {
        display: 'flex'
    },
    logo: {
        width: 400,
        height: 210,
        zIndex: 200
    },
    soon: {
        width: 200,
        height: 110,
        marginTop: theme.spacing(-3),
        zIndex: 8,
        marginBottom: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    lineup: {
        height: 380,
        width: 250,
    },
    lineupwrapper: {
        display: 'inline-flex'
    },
    sidewrapper: {
        marginTop: theme.spacing(-10)
    }
}));

function Home(props) {

    const classes = useStyles();

    return (
        <>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                className={classes.gridwrapper}
            >
                <Grid
                    item
                    xs={12}
                    direction='column'
                    justify='center'
                    className={classes.topwrapper}
                >
                    <Img
                        className={classes.logo}
                        src={`${process.env.PUBLIC_URL + "/WoodLogoTease.png"}`}
                    />
                    <Img
                        className={classes.soon}
                        src={`${process.env.PUBLIC_URL + "/comingsoon.png"}`}
                    />
                </Grid>
                <Grid
                    container
                    direction='row'
                    className={classes.bottomwrapper}
                    justify='center'
                    alignContent='center'
                    xs={12}
                >
                    <Grid item xs={3} justify='center' className={`${classes.lineupwrapper} ${classes.sidewrapper}`}>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/Lineup1.png"}`}
                        />
                    </Grid>
                    <Grid item xs={3} justify='center' className={classes.lineupwrapper}>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/Lineup2.png"}`}
                        />
                    </Grid>
                    <Grid item xs={3} justify='center' className={`${classes.lineupwrapper} ${classes.sidewrapper}`}>
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