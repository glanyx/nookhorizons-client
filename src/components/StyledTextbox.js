import React from "react";
import { TextField } from "@material-ui/core";

function StyledTextbox({ color, label, ...props }) {
  return (
    <TextField color={color} variant="outlined" label={label} {...props} />
  );
}

export default StyledTextbox;
