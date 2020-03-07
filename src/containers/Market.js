import React, { useState, useEffect } from "react";
import { useFormFields } from '../libs/hooksLib';
import { makeStyles, Box, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { StyledTextbox, StyledSingleSelect, StyledMultiSelect, ItemCard, LoaderButton } from '../components';
import { API } from "aws-amplify";

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    borderRadius: 20,
    borderColor: theme.palette.primary.dark,
    width: '800px'
  },
  blockwrapper: {
    display: 'block',
    float: 'left'
  },
  itemList: {
    width: '100%',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(-6)
  }
}));

function Market(props) {

  const classes = useStyles()
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [items, setItems] = useState([]);

  const [openTagInput, setOpenTagInput] = useState(false);
  const [openCatInput, setOpenCatInput] = useState(false);

  function loadItems() {
    return API.get('nh', '/items');
  }
  async function handleNewItem(event) {
    event.preventDefault();

    setSubmitting(true);

    try{
      await createItem({ 
        name: fields.name,
        description: fields.description,
        source: fields.source,
        category: categoryChoice.categoryId,
        tags: tags.map(tag => tag.tagId),
        retailPrice: price
      });
      setItems(await loadItems());
      fields.name = '';
      fields.description = '';
      fields.source = '';
      setCategoryChoice('');
      setTags([]);
      setPrice('');
    } catch(e) {
      alert(e);
    }

    setSubmitting(false);
  }

  function createItem(item) {
    return API.post('nh', '/items', {
      body: item
    });
  }

  function validateForm() {
    return fields.name.length > 0 && fields.description.length > 0 && categoryChoice
  }

  /* Tags */
  const [tagOptions, setTagOptions] = useState([]);
  const [tags, setTags] = useState([]);
  function loadTags() {
    return API.get('nh', '/tags');
  }
  function createTag(tag) {
    return API.post('nh', '/tags', {
      body: tag
    });
  }
  const handleTagChange = event => {
    if (event.target.value) {
      setTags(event.target.value);
    }
  }
  const handleNewTag = event => {
    event.preventDefault();
    event.stopPropagation();
    setOpenTagInput(true);
  }
  async function handleTagCreate(event) {
    
    if(fields.newTag.length === 0) {
      alert('Tag name must have a value.');
      return;
    }

    try{
      tagOptions.push(await createTag({ name: fields.newTag }));
      fields.newTag = '';
      handleClose();
    } catch(e) {
      alert(e);
    }
  }

  /* Categories */
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryChoice, setCategoryChoice] = useState('');
  function loadCategories() {
    return API.get('nh', '/categories');
  }
  function createCategory(category) {
    return API.post('nh', '/categories', {
      body: category
    });
  }
  const handleCategoryChange = event => {
    if (event.target.value) {
      setCategoryChoice(event.target.value);
    }
  }
  const handleNewCategory = event => {
    event.preventDefault();
    event.stopPropagation();
    setOpenCatInput(true);
  }
  async function handleCategoryCreate(event) {
    
    if(fields.newCategory.length === 0) {
      alert('Category name must have a value.');
      return;
    }

    try{
      categoryOptions.push(await createCategory({ name: fields.newCategory }));
      fields.newCategory = '';
      handleClose();
    } catch(e) {
      alert(e);
    }
  }

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
      try{
        const tags = await loadTags();
        setTagOptions(tags);
        const categories = await loadCategories();
        setCategoryOptions(categories);
        const items = await loadItems();
        setItems(items);
      } catch(e) {
        alert(e);
      }
      setLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);

  const handleClose = event => {
    setOpenTagInput(false);
    setOpenCatInput(false);
  }

  const [fields, handleFieldChange] = useFormFields({
    name: "",
    description: "",
    source: "",
    newTag: "",
    newCategory: ""
  });
  const [price, setPrice] = useState('');

  const addItemMock = {
    itemId: 'mock-id-1234',
    name: fields.name,
    category: categoryChoice,
    description: fields.description,
    tags: tags,
    saleCount: 0
  }
  
  const tagData = {
    options: tagOptions,
    choices: tags,
    onChange: handleTagChange,
    allowAdd: true,
    onAdd: handleNewTag
  }

  const categoryData = {
    options: categoryOptions,
    choices: categoryChoice,
    onChange: handleCategoryChange,
    allowAdd: true,
    onAdd: handleNewCategory
  }

  return (
    <>
      {props.isAuthenticated && !loading &&
        <Box border={5} className={classes.wrapper}>
          <form onSubmit={handleNewItem}>
            <Grid container spacing={2}>
              <Grid item xs={4} className={classes.blockWrapper}>
                <Grid item>
                  <ItemCard item={addItemMock} />
                </Grid>
                <Grid item>
                  <LoaderButton disabled={!validateForm()} type='submit' loading={submitting}>
                    Add
                  </LoaderButton>
                </Grid>
              </Grid>
              <Grid container item xs={8} spacing={1} direction='column'>
                <Grid container item spacing={1} direction='row'>
                  <Grid item xs={6}>
                    <StyledTextbox
                      id='name'
                      placeholder='Name'
                      variant='outlined'
                      color='primary'
                      value={fields.name}
                      onChange={handleFieldChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextbox
                      id='price'
                      placeholder='Retail Price'
                      type='number'
                      variant='outlined'
                      color='primary'
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <StyledTextbox
                    id='description'
                    placeholder='Description'
                    variant='outlined'
                    color='primary'
                    multiline
                    rows='4'
                    value={fields.description}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <StyledTextbox
                    id='source'
                    placeholder='Source'
                    variant='outlined'
                    color='primary'
                    multiline
                    rows='4'
                    value={fields.source}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <StyledSingleSelect
                    id='category'
                    color='primary'
                    label='Category'
                    {...categoryData}
                  />
                </Grid>
                <Grid item>
                  <StyledMultiSelect
                    id='tags'
                    color='primary'
                    variant='outlined'
                    label='Tags'
                    {...tagData}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      }
      <Grid container spacing={1} className={classes.itemList}>
        {items.map(item =>
          <Grid item xs={4} key={item.itemId}>
            <ItemCard item={item} to={`/items/${item.itemId}`} />
          </Grid>
        )}
      </Grid>
      <Dialog open={openTagInput} onClose={handleClose} aria-labelledby='tag-input'>
        <DialogTitle id='tag-dialog-title'>New Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a name for the new Tag.
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            id='newTag'
            label='Tag'
            value={fields.newTag}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleTagCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCatInput} onClose={handleClose} aria-labelledby='category-input'>
        <DialogTitle id='category-dialog-title'>New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a name for the new Category.
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            id='newCategory'
            label='Category'
            value={fields.newCategory}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCategoryCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Market;