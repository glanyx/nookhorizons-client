import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { StyledSwitch } from "../components";

const options = {
  theme: ["default", "primary", "secondary"]
};

storiesOf("Styled Switch", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Switch", () => (
    <StyledSwitch
      color={select("Theme", options.theme, "default")}
      label={text("Label", "Terms and Conditions")}
    />
  ))
  .add("Disabled", () => (
    <>
      <StyledSwitch
        disabled
        color={select("Theme", options.theme, "default")}
        label={text("Label", "Terms and Conditions")}
      />
      <StyledSwitch
        disabled
        checked={true}
        label={text("Label", "Terms and Conditions")}
      />
    </>
  ));
