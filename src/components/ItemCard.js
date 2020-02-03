import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {

    }
}));

function ItemCard({
    sale: {
        saleId,
        item : {
            itemId,
            name
        },
        price
    },
    onPurchase
}){

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Typography variant='h3'>
                {`Title: ${name}`}
            </Typography>
            <Typography variant='h4'>
                {`Price: ${price}`}
            </Typography>
        </div>
    )
}

ItemCard.propTypes = {
    sale: PropTypes.shape({
        saleId: PropTypes.string.isRequired,
        item: PropTypes.shape({
            itemId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }),
        price: PropTypes.number
    }),
    onPurchase: PropTypes.func
}

export default ItemCard;