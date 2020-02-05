import React, { Component } from 'react';
import './Clock.css';
import { withStyles, fade, Typography, Divider } from '@material-ui/core';

const styles = theme => {
    return ({
        wrapper: {
            display: 'inline-block',
            backgroundColor: fade(theme.palette.common.black, 0.35),
            borderRadius: 10,
            color: theme.palette.common.white
        },
        timeWrapper: {
            display: 'block',
            padding: theme.spacing(1)
        },
        flexWrapper: {
            display: 'flex',
        },
        time: {
            fontSize: 24,
            fontWeight: 'bold',
            margin: 'auto'
        },
        timeSuffix: {
            marginTop: 'auto',
            marginBottom: '2px',
            marginRight: 'auto'
        },
        dateWrapper: {
            display: 'flex',
            padding: theme.spacing(1)
        },
        dateSuffix: {
            marginLeft: theme.spacing(1),
            marginTop: 'auto',
            marginBottom: '2px',
            padding: theme.spacing(1),
            paddingTop: '1px',
            paddingBottom: '1px',
            borderRadius: 15
        },
        divider: {
            backgroundColor: theme.palette.common.white,
            height: '2px'
        }
    });
}

class Clock extends Component {

    constructor(props){
        super(props);
        this.state = { date: new Date() };
    }

    render() {

        const { classes } = this.props;

        const hours = this.state.date.getHours();
        const minutes = this.state.date.getMinutes();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[this.state.date.getMonth()];
        const date = this.state.date.getDate();
        const days = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
        const day = days[this.state.date.getDay()];

        return(
            <div className={classes.wrapper}>
                <div className={classes.timeWrapper}>
                    <div className={classes.flexWrapper}>
                        <Typography className={classes.time}>
                            {`${hours}:${minutes.toString().length < 2 ? `0${minutes}` : minutes}`}
                        </Typography>
                        <Typography className={classes.timeSuffix}>
                            {hours >= 12 ? 'PM' : 'AM'}
                        </Typography>
                    </div>
                </div>
                <Divider variant='middle' className={classes.divider} />
                <div className={classes.dateWrapper}>
                    <Typography className={classes.date}>
                        {`${month} ${date}`}
                    </Typography>
                    <Typography className={`text-cutout ${classes.dateSuffix}`}>
                        {day}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Clock);