import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import {
    makeStyles,
    fade,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@material-ui/core';

import { StyledChip, SaleCard, LoaderButton } from '../components';

const useStyles = makeStyles(theme => ({
    fullwrapper: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        margin: theme.spacing(2)
    },
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
    dialogTextfield: {
        width: 300
    },

}));

function Item(props){

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const [item, setItem] = useState([]);
    const [sales, setSales] = useState([]);

    const [price, setPrice] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    function loadSales() {
        return API.get('nh', `/items/${props.match.params.id}/sales`);
    }

    const handleCreateSale = async (event) => {

        event.preventDefault();
        console.log('test');
        setSubmitting(true);

        try{
            await createSale({
                itemId: item.itemId,
                price: price,
                featured: false,
            });
            setSales(await loadSales());
            setPrice('');
        } catch(e) {
            alert(e);
        }

        setSubmitting(false);
        setOpen(false);
    }

    function createSale(sale) {
        return API.post('nh', '/sales', {
          body: sale
        });
      }

    useEffect(() => {

        function loadItem() {
            return API.get('nh', `/items/${props.match.params.id}`);
        }
    
        function loadSales() {
            return API.get('nh', `/items/${props.match.params.id}/sales`);
        }

        if (!props.isAuthenticated) {
            return;
        }

        async function onLoad() {
          try{
            const item = await loadItem();
            setItem(item);
            const sales = await loadSales();
            setSales(sales);
          } catch(e) {
            alert(e);
          }
          setLoading(false);
        }
        onLoad();
      }, [props.match.params.id, props.isAuthenticated]);

    return (
        !loading &&
        <>
            <Grid container direction='row' spacing={4} className={classes.fullwrapper}>
                <Grid item xs={8}>
                    <Button variant='contained' onClick={handleOpen}>
                        Sell this item
                    </Button>
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
            </Grid>
            <Grid container direction='row' spacing={2}>
                {sales.map(sale =>
                    <Grid item xs={4}>
                        <Grid container justify='center'>
                            <Grid item>
                                <SaleCard
                                    key={sale.saleid}
                                    sale={sale}
                                    item={item}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby='sale-input'>
                <DialogTitle id='sell-item-dialog-title'>Create a Sale</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please create your sale.
                    </DialogContentText>
                    <Grid container direction='column'>
                        <Grid item>
                            <TextField
                                disabled
                                margin='normal'
                                id='item'
                                label='Item'
                                value={item.name}
                                className={classes.dialogTextfield}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                autoFocus
                                margin='normal'
                                id='price'
                                label='Price'
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                                className={classes.dialogTextfield}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoaderButton
                        onSubmit={handleCreateSale}
                        disabled={submitting}
                        loading={submitting}
                        type='button'
                    >
                        Create
                    </LoaderButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Item;