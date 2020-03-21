import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, CardMedia, Grid, Typography, makeStyles, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: theme.palette.common.white,
        boxShadow: '1px 2px 2px 1px rgba(0,0,0,.8)',
        width: '100%',
        color: theme.palette.primary.main,
        borderRadius: 25,
        padding: theme.spacing(0, 1, 1, 1),
        maxWidth: 300
    },
    header: {
        color: theme.palette.primary.main,
        '& .MuiTypography-root': {
            letterSpacing: '1px'
        }
    },
    content: {
        backgroundColor: fade(theme.palette.primary.light, .5),
        padding: theme.spacing(1),
        borderRadius: '0px 0px 20px 20px',
    },
    pricewrapper: {
        display: 'flex',
        backgroundColor: theme.palette.common.white,
        borderRadius: 20,
        width: 'fit-content',
        paddingRight: theme.spacing(1)
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 50
    }
}));

function SaleCard({
    sale,
    item,
    onPurchase
}){

    const classes = useStyles();

    return (
        <Card className={classes.wrapper}>
            <Grid container direction='row' justify='center'>
                <CardHeader
                    title={item.name}
                    className={classes.header}
                />
            </Grid>
            <CardMedia
                className={classes.image}
                image={item.image}
            />
            <Grid item className={classes.content}>
                <CardContent>
                    <Grid container alignItems='center' spacing={1} className={classes.pricewrapper}>
                        <Grid item>
                            <div className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                {`${sale.price}`} Bells
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
        </Card>
    )
}

SaleCard.propTypes = {
    sale: PropTypes.shape({
        saleId: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.any,
    }).isRequired,
    onPurchase: PropTypes.func
}

export default SaleCard;