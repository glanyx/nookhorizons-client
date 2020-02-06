import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { StyledButton, LoaderButton } from "../components";

const options = {
  theme: ["default", "primary", "secondary"],
  variant: ["contained", "outlined"]
};

storiesOf("Styled Button", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Button", () => (
    <StyledButton
      color={select("Theme", options.theme, "default")}
      variant={select("Variant", options.variant, "contained")}
    >
      Button
    </StyledButton>
  ))
  .add("Loader Button", () => (
  <LoaderButton 
    color={select("Theme", options.theme, "primary")}
    variant={select("Variant", options.variant, "contained")}
  >
    {text('Text', 'Button')}
  </LoaderButton>
  
  ));
