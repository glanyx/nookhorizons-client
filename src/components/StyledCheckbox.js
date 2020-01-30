import React, { useState } from "react";
import { Checkbox } from "@material-ui/core";

function StyledCheckbox({ color, label, ...props }) {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      color={color}
      label={label}
      {...props}
    />
  );
}

export default StyledCheckbox;
