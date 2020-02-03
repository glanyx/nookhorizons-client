import React from "react";
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from "@material-ui/core";

function StyledCheckbox({ color, label, checked, onChange, ...props }) {

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color={color}
        />
      }
      label={label}
      {...props}
    />
  );
}

StyledCheckbox.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default StyledCheckbox;
