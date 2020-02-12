import React from "react";
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, ListItemText, makeStyles, InputLabel } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
  },
  select: {
    '& .MuiListItemText-root': {
      marginLeft: theme.spacing(2)
    }
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
          variant='standard'
          className={classes.select}
          color={color}
          onChange={onChange}
          value={choices}
          {...props}
        >
        {options.map(option => (
            <MenuItem key={option.categoryId} value={option}>
                <ListItemText primary={option.name} />
            </MenuItem>
        ))}
        {allowAdd && <MenuItem key='new'>
            <AddIcon onClick={onAdd} />
            <ListItemText primary='Add New' className={classes.addMargin} onClick={onAdd} />
        </MenuItem>}
      </Select>
    </FormControl>
  );
}

StyledSingleSelect.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  choices: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  allowAdd: PropTypes.bool,
  onAdd: PropTypes.func
}

export default StyledSingleSelect;
