import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Grid, Paper, Button, Tab, Tabs, AppBar, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Tooltip } from '@material-ui/core';
import { ListingTypes } from '../types';
import { StyledButton } from '../components';

const useStyles = makeStyles(theme => ({
  tabWrapper: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.common.white,
      height: 4
    }
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  maxWidth: {
    maxWidth: 300,
    wordBreak: 'break-word',
  },
  flexwrapper: {
    display: 'flex',
  },
  itemLink: {
    margin: 0,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }
}));

function Listings({
  itemId,
  listings,
  onAction,
  loading,
  ...props
}){

  const classes = useStyles();

  const [filteredListings, setFilteredListings] = useState([]);

  const [tabValue, setTabValue] = useState(ListingTypes.SALE);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  useEffect(() => {

    async function onLoad() {
      console.log(listings);
      console.log(tabValue);
      setFilteredListings(listings.filter(listing => listing.type === tabValue));
    }

    onLoad();
  }, [listings, tabValue]);

  return(
    <Grid container direction='column' {...props}>
      <AppBar position='static'>
        <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth' aria-label='listing-tabs' className={classes.tabWrapper}>
          <Tab label={`${ListingTypes.SALE}s`} id={`tab-${ListingTypes.SALE}`} value={ListingTypes.SALE} />
          <Tab label={`${ListingTypes.REQUEST}s`} id={`tab-${ListingTypes.REQUEST}`} value={ListingTypes.REQUEST} />
        </Tabs>
      </AppBar>
      <Grid container justify='center'>
        <TableContainer component={Paper} className={classes.salestable}>
          <Table aria-label='sales'>
            <TableHead>
              <TableRow>
                {!itemId &&
                  <TableCell>Item</TableCell>
                }
                <TableCell align='right'>Variant</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Note</TableCell>
                <TableCell align='right'>Seller</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredListings.length > 0 && !loading
                ? filteredListings.map(listing =>
                  <TableRow key={listing.saleId}>
                    {!itemId &&
                      <TableCell align='left'>
                        <Button className={classes.itemLink} component={RouterLink} to={`/items/${listing.item.itemId}`}>
                          <Grid container direction='row' spacing={1} alignItems='center' justifyContent='center'>
                            <Grid item className={classes.flexwrapper} alignContent='center'>
                              <Img
                                src={listing.item.imageUrl}
                                className={classes.image}
                              />
                            </Grid>
                            <Grid item>
                              {listing.item.name}
                            </Grid>
                          </Grid>
                        </Button>
                      </TableCell>
                    }
                    <TableCell align='right'>{listing.variant}</TableCell>
                    <TableCell align='right'>{listing.quantity}</TableCell>
                    <TableCell align='right'>{listing.price}</TableCell>
                    <TableCell className={classes.maxWidth}>{listing.note}</TableCell>
                    <TableCell align='right'>{props.user ? (listing.userId === props.user.userId ? 'YOU' : listing.username) : listing.username}</TableCell>
                    <TableCell align='center'>
                      <Tooltip placement='top-end' title={props.user ? (listing.userId === props.user.userId ? `You can't buy your own items!` : '') : ''}>
                        <span>
                          <StyledButton
                            color='primary'
                            variant='outlined' 
                            disabled={props.user ? (listing.userId === props.user.userId) : false}
                            onClick={event => onAction(event, listing)}
                            className={classes.buybutton}
                          >
                            Buy
                          </StyledButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
                :
                  <TableRow>
                    <TableCell colSpan={7} align='center'>{`No ${tabValue}s available!`}</TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

Listings.propTypes = {
  itemId: PropTypes.string,
  listings: PropTypes.array.isRequired,
  onAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default Listings;