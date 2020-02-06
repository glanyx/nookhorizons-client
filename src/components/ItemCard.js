import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, makeStyles, fade, CardMedia } from '@material-ui/core';

import { StyledChip } from '../components';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'inline-flex',
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

function ItemCard({
    item: {
        id,
        name,
        category,
        tags = []
    },
    saleCount,
    onSelect
}){

    const classes = useStyles();

    return (
        <Card className={classes.wrapper}>
            <CardMedia>
                Image
            </CardMedia>
            <div>
                <Typography variant='h3'>
                    {name}
                </Typography>
                <Typography variant='h4'>
                    {category}
                </Typography>
                <div className={classes.tags}>
                    {tags.map(tag =>
                        <StyledChip className={classes.chip} label={tag} />
                    )}
                </div>
                <Typography variant='body1'>
                    {`${saleCount} selling..`}
                </Typography>
            </div>
        </Card>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string)
    }),
    saleCount: PropTypes.number,
    onSelect: PropTypes.func
}

export default ItemCard;