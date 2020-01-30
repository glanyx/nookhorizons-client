import React, { useState } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

function StyledSwitch({ color, label, ...props }) {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          color={color}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default StyledSwitch;
