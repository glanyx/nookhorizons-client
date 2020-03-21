import React, { useState, useEffect } from 'react';
import { API, Storage } from "aws-amplify";
import {
    makeStyles,
    fade,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Typography
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useFormFields } from '../libs/hooksLib';
import { StyledButton, LoaderButton, ItemCard } from '../components';

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
    image: {
        height: 200,
        maxWidth: '100%'
    },
    content: {
        backgroundColor: fade(theme.palette.primary.light, .5),
        padding: theme.spacing(1),
        borderRadius: '0px 0px 20px 20px',
        margin: theme.spacing(0, 1, 1, 1)
    },
    description: {
        padding: theme.spacing(3),
        borderRadius: 20,
        backgroundColor: theme.palette.primary.light,
        backgroundImage: `-webkit-gradient(linear, 0 0, 100% 100%,
            color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
            color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
            color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
            to(transparent))`,
        backgroundSize: '50px 50px'
    },
    descriptionComponent: {
        backgroundColor: fade(theme.palette.common.white, .45),
        borderRadius: 20,
        padding: `${theme.spacing(2)}px !important`,
        marginBottom: theme.spacing(2),
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        marginLeft: theme.spacing(.5)
    },
    salestable: {
        width: '90%'
    },
    buybutton: {
        '& .MuiButton-label': {
            fontSize: 12
        }
    },
    dialogTextfield: {
        width: '100%'
    },
    dialogadjust: {
        marginTop: 12
    },
    purchaseCompleteDialog: {
        borderRadius: 20
    },
    purchaseCompleteTitle: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        '& > h2': {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        }
    }
}));

function Item(props){

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [buying, setBuying] = useState(false);

    const [open, setOpen] = useState(false);
    const [purchaseCompleteOpen, setPurchaseCompleteOpen] = useState(false);

    const [item, setItem] = useState([]);
    const [sales, setSales] = useState([]);
    const [seller, setSeller] = useState({
        discordTag: 'Unknown'
    });

    const [fields, handleFieldChange] = useFormFields({
        variant: '',
        price: '',
        quantity: '1',
        note: '',
      });

    const validateForm = () => {
        return (
            fields.quantity > 0 && fields.price > 0
        )
    }

    const handleOpen = () => {

        // First check if logged in
        if (!props.isAuthenticated) {
            props.history.push(`/login?redirect=${props.location.pathname}`);
            return;
        }

        // Check if Discord Tag set
        if (!props.user.discordTag) {
            props.history.push(`/user`);
            return;
        }

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setPurchaseCompleteOpen(false);
    }

    function loadSales() {
        return API.get('nh', `/items/${props.match.params.id}/sales`);
    }

    const handleCreateSale = async (event) => {

        event.preventDefault();

        setSubmitting(true);

        try{
            await createSale({
                itemId: item.itemId,
                variant: fields.variant.length > 0 ? fields.variant : null,
                quantity: fields.quantity,
                price: fields.price,
                note: fields.note.length > 0 ? fields.note : null,
                featured: false,
            });
            setSales(await loadSales());
            item.saleCount++;
            fields.price = '';
            fields.note = '';
            fields.quantity = '1';
            fields.variant = '';
        } catch(e) {
            alert(e.response.data.error);
        }

        setSubmitting(false);
        setOpen(false);
    }

    function createSale(sale) {
        return API.post('nh', '/sales', {
          body: sale
        });
      }

    const handlePurchase = async (event, sale) => {

        event.preventDefault();

        if (!props.isAuthenticated) {
            props.history.push(`/login?redirect=${props.location.pathname}`);
            return;
        }
        setBuying(true);
        try{
            setSeller(await buySale({
                sale: sale
            }));
        } catch (e) {
            alert(e.response.data.error);
        }
        setBuying(false);
        setPurchaseCompleteOpen(true);
    }

    function buySale(purchase) {
        return API.put("nh", `/sales/buy`, {
            body: purchase
        });
    }

    useEffect(() => {
        function loadItem() {
            return API.get('nh', `/items/${props.match.params.id}`);
        }
    
        function loadSales() {
            return API.get('nh', `/items/${props.match.params.id}/sales`);
        }

        async function onLoad() {

          try{
            const item = await loadItem();
            setItem(item);

            if (item.image) {
                item.imageUrl = await Storage.get(item.image, {
                    level: 'protected',
                    identityId: item.createdBy
                });
            }

            const sales = await loadSales();
            setSales(sales);

            item.saleCount = sales.length;
          } catch(e) {
            alert(e.message);
          }
          setLoading(false);
        }

        onLoad();
      }, [props.match.params.id, props.isAuthenticated, buying]);

    return (
        !loading &&
        <>
            <Grid container direction='row' spacing={2} className={classes.fullwrapper}>
                <Grid item xs={4}>
                    <Grid container direction='column' alignItems='center' spacing={2}>
                        <Grid item>
                            <ItemCard overlay={false} item={item} />
                        </Grid>
                        <Grid item>
                            <StyledButton color='primary' variant='contained' onClick={handleOpen}>
                                Sell this item
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} >
                    <Paper elevation={3} className={classes.description}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.descriptionComponent}>
                                <Typography variant='h4'>
                                    Item Description:
                                </Typography>
                                <Typography variant='body1'>
                                    {item.description}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.descriptionComponent}>
                                <Typography variant='h4'>
                                    Item Source:
                                </Typography>
                                <Typography variant='body1'>
                                    {item.source}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
            <Grid container justify='center'>
                <TableContainer component={Paper} className={classes.salestable}>
                    <Table aria-label='sales'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>Variant</TableCell>
                                <TableCell align='right'>Quantity</TableCell>
                                <TableCell align='right'>Price</TableCell>
                                <TableCell align='right'>Note</TableCell>
                                <TableCell align='right'>Seller</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {sales.map(sale =>
                                <TableRow key={sale.saleId}>
                                    <TableCell align='right'>{sale.variant}</TableCell>
                                    <TableCell align='right'>{sale.quantity}</TableCell>
                                    <TableCell align='right'>{sale.price}</TableCell>
                                    <TableCell align='right'>{sale.note}</TableCell>
                                    <TableCell align='right'>{props.user ? (sale.username === props.user.username ? 'YOU' : sale.username) : sale.username}</TableCell>
                                    <TableCell align='center'>
                                        <Tooltip placement='top-end' title={props.user ? (sale.userId === props.user.userId ? `You can't buy your own items!` : '') : ''}>
                                            <span>
                                                <StyledButton disabled={props.user ? (sale.userId === props.user.userId) : false} color='primary' variant='outlined' onClick={event => handlePurchase(event, sale)} className={classes.buybutton}>
                                                    Buy
                                                </StyledButton>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby='sale-input'>
                <DialogTitle id='sell-item-dialog-title'>Create a Sale</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please create your sale.
                    </DialogContentText>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={7}>
                            <TextField
                                disabled
                                margin='normal'
                                id='item'
                                label='Item'
                                value={item.name}
                                className={classes.dialogTextfield}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                margin='normal'
                                type='text'
                                id='variant'
                                label='Variant'
                                value={fields.variant}
                                onChange={handleFieldChange}
                                className={classes.dialogTextfield}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction='column' spacing={1}>
                                <Grid item>
                                    <TextField
                                        autofocus
                                        margin='normal'
                                        type='number'
                                        id='price'
                                        label='Price'
                                        value={fields.price}
                                        onChange={handleFieldChange}
                                        className={classes.dialogTextfield}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        margin='normal'
                                        type='number'
                                        id='quantity'
                                        label='Quantity'
                                        value={fields.quantity}
                                        onChange={handleFieldChange}
                                        className={`${classes.dialogTextfield} ${classes.dialogadjust}`}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                multiline
                                margin='normal'
                                placeholder='What times are you available? Timezone? Any other restrictions?'
                                type='text'
                                id='note'
                                label='Note'
                                rows={5}
                                value={fields.note}
                                onChange={handleFieldChange}
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
                        disabled={!validateForm() || submitting}
                        loading={submitting}
                        type='button'
                    >
                        Create
                    </LoaderButton>
                </DialogActions>
            </Dialog>
            <Dialog open={purchaseCompleteOpen} onClose={handleClose} className={classes.purchaseCompleteDialog} aria-labelledby='sale-complete'>
                <DialogTitle className={classes.purchaseCompleteTitle}>
                    <CheckCircleIcon />&nbsp;
                    Purchase Success!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Nice, you just scored yourself a(n) ${item.name}! You can contact the seller on Discord. This is their Tag:`}
                    </DialogContentText>
                    <TextField
                        margin='normal'
                        type='text'
                        id='discord-tag'
                        label='Discord Tag'
                        value={seller.discordTag}
                        className={classes.dialogTextfield}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Got It
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Item;