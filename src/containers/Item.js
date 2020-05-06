import React, { useState, useEffect } from 'react';
import { API, Storage, Auth } from "aws-amplify";
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
  Typography
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useFormFields } from '../libs/hooksLib';
import { ItemDialog, StyledButton, LoaderButton, ItemCard, Listings } from '../components';

import { s3Upload } from '../libs/storageLib';
import config from "../config";

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
  },
  listing: {
    width: '90%'
  }
}));

function Item(props){

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [buying, setBuying] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [editting, setEditting] = useState(false);

  const [open, setOpen] = useState(false);
  const [purchaseCompleteOpen, setPurchaseCompleteOpen] = useState(false);

  const [item, setItem] = useState([]);
  const [listings, setListings] = useState([]);
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

  const handleOpen = (type) => {

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

    setOpen(type);
  }

  const handleClose = () => {
    setOpen(false);
    setPurchaseCompleteOpen(false);
  }

  const handleCreateSale = async (event, type) => {

    event.preventDefault();
    setSubmitting(true);

    try{
      const sale = await createSale({
        itemId: item.itemId,
        variant: fields.variant.length > 0 ? fields.variant : null,
        quantity: fields.quantity,
        price: fields.price,
        note: fields.note.length > 0 ? fields.note : null,
        type: type,
        featured: false,
      });
      sale.username = props.user.username;
      item.saleCount++;
      fields.price = '';
      fields.note = '';
      fields.quantity = '1';
      fields.variant = '';
    } catch(e) {
      props.setAlert({
        active: true,
        type: 'error',
        message: e.response.data.error
      });
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
      props.setAlert({
        active: true,
        type: 'error',
        message: e.response.data.error
      });
    }
    setBuying(false);
    setPurchaseCompleteOpen(true);
  }

  function buySale(purchase) {
    return API.put("nh", `/sales/buy`, {
      body: purchase
    });
  }

  async function handleItemUpdate(newItem) {

    if (newItem.file !== null && newItem.file.size > config.MAX_ATTACHMENT_SIZE) {
        props.setAlert({
            active: true,
            type: 'error',
            message: `Maximum file size is ${config.MAX_ATTACHMENT_SIZE/ 1000000} MB.`
        });
        return;
    }

    setSubmitting(true);

    try{
      const attachment = newItem.file !== item.image
        ? await s3Upload(newItem.file, 'protected')
        : item.image;

      const replacedItem = await updateItem({
        name: newItem.name,
        image: attachment,
        description: newItem.description,
        source: newItem.source,
        category: newItem.category.categoryId,
        tags: newItem.tags.map(tag => tag.tagId),
        currency: newItem.currency,
        retailPrice: newItem.retailPrice,
        craftable: false,
        recipe: newItem.recipe,
        recipeSource: newItem.recipeSource,
      });
      replacedItem.tags = newItem.tags;
      replacedItem.category = newItem.category;
      replacedItem.imageUrl = newItem.file !== item.image ? URL.createObjectURL(newItem.file) : item.imageUrl;
      setItem(replacedItem);
    } catch(e) {
      props.setAlert({
        active: true,
        type: 'error',
        message: e.message
      });
    }

    setSubmitting(false);
  }

  function updateItem(item) {
    return API.put('nh', `/items/${props.match.params.id}`, {
      body: item
    });
  }

  useEffect(() => {
    function loadItem() {
      return API.get('nh', `/items/${props.match.params.id}`);
    }
  
    async function onLoad() {

      if (props.isAuthenticated) {
        const session = await Auth.currentSession();

        if (session.getIdToken().payload['cognito:groups']){
          const admin = session.getIdToken().payload['cognito:groups'].indexOf('Admin') !== -1;
          setIsAdmin(admin);
        }
      }

      try{
        const item = await loadItem();
        setItem(item);
        const listings = await loadListings(item.itemId);
        setListings(listings);

        if (item.image) {
          item.imageUrl = await Storage.get(item.image, {
            level: 'protected',
            identityId: item.createdBy
          });
        }

      } catch(e) {
        alert(e);
      }
      setLoading(false);
    }

    onLoad();
  }, [props.match.params.id, props.isAuthenticated, buying]);

  
  function loadListings(itemId) {
    return API.get('nh', `/items/${itemId}/sales`);
  }

  return (
    !loading &&
    <>
      <Grid container direction='row' spacing={2} className={classes.fullwrapper}>
        <Grid item xs={!isWidthDown('md', props.width) ? 4 : 12}>
          <Grid container direction='column' alignItems='center' spacing={2}>
            <Grid item>
              <ItemCard overlay={false} item={item} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={!isWidthDown('md', props.width) ? 8 : 12} >
          <Grid container direction='column' spacing={2}>
            <Grid item>
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
            <Grid item>
              <Grid container justify='center' direction='row' spacing={2}>
                <Grid item>
                  <StyledButton color='primary' variant='contained' onClick={() => handleOpen('sale')}>
                    Sell this item
                  </StyledButton>
                </Grid>
                <Grid item>
                  <StyledButton color='primary' variant='contained' onClick={() => handleOpen('request')}>
                    Request this item
                  </StyledButton>
                </Grid>
                {isAdmin &&
                  <Grid item>
                    <StyledButton color='secondary' variant='contained' onClick={() => setEditting(true)}>
                      Edit
                    </StyledButton>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify='center'>
          <Listings
            className={classes.listing}
            itemId={item.itemId}
            listings={listings}
            onAction={handlePurchase}
            loading={loading}
          />
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby={`${open}-input`}>
        <DialogTitle id={`${open}-item-dialog-title`}>{`Create a ${open}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {`Please create your ${open}.`}
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
            onSubmit={event => handleCreateSale(event, open)}
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
      <ItemDialog
        open={editting}
        item={item}
        onSubmit={handleItemUpdate}
        onClose={() => setEditting(false)}
      />
    </>
  )
}

export default withWidth()(Item);