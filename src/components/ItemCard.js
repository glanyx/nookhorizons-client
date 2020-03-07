import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { Card, Typography, Grid, makeStyles, fade, CardMedia, CardHeader, CardContent, CardActions, CardActionArea } from '@material-ui/core';

import { StyledChip } from '../components';

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: theme.palette.common.white,
        boxShadow: '1px 2px 2px 1px rgba(0,0,0,.8)',
        width: '100%',
        color: theme.palette.primary.main,
        borderRadius: 25,
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
        margin: theme.spacing(0, 1, -1, 1)
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        marginLeft: theme.spacing(.5)
    },
    test: {
        paddingRight: theme.spacing(-10)
    }
}));

function ItemCard({
    item,
    to,
    onSelling
}){

    const classes = useStyles();

    return (
        <Card className={classes.wrapper} key={item.itemId}>
            <CardActionArea component={RouterLink} to={to} className={classes.test}>
                <Grid container direction='row' justify='center'>
                    <CardHeader
                        title={item.name}
                        className={classes.header}
                    />
                </Grid>
                <CardMedia>
                </CardMedia>
                <Grid item className={classes.content}>
                    <CardContent>
                        <Typography variant='h5'>
                            {item.category.name}
                        </Typography>
                        <Typography variant='body1'>
                            {item.description}
                        </Typography>
                        <div className={classes.tags}>
                            {item.tags.map((tag, i) =>
                                <StyledChip className={classes.chip} label={tag.name} key={i} />
                            )}
                        </div>
                        <Grid container justify='flex-end' item>
                            <Typography variant='body1'>
                                {`${item.saleCount} selling..`}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Grid>
                <CardActions>

                </CardActions>
            </CardActionArea>
        </Card>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]).isRequired,
        tags: PropTypes.arrayOf(PropTypes.object),
        description: PropTypes.string.isRequired,
        saleCount: PropTypes.number
    }),
    to: PropTypes.string,
    onSelling: PropTypes.func
}

export default ItemCard;