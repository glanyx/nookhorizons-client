import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import { Card, Typography, Grid, makeStyles, fade, CardMedia, CardHeader, CardContent } from '@material-ui/core';

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
        margin: theme.spacing(0, 1, 1, 1)
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

function Item(props){

    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);

    useEffect(() => {

        function loadItem() {
            return API.get('nh', `/items/${props.match.params.id}`);
        }

        async function onLoad() {
          try{
            const item = await loadItem();
            setItem(item);
          } catch(e) {
            alert(e);
          }
          setLoading(false);
        }
        onLoad();
      }, [props.match.params.id]);

    return (
        !loading &&
        <Card className={classes.wrapper} key={item.itemId}>
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
        </Card>
    )
}

export default Item;