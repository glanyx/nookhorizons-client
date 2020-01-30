import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { StyledTextbox } from "../components";

const options = {
  theme: ["default", "primary", "secondary"]
};

storiesOf("Styled Textbox", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Textbox", () => (
    <StyledTextbox
      color={select("Theme", options.theme, "default")}
      label={text("Label", "Email address")}
    />
  ))
  .add("Error", () => (
    <StyledTextbox
      error
      helperText="Invalid Entry"
      color={select("Theme", options.theme, "default")}
      label={text("Label", "Email address")}
    />
  ));
