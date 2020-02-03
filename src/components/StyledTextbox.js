import React from "react";
import PropTypes from 'prop-types';
import { FormControl, InputAdornment, OutlinedInput, makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    '& label.Mui-focused': {
      color: fade(theme.palette.common.black, 0.54)
    }
  },
  adornment: {
    color: fade(theme.palette.common.black, 0.55)
  }
}))

function StyledTextbox({
  color,
  placeholder,
  value,
  onChange,
  ...props
}) {

  const classes = useStyles();

  return (
    <FormControl variant='outlined' className={classes.wrapper}>
      <OutlinedInput
        className={classes.textbox}
        color={color}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position='start' className={classes.adornment}>
            {props.children}
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
}

StyledTextbox.propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default StyledTextbox;
