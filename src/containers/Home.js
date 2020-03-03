import React from 'react';
import Img from 'react-image';
import { Link as RouterLink, withRouter } from "react-router-dom";
import { Grid, makeStyles, Button, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 20,
        display: 'inline-flex',
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.primary.main, .85),
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    buttongrid: {
        position: 'absolute',
        bottom: 100,
        maxWidth: '100%',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            position: 'fixed',
            bottom: 60
        }
    },
    outerwrapper: {
        position: 'absolute',
        minWidth: 400,
        width: '100%',
        maxHeight: '100%',
    },
    gridwrapper: {
        position: 'relative',
        minWidth: 400,
        display: 'grid',
        maxWidth: '100%',
        maxHeight: '100%',
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/background-island2.png"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    topwrapper: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        maxWidth: '100%',
        maxHeight: '100%',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    bottomwrapper: {
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'grid',
            paddingBottom: theme.spacing(10)
        }
    },
    logo: {
        width: 360,
        height: 200,
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
        height: 350,
        width: 230,
        transition: theme.transitions.create("all"),
        '&:hover': {
            height: 400,
            width: 270,
        }
    },
    imagewrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
    },
    animation: {
        position: 'absolute',
        marginTop: theme.spacing(9),
        width: '50%',
        paddingRight: theme.spacing(1)
    },
    lineupwrapper: {
        display: 'inline-flex',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    midwrapper: {
        marginTop: theme.spacing(-3),
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        }
    },
    sidewrapper: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        }
    },
    arrowne: {
        width: 120,
        height: 80,
        top: 140,
        position: 'relative',
        '-webkit-transform': 'rotate(340deg)',
        '-moz-transform': 'rotate(340deg)',
        '-ms-transform': 'rotate(340deg)',
        '-o-transform': 'rotate(340deg)',
        transform: 'rotate(340deg)',
        [theme.breakpoints.down('sm')]: {
            top: -10,
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            '-webkit-transform': 'rotate(90deg)',
            '-moz-transform': 'rotate(90deg)',
            '-ms-transform': 'rotate(90deg)',
            '-o-transform': 'rotate(90deg)',
            transform: 'rotate(90deg)',
        }
    },
    arrowse: {
        width: 120,
        height: 80,
        top: 140,
        position: 'relative',
        '-webkit-transform': 'rotate(20deg)',
        '-moz-transform': 'rotate(20deg)',
        '-ms-transform': 'rotate(20deg)',
        '-o-transform': 'rotate(20deg)',
        transform: 'rotate(20deg)',
        [theme.breakpoints.down('sm')]: {
            top: -10,
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            '-webkit-transform': 'rotate(90deg)',
            '-moz-transform': 'rotate(90deg)',
            '-ms-transform': 'rotate(90deg)',
            '-o-transform': 'rotate(90deg)',
            transform: 'rotate(90deg)',
        }
    },
}));

function Home(props) {

    const classes = useStyles();

    return (
        <div className={classes.outerwrapper}>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                className={classes.gridwrapper}
                xs={12}
            >
                <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justify='center'
                    className={classes.buttonwrapper}
                >
                    <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                        className={classes.topwrapper}
                    >
                        <Img
                            className={classes.logo}
                            src={`${process.env.PUBLIC_URL + "/assets/WoodLogoTease.png"}`}
                        />
                        <Img
                            className={classes.soon}
                            src={`${process.env.PUBLIC_URL + "/assets/comingsoon.png"}`}
                        />
                    </Grid>
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
                            src={`${process.env.PUBLIC_URL + "/assets/Lineup1.png"}`}
                        />
                    </Grid>
                    <Grid item xs={1} justify='center' className={`${classes.lineupwrapper} ${classes.sidewrapper}`}>
                        <Img
                            className={classes.arrowne}
                            src={`${process.env.PUBLIC_URL + "/assets/arrow.png"}`}
                        />
                    </Grid>
                    <Grid item xs={3} justify='center' className={`${classes.lineupwrapper} ${classes.midwrapper}`}>
                        <div className={classes.imagewrapper}>
                            <Img
                                className={classes.lineup}
                                src={`${process.env.PUBLIC_URL + "/assets/LineupEmpty.png"}`}
                            />
                            <Img
                                className={classes.animation}
                                src={`${process.env.PUBLIC_URL + "/assets/TransactionAnim.png"}`}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={1} justify='center' className={`${classes.lineupwrapper} ${classes.sidewrapper}`}>
                        <Img
                            className={classes.arrowse}
                            src={`${process.env.PUBLIC_URL + "/assets/arrow.png"}`}
                        />
                    </Grid>
                    <Grid item xs={3} justify='center' className={`${classes.lineupwrapper} ${classes.sidewrapper}`}>
                        <Img
                            className={classes.lineup}
                            src={`${process.env.PUBLIC_URL + "/assets/Lineup3.png"}`}
                        />
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid
                container
                alignItems='center'
                justify='center'
                className={classes.buttongrid}
            >
                <Button className={classes.button} component={RouterLink} to="/register">
                    Pre-Register
                </Button>
            </Grid>
        </div>
    );
}

export default withRouter(Home);