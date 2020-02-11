import React from "react";
import PropTypes from 'prop-types';
import { FormControl, Select, Input, MenuItem, ListItemText, makeStyles, InputLabel, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import StyledCheckbox from "./StyledCheckbox";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: `calc(100% - ${theme.spacing(1)})`,
    margin: theme.spacing(1),
  },
  chips: {
      display: 'flex',
      flexWrap: 'wrap'
  },
  addMargin: {
    marginLeft: theme.spacing(3)
  }
}))

function StyledSingleSelect({
  color,
  label,
  options,
  choices,
  onChange,
  allowAdd,
  onAdd,
  ...props
}) {

  const classes = useStyles();

  return (
    <FormControl variant='outlined' className={classes.wrapper}>
      <InputLabel id='select-label'>{label}</InputLabel>
        <Select
          color={color}
          onChange={onChange}
          input={<Input />}
          value={choices}
          renderValue={selected => (
              <Typography className={classes.addMargin}>
                  {selected.name}
              </Typography>
            )}
          {...props}
        >
        {options.map(option => (
            <MenuItem key={option.categoryId} value={option}>
                <StyledCheckbox checked={choices.name === option.name} />
                <ListItemText primary={option.name} />
            </MenuItem>
        ))}
        {allowAdd && <MenuItem key='new'>
            <AddIcon />
            <ListItemText primary='Add New' onClick={onAdd} className={classes.addMargin} />
        </MenuItem>}
      </Select>
    </FormControl>
  );
}

StyledSingleSelect.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  choices: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  allowAdd: PropTypes.bool,
  onAdd: PropTypes.func
}

export default StyledSingleSelect;
