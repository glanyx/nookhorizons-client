import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Img from 'react-image';
import PropTypes from 'prop-types';
import { makeStyles, fade, ButtonBase, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, TextField, Button, Typography, RadioGroup, Radio, Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, InputLabel, Select, MenuItem, Chip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormFields, useBooleanFields } from '../libs/hooksLib';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: 400
  },
  imageRoot: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative'
  },
  image: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundColor: fade(theme.palette.common.black, .65),
    position: 'absolute'
  },
  input: {
    display: 'none'
  },
  overlayWrapper: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'transparent',
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: fade(theme.palette.common.black, .65)
    }
  },
  imageOverlay: {
    position: 'absolute',
    width: '100%',
    top: '45%',
    left: 0,
    fontWeight: 700,
    textAlign: 'center'
  },
  textfield: {
    minWidth: 250
  },
  selectfield: {
    minWidth: 250,
    margin: theme.spacing(2, 0, 1, 0)
  },
  radiogroup: {
    display: 'block'
  }
}));

const ItemDialog = ({
  open,
  item,
  onClose,
  onSubmit,
  props
}) => {

  const classes = useStyles();

  let [fields, handleFieldChange] = useFormFields({
    name: '',
    description: 'Unknown',
    source: 'Unknown',
    retailPrice: 'Unknown',
    recipe: '',
    recipeSource: '',
    newTag: '',
    newCategory: ''
  });

  const [bFields, handleBooleanChange] = useBooleanFields({
    craftable: false,
  })
  const handleCraftableChange = (event) => {
    fields.recipe = '';
    fields.recipeSource = '';
    handleBooleanChange(event);
  }

  const [currency, setCurrency] = useState('Bells');

  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [openTagInput, setOpenTagInput] = useState(false);
  const handleSetTag = event => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.value.includes('createNew')) {
      setOpenTagInput(true);
      return;
    }

    setTags(event.target.value);
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
  function loadTags() {
    return API.get('nh', '/tags');
  }
  function createTag(tag) {
    return API.post('nh', '/tags', {
      body: tag
    });
  }

  const [category, setCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [openCategoryInput, setOpenCategoryInput] = useState(false);
  const handleSetCategory = event => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.value === 'createNew') {
      setOpenCategoryInput(true);
      return;
    }

    setCategory(event.target.value);
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
  function loadCategories() {
    return API.get('nh', '/categories');
  }
  function createCategory(category) {
    return API.post('nh', '/categories', {
      body: category
    });
  }

  const [file, setFile] = useState('');
  const [localFile, setLocalFile] = useState('');
  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      const fileName = event.target.files[0];
      setFile(fileName);
      setLocalFile(URL.createObjectURL(fileName));
    }
  }

  const handleSubmit = () => {
    const cat = categoryOptions.find(co => co.name === category);
    onSubmit(
      item = {
        tags,
        category: cat,
        file,
        currency,
        ...bFields,
        ...fields,
      }
    )
    onClose();
  }

  function validateItemForm() {
    return fields.name.length > 0 && fields.description.length > 0 && category
  }

  const setValues = () => {
    if (item) {
      fields.name = item.name
      fields.description = item.description;
      fields.source = item.source;
      fields.retailPrice = item.retailPrice;
      fields.recipe = item.recipe ? item.recipe : '';
      fields.recipeSource = item.recipeSource ? item.recipeSource : '';
      bFields.craftable = item.craftable;

      setCategory(item.category.name);
      setTags(item.tags);

      setCurrency(item.currency);
      setLocalFile(item.imageUrl);
      setFile(item.image);
    }
  }

  useEffect(() => {

    async function onLoad() {
      const tags = await loadTags();
      setTagOptions(tags);
      const categories = await loadCategories();
      setCategoryOptions(categories);

      setValues();
    }

    onLoad();
  }, [item]);

  const handleCancel = () => {
    setValues();
    onClose();
  }

  const handleClose = () => {
    setOpenTagInput(false);
    setOpenCategoryInput(false);
  }

  return(
    <>
      <Dialog open={open} onClose={handleCancel} maxWidth='xl' aria-labelledby='edit-item-dialog'>
        <DialogTitle className={classes.editTitle}>
          {`${!item ? 'Create' : 'Update'} Item`}
        </DialogTitle>
        <DialogContent className={classes.root}>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={4}>
              <Grid container direction='column'>
                <Grid item>
                  <TextField
                    autoFocus
                    margin='normal'
                    type='text'
                    id='name'
                    label='Name'
                    value={fields.name}
                    className={classes.textfield}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    id='contained-button-file'
                    type='file'
                    accept='image/*'
                    className={classes.input}
                    onChange={handleFileChange}
                  />
                  <label htmlFor='contained-button-file'>
                    <ButtonBase
                      focusRipple
                      component='span'
                      className={classes.imageRoot}
                    >
                      <Img
                        src={localFile}
                        className={classes.image}
                      />
                      <div className={classes.overlayWrapper}>
                        <Typography variant='body1' className={classes.imageOverlay}>
                          {`${!item ? 'Add' : 'Edit'} Image`}
                        </Typography>
                      </div>
                    </ButtonBase>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction='column'>
                <Grid item>
                  <TextField
                    multiline
                    rows={3}
                    margin='normal'
                    type='text'
                    id='description'
                    label='Description'
                    value={fields.description}
                    className={classes.textfield}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    multiline
                    rows={3}
                    margin='normal'
                    type='text'
                    id='source'
                    label='Source'
                    value={fields.source}
                    className={classes.textfield}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <FormControl className={classes.selectfield}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id='category'
                      value={category}
                      onChange={handleSetCategory}
                    >
                      {[{}].concat(categoryOptions).map((catOption, i) =>
                        i !== 0
                          ?
                            <MenuItem value={catOption.name}>{catOption.name}</MenuItem>
                          :
                            <MenuItem value='createNew'>
                              <AddIcon />
                              Add new
                            </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.selectfield}>
                    <InputLabel>Tags</InputLabel>
                    <Select
                      multiple
                      id='tags'
                      value={tags}
                      onChange={handleSetTag}
                      renderValue={(selected) => (
                        <>
                          {selected.map((value) => (
                            <Chip key={value} label={value.name} />
                          ))}
                        </>
                      )}
                    >
                      {[{}].concat(tagOptions).map((tagOption, i) =>
                        i !== 0
                          ?
                            <MenuItem value={tagOption}>{tagOption.name}</MenuItem>
                          :
                            <MenuItem value='createNew'>
                              <AddIcon />
                              Add new
                            </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction='column'>
                <Grid item>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Currency</FormLabel>
                    <RadioGroup
                      row
                      aria-label='currency'
                      name='currency'
                      value={currency}
                      onChange={event => setCurrency(event.target.value)}
                    >
                      <FormControlLabel value='Bells' control={<Radio />} label='Bells' />
                      <FormControlLabel value='Nook Miles' control={<Radio />} label='Nook Miles' />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    margin='normal'
                    type='text'
                    id='retailPrice'
                    label='Price'
                    value={fields.retailPrice}
                    className={classes.textfield}
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid item>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='craftable'
                          checked={bFields.craftable}
                          onChange={event => handleCraftableChange(event)}
                        />
                      }
                      label='Craftable?'
                    />
                  </FormGroup>
                </Grid>
                {bFields.craftable
                  ?
                    <>
                      <Grid item>
                        <TextField
                          margin='normal'
                          type='text'
                          id='recipe'
                          label='Recipe'
                          value={fields.recipe}
                          className={classes.textfield}
                          onChange={handleFieldChange}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          margin='normal'
                          type='text'
                          id='recipeSource'
                          label='Recipe Source'
                          value={fields.recipeSource}
                          className={classes.textfield}
                          onChange={handleFieldChange}
                        />
                      </Grid>
                    </>
                  :
                    null
                }
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!validateItemForm()} onClick={handleSubmit}>
            {!item ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openTagInput} onClose={handleClose} aria-labelledby='new-tag-dialog'>
        <DialogTitle>
          New Tag
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a value for the new Tag:
            </DialogContentText>
            <TextField
                margin='normal'
                type='text'
                id='newTag'
                label='Tag'
                value={fields.newTag}
                onChange={handleFieldChange}
                className={classes.textfield}
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
      <Dialog open={openCategoryInput} onClose={handleClose} aria-labelledby='new-category-dialog'>
        <DialogTitle>
          New Category
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a value for the new Category:
            </DialogContentText>
            <TextField
                margin='normal'
                type='text'
                id='newCategory'
                label='Category'
                value={fields.newCategory}
                onChange={handleFieldChange}
                className={classes.textfield}
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

ItemDialog.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string,
    retailPrice: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
      categoryId: PropTypes.string.isRequired,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      tagId: PropTypes.string.isRequired
    })),
  }),
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  props: PropTypes.any,
}

export default ItemDialog;