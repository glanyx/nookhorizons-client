import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

function StyledTextbox({
  color,
  label,
  ...props
}) {
  return (
    <TextField
      color={color}
      variant="outlined"
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {props.children}
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
}

export default StyledTextbox;
