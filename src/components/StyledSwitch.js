import React, { useState } from "react";
import { Switch } from "@material-ui/core";

function StyledSwitch({ color, label, ...props }) {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      color={color}
      label={label}
      {...props}
    />
  );
}

export default StyledSwitch;
