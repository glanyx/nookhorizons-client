import React, { useState, useEffect } from "react";
import { useFormFields } from '../libs/hooksLib';
import { makeStyles, Box, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import { StyledTextbox, StyledSingleSelect, StyledMultiSelect, ItemCard, LoaderButton, StyledButton, StyledCheckbox } from '../components';
import { Auth, API, Storage } from "aws-amplify";

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
}));

function Market(props) {

  const classes = useStyles()
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);

  const [openTagInput, setOpenTagInput] = useState(false);
  const [openCatInput, setOpenCatInput] = useState(false);

  function loadItems() {
    return API.get('nh', '/items');
  }
  
  async function handleNewItem(event) {
    event.preventDefault();

    if (file !== null && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Maximum file size is ${config.MAX_ATTACHMENT_SIZE/ 1000000} MB.`);
      return;
    }

    setSubmitting(true);

    try{

      const attachment = file
        ? await s3Upload(file, 'protected')
        : null;

      await createItem({
        name: fields.name,
        image: attachment,
        description: fields.description,
        source: fields.source,
        category: categoryChoice.categoryId,
        tags: tags.map(tag => tag.tagId),
        currency: currency,
        retailPrice: price,
        craftable: craftable,
        recipe: fields.recipe.length > 0 ? fields.recipe : null,
        recipeSource: fields.recipeSource.length > 0 ? fields.recipeSource : null,
      });
      fields.name = '';
      fields.description = '';
      fields.source = '';
      setCategoryChoice('');
      setTags([]);
      setCurrency('Bells');
      setPrice('');
      setCraftable(false);
      fields.recipe = '';
      fields.recipeSource = '';
      setFile(null);
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

  function validateItemForm() {
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

  function handleFileChange(event) {
    setFile(event.target.files[0]);
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

          if (admin) {
            try {
              const tags = await loadTags();
              setTagOptions(tags);
              const categories = await loadCategories();
              setCategoryOptions(categories);
            } catch(e) {
              alert(e);
            }
          }

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
  }, [props.isAuthenticated, submitting]);

  const handleClose = () => {
    setOpenTagInput(false);
    setOpenCatInput(false);
  }

  const [fields, handleFieldChange] = useFormFields({
    name: "",
    description: "",
    source: "",
    newTag: "",
    newCategory: "",
    width: '',
    height: '',
    recipe: '',
    recipeSource: '',
  });
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('Bells');
  const [craftable, setCraftable] = useState(false);

  const addItemMock = {
    itemId: 'mock-id-1234',
    name: fields.name,
    imageUrl: file !== null ? URL.createObjectURL(file) : '',
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
      <Grid container justify='center' alignItems='center'>
        {!loading && isAdmin &&
          <Box border={5} className={classes.wrapper}>
            <form onSubmit={handleNewItem}>
              <Grid container spacing={2}>
                <Grid item xs={4} className={classes.blockWrapper}>
                  <Grid item>
                    <ItemCard item={addItemMock} />
                  </Grid>
                  <Grid item>
                    <StyledButton
                      color='primary'
                      variant='contained'
                      component='label'
                    >
                      Add Image
                      <input
                        type='file'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </StyledButton>
                  </Grid>
                </Grid>
                <Grid item xs={4} spacing={1}>
                  <Grid container spacing={1} direction='row'>
                    <Grid item xs={12}>
                      <StyledTextbox
                        id='name'
                        placeholder='Name'
                        variant='outlined'
                        color='primary'
                        value={fields.name}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextbox
                        id='description'
                        placeholder='Description'
                        variant='outlined'
                        color='primary'
                        multiline
                        rows='3'
                        value={fields.description}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextbox
                        id='source'
                        placeholder='Source'
                        variant='outlined'
                        color='primary'
                        multiline
                        rows='3'
                        value={fields.source}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledSingleSelect
                        id='category'
                        color='primary'
                        label='Category'
                        {...categoryData}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormControl component='fieldset' className={classes.block}>
                        <RadioGroup aria-label='currency' value={currency} onChange={event => setCurrency(event.target.value)}>
                          <FormControlLabel value='Bells' control={<Radio />} label='Bells' />
                          <FormControlLabel value='Nook Miles' control={<Radio />} label='Nook Miles' />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextbox
                        id='price'
                        placeholder='Retail Price'
                        type='text'
                        variant='outlined'
                        color='primary'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <StyledCheckbox checked={craftable} onChange={event => setCraftable(event.target.checked)} />
                        }
                        label='Craftable?'
                      />
                    </Grid>
                    {craftable &&
                      <>
                        <Grid item xs={12}>
                          <StyledTextbox
                            id='recipe'
                            placeholder='Recipe'
                            type='text'
                            variant='outlined'
                            color='primary'
                            value={fields.recipe}
                            onChange={handleFieldChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <StyledTextbox
                            id='recipeSource'
                            placeholder='Recipe Source'
                            type='text'
                            variant='outlined'
                            color='primary'
                            value={fields.recipeSource}
                            onChange={handleFieldChange}
                          />
                        </Grid>
                      </>
                    }
                  </Grid>
                  <LoaderButton disabled={!validateItemForm() || submitting} type='submit' loading={submitting}>
                    Add
                  </LoaderButton>
                </Grid>
              </Grid>
            </form>
          </Box>
          }
          {!loading &&
            <Grid container spacing={2} className={classes.itemList} justify='center' alignItems='center'>
              {items.map(item => (
                <Grid item xs={3} key={item.itemId}>
                  <Grid container alignItems='center' justify='center'>
                    <ItemCard item={item} to={`/items/${item.itemId}`} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          }
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