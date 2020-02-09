import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Grid, makeStyles, fade, CardMedia } from '@material-ui/core';

import { StyledChip } from '../components';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'inline-flex',
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.black, .65),
        boxShadow: '1px 2px 2px 1px rgba(0,0,0,.8)',
        width: '100%',
        color: theme.palette.common.white
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        marginLeft: theme.spacing(1)
    }
}));

function ItemCard({
    item: {
        itemId,
        name,
        category,
        tags = [],
        description,
        saleCount
    },
    onSelect
}){

    const classes = useStyles();

    return (
        <Card className={classes.wrapper} key={itemId}>
            <Grid container>
                <Grid item xs={4}>
                    <CardMedia>
                        Image
                    </CardMedia>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant='h4'>
                        {name}
                    </Typography>
                    <Typography variant='h5'>
                        {category}
                    </Typography>
                    <Typography variant='body1'>
                        {description}
                    </Typography>
                    <div className={classes.tags}>
                        {tags.map((tag, i) =>
                            <StyledChip className={classes.chip} label={tag} key={i} />
                        )}
                    </div>
                    <Grid container justify='flex-end' item>
                        <Typography variant='body1'>
                            {`${saleCount} selling..`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string.isRequired,
        saleCount: PropTypes.number
    }),
    onSelect: PropTypes.func
}

export default ItemCard;