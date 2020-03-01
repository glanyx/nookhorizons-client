import React from "react";
import PropTypes from 'prop-types';
import { FormControl, Select, Input, MenuItem, ListItemText, makeStyles, InputLabel } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import StyledChip from "./StyledChip";
import StyledCheckbox from "./StyledCheckbox";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: `calc(100% - ${theme.spacing(1)})`,
    margin: theme.spacing(1),
  },
  chip: {
    marginLeft: theme.spacing(1)
  },
  chips: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  addMargin: {
    marginLeft: theme.spacing(3)
  }
}))

function StyledMultiSelect({
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
          multiple
          color={color}
          onChange={onChange}
          input={<Input />}
          value={choices}
          renderValue={selected => (
              <div className={classes.chips} key={selected.tagId}>
                  {selected.map(value => (
                      <StyledChip key={value.tagId} label={value.name} className={classes.chip} />
                  ))}
              </div>
            )}
          {...props}
        >
        {options.map(option => (
            <MenuItem key={option.tagId} value={option}>
                <StyledCheckbox checked={choices.indexOf(option) > -1} />
                <ListItemText primary={option.name} />
            </MenuItem>
        ))}
        {allowAdd && <MenuItem key='new'>
            <AddIcon onClick={onAdd} />
            <ListItemText primary='Add New' onClick={onAdd} className={classes.addMargin} />
        </MenuItem>}
      </Select>
    </FormControl>
  );
}

StyledMultiSelect.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  allowAdd: PropTypes.bool,
  onAdd: PropTypes.func
}

export default StyledMultiSelect;
