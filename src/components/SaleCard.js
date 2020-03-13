import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, makeStyles, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'inline-block',
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.black, .35),
        boxShadow: '1px 2px 2px 1px rgba(0,0,0,.8)',
    },
    tags: {
        display: 'flex'
    },
    chip: {
        marginLeft: theme.spacing(1)
    }
}));

function SaleCard({
    sale,
    onPurchase
}){

    const classes = useStyles();

    return (
        <Card className={classes.wrapper}>
            <Typography variant='h3'>
            </Typography>
            <Typography variant='h4'>
                {`$${sale.price}`}
            </Typography>
        </Card>
    )
}

SaleCard.propTypes = {
    sale: PropTypes.shape({
        saleId: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onPurchase: PropTypes.func
}

export default SaleCard;