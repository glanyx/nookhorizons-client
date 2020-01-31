import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { StyledTextbox } from "../components";

const options = {
  theme: ["default", "primary", "secondary"]
};

storiesOf("Styled Textbox", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Textbox", () => (
    <>
      <StyledTextbox
        type='email'
        color={select("Theme", options.theme, "primary")}
        label='Email address'
      >
        <MailIcon />
      </StyledTextbox>
      <br />
      <br />
      <StyledTextbox
        type='password'
        color={select("Theme", options.theme, "primary")}
        label='Password'
      >
        <LockIcon />
      </StyledTextbox>
    </>
  ))
  .add("Error", () => (
    <StyledTextbox
      error
      helperText="Invalid Entry"
      label={text("Label", "Email address")}
    >
      <MailIcon />
    </StyledTextbox>
  ));
