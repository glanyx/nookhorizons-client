import React, { useState, useEffect } from "react";
import { Auth, API } from 'aws-amplify';
import { makeStyles, Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { StyledButton } from '../components';

const useStyles = makeStyles((theme) => ({
  salestable: {
    width: '90% !important'
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

  const [sales, setSales] = useState([]);

  function loadSales(user) {
    return API.get('nh', `/user/${user.id}/sales`);
  }

  useEffect(() => {

    async function onLoad() {

      if (!props.isAuthenticated) {
        return;
      }

      const user = await Auth.currentUserInfo();

      try {
        const sales = await loadSales(user);
        setSales(sales);
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }

    onLoad();

  }, [props.isAuthenticated, cancelling]);

  const handleCancelSale = async (event, saleId) => {

    console.log('test');
    event.preventDefault();
    setCancelling(true);

    try{
        await cancelSale({
            saleId: saleId
        });
    } catch (e) {
        console.log(e);
        alert(e.message);
    }

    setCancelling(false);
  }

  function cancelSale(sale) {
      return API.put("nh", `/sales/cancel`, {
          body: sale
      });
  }

  return (
    <>
      <div>
        <h1>User Sales</h1>
      </div>

      {!loading &&
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
                          <TableCell />
                      </TableRow>
                  </TableHead>

                  <TableBody>
                      {sales.map(sale =>
                          <TableRow key={sale.saleId}>
                              <TableCell>{sale.item.name}</TableCell>
                              <TableCell align='right'>{sale.variant}</TableCell>
                              <TableCell align='right'>{sale.quantity}</TableCell>
                              <TableCell align='right'>{sale.price}</TableCell>
                              <TableCell align='right'>{sale.note}</TableCell>
                              <TableCell align='right'>{sale.status}</TableCell>
                              <TableCell align='center'>
                                  {sale.status !== 'Sold' && sale.status !== 'Cancelled' &&
                                    <StyledButton error color='primary' variant='outlined' onClick={event => handleCancelSale(event, sale.saleId)} className={classes.salesbutton}>
                                        Cancel Sale
                                    </StyledButton>
                                  }
                              </TableCell>
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          </TableContainer>
      </Grid>
    }
    </>
  );
}

export default User;