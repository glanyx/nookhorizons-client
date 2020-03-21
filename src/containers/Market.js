import React, { useState, useEffect } from "react";
import { useFormFields } from '../libs/hooksLib';
import { makeStyles, fade, Link, Paper, Box, Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Radio, RadioGroup, FormControl, FormControlLabel, CircularProgress } from '@material-ui/core';
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
  const [openInstructions, setOpenInstructions] = useState(false);

  const [hidden, setHidden] = useState(false);

  const handleOpenInstructions = () => {
    setHidden(true);
    setOpenInstructions(true);
  }

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
      fields.description = 'Unknown';
      fields.source = 'Unknown';
      setCategoryChoice('');
      setTags([]);
      setCurrency('Bells');
      setPrice('Unknown');
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

  const handleInstructionsClose = () => {
    setHidden(false);
    setOpenInstructions(false);
  }

  const [fields, handleFieldChange] = useFormFields({
    name: "",
    description: 'Unknown',
    source: 'Unknown',
    newTag: "",
    newCategory: "",
    width: '',
    height: '',
    recipe: '',
    recipeSource: '',
  });
  const [price, setPrice] = useState('Unknown');
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
      <Paper elevation={3} className={classes.howitworks}>
        <Grid container direction='column' spacing={2}>
            <Grid item className={classes.howitworksComponent}>
                <Typography variant='h5'>
                    Please Note:
                </Typography>
                <Typography variant='body2'>
                    <ul>
                        <li>Before you use our marketplace, please make sure you have an <span className={classes.bold}>active nintendo online membership</span>, otherwise you cannot visit other players to trade.</li>
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
                  <StyledButton variant='contained' onClick={() => setHidden(!hidden)}>
                    {hidden ? 'Load Items' : 'Unload Items'}
                  </StyledButton>
                </Grid>
              </Grid>
            </form>
          </Box>
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
          {!loading && !hidden &&
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

export default Market;