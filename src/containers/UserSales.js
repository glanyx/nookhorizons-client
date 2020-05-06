import React, { useState, useEffect } from "react";
import { Auth, API } from 'aws-amplify';
import { makeStyles, Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledButton } from '../components';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(4),
    background: 'none'
  },
  salestable: {
    width: '90% !important',
    borderRadius: 20,
    border: '1px solid black'
  },
  salesbutton: {
    '& .MuiButton-label': {
        fontSize: 12
    }
  },
}))

function User(props) {

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [completing, setCompleting] = useState(false);

  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  // function loadRequests(user) {
  //   return API.get('nh', `/user/${user.id}/requests`);
  // }

  function loadSales(user) {
    return API.get('nh', `/user/${user.id}/sales`);
  }

  function loadPurchases(user) {
    return API.get('nh', `/user/${user.id}/purchases`);
  }

  useEffect(() => {

    async function onLoad() {

      if (!props.isAuthenticated) {
        return;
      }

      const user = await Auth.currentUserInfo();

      try {
        const sales = await loadSales(user);
        const purchases = await loadPurchases(user);
        // const requests = await loadRequests(user);
        const requests = [];
        setSales(sales);
        setPurchases(purchases);
        setRequests(requests);
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }

    onLoad();

  }, [props.isAuthenticated, cancelling, completing]);

  const handleCancelSale = async (event, saleId) => {

    event.preventDefault();
    setCancelling(true);

    try{
        await cancelSale({
            saleId: saleId
        });
    } catch (e) {
      props.setAlert({
        active: true,
        type: 'error',
        message: e.message
      });
    }

    setCancelling(false);
  }

  function cancelSale(sale) {
      return API.put("nh", `/sales/cancel`, {
          body: sale
      });
  }

  const handleCompleteSale = async (event, sale) => {
    event.preventDefault();
    setCompleting(true);
    
    try{
      await completeSale({
        sale: sale
      });
    } catch(e) {
      props.setAlert({
        active: true,
        type: 'error',
        message: e.message
      });
    }

    setCompleting(false);
  }

  function completeSale(sale) {
    return API.put('nh', '/sales/complete', {
      body: sale
    });
  }

  return (
    <>
    <Paper className={classes.section}>
        <Typography variant='h2'>
          My Requests
        </Typography>
        <Grid container justify='center'>
          <TableContainer component={Paper} className={classes.salestable}>
            <Table aria-label='requests'>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align='right'>Variant</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Your Offer</TableCell>
                  <TableCell align='right'>Note</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Buyer</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              {!loading
                ?
                <TableBody>
                  {requests.map(request =>
                    <TableRow key={request.requestId}>
                      <TableCell>{request.item.name}</TableCell>
                      <TableCell align='right'>{request.variant}</TableCell>
                      <TableCell align='right'>{request.quantity}</TableCell>
                      <TableCell align='right'>{request.price}</TableCell>
                      <TableCell align='right'>{request.note}</TableCell>
                      <TableCell align='right'>{request.status}</TableCell>
                      <TableCell align='right'>{request.buyer ? request.buyer.username : null}</TableCell>
                      <TableCell align='center'>
                        {/* {sale.status !== 'Trade Pending' && sale.status !== 'Cancelled' && sale.status !== 'Complete' &&
                          <StyledButton error color='primary' variant='outlined' onClick={event => handleCancelSale(event, sale.saleId)} className={classes.salesbutton}>
                              Cancel Sale
                          </StyledButton>
                        } */}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                :
                <TableBody>
                    <TableRow>
                      <TableCell><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='center'><Skeleton variant='rect'/></TableCell>
                    </TableRow>
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
      <Paper className={classes.section}>
        <Typography variant='h2'>
          My Sales
        </Typography>
        <Grid container justify='center'>
          <TableContainer component={Paper} className={classes.salestable}>
            <Table aria-label='sales'>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align='right'>Variant</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Note</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Buyer</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              {!loading
                ?
                <TableBody>
                  {sales.map(sale =>
                    <TableRow key={sale.saleId}>
                      <TableCell>{sale.item.name}</TableCell>
                      <TableCell align='right'>{sale.variant}</TableCell>
                      <TableCell align='right'>{sale.quantity}</TableCell>
                      <TableCell align='right'>{sale.price}</TableCell>
                      <TableCell align='right'>{sale.note}</TableCell>
                      <TableCell align='right'>{sale.status}</TableCell>
                      <TableCell align='right'>{sale.buyer ? sale.buyer.username : null}</TableCell>
                      <TableCell align='center'>
                        {sale.status !== 'Trade Pending' && sale.status !== 'Cancelled' && sale.status !== 'Complete' &&
                          <StyledButton error color='primary' variant='outlined' onClick={event => handleCancelSale(event, sale.saleId)} className={classes.salesbutton}>
                              Cancel Sale
                          </StyledButton>
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                :
                <TableBody>
                    <TableRow>
                      <TableCell><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='center'><Skeleton variant='rect'/></TableCell>
                    </TableRow>
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
      <Paper className={classes.section}>
        <Typography variant='h2'>
          My Purchases
        </Typography>
        <Grid container justify='center'>
          <TableContainer component={Paper} className={classes.salestable}>
            <Table aria-label='purchases'>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align='right'>Variant</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Note</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Seller</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              {!loading
                ?
                <TableBody>
                  {purchases.map(purchase =>
                    <TableRow key={purchase.saleId}>
                      <TableCell>{purchase.item.name}</TableCell>
                      <TableCell align='right'>{purchase.variant}</TableCell>
                      <TableCell align='right'>{purchase.quantity}</TableCell>
                      <TableCell align='right'>{purchase.price}</TableCell>
                      <TableCell align='right'>{purchase.note}</TableCell>
                      <TableCell align='right'>{purchase.status}</TableCell>
                      <TableCell align='right'>{purchase.sellerDiscordTag}</TableCell>
                      <TableCell align='center'>
                        {purchase.status === 'Trade Pending' &&
                          <StyledButton error color='primary' variant='outlined' onClick={event => handleCompleteSale(event, purchase)} className={classes.salesbutton}>
                              Complete
                          </StyledButton>
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                :
                <TableBody>
                    <TableRow>
                      <TableCell><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='right'><Skeleton variant='text'/></TableCell>
                      <TableCell align='center'><Skeleton variant='rect'/></TableCell>
                    </TableRow>
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </>
  );
}

export default User;