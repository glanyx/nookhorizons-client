import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { StyledCheckbox } from "../components";

const options = {
  theme: ["default", "primary", "secondary"]
};

storiesOf("Styled Checkbox", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Checkbox", () => (
    <StyledCheckbox
      color={select("Theme", options.theme, "default")}
      label={text("Label", "T&C")}
    />
  ));
