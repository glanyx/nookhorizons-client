import React, { useState, useEffect } from "react";
import { makeStyles, fade, Grid, Typography, Button, CircularProgress } from '@material-ui/core';
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

function Items(props) {

  const classes = useStyles()
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [items, setItems] = useState([]);

  const [openItemDialog, setOpenItemDialog] = useState(false);

  function loadItems() {
    return API.get('nh', '/items');
  }
  
  async function handleNewItem(item) {

    if (item.file !== null && item.file.size > config.MAX_ATTACHMENT_SIZE) {
      props.setAlert({
        active: true,
        type: 'error',
        message: `Maximum file size is ${config.MAX_ATTACHMENT_SIZE/ 1000000} MB.`
      });
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
      props.setAlert({
        active: true,
        type: 'error',
        message: e.message
      });
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
              props={props}
            />
          </Grid>
        }
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
        {!loading &&
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
    </>
  );
}

export default withWidth()(Items);