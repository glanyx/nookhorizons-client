import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

function StyledCheckbox({ color, label, ...props }) {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          color={color}
        />
      }
      label={label}
      {...props}
    />
  );
}

export default StyledCheckbox;
