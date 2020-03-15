import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { Card, Typography, Grid, makeStyles, fade, CardMedia, CardHeader, CardContent, CardActionArea } from '@material-ui/core';

import { StyledChip } from '../components';

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
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        marginLeft: theme.spacing(.5)
    },
    image: {
        height: 200,
        maxWidth: '100%'
    },
    descriptionWrapper: {
        position: 'relative'
    },
    description: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        color: 'transparent',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, .6),
            color: theme.palette.common.white
        }
    },
    descriptionText: {
        margin: theme.spacing(2),
        fontSize: 16,
        fontWeight: 400
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
            <CardActionArea component={RouterLink} to={to}>
                <Grid container direction='row' justify='center'>
                    <CardHeader
                        title={item.name}
                        className={classes.header}
                    />
                </Grid>
                <div className={classes.descriptionWrapper}>
                    <div className={classes.description}>
                        <Typography variant='body2' className={classes.descriptionText}>
                            {item.description}
                        </Typography>
                    </div>
                    <CardMedia
                        className={classes.image}
                        image={item.imageUrl}
                    />
                </div>
                <Grid item className={classes.content}>
                    <CardContent>
                        <Typography variant='h5'>
                            {item.category.name}
                        </Typography>
                        <div className={classes.tags}>
                            {item.tags.map((tag, i) =>
                                <StyledChip className={classes.chip} label={tag.name} key={i} />
                            )}
                        </div>
                        {item.saleCount
                            ? <Grid container justify='flex-end' item>
                                <Typography variant='body1'>
                                    {`${item.saleCount} selling..`}
                                </Typography>
                            </Grid>
                            : null
                        }
                    </CardContent>
                </Grid>
            </CardActionArea>
        </Card>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.any,
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