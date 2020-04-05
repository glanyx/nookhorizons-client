import React, { useState, useEffect } from "react";
import { makeStyles, fade, Link, Paper, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Pagination } from '@material-ui/lab'
import { StyledTextbox, ItemCard, StyledCheckbox } from '../components';
import { Auth, API, Storage } from "aws-amplify";
import { ItemDialog } from '../components';

import { s3Upload } from '../libs/storageLib';
import config from "../config";

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    borderRadius: 20,
    borderColor: theme.palette.primary.dark,
    width: '90%'
  },
  blockwrapper: {
    display: 'block',
    float: 'left'
  },
  itemList: {
    width: '90%',
    padding: theme.spacing(2)
  },
  block: {
    '& .MuiFormGroup-root': {
      display: 'block'
    }
  },
  loadWrapper: {
    display: 'block',
    color: theme.palette.common.white,
    marginTop: theme.spacing(4),
    backgroundColor: fade(theme.palette.common.black, .85),
    borderRadius: 20,
    padding: theme.spacing(4)
  },
  bold: {
    fontWeight: 700
  },
  howitworks: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.light,
    backgroundImage: `-webkit-gradient(linear, 0 0, 100% 100%,
        color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
        color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
        color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
        to(transparent))`,
    backgroundSize: '50px 50px'
  },
  howitworksComponent: {
      backgroundColor: fade(theme.palette.common.white, .45),
      borderRadius: 20,
      padding: `${theme.spacing(2)}px !important`,
      marginBottom: theme.spacing(2),
  },
  instructionsDialogText: {
    display: 'grid'
  },
  paginator: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiButtonBase-root': {
      color: theme.palette.common.white
    }
  },
  sticky: {
    backgroundColor: fade(theme.palette.common.black, .85),
    borderRadius: 20,
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    position: 'sticky',
    top: 20,
    zIndex: 200
  },
  searchbar: {
    '& .MuiInputBase-root': {
      color: theme.palette.common.white
    }
  },
  checkbox: {
    color: theme.palette.common.white,
  }
}));

function Market(props) {

  const classes = useStyles()
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [items, setItems] = useState([]);

  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);

  const [hidden, setHidden] = useState(false);

  const handleOpenInstructions = () => {
    setHidden(true);
    setOpenInstructions(true);
  }

  function loadItems() {
    return API.get('nh', '/items');
  }
  
  async function handleNewItem(item) {

    if (item.file !== null && item.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Maximum file size is ${config.MAX_ATTACHMENT_SIZE/ 1000000} MB.`);
      return;
    }

    try{

      const attachment = item.file
        ? await s3Upload(item.file, 'protected')
        : null;

      const newItem = await createItem({
        name: item.name,
        image: attachment,
        description: item.description,
        source: item.source,
        category: item.category.categoryId,
        tags: item.tags.map(tag => tag.tagId),
        currency: item.currency,
        retailPrice: item.retailPrice,
        craftable: item.craftable,
        recipe: item.recipe.length > 0 ? item.recipe : null,
        recipeSource: item.recipeSource.length > 0 ? item.recipeSource : null,
      });
      newItem.tags = item.tags;
      newItem.category = item.category;
      newItem.image = attachment ? URL.createObjectURL(item.file) : null;
      setItems([...items, newItem]);
    } catch(e) {
      alert(e);
    }

  }

  function createItem(item) {
    return API.post('nh', '/items', {
      body: item
    });
  }

  useEffect(() => {
    async function setImages(items) {
      return Promise.all(items.map(item => setImage(item)));
    }

    async function setImage(item) {
      if (item.image) {
        item.imageUrl = await Storage.get(item.image, {
          level: 'protected',
          identityId: item.createdBy
        });
      }
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
        const items = await loadItems();
        
        await setImages(items);

        setItems(items);

      } catch(e) {
        alert(e);
      }
      setLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);

  const handleInstructionsClose = () => {
    setHidden(false);
    setOpenInstructions(false);
  }

  const [search, setSearch] = useState('');
  const [salesOnly, setSalesOnly] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = event => {
    const resultCount = items
      .filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
      .filter(item => salesOnly ? item.saleCount > 0 : item)
      .length;
    if (resultCount / 20 < page) {
      setPage(1);
    }
    setSearch(event.target.value);
  }

  const handleSalesFilter = event => {
    const resultCount = items
      .filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
      .filter(item => salesOnly ? item.saleCount > 0 : item)
      .length;
    if (resultCount / 20 < page) {
      setPage(1);
    }
    setSalesOnly(event.target.checked);
  }

  const sortItemName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        {!loading && isAdmin &&
          <Grid item xs={12}>
            <Button variant='contained' color='primary' onClick={() => setOpenItemDialog(true)}>
              Create Item
            </Button>
            <ItemDialog
              open={openItemDialog}
              onSubmit={handleNewItem}
              onClose={() => setOpenItemDialog(false)}
            />
          </Grid>
        }
        <Paper elevation={3} className={classes.howitworks}>
          <Grid container direction='column' spacing={2}>
            <Grid item className={classes.howitworksComponent}>
              <Typography variant='h5'>
                  Please Note:
              </Typography>
              <Typography variant='body2'>
                  <ul>
                      <li>Before you use our marketplace, please make sure you have:
                        <ul>
                          <li>An <span className={classes.bold}>active nintendo online membership</span>, otherwise you cannot visit other players to trade.</li>
                          <li>A <span className={classes.bold}>Discord account</span>, which is required in order to contact the player you are trading with. We are working on our own messaging system.</li>
                        </ul>
                      </li>
                      <li>We are still in the process of adding new items to this list. Please check back another time to see if your item has been added or get in touch with the team.</li>
                      <li>A search bar and filters will be coming soon! Until then, to search for items, please press CTRL + F on your keyboard and type in the item name you are looking for.</li>
                      <li>To contribute data or images to our listings, or report another user, please join our Discord and use ModMail.</li>
                      <li>At this time, a discord account is required to use this marketplace, in order to contact the player you are trading with. We are working on our own messaging system.</li>
                      <li>Buying/selling an item with no intention of completing the trade is classed as an offense here and repeated offenses will result in an account ban, which can be permanent.</li>
                      <li>No NSFW, personal information or unhelpful spam allowed anywhere on your listings.</li>
                      <li>You can view additional instructions <Link href='#' onClick={handleOpenInstructions}>here</Link>.</li>
                  </ul>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {loading &&
          <Grid container direction='column' alignContent='center' alignItems='center'>
            <Grid item className={classes.loadWrapper}>
              <Grid container direction='column' alignContent='center' alignItems='center'>
                <CircularProgress size={80} thickness={6} color='inherit' />
                <Typography variant='body'>Loading items..</Typography>
              </Grid>
            </Grid>
          </Grid>
        }
        {!loading && !hidden &&
          <>
            <div className={classes.sticky}>
              <StyledTextbox
                id='search'
                className={classes.searchbar}
                placeholder='Search item..'
                type='text'
                variant='outlined'
                color='primary'
                value={search}
                onChange={handleSearch}
              />
              <StyledCheckbox
                className={classes.checkbox}
                label='Display only items with listings'
                value={salesOnly}
                onChange={handleSalesFilter}
              />
              <Pagination
                color='primary'
                count={Math.ceil(
                  items
                    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(item => salesOnly ? item.saleCount > 0 : item)
                    .length / 20)
                }
                page={page}
                className={classes.paginator}
                onChange={(event, value) => setPage(value)}
              />
            </div>
            <Grid container spacing={2} className={classes.itemList} justify='center' alignItems='center'>
              {items
                .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                .filter(item => salesOnly ? item.saleCount > 0 : item)
                .sort(sortItemName)
                .slice((page - 1) * 20, page * 20)
                .map(item => (
                <Grid item xs={!isWidthDown('md', props.width) ? (!isWidthDown('sm', props.width) ? 3 : 6) : 12} key={item.itemId}>
                  <Grid container alignItems='center' justify='center'>
                    <ItemCard item={item} to={`/items/${item.itemId}`} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        }
      </Grid>
      <Dialog open={openInstructions} onClose={handleInstructionsClose} aria-labelledby='instructions'>
        <DialogTitle id='instructions-dialog-title'>Instructions</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.instructionsDialogText}>
            <Typography variant='paragraph'>
              First, find the item you are interested in using CTRL + F to search for the item name, then click it's card to open it's page.
            </Typography>
            <Typography variant='paragraph'>
              <span className={classes.bold}>As a buyer:</span>
              <li>Press the buy button next to the listing you want to purchase. Make sure to read the note as it may contain important information about time zones.</li>
              <li>Copy the provided Discord tag and add them to your Discord friends ASAP.</li>
              <li>Arrange to meet in-game and complete the trade.</li>
              <li>Once the trade is over, navigate to the "My Trades" page under your profile icon and click the "Complete"  button next to the trade.</li>
              Please note that you can only have 5 outstanding purchases at once. You must complete these trades before you can buy more.
            </Typography>
            <Typography variant='paragraph'>
            <span className={classes.bold}>As a seller:</span>
              <li>Press the "Sell This Item" below the item image.</li>
              <li>Add in all the relevant info. If you are only able to trade during a limited time period each day, please specify this or anything else relevant. Create the listing.</li>
              <li>When your listing sells, it's status in "My Trades" will change to x upon refreshing the page. You should be added on Discord by the buyer.</li>
              <li>Arrange to meet in-game and complete the trade.</li>
              <li>Remind the buyer to complete the trade in their "My Trades" page, this will update it in your trades.</li>
              Please note that you can only have 25 listings at once, including pending trades. You must complete sales in order to be able to list more.
            </Typography>
            <Typography variant='paragraph'>
              If a buyer does not contact you, or you need to report a user for not fulfilling a trade, please contact staff on Discord via the ModMail bot.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInstructionsClose}>
            Got It
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withWidth()(Market);