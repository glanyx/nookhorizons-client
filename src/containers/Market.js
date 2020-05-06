import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { makeStyles, fade, Button, Paper, Grid, Typography, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Listings } from '../components';

const useStyles = makeStyles(theme => ({
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
  listings: {
    width: '90%'
  }
}));

function Market(props){

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  
  const [openInstructions, setOpenInstructions] = useState(false);
  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  }
  const handleInstructionsClose = () => {
    setOpenInstructions(false);
  }

  const handlePurchase = (event, sale) => {
    alert(`You purchased ${sale.item.name}`);
    event.preventDefault();
  }

  useEffect(() => {

    async function onLoad() {

      try {
        const listings = await loadListings();
        await Promise.all(listings.map(async listing => {
          if (listing.item.image) {
            listing.item.imageUrl = await Storage.get(listing.item.image, {
              level: 'protected',
              identityId: listing.item.createdBy
            });
          }
        }));
        setListings(listings);

      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }

    onLoad();
  }, []);

  function loadListings() {
    return API.get('nh', `/sales`);
  }

  return(
    <>
      <Grid container direction='column' alignItems='center' spacing={2}>
        <Grid item xs={10}>
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
        </Grid>
        <Listings
          className={classes.listings}
          listings={listings}
          onAction={handlePurchase}
          loading={loading}
          {...props}
        />
      </Grid>
      <Dialog open={openInstructions} onClose={handleInstructionsClose} aria-labelledby='instructions'>
        <DialogTitle id='instructions-dialog-title'>Instructions</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.instructionsDialogText}>
            <Typography variant='paragraph'>
              First, find the item you are interested in by using the searchbox, then click its card to open its page.
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
  )

};

export default Market;